import React, { useState } from 'react';

const Skeuomorphism2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "학사일정을 확인하고 싶어요", sender: "user" },
    { id: 2, text: "2024년 1학기 학사일정을 확인해드리겠습니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="skeuomorphism-2" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* 헤더 - 나무 느낌 */}
        <div style={{
          background: 'linear-gradient(135deg, #8b6914 0%, #6b5010 50%, #4a350b 100%)',
          borderRadius: '20px',
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.4)',
          border: '3px solid #4a350b',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            color: '#f4d03f', 
            fontSize: '2rem', 
            fontWeight: '900', 
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5), -1px -1px 2px rgba(255,255,255,0.2)',
            letterSpacing: '2px'
          }}>
            명전이 AI
          </h1>
        </div>

        {/* 메시지 카드들 - 가죽 느낌 */}
        {messages.map(msg => (
          <div key={msg.id} style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #c0392b 0%, #922b21 100%)'
                : 'linear-gradient(135deg, #f8c471 0%, #f39c12 100%)',
              borderRadius: '15px',
              padding: '1.5rem 2rem',
              maxWidth: '75%',
              color: msg.sender === 'user' ? 'white' : '#2c3e50',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: msg.sender === 'user'
                ? 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.3)'
                : 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.3)',
              border: msg.sender === 'user' ? '2px solid #7a1f15' : '2px solid #d68910',
              textShadow: msg.sender === 'user' ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(255,255,255,0.5)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* 입력 영역 - 금속 느낌 */}
        <div style={{
          background: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 50%, #6c7a7b 100%)',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.4), 0 6px 12px rgba(0,0,0,0.4)',
          border: '3px solid #566573',
          marginTop: '2rem'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: '#ecf0f1',
              border: '3px inset #bdc3c7',
              borderRadius: '12px',
              padding: '1.25rem 1.75rem',
              color: '#2c3e50',
              fontSize: '1rem',
              fontWeight: '600',
              outline: 'none',
              boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.2)'
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
            border: '3px outset #1e8449',
            borderRadius: '12px',
            padding: '1.25rem 2.5rem',
            color: 'white',
            fontWeight: '800',
            cursor: 'pointer',
            fontSize: '1rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.target.style.borderStyle = 'inset';
            e.target.style.boxShadow = 'inset 0 3px 6px rgba(0,0,0,0.4)';
          }}
          onMouseUp={(e) => {
            e.target.style.borderStyle = 'outset';
            e.target.style.boxShadow = 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skeuomorphism2;

