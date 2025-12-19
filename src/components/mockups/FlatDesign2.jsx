import React, { useState } from 'react';

const FlatDesign2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "수강신청 도움을 받고 싶어요", sender: "user" },
    { id: 2, text: "수강신청은 2월 15일부터 시작됩니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="flat-design-2" style={{
      minHeight: '100vh',
      background: '#ff6b6b',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: '#ffd93d',
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          borderRadius: '0',
          boxShadow: '0 6px 0 rgba(0,0,0,0.15)',
          border: '4px solid #2d3436'
        }}>
          <h1 style={{ 
            color: '#2d3436', 
            fontSize: '2rem', 
            fontWeight: '900', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '3px'
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
              background: msg.sender === 'user' ? '#6c5ce7' : '#00b894',
              borderRadius: '0',
              padding: '1.5rem 2rem',
              maxWidth: '75%',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              boxShadow: '0 6px 0 rgba(0,0,0,0.2)',
              border: '4px solid #2d3436',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* 입력 영역 */}
        <div style={{
          background: '#2d3436',
          padding: '1.5rem 2rem',
          display: 'flex',
          gap: '1rem',
          borderRadius: '0',
          boxShadow: '0 6px 0 rgba(0,0,0,0.2)',
          border: '4px solid #ffd93d',
          marginTop: '2rem'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: '#ffffff',
              border: '4px solid #2d3436',
              borderRadius: '0',
              padding: '1.25rem 1.75rem',
              color: '#2d3436',
              fontSize: '1.1rem',
              fontWeight: '700',
              outline: 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          />
          <button style={{
            background: '#00b894',
            border: '4px solid #2d3436',
            borderRadius: '0',
            padding: '1.25rem 2.5rem',
            color: 'white',
            fontWeight: '900',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '1.1rem',
            boxShadow: '0 6px 0 rgba(0,0,0,0.2)',
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translateY(3px)';
            e.target.style.boxShadow = '0 3px 0 rgba(0,0,0,0.2)';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 0 rgba(0,0,0,0.2)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlatDesign2;

