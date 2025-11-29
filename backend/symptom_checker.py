from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Sample Data
DATA_FILE = os.path.join(os.path.dirname(__file__), "sample_diseases.json")

def load_diseases():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

# Models
class SymptomCheckRequest(BaseModel):
    user_id: Optional[str] = None
    disease_id: Optional[str] = None
    selected_symptoms: List[str]
    context: Optional[dict] = None

class ConditionResult(BaseModel):
    name: str
    confidence: float
    explanation: str
    action: str
    risk_level: str

class SymptomCheckResponse(BaseModel):
    conditions: List[ConditionResult]
    aggregate_score: float
    disclaimer: str
    emergency_alert: bool = False
    emergency_message: Optional[str] = None

# Emergency Symptoms List
EMERGENCY_SYMPTOMS = [
    "chest_pain",
    "shortness_of_breath",
    "severe_bleeding",
    "loss_of_consciousness",
    "thoughts_of_self_harm",
    "severe_head_injury"
]

@app.get("/api/diseases")
def get_diseases():
    return load_diseases()

@app.post("/api/symptom/check", response_model=SymptomCheckResponse)
def check_symptoms(request: SymptomCheckRequest):
    diseases = load_diseases()
    
    # 1. Check for Emergency Symptoms
    for symptom in request.selected_symptoms:
        if symptom.lower().replace(" ", "_") in EMERGENCY_SYMPTOMS:
            return SymptomCheckResponse(
                conditions=[],
                aggregate_score=1.0,
                disclaimer="EMERGENCY DETECTED",
                emergency_alert=True,
                emergency_message="You have reported a severe symptom. Please call emergency services immediately or go to the nearest hospital."
            )

    results = []
    
    # 2. Rule-Based Matching
    # If disease_id is provided, only check that one. Otherwise check all.
    target_diseases = [d for d in diseases if d['id'] == request.disease_id] if request.disease_id else diseases

    for disease in target_diseases:
        disease_symptoms = [s.lower().replace(" ", "_") for s in disease['symptoms']]
        user_symptoms = [s.lower().replace(" ", "_") for s in request.selected_symptoms]
        
        matches = set(disease_symptoms).intersection(set(user_symptoms))
        match_count = len(matches)
        total_symptoms = len(disease['symptoms'])
        
        if total_symptoms > 0:
            score = match_count / total_symptoms
        else:
            score = 0

        # Only include if there's at least one match or if checking a specific disease
        if score > 0 or request.disease_id:
            explanation = f"You matched {match_count} out of {total_symptoms} common symptoms: {', '.join(matches)}."
            
            # Determine Action based on score and risk
            action = disease['action_self_care']
            if score > 0.6 and disease['risk_level'] == 'High':
                action = disease['action_medical']
            elif score > 0.8:
                action = disease['action_medical']

            results.append(ConditionResult(
                name=disease['name'],
                confidence=round(score, 2),
                explanation=explanation,
                action=action,
                risk_level=disease['risk_level']
            ))

    # Sort by confidence
    results.sort(key=lambda x: x.confidence, reverse=True)

    return SymptomCheckResponse(
        conditions=results,
        aggregate_score=results[0].confidence if results else 0,
        disclaimer="DISCLAIMER: This tool is for screening purposes only and does not provide a medical diagnosis. Always consult a healthcare professional."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
