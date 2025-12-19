import React, { useState } from 'react';

const FlatDesign1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "졸업 요건이 궁금해요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="flat-design-1" style={{
      minHeight: '100vh',
      background: '#3498db',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: '#2c3e50',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          borderRadius: '0',
          boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
        }}>
          <h1 style={{ 
            color: '#ecf0f1', 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          background: '#ecf0f1',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          borderRadius: '0',
          boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: msg.sender === 'user' ? '#e74c3c' : '#95a5a6',
                borderRadius: '0',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 4px 0 rgba(0,0,0,0.2)',
                border: '3px solid #2c3e50'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div style={{
          background: '#34495e',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          borderRadius: '0',
          boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: '#ecf0f1',
              border: '3px solid #2c3e50',
              borderRadius: '0',
              padding: '1rem 1.25rem',
              color: '#2c3e50',
              fontSize: '1rem',
              fontWeight: '600',
              outline: 'none',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <button style={{
            background: '#27ae60',
            border: '3px solid #2c3e50',
            borderRadius: '0',
            padding: '1rem 2rem',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 0 rgba(0,0,0,0.2)',
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translateY(2px)';
            e.target.style.boxShadow = '0 2px 0 rgba(0,0,0,0.2)';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 0 rgba(0,0,0,0.2)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlatDesign1;

