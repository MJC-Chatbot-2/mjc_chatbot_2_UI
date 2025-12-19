import React, { useState } from 'react';

const SoftUI1 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 명전이입니다.", sender: "ai" },
    { id: 2, text: "장학금 정보를 알려주세요", sender: "user" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="soft-ui-1" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          borderRadius: '30px',
          padding: '1.75rem 2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.75rem', 
            fontWeight: '800', 
            margin: 0 
          }}>
            명전이
          </h1>
        </div>

        {/* 채팅 영역 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
          borderRadius: '35px',
          padding: '2rem',
          marginBottom: '1.5rem',
          minHeight: '400px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.6)'
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                background: msg.sender === 'user' 
                  ? 'linear-gradient(135deg, #e17055 0%, #d63031 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                borderRadius: '25px',
                padding: '1.25rem 1.75rem',
                maxWidth: '70%',
                color: msg.sender === 'user' ? 'white' : '#2d3436',
                fontSize: '0.95rem',
                fontWeight: '500',
                boxShadow: msg.sender === 'user'
                  ? '0 8px 20px rgba(225, 112, 85, 0.3)'
                  : '0 8px 20px rgba(0, 0, 0, 0.08)',
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.6)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
          borderRadius: '30px',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          gap: '1rem',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.6)'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.8)',
              border: '2px solid rgba(225, 112, 85, 0.2)',
              borderRadius: '25px',
              padding: '1rem 1.5rem',
              color: '#2d3436',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(225, 112, 85, 0.5)';
              e.target.style.boxShadow = '0 4px 15px rgba(225, 112, 85, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(225, 112, 85, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)',
            border: 'none',
            borderRadius: '25px',
            padding: '1rem 2rem',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(225, 112, 85, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 25px rgba(225, 112, 85, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 20px rgba(225, 112, 85, 0.4)';
          }}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoftUI1;

