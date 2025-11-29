import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertTriangle, CheckCircle, Clock, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationFab = () => {
    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        {
            id: 1,
            type: 'critical',
            title: 'High Glucose',
            message: '180 mg/dL - Above target',
            time: '10m ago',
            icon: AlertTriangle,
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Medication',
            message: 'Take Metformin (500mg)',
            time: '1h ago',
            icon: Clock,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            id: 3,
            type: 'success',
            title: 'Goal Reached',
            message: '10,000 steps achieved!',
            time: '3h ago',
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50'
        }
    ];

    return (
        <>
            {/* Notification FAB - Positioned to the left of Chat FAB */}
            <motion.button
                className="notif-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '7rem', // 2rem (chat) + 60px (chat width) + 1rem (gap) approx
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'white',
                    color: '#4b5563',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                {isOpen ? <X size={24} /> : (
                    <div style={{ position: 'relative' }}>
                        <Bell size={24} />
                        <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
                    </div>
                )}
            </motion.button>

            {/* Notification Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            bottom: '7rem',
                            right: '7rem',
                            width: '320px',
                            maxHeight: '500px',
                            background: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 1000,
                            border: '1px solid #f3f4f6'
                        }}
                    >
                        <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Notifications</h3>
                            <Link to="/notifications" onClick={() => setIsOpen(false)} style={{ fontSize: '0.8rem', color: '#84cc16', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div style={{ padding: '0.5rem', overflowY: 'auto' }}>
                            {notifications.map(notif => (
                                <div key={notif.id} style={{ padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'start', borderBottom: '1px solid #f9fafb' }}>
                                    <div style={{ padding: '6px', borderRadius: '8px', background: notif.bg === 'bg-red-50' ? '#fef2f2' : notif.bg === 'bg-blue-50' ? '#eff6ff' : '#f0fdf4', color: notif.color === 'text-red-500' ? '#ef4444' : notif.color === 'text-blue-500' ? '#3b82f6' : '#22c55e' }}>
                                        <notif.icon size={16} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>{notif.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>{notif.message}</p>
                                        <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px', display: 'block' }}>{notif.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NotificationFab;
