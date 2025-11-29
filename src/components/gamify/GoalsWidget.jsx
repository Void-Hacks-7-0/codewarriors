import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Check, Moon, Droplets, Zap } from 'lucide-react';
import '../../pages/Dashboard.css';

const GoalsWidget = () => {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([
        {
            id: 1,
            text: 'Sleep 7+ Hours',
            subtext: 'Rest & Recovery',
            completed: true,
            icon: Moon,
            color: '#6366f1', // Indigo
            bg: '#e0e7ff'
        },
        {
            id: 2,
            text: 'Drink 2L Water',
            subtext: 'Hydration',
            completed: false,
            icon: Droplets,
            color: '#3b82f6', // Blue
            bg: '#dbeafe'
        },
        {
            id: 3,
            text: 'Walk 5,000 Steps',
            subtext: 'Activity',
            completed: false,
            icon: Zap,
            color: '#f97316', // Orange
            bg: '#ffedd5'
        },
    ]);

    const toggleGoal = (e, id) => {
        e.stopPropagation();
        setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const completedCount = goals.filter(g => g.completed).length;
    const progress = Math.round((completedCount / goals.length) * 100);

    return (
        <motion.div
            className="glass-panel card-progress clickable-card"
            onClick={() => navigate('/gamify')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <div className="card-header">
                <div>
                    <span className="badge lime">Daily Goals</span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem', lineHeight: 1.2 }}>Keep it up! <br /> <span className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 400 }}>You're doing great.</span></h3>
                </div>
                <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #ecfccb, #bef264)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(132, 204, 22, 0.2)'
                }}>
                    <Trophy size={24} color="#4d7c0f" />
                </div>
            </div>

            <div className="checklist" style={{ flex: 1, gap: '0.75rem' }}>
                {goals.map(goal => (
                    <motion.div
                        key={goal.id}
                        className="check-item"
                        onClick={(e) => toggleGoal(e, goal.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            cursor: 'pointer',
                            background: goal.completed ? '#f9fafb' : 'white',
                            border: `1px solid ${goal.completed ? 'transparent' : '#f3f4f6'}`,
                            boxShadow: goal.completed ? 'none' : '0 4px 12px rgba(0,0,0,0.03)',
                            opacity: goal.completed ? 0.7 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        {/* Icon Box */}
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: goal.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: goal.color
                        }}>
                            <goal.icon size={18} />
                        </div>

                        {/* Text */}
                        <div className="check-info" style={{ flex: 1 }}>
                            <h4 style={{
                                textDecoration: goal.completed ? 'line-through' : 'none',
                                color: goal.completed ? 'var(--text-muted)' : 'var(--text-main)',
                                fontSize: '0.9rem'
                            }}>
                                {goal.text}
                            </h4>
                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{goal.subtext}</span>
                        </div>

                        {/* Checkbox */}
                        <div className={`check-box ${goal.completed ? 'checked' : ''}`} style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%', // Circular checkbox
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: goal.completed ? 'none' : '2px solid #e5e7eb',
                            background: goal.completed ? '#84cc16' : 'transparent'
                        }}>
                            {goal.completed && <Check size={14} color="white" strokeWidth={3} />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="stress-meter" style={{ marginTop: '1.5rem' }}>
                <div className="stress-info" style={{ marginBottom: '0.5rem' }}>
                    <span className="text-sm font-bold text-gray-700">Progress</span>
                    <span className="badge" style={{ background: '#ecfccb', color: '#4d7c0f' }}>{progress}%</span>
                </div>
                <div className="stress-bar" style={{ height: '10px', background: '#f3f4f6' }}>
                    <motion.div
                        className="stress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            background: 'linear-gradient(90deg, #84cc16, #22c55e)',
                            borderRadius: '5px'
                        }}
                    ></motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default GoalsWidget;
