import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Activity, AlertCircle, CheckCircle, ChevronRight, Stethoscope, Thermometer } from 'lucide-react';
import './Dashboard.css';

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const commonSymptoms = [
        'Headache', 'Fever', 'Cough', 'Fatigue', 'Sore Throat',
        'Nausea', 'Dizziness', 'Shortness of Breath', 'Muscle Pain',
        'Runny Nose', 'Chills', 'Joint Pain'
    ];

    const toggleSymptom = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
        setShowResults(false);
    };

    const handleAnalyze = () => {
        if (selectedSymptoms.length === 0) return;
        setIsAnalyzing(true);
        setShowResults(false);

        // Simulate analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Symptom <br /> <span style={{ fontWeight: 300 }}>Checker</span></h1>
                </div>
            </header>

            <motion.div
                className="dashboard-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ gridTemplateColumns: '1.2fr 0.8fr' }}
            >
                {/* Left Column: Symptom Selection */}
                <div className="glass-panel" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header">
                        <span className="badge lime">Select Symptoms</span>
                        <Stethoscope size={20} className="text-muted" />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>What are you feeling?</h3>
                        <div className="search-box" style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#f3f4f6',
                            padding: '0.75rem 1rem',
                            borderRadius: '16px',
                            marginBottom: '1.5rem'
                        }}>
                            <Search size={20} className="text-muted" style={{ marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Search symptoms (e.g., headache)"
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    width: '100%',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Common Symptoms</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {commonSymptoms.map(symptom => (
                                <button
                                    key={symptom}
                                    onClick={() => toggleSymptom(symptom)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        border: selectedSymptoms.includes(symptom) ? '2px solid #84cc16' : '2px solid transparent',
                                        background: selectedSymptoms.includes(symptom) ? '#ecfccb' : '#f3f4f6',
                                        color: selectedSymptoms.includes(symptom) ? '#365314' : 'var(--text-main)',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {symptom}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            padding: '1rem',
                            background: '#f9fafb',
                            borderRadius: '16px'
                        }}>
                            <span className="text-muted">{selectedSymptoms.length} symptoms selected</span>
                            <button
                                onClick={() => setSelectedSymptoms([])}
                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Clear all
                            </button>
                        </div>
                        <button
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                            onClick={handleAnalyze}
                            disabled={selectedSymptoms.length === 0 || isAnalyzing}
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
                        </button>
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className="glass-panel" style={{ background: showResults ? 'white' : '#f9fafb', position: 'relative', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        {!showResults && !isAnalyzing && (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    padding: '2rem'
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: '#e5e7eb',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    <Activity size={40} className="text-muted" />
                                </div>
                                <h3>No Analysis Yet</h3>
                                <p className="text-muted">Select symptoms and click analyze to get a preliminary health assessment.</p>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div className="pulse-anim" style={{
                                    width: '60px',
                                    height: '60px',
                                    border: '4px solid #84cc16',
                                    borderRadius: '50%',
                                    borderTopColor: 'transparent',
                                    animation: 'spin 1s linear infinite'
                                }}></div>
                                <h4 style={{ marginTop: '1.5rem' }}>Processing symptoms...</h4>
                            </motion.div>
                        )}

                        {showResults && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <div className="card-header">
                                    <span className="badge lime">Analysis Results</span>
                                    <AlertCircle size={20} className="text-muted" />
                                </div>

                                <div style={{
                                    background: '#f0fdf4',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    marginBottom: '1.5rem',
                                    border: '1px solid #dcfce7'
                                }}>
                                    <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>Potential Viral Infection</h3>
                                    <p style={{ color: '#15803d', fontSize: '0.875rem' }}>
                                        Based on your symptoms (Fever, Fatigue), this matches common viral patterns.
                                    </p>
                                </div>

                                <h4 style={{ marginBottom: '1rem' }}>Recommended Actions</h4>
                                <div className="checklist" style={{ gap: '0.75rem' }}>
                                    <div className="check-item">
                                        <CheckCircle size={20} color="#16a34a" />
                                        <div className="check-info">
                                            <h4>Rest and Hydrate</h4>
                                            <span>Drink plenty of water and get sleep.</span>
                                        </div>
                                    </div>
                                    <div className="check-item">
                                        <CheckCircle size={20} color="#16a34a" />
                                        <div className="check-info">
                                            <h4>Monitor Temperature</h4>
                                            <span>Check fever every 4-6 hours.</span>
                                        </div>
                                    </div>
                                    <div className="check-item">
                                        <AlertCircle size={20} color="#ca8a04" />
                                        <div className="check-info">
                                            <h4>Consult a Doctor</h4>
                                            <span>If symptoms persist for > 3 days.</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                        Book Teleconsultation
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default SymptomChecker;
