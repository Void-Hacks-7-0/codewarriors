import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const SleepAnalysis = () => {
    const sleepData = [
        { time: '22:00', depth: 10 },
        { time: '23:00', depth: 30 },
        { time: '00:00', depth: 80 },
        { time: '01:00', depth: 60 },
        { time: '02:00', depth: 90 },
        { time: '03:00', depth: 85 },
        { time: '04:00', depth: 50 },
        { time: '05:00', depth: 70 },
        { time: '06:00', depth: 20 },
        { time: '07:00', depth: 0 },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Sleep <br /> <span style={{ fontWeight: 300 }}>Analysis</span></h1>
                </div>
                <div className="header-actions">
                    <div className="date-picker">
                        <Calendar size={16} />
                        <span>Last Night</span>
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
                            <span className="badge lime">Sleep Cycles</span>
                            <Moon size={20} className="text-muted" />
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sleepData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: '#f3f4f6' }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar
                                        name="Sleep Depth (Higher = Deeper)"
                                        dataKey="depth"
                                        fill="#6366f1"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card-header">
                            <h3>Sleep <br />Score</h3>
                            <Clock size={20} className="text-muted" />
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="circle-outer" style={{ width: '120px', height: '120px', background: 'conic-gradient(#6366f1 85%, #f3f4f6 0)' }}>
                                <div className="circle-inner" style={{ width: '100px', height: '100px', fontSize: '2rem', fontWeight: 'bold' }}>
                                    85
                                </div>
                            </div>
                            <span className="text-muted" style={{ marginTop: '1rem' }}>Excellent Sleep</span>
                        </div>

                        <div className="vital-row">
                            <span className="label">Total Sleep</span>
                            <h3>7h 45m</h3>
                        </div>
                        <div className="vital-row">
                            <span className="label">Deep Sleep</span>
                            <h3>2h 15m</h3>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SleepAnalysis;
