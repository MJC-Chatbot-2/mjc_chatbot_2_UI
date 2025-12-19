import React, { useState } from 'react';

const LiquidGlass1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다. 무엇을 도와드릴까요?", sender: "ai" },
    { id: 2, text: "졸업 요건이 궁금해요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="liquid-glass-1" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* 유동적인 배경 요소 */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* 헤더 */}
        <div style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '30px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
            명전이 💬
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '40px',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                backdropFilter: 'blur(10px)',
                background: msg.sender === 'user' 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
                color: 'white',
                fontSize: '0.95rem'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '30px',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              padding: '0.75rem 1rem',
              color: 'white',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
          <button style={{
            background: 'rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '20px',
            padding: '0.75rem 1.5rem',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            전송
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default LiquidGlass1;

