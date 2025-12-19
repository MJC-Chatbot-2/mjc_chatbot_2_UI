import React, { useState } from 'react';

const Brutalism2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "학사일정을 확인하고 싶어요", sender: "user" },
    { id: 2, text: "2024년 1학기 학사일정을 확인해드리겠습니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="brutalism-2" style={{
      minHeight: '100vh',
      background: '#ff006e',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif',
      border: '10px solid #ffffff'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: '#ffffff',
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          border: '8px solid #000000',
          boxShadow: '12px 12px 0px #8338ec',
          transform: 'rotate(-1deg)'
        }}>
          <h1 style={{ 
            color: '#ff006e', 
            fontSize: '3rem', 
            fontWeight: '900', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '6px',
            fontFamily: 'Impact, sans-serif',
            textShadow: '4px 4px 0px #8338ec',
            transform: 'rotate(1deg)'
          }}>
            명전이 AI
          </h1>
        </div>

        {/* 메시지 카드들 */}
        {messages.map(msg => (
          <div key={msg.id} style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              background: msg.sender === 'user' ? '#8338ec' : '#ffffff',
              padding: '1.5rem 2rem',
              maxWidth: '75%',
              color: msg.sender === 'user' ? '#ffffff' : '#ff006e',
              fontSize: '1.1rem',
              fontWeight: '900',
              border: '6px solid #000000',
              boxShadow: msg.sender === 'user' 
                ? '8px 8px 0px #ff006e'
                : '8px 8px 0px #8338ec',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'Impact, sans-serif',
              transform: msg.sender === 'user' ? 'rotate(1deg)' : 'rotate(-1deg)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* 입력 영역 */}
        <div style={{
          background: '#ffffff',
          padding: '1.5rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          border: '8px solid #000000',
          boxShadow: '12px 12px 0px #8338ec',
          marginTop: '2rem',
          transform: 'rotate(0.5deg)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: '#ff006e',
              border: '6px solid #000000',
              padding: '1.25rem 1.75rem',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: '900',
              outline: 'none',
              fontFamily: 'Impact, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.3)'
            }}
          />
          <button style={{
            background: '#8338ec',
            border: '6px solid #000000',
            padding: '1.25rem 2.5rem',
            color: '#ffffff',
            fontWeight: '900',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontSize: '1.1rem',
            fontFamily: 'Impact, sans-serif',
            boxShadow: '6px 6px 0px #ff006e',
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translate(3px, 3px)';
            e.target.style.boxShadow = '3px 3px 0px #ff006e';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translate(0, 0)';
            e.target.style.boxShadow = '6px 6px 0px #ff006e';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brutalism2;

