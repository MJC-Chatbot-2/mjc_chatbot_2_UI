import React, { useState } from 'react';

const Brutalism1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "장학금 정보를 알려주세요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="brutalism-1" style={{
      minHeight: '100vh',
      background: '#000000',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif',
      border: '8px solid #00ff00'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: '#00ff00',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          border: '6px solid #000000',
          boxShadow: '8px 8px 0px #ff00ff'
        }}>
          <h1 style={{ 
            color: '#000000', 
            fontSize: '2rem', 
            fontWeight: '900', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontFamily: 'monospace'
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          background: '#ffffff',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          border: '6px solid #000000',
          boxShadow: '8px 8px 0px #0000ff'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: msg.sender === 'user' ? '#ff00ff' : '#0000ff',
                padding: '1rem 1.5rem',
                maxWidth: '70%',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '900',
                border: '4px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'monospace'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div style={{
          background: '#ffff00',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          border: '6px solid #000000',
          boxShadow: '8px 8px 0px #ff0000'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: '#ffffff',
              border: '4px solid #000000',
              padding: '1rem 1.25rem',
              color: '#000000',
              fontSize: '1rem',
              fontWeight: '900',
              outline: 'none',
              fontFamily: 'monospace',
              textTransform: 'uppercase'
            }}
          />
          <button style={{
            background: '#ff0000',
            border: '4px solid #000000',
            padding: '1rem 2rem',
            color: '#ffffff',
            fontWeight: '900',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '1rem',
            fontFamily: 'monospace',
            boxShadow: '4px 4px 0px #000000',
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'translate(2px, 2px)';
            e.target.style.boxShadow = '2px 2px 0px #000000';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'translate(0, 0)';
            e.target.style.boxShadow = '4px 4px 0px #000000';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brutalism1;

