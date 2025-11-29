import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Calendar, Clock, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css'; // Reusing dashboard styles for consistency

const StressMonitor = () => {
    const stressData = [
        { time: 'Mon', level: 30 },
        { time: 'Tue', level: 45 },
        { time: 'Wed', level: 25 },
        { time: 'Thu', level: 60 },
        { time: 'Fri', level: 35 },
        { time: 'Sat', level: 20 },
        { time: 'Sun', level: 15 },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Stress <br /> <span style={{ fontWeight: 300 }}>Monitor</span></h1>
                </div>
                <div className="header-actions">
                    <div className="date-picker">
                        <Calendar size={16} />
                        <span>This Week</span>
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
                            <span className="badge lime">Weekly Stress Trend</span>
                            <Zap size={20} className="text-muted" />
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stressData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: '#f3f4f6' }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar
                                        name="Stress Level (Lower is Better)"
                                        dataKey="level"
                                        fill="#84cc16"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="glass-panel card-stress" style={{ height: '100%' }}>
                        <div className="card-header">
                            <h3>Current <br />Status</h3>
                            <Activity size={20} className="text-muted" />
                        </div>
                        <div className="stress-meter" style={{ flex: 1, justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <span style={{ fontSize: '4rem', fontWeight: '800', color: '#84cc16' }}>Low</span>
                                <p className="text-muted">You are feeling relaxed.</p>
                            </div>
                            <div className="stress-bar">
                                <div className="stress-fill" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <button className="btn-primary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                            Start Breathing Exercise
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StressMonitor;
