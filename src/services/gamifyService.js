import axios from 'axios';

// Mock data for fallback if backend is not running
const MOCK_REWARDS_DATA = {
    hp: 640,
    level: 3,
    next_reward_hp: 1000,
    rewards: [
        { id: "r1", name: "5% Clinic Discount", desc: "Valid at campus clinic", costHp: 300, status: "claimed", code: "CLINIC-5-XYZ" },
        { id: "r2", name: "Free Telehealth Consult", desc: "30-min mock consult", costHp: 600, status: "available", code: null },
        { id: "r3", name: "10% Lab Discount", desc: "Local lab partner", costHp: 1000, status: "locked", code: null }
    ]
};

const MOCK_GOALS_DATA = {
    goals: [
        { id: "g1", type: "daily", title: "Check Dashboard", desc: "Open dashboard today", progress: 0, target: 1, rewardHp: 10, status: "pending" },
        { id: "g2", type: "weekly", title: "Sleep 7+ hrs 3 days", desc: "Sleep target this week", progress: 1, target: 3, rewardHp: 50, status: "in_progress" }
    ]
};

// Base URL for backend - change if running on different port
const API_URL = 'http://localhost:8000/api';

export const getRewards = async () => {
    try {
        const response = await axios.get(`${API_URL}/rewards`);
        return response.data;
    } catch (error) {
        console.warn("Backend unavailable, using mock data for rewards");
        return MOCK_REWARDS_DATA;
    }
};

export const claimReward = async (rewardId, userId = 'u123') => {
    try {
        const response = await axios.post(`${API_URL}/rewards/claim`, { reward_id: rewardId, user_id: userId });
        return response.data;
    } catch (error) {
        console.warn("Backend unavailable, simulating claim");
        // Simulate claim logic locally
        const reward = MOCK_REWARDS_DATA.rewards.find(r => r.id === rewardId);
        if (reward && MOCK_REWARDS_DATA.hp >= reward.costHp) {
            MOCK_REWARDS_DATA.hp -= reward.costHp;
            reward.status = 'claimed';
            reward.code = `MOCK-${Math.floor(Math.random() * 10000)}`;
            return { success: true, hp: MOCK_REWARDS_DATA.hp, code: reward.code };
        }
        throw new Error("Insufficient HP or backend error");
    }
};

export const getGoals = async () => {
    try {
        const response = await axios.get(`${API_URL}/goals`);
        return response.data;
    } catch (error) {
        console.warn("Backend unavailable, using mock data for goals");
        return MOCK_GOALS_DATA;
    }
};

export const completeGoal = async (goalId, userId = 'u123') => {
    try {
        const response = await axios.post(`${API_URL}/goals/complete`, { goal_id: goalId, user_id: userId });
        return response.data;
    } catch (error) {
        console.warn("Backend unavailable, simulating goal completion");
        const goal = MOCK_GOALS_DATA.goals.find(g => g.id === goalId);
        if (goal) {
            goal.progress = goal.target;
            goal.status = 'completed';
            MOCK_REWARDS_DATA.hp += goal.rewardHp;
            return { success: true, goals: MOCK_GOALS_DATA.goals, hp: MOCK_REWARDS_DATA.hp };
        }
        return { success: false };
    }
};
