import axios from 'axios';

import { MEDICAL_KNOWLEDGE as MOCK_DISEASES } from '../data/knowledgeBase';

// Use a different port for the symptom checker backend if needed, or same if merged
const API_URL = 'http://localhost:8001/api';

export const getDiseases = async () => {
    try {
        const response = await axios.get(`${API_URL}/diseases`);
        return response.data;
    } catch (error) {
        console.warn("Backend unavailable, using mock diseases data.");
        return MOCK_DISEASES;
    }
};

export const checkSymptoms = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/symptom/check`, payload);
        return response.data;
    } catch (error) {
        console.warn("Backend unavailable, performing local mock check.");

        // Simple local mock logic
        const disease = MOCK_DISEASES.find(d => d.id === payload.disease_id);
        if (!disease) return { conditions: [], disclaimer: "Mock Error" };

        const matches = disease.symptoms.filter(s => payload.selected_symptoms.includes(s));
        const score = matches.length / disease.symptoms.length;

        // Determine action based on risk and score (similar to backend logic)
        let action = disease.action_self_care || "Consult a healthcare professional.";
        if (score > 0.6 && disease.risk_level === 'High') {
            action = disease.action_medical || "Seek medical attention.";
        } else if (score > 0.8) {
            action = disease.action_medical || "Seek medical attention.";
        }

        return {
            conditions: [{
                name: disease.name,
                confidence: score,
                explanation: `(Offline Mode) You matched ${matches.length} symptoms.`,
                action: action,
                risk_level: disease.risk_level,
                diet_recommendations: disease.diet_recommendations
            }],
            aggregate_score: score,
            disclaimer: "OFFLINE MODE: This is a simulation. Consult a doctor.",
            emergency_alert: false
        };
    }
};
