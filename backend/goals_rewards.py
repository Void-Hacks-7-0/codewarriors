from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import json
import math
import os

app = FastAPI()

# --- DATA MODELS ---

class Reward(BaseModel):
    id: str
    name: str
    desc: str
    cost_hp: int
    status: str  # locked, available, claimed
    code: Optional[str] = None

class RewardsResponse(BaseModel):
    hp: int
    level: int
    next_reward_hp: int
    rewards: List[Reward]

class ClaimRequest(BaseModel):
    reward_id: str
    user_id: str

class Goal(BaseModel):
    id: str
    type: str
    title: str
    desc: str
    progress: int
    target: int
    rewardHp: int
    status: str

class GoalsResponse(BaseModel):
    goals: List[Goal]

class CompleteGoalRequest(BaseModel):
    goal_id: str
    user_id: str

# --- MOCK STORAGE ---
# In a real app, use a database. Here we use a global dict or file.
DATA_FILE = "sample_data.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return {
        "users": {"u123": {"hp": 640, "level": 2}},
        "rewards": [
            {"id":"r1","name":"5% Clinic Discount","desc":"Valid at campus clinic","cost_hp":300,"status":"claimed","code": "CLINIC-5-XYZ"},
            {"id":"r2","name":"Free Telehealth Consult","desc":"30-min mock consult","cost_hp":600,"status":"available","code": None},
            {"id":"r3","name":"10% Lab Discount","desc":"Local lab partner","cost_hp":1000,"status":"locked","code": None}
        ],
        "goals": [
            {"id":"g1","type":"daily","title":"Check Dashboard","desc":"Open dashboard today","progress":0,"target":1,"rewardHp":10,"status":"pending"},
            {"id":"g2","type":"weekly","title":"Sleep 7+ hrs 3 days","desc":"Sleep target this week","progress":1,"target":3,"rewardHp":50,"status":"in_progress"}
        ]
    }

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

db = load_data()

# --- HELPERS ---

def calculate_level(hp):
    return math.floor(hp / 500) + 1

def update_reward_status(hp, rewards):
    for r in rewards:
        if r['status'] == 'claimed':
            continue
        if hp >= r['cost_hp']:
            r['status'] = 'available'
        else:
            r['status'] = 'locked'
    return rewards

# --- ENDPOINTS ---

@app.get("/api/rewards", response_model=RewardsResponse)
def get_rewards(user_id: str = "u123"):
    user = db["users"].get(user_id, {"hp": 0, "level": 1})
    hp = user["hp"]
    level = calculate_level(hp)
    
    # Update statuses based on current HP
    rewards = update_reward_status(hp, db["rewards"])
    
    # Simple logic for next reward target
    next_reward = next((r for r in rewards if r['cost_hp'] > hp), None)
    next_reward_hp = next_reward['cost_hp'] if next_reward else hp + 500

    return {
        "hp": hp,
        "level": level,
        "next_reward_hp": next_reward_hp,
        "rewards": rewards
    }

@app.post("/api/rewards/claim")
def claim_reward(req: ClaimRequest):
    user = db["users"].get(req.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    reward = next((r for r in db["rewards"] if r["id"] == req.reward_id), None)
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    if reward["status"] == "claimed":
        return {"success": False, "message": "Already claimed", "code": reward["code"]}
    
    if user["hp"] < reward["cost_hp"]:
        raise HTTPException(status_code=400, detail="Insufficient HP")
    
    # Process claim
    user["hp"] -= reward["cost_hp"]
    reward["status"] = "claimed"
    reward["code"] = f"MOCK-CODE-{req.reward_id.upper()}"
    
    save_data(db)
    
    return {
        "success": True,
        "hp": user["hp"],
        "code": reward["code"]
    }

@app.get("/api/goals", response_model=GoalsResponse)
def get_goals(user_id: str = "u123"):
    return {"goals": db["goals"]}

@app.post("/api/goals/complete")
def complete_goal(req: CompleteGoalRequest):
    user = db["users"].get(req.user_id)
    goal = next((g for g in db["goals"] if g["id"] == req.goal_id), None)
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if goal["status"] == "completed":
        return {"success": False, "message": "Goal already completed"}
    
    # Update progress
    goal["progress"] = goal["target"]
    goal["status"] = "completed"
    
    # Award HP
    user["hp"] += goal["rewardHp"]
    user["level"] = calculate_level(user["hp"])
    
    save_data(db)
    
    return {
        "success": True,
        "goals": db["goals"],
        "hp": user["hp"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
