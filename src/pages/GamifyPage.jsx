import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Target, Sparkles } from 'lucide-react';
import PointsMeter from '../components/gamify/PointsMeter';
import RewardCard from '../components/gamify/RewardCard';
import { getRewards, getGoals, claimReward, completeGoal } from '../services/gamifyService';
import '../styles/gamify.css';

const GamifyPage = () => {
    const [rewardsData, setRewardsData] = useState(null);
    const [goalsData, setGoalsData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [rewards, goals] = await Promise.all([getRewards(), getGoals()]);
            setRewardsData(rewards);
            setGoalsData(goals);
        } catch (error) {
            console.error("Error fetching gamification data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClaim = async (id) => {
        try {
            await claimReward(id);
            fetchData(); // Refresh data
        } catch (error) {
            alert("Could not claim reward: " + error.message);
        }
    };

    const handleCompleteGoal = async (id) => {
        try {
            await completeGoal(id);
            fetchData(); // Refresh data
        } catch (error) {
            console.error("Error completing goal:", error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading rewards...</div>;

    return (
        <div className="gamify-container">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards & <span className="text-neon-green">Goals</span></h1>
                <p className="text-gray-500">Complete health goals to level up and earn exclusive rewards.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Rewards */}
                <div className="lg:col-span-2">
                    <PointsMeter
                        hp={rewardsData?.hp || 0}
                        level={rewardsData?.level || 1}
                        nextRewardHp={rewardsData?.next_reward_hp || 1000}
                    />

                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="text-neon-purple" /> Available Rewards
                    </h2>

                    <div className="rewards-grid">
                        {rewardsData?.rewards.map(reward => (
                            <RewardCard
                                key={reward.id}
                                {...reward}
                                onClaim={handleClaim}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column: Goals & Missions */}
                <div>
                    <div className="goals-section">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Target className="text-neon-green" /> Active Goals
                        </h2>

                        <div className="space-y-4">
                            {goalsData?.goals.map(goal => (
                                <div key={goal.id} className="goal-item">
                                    <div style={{ flex: 1 }}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-semibold">{goal.title}</h4>
                                            <span className="text-sm text-neon-green">+{goal.rewardHp} HP</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{goal.desc}</p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-400">
                                                {goal.progress}/{goal.target}
                                            </span>
                                        </div>
                                    </div>

                                    {goal.status !== 'completed' ? (
                                        <button
                                            onClick={() => handleCompleteGoal(goal.id)}
                                            className="ml-4 p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors"
                                            title="Mark Complete"
                                        >
                                            <CheckCircle size={24} />
                                        </button>
                                    ) : (
                                        <div className="ml-4 text-green-500">
                                            <CheckCircle size={24} fill="#dcfce7" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="daily-mission-card">
                        <div className="flex items-start gap-3">
                            <Sparkles className="text-green-700 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-green-900 mb-1">Daily AI Mission</h3>
                                <p className="text-sm text-green-800">
                                    "Take a 10-minute walk after lunch to improve digestion and boost energy levels."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-xl text-xs text-gray-400 text-center">
                        <p>Rewards are based on engagement and healthy habits. This app is not a medical device or a replacement for clinical care.</p>
                        <p className="mt-2">Partner discounts are subject to terms. Codes shown are for demo purposes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamifyPage;
