import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, AlertCircle, Settings, X } from 'lucide-react';
import './Dashboard.css'; // Reuse dashboard styles

const AiChatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! I am your AI Health Assistant. Connect me to n8n to start chatting!' }
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
        scrollToBottom();
    }, [messages]);

    const saveSettings = () => {
        localStorage.setItem('n8n_webhook_url', webhookUrl);
        setShowSettings(false);
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Settings saved! Ready to connect.' }]);
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
                let reply = "I'm currently in Demo Mode. I can answer basic health questions!";
                const lower = input.toLowerCase();
                if (lower.includes('hello') || lower.includes('hi')) reply = "Hello! How can I assist you with your health today?";
                if (lower.includes('diet') || lower.includes('food')) reply = "A balanced diet is key! Focus on whole grains, lean proteins, and plenty of vegetables.";
                if (lower.includes('exercise') || lower.includes('workout')) reply = "Regular physical activity is vital. Aim for at least 150 minutes of moderate activity per week.";
                if (lower.includes('headache')) reply = "Stay hydrated and rest. If it persists, consult a doctor.";

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

            // Adapt to common n8n return formats
            const botText = data.output || data.text || data.message || data.response || JSON.stringify(data);

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
        <div className="dashboard-container" style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <header className="dashboard-header">
                <div>
                    <h1 className="page-title">AI Health <br /> <span style={{ fontWeight: 300 }}>Assistant</span></h1>
                </div>
                <div className="header-actions">
                    <div className="date-picker" style={{ background: 'rgba(132, 204, 22, 0.1)', color: '#4d7c0f', border: '1px solid #bef264' }}>
                        <Sparkles size={16} />
                        <span>Powered by n8n</span>
                    </div>
                    <button
                        className="btn-icon"
                        onClick={() => setShowSettings(true)}
                        style={{ background: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        <Settings size={20} color="#6b7280" />
                    </button>
                </div>
            </header>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel"
                            style={{ width: '90%', maxWidth: '400px', padding: '2rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3>Configuration</h3>
                                <button onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>n8n Webhook URL</label>
                                <input
                                    type="text"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                    placeholder="https://your-n8n-instance.com/webhook/..."
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                                    <input
                                        type="checkbox"
                                        id="mockModePage"
                                        checked={webhookUrl === 'mock'}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setWebhookUrl('mock');
                                                localStorage.setItem('n8n_webhook_url', 'mock');
                                            } else {
                                                setWebhookUrl('');
                                                localStorage.setItem('n8n_webhook_url', '');
                                            }
                                        }}
                                    />
                                    <label htmlFor="mockModePage" style={{ fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer' }}>Use Mock Mode (Demo)</label>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                    Create a workflow in n8n with a Webhook trigger (POST) and a Respond to Webhook node.
                                </p>
                            </div>

                            <button
                                onClick={saveSettings}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Save Configuration
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="dashboard-grid" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>

                    {/* Chat Area */}
                    <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '70%',
                                    display: 'flex',
                                    gap: '0.75rem',
                                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                                }}
                            >
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: msg.sender === 'user' ? '#111827' : '#ecfccb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {msg.sender === 'user' ? <User size={18} color="white" /> : <Bot size={18} color="#4d7c0f" />}
                                </div>
                                <div style={{
                                    background: msg.sender === 'user' ? '#111827' : '#f3f4f6',
                                    color: msg.sender === 'user' ? 'white' : '#1f2937',
                                    padding: '1rem',
                                    borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}
                            >
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfccb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Bot size={18} color="#4d7c0f" />
                                </div>
                                <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '16px 16px 16px 0', display: 'flex', gap: '4px', alignItems: 'center' }}>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '1.5rem', borderTop: '1px solid #f3f4f6', background: 'white' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about your health..."
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb',
                                    outline: 'none',
                                    fontSize: '1rem',
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
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                                    opacity: input.trim() ? 1 : 0.7,
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                            <AlertCircle size={12} />
                            <span>AI can make mistakes. Please verify important information.</span>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .typing-dot {
                    width: 6px;
                    height: 6px;
                    background: #9ca3af;
                    borderRadius: 50%;
                    animation: typing 1.4s infinite ease-in-out both;
                }
                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default AiChatbot;
