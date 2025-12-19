import React, { useState } from 'react';

const Glassmorphism1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "졸업 요건이 궁금해요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="glassmorphism-1" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      padding: '2rem',
      overflow: 'hidden'
    }}>
      {/* 배경 패턴 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        opacity: 0.5
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* 헤더 */}
        <div style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '24px',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                background: msg.sender === 'user' 
                  ? 'rgba(255, 255, 255, 0.35)' 
                  : 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '18px',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
                color: 'white',
                fontSize: '0.95rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '20px',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: '0.875rem 1.25rem',
              color: 'white',
              fontSize: '0.95rem',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.4)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          />
          <button style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '0.875rem 2rem',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.4)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Glassmorphism1;

