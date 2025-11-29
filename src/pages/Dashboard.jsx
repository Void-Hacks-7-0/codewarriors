import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Activity,
    Moon,
    Heart,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Zap,
    Wind,
    Flame,
    Droplets,
    MoreHorizontal,
    Calendar,
    Clock,
    ChevronRight,
    FileText
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import GoalsWidget from '../components/gamify/GoalsWidget';
import AlertsWidget from '../components/dashboard/AlertsWidget';
import './Dashboard.css';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Tracker');
    const [timeRange, setTimeRange] = useState('Weekly'); // 'Daily', 'Weekly', 'Monthly'
    const [waterIntake, setWaterIntake] = useState(1250);
    const [waterGoal, setWaterGoal] = useState(2500);

    // Mock Data - Daily
    const trackerDataDaily = [
        { name: '6 AM', steps: 0, calories: 0 },
        { name: '9 AM', steps: 1200, calories: 400 },
        { name: '12 PM', steps: 3500, calories: 1100 },
        { name: '3 PM', steps: 2800, calories: 950 },
        { name: '6 PM', steps: 4200, calories: 1500 },
        { name: '9 PM', steps: 1500, calories: 600 },
    ];

    const medicalDataDaily = [
        { name: '8 AM', systolic: 118, diastolic: 78 },
        { name: '12 PM', systolic: 120, diastolic: 80 },
        { name: '4 PM', systolic: 122, diastolic: 81 },
        { name: '8 PM', systolic: 119, diastolic: 79 },
    ];

    const fitnessDataDaily = [
        { name: 'Morning', run: 5, cycle: 0 },
        { name: 'Evening', run: 0, cycle: 10 },
    ];

    // Mock Data - Weekly
    const trackerDataWeekly = [
        { name: 'Mon', steps: 4000, calories: 2400 },
        { name: 'Tue', steps: 3000, calories: 1398 },
        { name: 'Wed', steps: 2000, calories: 9800 },
        { name: 'Thu', steps: 2780, calories: 3908 },
        { name: 'Fri', steps: 1890, calories: 4800 },
        { name: 'Sat', steps: 2390, calories: 3800 },
        { name: 'Sun', steps: 3490, calories: 4300 },
    ];

    const medicalDataWeekly = [
        { name: 'Mon', systolic: 120, diastolic: 80 },
        { name: 'Tue', systolic: 118, diastolic: 79 },
        { name: 'Wed', systolic: 122, diastolic: 82 },
        { name: 'Thu', systolic: 119, diastolic: 80 },
        { name: 'Fri', systolic: 121, diastolic: 81 },
        { name: 'Sat', systolic: 120, diastolic: 79 },
        { name: 'Sun', systolic: 118, diastolic: 78 },
    ];

    const fitnessDataWeekly = [
        { name: 'Mon', run: 5, cycle: 10 },
        { name: 'Tue', run: 6, cycle: 0 },
        { name: 'Wed', run: 4, cycle: 15 },
        { name: 'Thu', run: 7, cycle: 5 },
        { name: 'Fri', run: 5, cycle: 12 },
        { name: 'Sat', run: 10, cycle: 20 },
        { name: 'Sun', run: 8, cycle: 15 },
    ];

    // Mock Data - Monthly
    const trackerDataMonthly = [
        { name: 'Week 1', steps: 28000, calories: 16800 },
        { name: 'Week 2', steps: 32000, calories: 19200 },
        { name: 'Week 3', steps: 30500, calories: 18300 },
        { name: 'Week 4', steps: 35000, calories: 21000 },
    ];

    const medicalDataMonthly = [
        { name: 'Week 1', systolic: 120, diastolic: 80 },
        { name: 'Week 2', systolic: 118, diastolic: 78 },
        { name: 'Week 3', systolic: 122, diastolic: 82 },
        { name: 'Week 4', systolic: 119, diastolic: 79 },
    ];

    const fitnessDataMonthly = [
        { name: 'Week 1', run: 35, cycle: 60 },
        { name: 'Week 2', run: 42, cycle: 45 },
        { name: 'Week 3', run: 38, cycle: 70 },
        { name: 'Week 4', run: 45, cycle: 55 },
    ];

    const reports = [
        { id: 1, title: 'General Checkup', date: 'Sep 05', type: 'PDF' },
        { id: 2, title: 'Blood Test Results', date: 'Aug 28', type: 'PDF' },
        { id: 3, title: 'Cardiology Report', date: 'Aug 15', type: 'DOC' },
    ];

    const toggleTimeRange = () => {
        setTimeRange(prev => {
            if (prev === 'Daily') return 'Weekly';
            if (prev === 'Weekly') return 'Monthly';
            return 'Daily';
        });
    };

    const getDateLabel = () => {
        switch (timeRange) {
            case 'Daily': return 'Today, Sep 09';
            case 'Weekly': return 'Sep 02 - Sep 09';
            case 'Monthly': return 'September 2023';
            default: return '';
        }
    };

    const getData = (type) => {
        if (type === 'tracker') {
            if (timeRange === 'Daily') return trackerDataDaily;
            if (timeRange === 'Weekly') return trackerDataWeekly;
            return trackerDataMonthly;
        }
        if (type === 'medical') {
            if (timeRange === 'Daily') return medicalDataDaily;
            if (timeRange === 'Weekly') return medicalDataWeekly;
            return medicalDataMonthly;
        }
        if (type === 'fitness') {
            if (timeRange === 'Daily') return fitnessDataDaily;
            if (timeRange === 'Weekly') return fitnessDataWeekly;
            return fitnessDataMonthly;
        }
    };

    const renderChart = () => {
        const commonProps = {
            margin: { top: 10, right: 10, left: -20, bottom: 0 }
        };

        switch (activeTab) {
            case 'Medical':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getData('medical')} {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar name="High Pressure" dataKey="systolic" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar name="Low Pressure" dataKey="diastolic" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'Fitness':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getData('fitness')} {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar name="Running (km)" dataKey="run" fill="#84cc16" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar name="Cycling (km)" dataKey="cycle" fill="#111827" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'Tracker':
            default:
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getData('tracker')} {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar name="Steps" dataKey="steps" fill="#84cc16" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    const getSummaryValue = () => {
        if (activeTab === 'Tracker') {
            if (timeRange === 'Daily') return '13,200';
            if (timeRange === 'Weekly') return '4,235';
            return '31,375';
        }
        if (activeTab === 'Medical') return '120/80';
        if (activeTab === 'Fitness') {
            if (timeRange === 'Daily') return '15.0';
            if (timeRange === 'Weekly') return '12.5';
            return '40.0';
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Health Records <br /> <span style={{ fontWeight: 300 }}>Dashboard</span></h1>
                </div>
                <div className="header-actions">
                    <div className="date-picker">
                        <Calendar size={16} />
                        <span>{getDateLabel()}</span>
                    </div>
                    <button className="btn-primary" onClick={toggleTimeRange}>
                        {timeRange} <ChevronRight size={16} style={{ transform: 'rotate(90deg)' }} />
                    </button>
                </div>
            </header>

            <motion.div
                className="dashboard-grid-v2"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* ROW 1: Key Metrics */}

                {/* Wellness */}
                <motion.div variants={item} className="glass-panel card-wellness span-1">
                    <div className="card-header">
                        <span className="badge lime">Wellness</span>
                        <MoreHorizontal size={20} className="text-muted" />
                    </div>
                    <div className="wellness-main">
                        <h2>19,365</h2>
                        <span className="unit">KCAL Totally</span>
                        <span className="badge-trend">+16%</span>
                    </div>
                    <div className="wellness-stats">
                        <div className="stat-row">
                            <div className="stat-label">
                                <Flame size={16} /> Calories
                            </div>
                            <span className="stat-val">265</span>
                        </div>
                        <div className="stat-row">
                            <div className="stat-label">
                                <Activity size={16} /> Workouts
                            </div>
                            <span className="stat-val">8</span>
                        </div>
                    </div>
                </motion.div>

                {/* Vitals */}
                <motion.div variants={item} className="glass-panel card-vitals span-1">
                    <div className="vital-item bg-red-light">
                        <div className="vital-icon-wrapper">
                            <Heart size={24} fill="#ef4444" stroke="none" className="pulse-anim" />
                        </div>
                        <div className="vital-data">
                            <h4>89 <span className="text-sm">BPM</span></h4>
                            <span>Heart Rate</span>
                        </div>
                    </div>
                    <div className="vital-item bg-blue-light">
                        <div className="vital-icon-wrapper">
                            <Activity size={24} color="#3b82f6" />
                        </div>
                        <div className="vital-data">
                            <h4>98 <span className="text-sm">%</span></h4>
                            <span>SpO2</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stress */}
                <Link to="/stress" className="span-1" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                    <motion.div variants={item} className="glass-panel card-stress clickable-card">
                        <div className="card-header">
                            <h3>Stress <br />Analysis</h3>
                            <Zap size={20} className="text-muted" />
                        </div>
                        <div className="stress-chart" style={{ height: '100px', marginTop: 'auto' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                    { time: '10 AM', level: 30 },
                                    { time: '11 AM', level: 45 },
                                    { time: '12 PM', level: 60 },
                                    { time: '1 PM', level: 40 },
                                    { time: '2 PM', level: 25 },
                                    { time: '3 PM', level: 35 },
                                ]}>
                                    <defs>
                                        <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="level" stroke="#84cc16" strokeWidth={2} fillOpacity={1} fill="url(#colorStress)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="stress-info" style={{ marginTop: '1rem' }}>
                            <span className="badge">Low</span>
                            <span className="text-sm text-muted">You are relaxed.</span>
                        </div>
                    </motion.div>
                </Link>

                {/* Diabetes Risk */}
                <Link to="/diabetes" className="span-1" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                    <motion.div variants={item} className="glass-panel card-diabetes clickable-card">
                        <div className="card-header">
                            <span className="badge lime">Diabetes Risk</span>
                            <Droplets size={20} className="text-muted" />
                        </div>
                        <div className="diabetes-content">
                            <div className="risk-score">
                                <span className="score-val">12%</span>
                                <span className="score-label">Low Risk</span>
                            </div>
                            <p className="text-muted text-sm">Keep up the healthy lifestyle!</p>
                        </div>
                    </motion.div>
                </Link>

                {/* ROW 2: Main Analytics & Alerts */}

                {/* Analytics */}
                <motion.div variants={item} className="glass-panel card-analytics span-3">
                    <div className="card-header">
                        <span className="badge lime">Analytics</span>
                        <div className="filter-tabs">
                            {['Tracker', 'Medical', 'Fitness'].map(tab => (
                                <span
                                    key={tab}
                                    className={activeTab === tab ? 'active' : ''}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="analytics-chart-area">
                        <div className="chart-header">
                            <div>
                                <span className="text-muted text-sm">{activeTab} Overview</span>
                                <h3>{getSummaryValue()} <span className="text-sm font-normal">
                                    {activeTab === 'Tracker' ? 'Steps' : activeTab === 'Medical' ? 'mmHg' : 'km Run'}
                                </span></h3>
                            </div>
                            <div className="temp-display">
                                {activeTab === 'Tracker' && <><span className="badge lime">Active</span></>}
                                {activeTab === 'Medical' && <><span className="badge lime">Normal BP</span></>}
                                {activeTab === 'Fitness' && <><span className="badge lime">On Target</span></>}
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeTab}-${timeRange}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    {renderChart()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Alerts */}
                <div className="span-1">
                    <AlertsWidget />
                </div>

                {/* ROW 3: Secondary Widgets */}

                {/* Hydration */}
                <motion.div variants={item} className="glass-panel card-progress span-1">
                    <div className="card-header">
                        <span className="badge lime">Hydration</span>
                        <Droplets size={20} className="text-muted" />
                    </div>

                    <div className="hydration-visual">
                        <div className="water-circle-outer" style={{ '--progress': `${Math.min((waterIntake / waterGoal) * 100, 100)}%` }}>
                            <div className="water-circle-inner">
                                <span className="water-val">{waterIntake}</span>
                                <span className="water-label">ml</span>
                            </div>
                        </div>
                    </div>

                    <div className="hydration-controls">
                        <button className="btn-water" onClick={() => setWaterIntake(prev => prev + 250)}>+250ml</button>
                        <button className="btn-water" onClick={() => setWaterIntake(prev => prev + 500)}>+500ml</button>
                    </div>

                    <div className="goal-editor">
                        <span>Goal:</span>
                        <input
                            type="number"
                            className="goal-input"
                            value={waterGoal}
                            onChange={(e) => setWaterGoal(Number(e.target.value))}
                        />
                        <span>ml</span>
                    </div>
                </motion.div>

                {/* Goals */}
                <div className="span-2">
                    <GoalsWidget />
                </div>

                {/* Reports */}
                <Link to="/reports" className="span-1" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                    <motion.div variants={item} className="glass-panel card-reports clickable-card">
                        <div className="card-header">
                            <span className="badge lime">Health Reports</span>
                            <FileText size={20} className="text-muted" />
                        </div>
                        <div className="reports-list">
                            {reports.map(report => (
                                <div key={report.id} className="report-item">
                                    <div className="report-icon">
                                        <FileText size={18} />
                                    </div>
                                    <div className="report-info">
                                        <h4>{report.title}</h4>
                                        <span>{report.date}</span>
                                    </div>
                                    <span className="report-type">{report.type}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </Link>

            </motion.div>
        </div>
    );
};

export default Dashboard;
