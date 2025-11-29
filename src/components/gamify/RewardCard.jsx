import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Lock, Check, Zap } from 'lucide-react';

const RewardCard = ({ id, name, desc, costHp, status, code, onClaim }) => {
    const isLocked = status === 'locked';
    const isClaimed = status === 'claimed';

    return (
        <motion.div
            className={`reward-card ${status}`}
            whileHover={!isLocked && !isClaimed ? { scale: 1.02 } : {}}
        >
            <div className="cost-badge">
                <Zap size={16} fill="#65a30d" />
                {costHp}
            </div>

            <div className="reward-icon">
                {isLocked ? <Lock size={24} /> : isClaimed ? <Check size={24} /> : <Gift size={24} />}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: '#111827' }}>{name}</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>{desc}</p>

            {isClaimed && code && (
                <div style={{ background: '#f3f4f6', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', color: '#374151' }}>
                    {code}
                </div>
            )}

            <button
                className={`btn-primary ${isLocked || isClaimed ? 'disabled' : ''}`}
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: isLocked || isClaimed ? 0.5 : 1,
                    cursor: isLocked || isClaimed ? 'not-allowed' : 'pointer',
                    background: isClaimed ? '#16a34a' : undefined
                }}
                disabled={isLocked || isClaimed}
                onClick={() => onClaim(id)}
            >
                {isLocked ? 'Locked' : isClaimed ? 'Claimed' : 'Claim Reward'}
            </button>
        </motion.div>
    );
};

export default RewardCard;
