import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, Mic, MicOff, Video, VideoOff, MessageSquare, User } from 'lucide-react';
import '../styles/gamify.css';

const VirtualDoctor = () => {
    const [status, setStatus] = useState('connecting'); // connecting, connected, ended
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [doctorName, setDoctorName] = useState('Dr. Sarah Jenkins');

    useEffect(() => {
        // Simulate connection delay
        const timer = setTimeout(() => {
            setStatus('connected');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleEndCall = () => {
        setStatus('ended');
        // In a real app, navigate back after a delay
    };

    return (
        <div className="dashboard-container" style={{ height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
            <div className="glass-panel" style={{
                height: '100%',
                padding: 0,
                overflow: 'hidden',
                position: 'relative',
                background: '#1f2937', // Dark background for video call
                display: 'flex',
                flexDirection: 'column'
            }}>

                {/* Main Video Area (Doctor) */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {status === 'connecting' && (
                        <div style={{ textAlign: 'center', color: 'white' }}>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    background: '#84cc16',
                                    borderRadius: '50%',
                                    margin: '0 auto 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Video size={32} color="white" />
                            </motion.div>
                            <h3>Connecting to {doctorName}...</h3>
                        </div>
                    )}

                    {status === 'connected' && (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            {/* Placeholder for Doctor Video Stream */}
                            <img
                                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Doctor"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '2rem',
                                left: '2rem',
                                background: 'rgba(0,0,0,0.6)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <div style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%' }}></div>
                                {doctorName}
                            </div>
                        </div>
                    )}

                    {status === 'ended' && (
                        <div style={{ textAlign: 'center', color: 'white' }}>
                            <h2>Call Ended</h2>
                            <p>Duration: 12:45</p>
                        </div>
                    )}
                </div>

                {/* Self View (PIP) */}
                {status === 'connected' && (
                    <div style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '20px',
                        width: '160px',
                        height: '120px',
                        background: '#374151',
                        borderRadius: '12px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={48} color="#9ca3af" />
                    </div>
                )}

                {/* Controls Bar */}
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem'
                }}>
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 'none',
                            background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    <button
                        onClick={handleEndCall}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '20px',
                            border: 'none',
                            background: '#ef4444',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <PhoneOff size={32} />
                    </button>

                    <button
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 'none',
                            background: isVideoOff ? '#ef4444' : 'rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VirtualDoctor;
