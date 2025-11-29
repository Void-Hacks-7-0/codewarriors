import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, Settings, MessageSquare, Bell } from 'lucide-react';
import '../pages/Dashboard.css'; // Reuse dashboard styles
import { MEDICAL_KNOWLEDGE } from '../data/knowledgeBase';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi! I am your AI Health Assistant. I am trained on your health data (Diabetes, Stress, Sleep). How can I help?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem('n8n_webhook_url') || '');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const saveSettings = () => {
        localStorage.setItem('n8n_webhook_url', webhookUrl);
        setShowSettings(false);
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Settings saved!' }]);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        // Default to mock mode if no URL is set
        let effectiveUrl = webhookUrl || 'mock';

        // Use proxy for specific n8n domain to bypass CORS in development
        if (effectiveUrl.includes('deependrasbaghell.app.n8n.cloud')) {
            effectiveUrl = effectiveUrl.replace('https://deependrasbaghell.app.n8n.cloud', '/n8n-proxy');
        }

        if (effectiveUrl === 'mock') {
            const userMessage = { id: Date.now(), sender: 'user', text: input };
            setMessages(prev => [...prev, userMessage]);
            setInput('');
            setIsTyping(true);

            setTimeout(() => {
                const lower = input.toLowerCase();
                let reply = "I'm currently in Demo Mode. I can answer questions about Diabetes, Stress, Sleep, and Eye Strain.";

                // Intelligent Mock Logic using Knowledge Base
                const matchedDisease = MEDICAL_KNOWLEDGE.find(d =>
                    d.keywords.some(k => lower.includes(k)) ||
                    d.name.toLowerCase().includes(lower)
                );

                if (matchedDisease) {
                    reply = `**${matchedDisease.name}**\n\n${matchedDisease.short_description}\n\n**Self Care:** ${matchedDisease.action_self_care}\n\n**Diet:** Try eating ${matchedDisease.diet_recommendations.eat.join(', ')}.`;
                } else {
                    if (lower.includes('hello') || lower.includes('hi')) reply = "Hello! Ask me about diabetes risks, sleep patterns, or stress management.";
                    if (lower.includes('thank')) reply = "You're welcome! Stay healthy.";
                }

                setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
                setIsTyping(false);
            }, 1000);
            return;
        }

        const userMessage = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch(effectiveUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input, chatHistory: messages }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Safely extract text and ensure it's a string to prevent React rendering errors (blank page)
            let botText = '';
            if (typeof data.output === 'string') botText = data.output;
            else if (typeof data.text === 'string') botText = data.text;
            else if (typeof data.message === 'string') botText = data.message;
            else if (typeof data.response === 'string') botText = data.response;
            else botText = JSON.stringify(data);

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botText }]);
        } catch (error) {
            console.error('Error connecting to n8n:', error);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: `Connection Error: ${error.message}. Please check your n8n URL and ensure the workflow is active.` }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                className="chat-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#84cc16',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(132, 204, 22, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                {isOpen ? <X size={28} /> : <Bot size={28} />}
            </motion.button>

            {/* Chat Popup Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            bottom: '7rem',
                            right: '2rem',
                            width: '380px',
                            height: '600px',
                            maxHeight: '80vh',
                            background: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 1000,
                            border: '1px solid #f3f4f6'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1rem 1.5rem', background: 'white', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', background: '#ecfccb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Sparkles size={18} color="#4d7c0f" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem' }}>AI Assistant</h3>
                                    <span style={{ fontSize: '0.75rem', color: '#84cc16', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#84cc16' }}></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <Link to="/notifications" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} onClick={() => setIsOpen(false)}>
                                    <Bell size={18} color="#9ca3af" />
                                </Link>
                                <button onClick={() => setShowSettings(!showSettings)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                                    <Settings size={18} color="#9ca3af" />
                                </button>
                            </div>
                        </div>

                        {/* Settings Overlay */}
                        {showSettings && (
                            <div style={{ padding: '1rem', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>n8n Webhook URL</label>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={webhookUrl}
                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                        placeholder="https://..."
                                        style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.875rem' }}
                                    />
                                    <button onClick={saveSettings} style={{ background: '#84cc16', color: 'white', border: 'none', borderRadius: '6px', padding: '0 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>Save</button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        id="mockMode"
                                        checked={webhookUrl === 'mock'}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setWebhookUrl('mock');
                                                localStorage.setItem('n8n_webhook_url', 'mock');
                                                setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Switched to Mock Mode. I will simulate responses now.' }]);
                                            } else {
                                                setWebhookUrl('');
                                                localStorage.setItem('n8n_webhook_url', '');
                                            }
                                        }}
                                    />
                                    <label htmlFor="mockMode" style={{ fontSize: '0.75rem', color: '#6b7280', cursor: 'pointer' }}>Use Mock Mode (Demo)</label>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fcfcfc' }}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <div style={{
                                        background: msg.sender === 'user' ? '#111827' : 'white',
                                        color: msg.sender === 'user' ? 'white' : '#1f2937',
                                        padding: '0.75rem 1rem',
                                        borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                        boxShadow: msg.sender === 'user' ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
                                        border: msg.sender === 'user' ? 'none' : '1px solid #f3f4f6',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5'
                                    }}>
                                        {msg.text}
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px', margin: '0 4px' }}>
                                        {msg.sender === 'bot' ? 'AI Assistant' : 'You'}
                                    </span>
                                </div>
                            ))}
                            {isTyping && (
                                <div style={{ alignSelf: 'flex-start', background: 'white', padding: '0.75rem 1rem', borderRadius: '16px 16px 16px 0', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <span className="typing-dot"></span>
                                        <span className="typing-dot"></span>
                                        <span className="typing-dot"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{ padding: '1rem', background: 'white', borderTop: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message..."
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        outline: 'none',
                                        fontSize: '0.9rem',
                                        background: '#f9fafb'
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    style={{
                                        background: '#84cc16',
                                        color: 'white',
                                        border: 'none',
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: input.trim() ? 'pointer' : 'not-allowed',
                                        opacity: input.trim() ? 1 : 0.7,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .typing-dot {
                    width: 5px;
                    height: 5px;
                    background: #9ca3af;
                    borderRadius: 50%;
                    animation: typing 1.4s infinite ease-in-out both;
                }
                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }
            `}</style>
        </>
    );
};

export default ChatWidget;
