import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatBackground from './ChatBackground';
import { useUser } from '../contexts/UserContext';
import { fetchSessionMessages } from '../utils/chatApi';
import './ChatPage.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const NOTICE_API_URL = 'http://localhost:8010/api/notice/latest';

function ChatPage() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = useUser();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(chatId || null);
    const messagesEndRef = useRef(null);
    const autoQuestionSent = useRef(false);
    const messagesRef = useRef([]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // messages 변경 시 ref 업데이트
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    // 세션이 있으면 대화기록 로드
    useEffect(() => {
        const loadSessionMessages = async () => {
            if (!sessionId) {
                // 세션이 없으면 공지사항만 표시
                fetchNoticeOnly();
                return;
            }

            try {
                const data = await fetchSessionMessages(sessionId);
                
                if (data.success && data.messages && data.messages.length > 0) {
                    // DB에서 가져온 메시지를 컴포넌트 형식으로 변환
                    const formattedMessages = data.messages.map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'ai',
                        content: msg.message,
                        timestamp: new Date(msg.created_at)
                    }));
                    setMessages(formattedMessages);
                } else {
                    // 메시지가 없으면 공지사항 표시
                    fetchNoticeOnly();
                }
            } catch (error) {
                console.error('[ChatPage] 대화기록 로드 실패:', error);
                fetchNoticeOnly();
            }
        };

        loadSessionMessages();
    }, [sessionId]);

    const fetchNoticeOnly = async () => {
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
                                <div>안녕하세요! 명지전문대학 학사챗봇입니다.</div>
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
                            안녕하세요! 명지전문대학 학사챗봇입니다.<br />
                            (공지 정보를 불러오지 못했습니다.)
                        </div>
                    ),
                    timestamp: new Date(),
                },
            ]);
        }
    };

    const sendMessage = useCallback(async (messageToSend = null) => {
        const message = messageToSend || inputMessage.trim();
        if (!message || isLoading) return;

        const userMessage = {
            role: 'user',
            content: message,
            timestamp: new Date()
        };

        // 사용자 메시지 추가
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        // 현재 메시지 목록 가져오기 (ref 사용)
        const currentMessages = [...messagesRef.current, userMessage];
        
        // 채팅 히스토리 생성 (사용자 메시지 포함)
        const chatHistory = currentMessages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: typeof msg.content === "string" ? msg.content : ""
        }));

        // API 호출 (비동기 작업)
        try {
            const requestBody = {
                message: message,
                chat_history: chatHistory
            };

            // session_id와 user_id 추가
            if (sessionId) {
                requestBody.session_id = sessionId;
            }
            if (userInfo?.id) {
                requestBody.user_id = userInfo.id;
            }

            const response = await fetch(`${API_BASE_URL}/api/chat_v`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.success) {
                const aiMessage = {
                    role: 'ai',
                    content: data.response,
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
    }, [inputMessage, isLoading]);

    // 자동 질문 처리
    useEffect(() => {
        const autoQuestion = location.state?.autoQuestion;
        if (autoQuestion && !autoQuestionSent.current && messages.length > 0) {
            // 공지사항이 로드된 후 자동 질문 전송
            autoQuestionSent.current = true;
            setTimeout(() => {
                sendMessage(autoQuestion);
            }, 500); // 공지사항 표시 후 약간의 딜레이
        }
    }, [messages, location.state, sendMessage]);

    // chatId가 변경되면 sessionId 업데이트
    useEffect(() => {
        if (chatId) {
            setSessionId(chatId);
        } else {
            setSessionId(null);
        }
    }, [chatId]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        autoQuestionSent.current = false;
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
                                        src="/자산 1.svg" 
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
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                table: (props) => <table className="chat-table" {...props} />,}}>
                                             {message.content}
                                        </ReactMarkdown>
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
                                    src="/자산 1.svg" 
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
                            onKeyDown={handleKeyDown}
                            placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
                            className="message-input"
                            rows="2"
                            disabled={isLoading}
                        />
                        <button
                            onClick={() => sendMessage()}
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