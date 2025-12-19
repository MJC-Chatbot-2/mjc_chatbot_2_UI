import React, { useState } from 'react';

const Neumorphism1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "장학금 정보를 알려주세요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="neumorphism-1" style={{
      minHeight: '100vh',
      background: '#e0e5ec',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: '#e0e5ec',
          borderRadius: '25px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: '8px 8px 16px #b8bec5, -8px -8px 16px #ffffff',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            color: '#4a5568', 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          background: '#e0e5ec',
          borderRadius: '30px',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          boxShadow: 'inset 6px 6px 12px #b8bec5, inset -6px -6px 12px #ffffff'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: msg.sender === 'user' ? '#e0e5ec' : '#e0e5ec',
                borderRadius: '20px',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
                color: '#2d3748',
                fontSize: '0.95rem',
                boxShadow: msg.sender === 'user' 
                  ? '6px 6px 12px #b8bec5, -6px -6px 12px #ffffff'
                  : 'inset 4px 4px 8px #b8bec5, inset -4px -4px 8px #ffffff'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div style={{
          background: '#e0e5ec',
          borderRadius: '25px',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          boxShadow: '8px 8px 16px #b8bec5, -8px -8px 16px #ffffff'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: '#e0e5ec',
              border: 'none',
              borderRadius: '20px',
              padding: '0.875rem 1.25rem',
              color: '#2d3748',
              fontSize: '0.95rem',
              outline: 'none',
              boxShadow: 'inset 4px 4px 8px #b8bec5, inset -4px -4px 8px #ffffff'
            }}
          />
          <button style={{
            background: '#e0e5ec',
            border: 'none',
            borderRadius: '20px',
            padding: '0.875rem 2rem',
            color: '#2d3748',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '6px 6px 12px #b8bec5, -6px -6px 12px #ffffff',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = 'inset 4px 4px 8px #b8bec5, inset -4px -4px 8px #ffffff';
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '6px 6px 12px #b8bec5, -6px -6px 12px #ffffff';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Neumorphism1;

