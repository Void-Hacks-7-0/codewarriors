import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Info, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Use shared dashboard styles

const NotificationsPage = () => {
    const notifications = [
        {
            id: 1,
            type: 'critical',
            title: 'High Glucose Level Detected',
            message: 'Your recent reading of 180 mg/dL is above your target range.',
            time: '10 mins ago',
            icon: AlertTriangle,
            color: '#ef4444',
            bg: '#fef2f2',
            border: '#fee2e2'
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Medication Reminder',
            message: 'Time to take your Metformin (500mg).',
            time: '1 hour ago',
            icon: Clock,
            color: '#3b82f6',
            bg: '#eff6ff',
            border: '#dbeafe'
        },
        {
            id: 3,
            type: 'success',
            title: 'Daily Goal Achieved',
            message: 'Congratulations! You reached your 10,000 steps goal.',
            time: '3 hours ago',
            icon: CheckCircle,
            color: '#22c55e',
            bg: '#f0fdf4',
            border: '#dcfce7'
        },
        {
            id: 4,
            type: 'info',
            title: 'Weekly Health Report',
            message: 'Your weekly analysis is ready to view.',
            time: 'Yesterday',
            icon: Info,
            color: '#a855f7',
            bg: '#faf5ff',
            border: '#f3e8ff'
        }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                        <ChevronLeft size={28} />
                    </Link>
                    <div>
                        <h1 className="page-title">Notifications</h1>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Stay updated with your health alerts</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn-primary" style={{ background: 'white', color: 'var(--text-main)', border: '1px solid #e5e7eb' }}>
                        Mark all as read
                    </button>
                </div>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {notifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel"
                            style={{
                                padding: '1.25rem',
                                display: 'flex',
                                alignItems: 'start',
                                gap: '1rem',
                                borderLeft: `4px solid ${notification.color}`,
                                cursor: 'pointer'
                            }}
                            whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: notification.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: notification.color,
                                flexShrink: 0
                            }}>
                                <notification.icon size={24} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{notification.title}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{notification.time}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>{notification.message}</p>
                            </div>

                            {index === 0 && (
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', marginTop: '0.5rem' }}></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}>
                        View earlier notifications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
