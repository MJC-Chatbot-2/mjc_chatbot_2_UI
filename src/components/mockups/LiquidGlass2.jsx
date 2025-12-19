import React, { useState } from 'react';

const LiquidGlass2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "수강신청 도움을 받고 싶어요", sender: "user" },
    { id: 2, text: "수강신청은 2월 15일부터 시작됩니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="liquid-glass-2" style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #00c9ff 0%, #92fe9d 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* 움직이는 액체 형태 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        filter: 'blur(40px)',
        animation: 'morph 12s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        filter: 'blur(50px)',
        animation: 'morph 15s ease-in-out infinite reverse'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '700px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {/* 헤더 - 원형 형태 */}
        <div style={{
          backdropFilter: 'blur(25px)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '50px',
          padding: '1.25rem 2.5rem',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
        }}>
          <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            명전이 AI
          </h1>
        </div>

        {/* 메시지 카드들 */}
        {messages.map(msg => (
          <div key={msg.id} style={{
            backdropFilter: 'blur(15px)',
            background: msg.sender === 'user' 
              ? 'rgba(255, 255, 255, 0.35)' 
              : 'rgba(255, 255, 255, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: msg.sender === 'user' ? '25px 25px 5px 25px' : '25px 25px 25px 5px',
            padding: '1.25rem 1.75rem',
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
            boxShadow: '0 6px 30px rgba(0, 0, 0, 0.12)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            {msg.text}
          </div>
        ))}

        {/* 입력 영역 - 타원형 */}
        <div style={{
          backdropFilter: 'blur(25px)',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '50px',
          padding: '1rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              borderRadius: '25px',
              padding: '0.875rem 1.25rem',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button style={{
            background: 'rgba(255, 255, 255, 0.4)',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}>
            →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 70% 30% 50% 50% / 30% 50% 70% 50%; }
          75% { border-radius: 40% 60% 50% 40% / 60% 30% 50% 70%; }
        }
      `}</style>
    </div>
  );
};

export default LiquidGlass2;

