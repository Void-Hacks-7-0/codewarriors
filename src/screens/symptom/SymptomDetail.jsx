import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { checkSymptoms } from '../../services/symptomService';
import '../../styles/gamify.css';

const SymptomDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const disease = state?.disease;
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!disease) {
        return (
            <div className="dashboard-container">
                <p>No disease selected. <button onClick={() => navigate('/symptoms')}>Go Back</button></p>
            </div>
        );
    }

    const toggleSymptom = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms(prev => [...prev, symptom]);
        }
    };

    const handleSubmit = async () => {
        if (selectedSymptoms.length === 0) return;

        setIsSubmitting(true);
        const payload = {
            disease_id: disease.id,
            selected_symptoms: selectedSymptoms,
            context: { age: 25 } // Mock context
        };

        const result = await checkSymptoms(payload);
        setIsSubmitting(false);
        navigate('/symptoms/result', { state: { result } });
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/symptoms')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>Symptom <br /> <span style={{ fontWeight: 300 }}>Checklist</span></h1>
                </div>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{disease.name}</h2>
                    <p className="text-muted">{disease.short_description}</p>
                </div>

                <h3 style={{ marginBottom: '1rem' }}>Select symptoms you are experiencing:</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {disease.symptoms.map((symptom) => {
                        const isSelected = selectedSymptoms.includes(symptom);
                        return (
                            <motion.div
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: isSelected ? '#ecfccb' : '#f9fafb',
                                    border: `2px solid ${isSelected ? '#84cc16' : 'transparent'}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ textTransform: 'capitalize', fontWeight: isSelected ? '600' : '400' }}>
                                    {symptom.replace(/_/g, ' ')}
                                </span>
                                {isSelected && <CheckCircle size={20} color="#65a30d" />}
                            </motion.div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => setSelectedSymptoms([])}
                        style={{ padding: '0.75rem 1.5rem', background: '#f3f4f6', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
                    >
                        Clear
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                        disabled={selectedSymptoms.length === 0 || isSubmitting}
                        style={{
                            padding: '0.75rem 2rem',
                            opacity: selectedSymptoms.length === 0 ? 0.5 : 1,
                            cursor: selectedSymptoms.length === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? 'Analyzing...' : 'Submit Check'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SymptomDetail;
