import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Mail, Lock, ArrowRight } from 'lucide-react';
import '../layouts/AuthLayout.css'; // Reusing auth styles

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/');
    };

    return (
        <div>
            <div className="auth-header">
                <div className="auth-logo">
                    <HeartPulse size={32} strokeWidth={2.5} />
                </div>
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to access your health dashboard</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
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
                            placeholder="••••••••"
                            style={{ paddingLeft: '2.5rem', width: '100%' }}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="#" className="auth-link" style={{ fontSize: '0.875rem' }}>Forgot Password?</Link>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem' }}>
                    Sign In <ArrowRight size={18} />
                </button>
            </form>

            <div className="auth-footer">
                Don't have an account?
                <Link to="/signup" className="auth-link">Sign Up</Link>
            </div>
        </div>
    );
};

export default Login;
