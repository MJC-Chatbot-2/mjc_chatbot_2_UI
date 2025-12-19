import React, { useState } from 'react';

const Skeuomorphism1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "장학금 정보를 알려주세요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="skeuomorphism-1" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #c9c9c9 0%, #a8a8a8 100%)',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 헤더 - 금속 느낌 */}
        <div style={{
          background: 'linear-gradient(135deg, #e8e8e8 0%, #c9c9c9 50%, #a8a8a8 100%)',
          borderRadius: '15px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.3)',
          border: '2px solid #8a8a8a',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            color: '#4a4a4a', 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            margin: 0,
            textShadow: '1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(0,0,0,0.2)'
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 - 종이 느낌 */}
        <div style={{
          background: '#f5f5f5',
          borderRadius: '10px',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)',
          border: '2px solid #d0d0d0',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: msg.sender === 'user' 
                  ? 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
                color: msg.sender === 'user' ? 'white' : '#333',
                fontSize: '0.95rem',
                fontWeight: '500',
                boxShadow: msg.sender === 'user'
                  ? 'inset 0 1px 2px rgba(255,255,255,0.3), 0 3px 6px rgba(0,0,0,0.3)'
                  : 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2)',
                border: msg.sender === 'user' ? '1px solid #2e5c8a' : '1px solid #d0d0d0'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 - 버튼 느낌 */}
        <div style={{
          background: 'linear-gradient(135deg, #e8e8e8 0%, #c9c9c9 100%)',
          borderRadius: '15px',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.3)',
          border: '2px solid #8a8a8a'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: '#ffffff',
              border: '2px inset #d0d0d0',
              borderRadius: '8px',
              padding: '0.875rem 1.25rem',
              color: '#333',
              fontSize: '0.95rem',
              outline: 'none',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2)'
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
            border: '2px outset #357abd',
            borderRadius: '8px',
            padding: '0.875rem 2rem',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 3px 6px rgba(0,0,0,0.3)',
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.target.style.borderStyle = 'inset';
            e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.4)';
          }}
          onMouseUp={(e) => {
            e.target.style.borderStyle = 'outset';
            e.target.style.boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.3), 0 3px 6px rgba(0,0,0,0.3)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skeuomorphism1;

