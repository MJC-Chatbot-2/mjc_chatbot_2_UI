import React, { useState } from 'react';

const MaterialYou2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "수강신청 도움을 받고 싶어요", sender: "user" },
    { id: 2, text: "수강신청은 2월 15일부터 시작됩니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="material-you-2" style={{
      minHeight: '100vh',
      background: '#006A6B',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: '#FFFFFF',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
          }}>
            💬
          </div>
          <h1 style={{ 
            color: '#FFFFFF', 
            fontSize: '1.75rem', 
            fontWeight: '400', 
            margin: 0,
            letterSpacing: '0.15px'
          }}>
            명전이 AI 챗봇
          </h1>
        </div>

        {/* 메시지 카드들 */}
        {messages.map(msg => (
          <div key={msg.id} style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              background: msg.sender === 'user' ? '#006A6B' : '#E0F2F1',
              borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              padding: '1rem 1.5rem',
              maxWidth: '75%',
              color: msg.sender === 'user' ? '#FFFFFF' : '#1C1B1F',
              fontSize: '0.875rem',
              fontWeight: '400',
              boxShadow: msg.sender === 'user'
                ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
                : 'none',
              lineHeight: '1.25rem',
              letterSpacing: '0.25px'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* 입력 영역 */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '32px',
          padding: '1.25rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          marginTop: '2rem'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: '#E0F2F1',
              border: 'none',
              borderRadius: '24px',
              padding: '1rem 1.5rem',
              color: '#1C1B1F',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.background = '#B2DFDB';
              e.target.style.boxShadow = '0 0 0 2px #006A6B';
            }}
            onBlur={(e) => {
              e.target.style.background = '#E0F2F1';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button style={{
            background: '#006A6B',
            border: 'none',
            borderRadius: '16px',
            width: '48px',
            height: '48px',
            color: '#FFFFFF',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
            e.target.style.transform = 'translateY(0)';
          }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialYou2;

