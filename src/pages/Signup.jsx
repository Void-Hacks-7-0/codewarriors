import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, User, Mail, Lock, ArrowRight, Ruler, Weight, Calendar } from 'lucide-react';
import '../layouts/AuthLayout.css';

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate signup with extra data
        navigate('/');
    };

    return (
        <div>
            <div className="auth-header">
                <div className="auth-logo">
                    <HeartPulse size={32} strokeWidth={2.5} />
                </div>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Start your journey to better health</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <User size={18} className="text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="John Doe"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={16} className="text-muted" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="number"
                                className="form-input"
                                placeholder="25"
                                style={{ paddingLeft: '2rem', width: '100%' }}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Height (cm)</label>
                        <div style={{ position: 'relative' }}>
                            <Ruler size={16} className="text-muted" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="number"
                                className="form-input"
                                placeholder="175"
                                style={{ paddingLeft: '2rem', width: '100%' }}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Weight (kg)</label>
                        <div style={{ position: 'relative' }}>
                            <Weight size={16} className="text-muted" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="number"
                                className="form-input"
                                placeholder="70"
                                style={{ paddingLeft: '2rem', width: '100%' }}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} className="text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} className="text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Create a password"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem', marginTop: '0.5rem' }}>
                    Create Account <ArrowRight size={18} />
                </button>
            </form>

            <div className="auth-footer">
                Already have an account?
                <Link to="/login" className="auth-link">Sign In</Link>
            </div>
        </div>
    );
};

export default Signup;
