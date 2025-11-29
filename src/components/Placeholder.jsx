import React from 'react';

const Placeholder = ({ title }) => {
    return (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
            <p style={{ color: 'var(--text-muted)' }}>This feature is coming soon in the next update.</p>
        </div>
    );
};

export default Placeholder;
