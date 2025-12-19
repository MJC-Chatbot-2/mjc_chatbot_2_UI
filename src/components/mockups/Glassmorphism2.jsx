import React, { useState } from 'react';

const Glassmorphism2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "수강신청 도움을 받고 싶어요", sender: "user" },
    { id: 2, text: "수강신청은 2월 15일부터 시작됩니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="glassmorphism-2" style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
      position: 'relative',
      padding: '2rem',
      overflow: 'hidden'
    }}>
      {/* 그라데이션 오버레이 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
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
        {/* 헤더 - 둥근 모서리 */}
        <div style={{
          backdropFilter: 'blur(50px) saturate(200%)',
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          background: 'rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '30px',
          padding: '1.75rem 2.5rem',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '1.75rem', 
            fontWeight: '800', 
            margin: 0,
            textShadow: '0 3px 15px rgba(0,0,0,0.3)'
          }}>
            명전이 AI 챗봇
          </h1>
        </div>

        {/* 메시지 카드들 */}
        {messages.map(msg => (
          <div key={msg.id} style={{
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            background: msg.sender === 'user' 
              ? 'rgba(255, 255, 255, 0.4)' 
              : 'rgba(255, 255, 255, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: msg.sender === 'user' ? '25px 25px 5px 25px' : '25px 25px 25px 5px',
            padding: '1.25rem 1.75rem',
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '500',
            boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)'
          }}>
            {msg.text}
          </div>
        ))}

        {/* 입력 영역 */}
        <div style={{
          backdropFilter: 'blur(50px) saturate(200%)',
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          background: 'rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '30px',
          padding: '1.25rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              background: 'rgba(255, 255, 255, 0.35)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '25px',
              padding: '1rem 1.5rem',
              color: 'white',
              fontSize: '1rem',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.45)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.35)';
            }}
          />
          <button style={{
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '2px solid rgba(255, 255, 255, 0.35)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.55)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.45)';
            e.target.style.transform = 'scale(1)';
          }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Glassmorphism2;

