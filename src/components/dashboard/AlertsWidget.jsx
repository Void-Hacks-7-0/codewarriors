import React, { useState } from 'react';
import { AlertTriangle, Clock, ChevronRight, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../pages/Dashboard.css';

const AlertsWidget = () => {
    const [activeTab, setActiveTab] = useState('All');

    const alerts = [
        {
            id: 1,
            type: 'Critical',
            title: 'High Glucose',
            message: '180 mg/dL - 10m ago',
            icon: AlertTriangle,
            color: 'text-red-500',
            bg: 'bg-red-50',
            border: 'border-red-100'
        },
        {
            id: 2,
            type: 'Reminders',
            title: 'Medication',
            message: 'Metformin - 1h ago',
            icon: Clock,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            border: 'border-blue-100'
        },
        {
            id: 3,
            type: 'Info',
            title: 'Goal Reached',
            message: '10k Steps - 3h ago',
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50',
            border: 'border-green-100'
        }
    ];

    const filteredAlerts = activeTab === 'All'
        ? alerts
        : alerts.filter(alert => alert.type === activeTab);

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
                <span className="badge lime">Recent Alerts</span>
                <Link to="/notifications" className="text-lime-600 hover:text-lime-700">
                    <ChevronRight size={20} />
                </Link>
            </div>

            {/* Segmented Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl flex mb-4">
                {['All', 'Critical', 'Reminders'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map(alert => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`flex items-start gap-3 p-3 rounded-xl border ${alert.border} ${alert.bg}`}
                            >
                                <div className={`p-1.5 bg-white rounded-lg shadow-sm ${alert.color}`}>
                                    <alert.icon size={16} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">{alert.title}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-gray-400 text-sm"
                        >
                            No alerts found.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AlertsWidget;
