import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Activity,
    Moon,
    FileText,
    Settings,
    LogOut,
    HeartPulse,
    Droplets,
    Zap,
    Stethoscope,
    Trophy,
    User,
    Video,
    Bell,
    AlertOctagon
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ onEmergencyClick }) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Stethoscope, label: 'Symptom Checker', path: '/symptoms' },
        { icon: Video, label: 'Virtual Doctor', path: '/doctor' },
        { icon: Zap, label: 'Stress Monitor', path: '/stress' },
        { icon: Moon, label: 'Sleep Analysis', path: '/sleep' },
        { icon: Droplets, label: 'Diabetes Risk', path: '/diabetes' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Trophy, label: 'Rewards & Goals', path: '/gamify' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="sidebar">
            <div className="logo-icon">
                <HeartPulse size={28} strokeWidth={2.5} />
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        title={item.label}
                    >
                        <item.icon size={22} strokeWidth={2} />
                        {item.label === 'Notifications' && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button
                    onClick={onEmergencyClick}
                    className="nav-item"
                    title="Emergency SOS"
                    style={{ color: '#ef4444', background: '#fef2f2', border: '1px solid #fee2e2' }}
                >
                    <AlertOctagon size={22} />
                </button>
                <Link to="/settings" className="nav-item" title="Settings">
                    <Settings size={22} />
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
