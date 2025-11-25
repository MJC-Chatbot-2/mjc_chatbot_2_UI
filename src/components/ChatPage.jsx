import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ChatBackground from './ChatBackground';
import './ChatPage.css';

const API_BASE_URL = 'http://localhost:8000';
const NOTICE_API_URL = 'http://localhost:8010/api/notice/latest';

function ChatPage() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await fetch(NOTICE_API_URL);
                const data = await res.json();

                if (data.status === "success" && data.notice) {
                    const { title, link } = data.notice;
                    setMessages([
                        {
                            role: "ai",
                            content: (
                                <div>
                                    <div>안녕하세요! 명지전문대학 학사챗봇입니다...</div>
                                    <div style={{ marginTop: "10px" }}>
                                        <strong>공지 사항 [{title}]</strong>
                                    </div>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="notice-link">
                                        공지 바로가기
                                    </a>
                                </div>
                            ),
                            timestamp: new Date(),
                        },
                    ]);
                } else {
                    setMessages([
                        {
                            role: "ai",
                            content: (
                                <div>
                                    안녕하세요! 명지전문대학 학사챗봇입니다.<br />
                                    현재 공지 정보를 불러올 수 없습니다.
                                </div>
                            ),
                            timestamp: new Date(),
                        },
                    ]);
                }
            } catch (error) {
                console.error("공지 불러오기 실패:", error);
                setMessages([
                    {
                        role: "ai",
                        content: (
                            <div>
                                안녕하세요! 명지전문대학 학사챗봇입니다...<br />
                                (공지 정보를 불러오지 못했습니다.)
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ]);
            }
        };
        fetchNotice();
    }, []);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const chatHistory = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: typeof msg.content === "string" ? msg.content : ""
            }));

            const response = await fetch(`${API_BASE_URL}/api/chat_v`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage.trim(),
                    chat_history: chatHistory
                })
            });

            const data = await response.json();

            if (data.success) {
                const aiMessage = {
                    role: 'ai',
                    content: data.response, // 문자열
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                const errorMessage = {
                    role: 'ai',
                    content: `오류: ${data.response}`,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('채팅 오류:', error);
            const errorMessage = {
                role: 'ai',
                content: '죄송합니다. 서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                role: 'ai',
                content: '채팅이 초기화되었습니다. 새로운 대화를 시작해보세요!',
                timestamp: new Date()
            }
        ]);
    };

    return (
        <ChatBackground>
            <div className="chat-container">

                <div className="chat-header">
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1>MJC AI Chat</h1>
                    </div>
                    <button className="clear-btn" onClick={clearChat}>
                        🗑️ 초기화
                    </button>
                </div>

                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}
                        >
                            {message.role === 'ai' && (
                                <div className="ai-avatar">
                                    <img 
                                        src="/mjc-logo.png" 
                                        alt="MJC AI" 
                                        className="avatar-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="avatar-fallback" style={{display: 'none'}}>
                                        <span className="avatar-text">AI</span>
                                    </div>
                                </div>
                            )}

                            <div className="message-content">
                                <div className="message-text">
                                    {typeof message.content === "string" ? (
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    ) : (
                                        message.content
                                    )}
                                </div>
                                <div className="message-time">
                                    {message.timestamp.toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="message ai-message">
                            <div className="ai-avatar">
                                <img 
                                    src="/mjc-logo.png" 
                                    alt="MJC AI" 
                                    className="avatar-image"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="avatar-fallback" style={{display: 'none'}}>
                                    <span className="avatar-text">AI</span>
                                </div>
                            </div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="input-container">
                    <div className="input-wrapper">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
                            className="message-input"
                            rows="2"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            className="send-btn"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </ChatBackground>
    );
}

export default ChatPage;