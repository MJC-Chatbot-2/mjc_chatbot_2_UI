import React, { useState } from 'react';

const Neumorphism2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "학사일정을 확인하고 싶어요", sender: "user" },
    { id: 2, text: "2024년 1학기 학사일정을 확인해드리겠습니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="neumorphism-2" style={{
      minHeight: '100vh',
      background: '#f0f4f8',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* 헤더 - 둥근 사각형 */}
        <div style={{
          background: '#f0f4f8',
          borderRadius: '35px',
          padding: '1.75rem 2.5rem',
          marginBottom: '2.5rem',
          boxShadow: '10px 10px 20px #d1d9e2, -10px -10px 20px #ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: '#f0f4f8',
            borderRadius: '15px',
            boxShadow: 'inset 5px 5px 10px #d1d9e2, inset -5px -5px 10px #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            💬
          </div>
          <h1 style={{ 
            color: '#475569', 
            fontSize: '1.75rem', 
            fontWeight: '800', 
            margin: 0 
          }}>
            명전이 AI 챗봇
          </h1>
        </div>

        {/* 메시지 카드들 */}
        {messages.map(msg => (
          <div key={msg.id} style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              background: '#f0f4f8',
              borderRadius: msg.sender === 'user' ? '25px 25px 5px 25px' : '25px 25px 25px 5px',
              padding: '1.25rem 1.75rem',
              maxWidth: '75%',
              color: '#334155',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: msg.sender === 'user'
                ? '8px 8px 16px #d1d9e2, -8px -8px 16px #ffffff'
                : 'inset 5px 5px 10px #d1d9e2, inset -5px -5px 10px #ffffff'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* 입력 영역 */}
        <div style={{
          background: '#f0f4f8',
          borderRadius: '30px',
          padding: '1.25rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '10px 10px 20px #d1d9e2, -10px -10px 20px #ffffff',
          marginTop: '2rem'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: '#f0f4f8',
              border: 'none',
              borderRadius: '25px',
              padding: '1rem 1.5rem',
              color: '#334155',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: 'inset 5px 5px 10px #d1d9e2, inset -5px -5px 10px #ffffff'
            }}
          />
          <button style={{
            background: '#f0f4f8',
            border: 'none',
            borderRadius: '20px',
            width: '50px',
            height: '50px',
            color: '#334155',
            fontSize: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '6px 6px 12px #d1d9e2, -6px -6px 12px #ffffff',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = 'inset 4px 4px 8px #d1d9e2, inset -4px -4px 8px #ffffff';
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '6px 6px 12px #d1d9e2, -6px -6px 12px #ffffff';
          }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Neumorphism2;

