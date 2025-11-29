import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, AlertCircle, Search } from 'lucide-react';
import { getDiseases } from '../../services/symptomService';
import '../../styles/gamify.css'; // Reuse glassmorphism styles

const SymptomList = () => {
    const navigate = useNavigate();
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDiseases = async () => {
            const data = await getDiseases();
            setDiseases(data);
            setLoading(false);
        };
        fetchDiseases();
    }, []);

    const filteredDiseases = diseases.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.short_description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Symptom <br /> <span style={{ fontWeight: 300 }}>Checker</span></h1>
                </div>
            </header>

            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f3f4f6', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                    <Search size={20} className="text-muted" />
                    <input
                        type="text"
                        placeholder="Search for a condition..."
                        style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '1rem', outline: 'none' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="rewards-grid">
                {loading ? (
                    <p>Loading conditions...</p>
                ) : (
                    filteredDiseases.map((disease) => (
                        <motion.div
                            key={disease.id}
                            className="reward-card clickable-card"
                            whileHover={{ y: -5 }}
                            onClick={() => navigate(`/symptoms/${disease.id}`, { state: { disease } })}
                        >
                            <div className="card-header">
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#eff6ff',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#3b82f6'
                                }}>
                                    <Activity size={24} />
                                </div>
                                <span className={`badge ${disease.risk_level === 'High' ? 'red' : 'lime'}`}>
                                    {disease.risk_level} Risk
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{disease.name}</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                                {disease.short_description}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', fontWeight: '600', fontSize: '0.9rem' }}>
                                Check Symptoms <ChevronRight size={16} />
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff7ed', borderRadius: '12px', border: '1px solid #fdba74', display: 'flex', gap: '1rem' }}>
                <AlertCircle size={24} color="#ea580c" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.9rem', color: '#9a3412', margin: 0 }}>
                    <strong>Disclaimer:</strong> This tool is for educational and screening purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
            </div>
        </div>
    );
};

export default SymptomList;
