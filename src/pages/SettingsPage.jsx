import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Eye, Moon, Globe, Shield, Smartphone, LogOut } from 'lucide-react';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [publicProfile, setPublicProfile] = useState(false);

    const Toggle = ({ checked, onChange }) => (
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '48px',
                height: '24px',
                background: checked ? '#84cc16' : '#e5e7eb',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.2s'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: checked ? '26px' : '2px',
                transition: 'left 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
        </div>
    );

    const SettingSection = ({ title, icon: Icon, children }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{ marginBottom: '1.5rem' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                <Icon size={20} className="text-muted" />
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{title}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {children}
            </div>
        </motion.div>
    );

    const SettingItem = ({ title, desc, action }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.25rem 0' }}>{title}</h4>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{desc}</p>
            </div>
            {action}
        </div>
    );

    return (
        <div className="dashboard-container" style={{ maxWidth: '800px' }}>
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                </div>
            </header>

            <SettingSection title="Notifications" icon={Bell}>
                <SettingItem
                    title="Push Notifications"
                    desc="Receive daily health updates and reminders"
                    action={<Toggle checked={notifications} onChange={setNotifications} />}
                />
                <SettingItem
                    title="Email Alerts"
                    desc="Get weekly reports sent to your email"
                    action={<Toggle checked={emailAlerts} onChange={setEmailAlerts} />}
                />
            </SettingSection>

            <SettingSection title="Appearance" icon={Moon}>
                <SettingItem
                    title="Dark Mode"
                    desc="Switch to dark theme (Coming Soon)"
                    action={<Toggle checked={darkMode} onChange={setDarkMode} />}
                />
            </SettingSection>

            <SettingSection title="Privacy & Security" icon={Shield}>
                <SettingItem
                    title="Public Profile"
                    desc="Allow others to see your achievements"
                    action={<Toggle checked={publicProfile} onChange={setPublicProfile} />}
                />
                <SettingItem
                    title="Change Password"
                    desc="Update your account password"
                    action={<button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Update</button>}
                />
                <SettingItem
                    title="Two-Factor Authentication"
                    desc="Add an extra layer of security"
                    action={<button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#f3f4f6', color: '#374151' }}>Enable</button>}
                />
            </SettingSection>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    background: '#fef2f2',
                    color: '#ef4444',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    <LogOut size={20} /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
