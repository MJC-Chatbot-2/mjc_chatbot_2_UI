import React, { useState } from 'react';

const MaterialYou1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "졸업 요건이 궁금해요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="material-you-1" style={{
      minHeight: '100vh',
      background: '#6750A4',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 헤더 - Material You 스타일 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '28px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{ 
            color: '#FFFFFF', 
            fontSize: '1.5rem', 
            fontWeight: '500', 
            margin: 0,
            letterSpacing: '0.15px'
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: msg.sender === 'user' ? '#6750A4' : '#F3EDF7',
                borderRadius: '20px',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
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
        </div>

        {/* 입력 영역 - FAB 스타일 */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: '#F3EDF7',
              border: 'none',
              borderRadius: '20px',
              padding: '0.875rem 1.25rem',
              color: '#1C1B1F',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.background = '#E8DEF8';
              e.target.style.boxShadow = '0 0 0 2px #6750A4';
            }}
            onBlur={(e) => {
              e.target.style.background = '#F3EDF7';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button style={{
            background: '#6750A4',
            border: 'none',
            borderRadius: '16px',
            padding: '0.875rem 1.5rem',
            color: '#FFFFFF',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '0.875rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            transition: 'all 0.2s',
            letterSpacing: '0.1px'
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
            e.target.style.transform = 'translateY(0)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialYou1;

