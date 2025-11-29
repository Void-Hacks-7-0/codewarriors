import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const DiabetesRisk = () => {
    const glucoseData = [
        { day: 'Mon', level: 95 },
        { day: 'Tue', level: 98 },
        { day: 'Wed', level: 92 },
        { day: 'Thu', level: 105 },
        { day: 'Fri', level: 96 },
        { day: 'Sat', level: 94 },
        { day: 'Sun', level: 97 },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Diabetes <br /> <span style={{ fontWeight: 300 }}>Risk Assessment</span></h1>
                </div>
                <div className="header-actions">
                    <div className="date-picker">
                        <Calendar size={16} />
                        <span>Last 7 Days</span>
                    </div>
                </div>
            </header>

            <motion.div
                className="dashboard-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="col-1" style={{ gridColumn: 'span 2' }}>
                    <div className="glass-panel">
                        <div className="card-header">
                            <span className="badge lime">Glucose Levels (mg/dL)</span>
                            <Droplets size={20} className="text-muted" />
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={glucoseData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: '#f3f4f6' }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar
                                        name="Glucose Level (Normal < 100)"
                                        dataKey="level"
                                        fill="#16a34a"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="glass-panel card-diabetes" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="card-header">
                            <h3>Risk <br />Score</h3>
                            <AlertTriangle size={20} className="text-muted" />
                        </div>

                        <div className="diabetes-content" style={{ flex: 1, justifyContent: 'center' }}>
                            <div className="risk-score">
                                <span className="score-val">12%</span>
                                <span className="score-label">Low Risk</span>
                            </div>
                            <p className="text-muted text-sm" style={{ marginTop: '1rem' }}>
                                Your glucose levels are within the healthy range.
                            </p>
                        </div>

                        <div className="checklist">
                            <div className="check-item">
                                <CheckCircle size={20} color="#16a34a" />
                                <div className="check-info">
                                    <h4>Healthy Diet</h4>
                                    <span>Maintained</span>
                                </div>
                            </div>
                            <div className="check-item">
                                <CheckCircle size={20} color="#16a34a" />
                                <div className="check-info">
                                    <h4>Regular Exercise</h4>
                                    <span>On Track</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DiabetesRisk;
