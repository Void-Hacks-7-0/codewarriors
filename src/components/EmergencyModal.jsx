import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Activity, Share2, AlertOctagon, X, Check } from 'lucide-react';

const EmergencyModal = ({ isOpen, onClose }) => {
    const [sharingStatus, setSharingStatus] = useState('idle'); // idle, sending, sent

    const handleShare = () => {
        setSharingStatus('sending');
        setTimeout(() => {
            setSharingStatus('sent');
        }, 2000);
    };

    const contacts = [
        { name: 'Dr. Smith', role: 'Cardiologist', phone: '555-0123' },
        { name: 'Mom', role: 'Emergency Contact', phone: '555-0987' }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '24px',
                        width: '90%',
                        maxWidth: '450px',
                        boxShadow: '0 20px 60px rgba(220, 38, 38, 0.2)',
                        border: '1px solid #fee2e2'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-xl text-red-600">
                                <AlertOctagon size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Emergency Access</h2>
                                <p className="text-sm text-gray-500">Immediate Escalation & Sharing</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Quick Call Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Call Contacts</h3>
                            <div className="grid gap-3">
                                {contacts.map((contact, idx) => (
                                    <a
                                        key={idx}
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all group no-underline"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-white group-hover:text-red-500 transition-colors">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                                                <span className="text-xs text-gray-500">{contact.role}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-red-600 bg-white px-3 py-1 rounded-full border border-red-100 shadow-sm">
                                            Call
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Share Vitals Section */}
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Critical Data Sharing</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Instantly share your current location, heart rate (89 BPM), and glucose levels with trusted contacts.
                            </p>

                            <button
                                onClick={handleShare}
                                disabled={sharingStatus !== 'idle'}
                                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${sharingStatus === 'sent'
                                        ? 'bg-green-500 text-white'
                                        : sharingStatus === 'sending'
                                            ? 'bg-gray-200 text-gray-500 cursor-wait'
                                            : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200'
                                    }`}
                            >
                                {sharingStatus === 'idle' && (
                                    <>
                                        <Share2 size={20} /> Share Vitals & Location
                                    </>
                                )}
                                {sharingStatus === 'sending' && (
                                    <>
                                        <Activity size={20} className="animate-spin" /> Sending Data...
                                    </>
                                )}
                                {sharingStatus === 'sent' && (
                                    <>
                                        <Check size={20} /> Alert Sent Successfully
                                    </>
                                )}
                            </button>

                            {sharingStatus === 'sent' && (
                                <p className="text-xs text-center text-green-600 mt-2 font-medium">
                                    Location: 40.7128° N, 74.0060° W • Vitals Attached
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EmergencyModal;
