import React from 'react';
import { User, Mail, Calendar, Ruler, Weight, Activity, Edit2, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">My <br /> <span style={{ fontWeight: 300 }}>Profile</span></h1>
                </div>
                <button className="btn-primary">
                    <Edit2 size={18} /> Edit Profile
                </button>
            </header>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 350px' }}>
                {/* Main Profile Info */}
                <div className="col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Profile Header Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel"
                        style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '3rem' }}
                    >
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #84cc16, #16a34a)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'white',
                            boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)'
                        }}>
                            AS
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Anshika</h2>
                            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Premium Member</p>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                                    <MapPin size={16} /> Indore, India
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                                    <Activity size={16} /> Joined Nov 2025
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Personal Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-panel"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '12px', color: '#3b82f6' }}>
                                    <Calendar size={24} />
                                </div>
                                <span className="text-muted">Age</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>25 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>years</span></h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-panel"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '12px', color: '#16a34a' }}>
                                    <Ruler size={24} />
                                </div>
                                <span className="text-muted">Height</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>175 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>cm</span></h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-panel"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '10px', background: '#fef2f2', borderRadius: '12px', color: '#ef4444' }}>
                                    <Weight size={24} />
                                </div>
                                <span className="text-muted">Weight</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>70 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>kg</span></h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-panel"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '10px', background: '#fff7ed', borderRadius: '12px', color: '#f97316' }}>
                                    <Activity size={24} />
                                </div>
                                <span className="text-muted">BMI</span>
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>22.9 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#9ca3af' }}>Normal</span></h3>
                        </motion.div>
                    </div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-panel"
                    >
                        <h3 style={{ marginBottom: '1.5rem' }}>Contact Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="text-muted" style={{ fontSize: '0.875rem' }}>Email Address</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                                    <Mail size={20} className="text-muted" />
                                    anshika@gmail.com
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="text-muted" style={{ fontSize: '0.875rem' }}>Phone Number</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                                    <Phone size={20} className="text-muted" />
                                    +91 9589245601
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Sidebar / Extra Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-panel"
                    >
                        <h3 style={{ marginBottom: '1rem' }}>Achievements</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '12px' }}>
                                <div style={{ width: '40px', height: '40px', background: '#ecfccb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏆</div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', margin: 0 }}>Early Bird</h4>
                                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Completed 5 morning workouts</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '12px' }}>
                                <div style={{ width: '40px', height: '40px', background: '#ecfccb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔥</div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', margin: 0 }}>Streak Master</h4>
                                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>7 day activity streak</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
