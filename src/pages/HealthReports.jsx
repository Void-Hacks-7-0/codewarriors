import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Filter, Pill, Activity, AlertCircle, CheckCircle, Beaker } from 'lucide-react';
import './Dashboard.css';

const HealthReports = () => {
    const [activeTab, setActiveTab] = useState('All');

    const documents = [
        { id: 1, title: 'General Checkup Report', date: 'Sep 05, 2023', type: 'PDF', size: '2.4 MB', doctor: 'Dr. Sarah Smith', category: 'Lab' },
        { id: 2, title: 'Blood Test Results', date: 'Aug 28, 2023', type: 'PDF', size: '1.8 MB', doctor: 'Dr. John Doe', category: 'Lab' },
        { id: 3, title: 'Amoxicillin Prescription', date: 'Aug 28, 2023', type: 'PDF', size: '0.5 MB', doctor: 'Dr. John Doe', category: 'Prescription' },
        { id: 4, title: 'Cardiology Assessment', date: 'Aug 15, 2023', type: 'DOC', size: '4.2 MB', doctor: 'Dr. Emily White', category: 'Lab' },
        { id: 5, title: 'Vitamin D Supplement', date: 'Jul 20, 2023', type: 'JPG', size: '1.1 MB', doctor: 'Dr. Mark Brown', category: 'Prescription' },
    ];

    const labResults = [
        { id: 1, test: 'Hemoglobin', value: '14.5', unit: 'g/dL', range: '13.5 - 17.5', status: 'Normal', date: 'Aug 28' },
        { id: 2, test: 'Total Cholesterol', value: '185', unit: 'mg/dL', range: '< 200', status: 'Normal', date: 'Aug 28' },
        { id: 3, test: 'Vitamin D', value: '22', unit: 'ng/mL', range: '30 - 100', status: 'Low', date: 'Jul 20' },
        { id: 4, test: 'Glucose (Fasting)', value: '98', unit: 'mg/dL', range: '70 - 100', status: 'Normal', date: 'Aug 28' },
    ];

    const medications = [
        { id: 1, name: 'Amoxicillin', dosage: '500mg', freq: '2x Daily', duration: '7 Days', reason: 'Bacterial Infection', status: 'Active' },
        { id: 2, name: 'Vitamin D3', dosage: '1000 IU', freq: '1x Daily', duration: 'Ongoing', reason: 'Deficiency', status: 'Active' },
        { id: 3, name: 'Ibuprofen', dosage: '400mg', freq: 'As needed', duration: '-', reason: 'Pain Relief', status: 'Inactive' },
    ];

    const filteredDocs = activeTab === 'All'
        ? documents
        : documents.filter(doc =>
            activeTab === 'Lab Results' ? doc.category === 'Lab' : doc.category === 'Prescription'
        );

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">Medical <br /> <span style={{ fontWeight: 300 }}>Records</span></h1>
                </div>
                <div className="header-actions">
                    <button className="btn-primary">
                        Upload Record
                    </button>
                </div>
            </header>

            <motion.div
                className="dashboard-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ gridTemplateColumns: '1fr' }}
            >
                <div className="glass-panel">
                    <div className="card-header">
                        <span className="badge lime">Records & Data</span>
                        <div className="filter-tabs">
                            {['All', 'Lab Results', 'Prescriptions'].map(tab => (
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

                    {/* Dynamic Content Area */}
                    <div style={{ minHeight: '400px' }}>

                        {/* Lab Results Specific View */}
                        {activeTab === 'Lab Results' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ marginBottom: '2rem' }}
                            >
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Latest Test Metrics</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                    {labResults.map(result => (
                                        <div key={result.id} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '16px', border: result.status === 'Low' ? '1px solid #fca5a5' : '1px solid transparent' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span className="text-muted" style={{ fontSize: '0.875rem' }}>{result.test}</span>
                                                {result.status === 'Low' && <AlertCircle size={16} color="#ef4444" />}
                                                {result.status === 'Normal' && <CheckCircle size={16} color="#16a34a" />}
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                                                {result.value} <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>{result.unit}</span>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                                Range: {result.range}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Prescriptions Specific View */}
                        {activeTab === 'Prescriptions' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ marginBottom: '2rem' }}
                            >
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Active Medications</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                    {medications.map(med => (
                                        <div key={med.id} style={{ padding: '1.25rem', background: med.status === 'Active' ? '#f0fdf4' : '#f3f4f6', borderRadius: '16px', border: med.status === 'Active' ? '1px solid #bbf7d0' : 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Pill size={20} color={med.status === 'Active' ? '#16a34a' : '#6b7280'} />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0 }}>{med.name}</h4>
                                                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{med.reason}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                                <span className="text-muted">Dosage:</span>
                                                <span style={{ fontWeight: '600' }}>{med.dosage}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                                <span className="text-muted">Frequency:</span>
                                                <span style={{ fontWeight: '600' }}>{med.freq}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Document List (Always visible, filtered) */}
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                            {activeTab === 'All' ? 'All Documents' : `${activeTab} Documents`}
                        </h3>
                        <div className="reports-table-container">
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #f3f4f6', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>Document Name</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>Date</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>Doctor</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>Type</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocs.map(report => (
                                        <tr key={report.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                            <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div className="report-icon" style={{
                                                    width: '40px', height: '40px',
                                                    background: report.category === 'Prescription' ? '#e0e7ff' : '#ecfccb',
                                                    color: report.category === 'Prescription' ? '#4338ca' : '#65a30d'
                                                }}>
                                                    {report.category === 'Prescription' ? <Pill size={20} /> : <Beaker size={20} />}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{report.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.size}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{report.date}</td>
                                            <td style={{ padding: '1rem' }}>{report.doctor}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span className="report-type">{report.type}</span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn-icon" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                                        <Eye size={18} />
                                                    </button>
                                                    <button className="btn-icon" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredDocs.length === 0 && (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No documents found in this category.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HealthReports;
