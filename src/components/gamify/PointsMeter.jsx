import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Star } from 'lucide-react';

const PointsMeter = ({ hp, level, nextRewardHp }) => {
    const progress = Math.min((hp / nextRewardHp) * 100, 100);
    const canClaim = hp >= nextRewardHp;

    return (
        <div className="points-meter">
            <div className="meter-header">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Zap size={20} fill="#84cc16" color="#84cc16" />
                        <span className="text-muted font-bold">HEALTH POINTS</span>
                    </div>
                    <div className="hp-display">{hp.toLocaleString()}</div>
                </div>
                <div className="level-badge">
                    LEVEL {level}
                </div>
            </div>

            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>Current Progress</span>
                <span>{nextRewardHp} HP for next reward</span>
            </div>

            {canClaim && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 border border-green-200"
                    style={{ marginTop: '1rem', background: '#f0fdf4', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #bbf7d0' }}
                >
                    <Star size={18} fill="#15803d" />
                    <span style={{ fontWeight: 600 }}>Rewards available to claim!</span>
                </motion.div>
            )}
        </div>
    );
};

export default PointsMeter;
