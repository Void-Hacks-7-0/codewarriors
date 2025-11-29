import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Phone, MessageSquare, FileText, ArrowRight, Utensils, Video } from 'lucide-react';
import '../../styles/gamify.css';

const SymptomResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;

    if (!result) {
        return (
            <div className="dashboard-container">
                <p>No results found. <button onClick={() => navigate('/symptoms')}>Start Over</button></p>
            </div>
        );
    }

    const isEmergency = result.emergency_alert;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Analysis <br /> <span style={{ fontWeight: 300 }}>Results</span></h1>
                </div>
            </header>

            {/* Emergency Banner */}
            {isEmergency && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel"
                    style={{
                        background: '#fef2f2',
                        border: '2px solid #ef4444',
                        padding: '2rem',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}
                >
                    <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ color: '#b91c1c', fontSize: '1.75rem', marginBottom: '1rem' }}>EMERGENCY ALERT</h2>
                    <p style={{ fontSize: '1.1rem', color: '#7f1d1d', marginBottom: '1.5rem' }}>
                        {result.emergency_message}
                    </p>
                    <button
                        className="btn-primary"
                        style={{
                            background: '#ef4444',
                            color: 'white',
                            width: '100%',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            padding: '1rem'
                        }}
                    >
                        <Phone size={24} /> Call Emergency Services (911)
                    </button>
                </motion.div>
            )}

            {/* Standard Results */}
            {!isEmergency && (
                <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {result.conditions.map((condition, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-panel"
                                style={{ padding: '2rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{condition.name}</h2>
                                        <span className={`badge ${condition.risk_level === 'High' ? 'red' : 'lime'}`}>
                                            {condition.risk_level} Risk
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#16a34a' }}>
                                            {Math.round(condition.confidence * 100)}%
                                        </span>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280' }}>Match Score</span>
                                    </div>
                                </div>

                                <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                    <p style={{ margin: 0, color: '#374151' }}>{condition.explanation}</p>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle size={18} color="#16a34a" /> Recommended Action
                                    </h4>
                                    <p style={{ color: '#4b5563' }}>{condition.action}</p>
                                </div>

                                {/* Diet Recommendations */}
                                {condition.diet_recommendations && (
                                    <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Utensils size={18} color="#f59e0b" /> Dietary Recommendations
                                        </h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '12px' }}>
                                                <h5 style={{ color: '#166534', margin: '0 0 0.5rem 0' }}>Foods to Eat</h5>
                                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#15803d', fontSize: '0.9rem' }}>
                                                    {condition.diet_recommendations.eat.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '12px' }}>
                                                <h5 style={{ color: '#991b1b', margin: '0 0 0.5rem 0' }}>Foods to Avoid</h5>
                                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#b91c1c', fontSize: '0.9rem' }}>
                                                    {condition.diet_recommendations.avoid.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Next Steps</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button
                                    className="btn-primary"
                                    style={{ justifyContent: 'center' }}
                                    onClick={() => navigate('/doctor')}
                                >
                                    <Video size={18} /> Call Virtual Doctor
                                </button>
                                <button className="btn-secondary" style={{ justifyContent: 'center', background: '#eff6ff', color: '#1d4ed8', border: 'none' }}>
                                    <Phone size={18} /> Book Telehealth
                                </button>
                                <button className="btn-secondary" style={{ justifyContent: 'center', background: '#f3f4f6', border: 'none' }}>
                                    <FileText size={18} /> Export Report
                                </button>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', background: '#fff7ed', borderRadius: '20px', border: '1px solid #fdba74' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <AlertTriangle size={24} color="#ea580c" />
                                <h4 style={{ color: '#9a3412', margin: 0 }}>Disclaimer</h4>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#9a3412', lineHeight: '1.5' }}>
                                {result.disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SymptomResult;
