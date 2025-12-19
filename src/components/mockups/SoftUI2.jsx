import React, { useState } from 'react';

const SoftUI2 = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "학사일정을 확인하고 싶어요", sender: "user" },
    { id: 2, text: "2024년 1학기 학사일정을 확인해드리겠습니다.", sender: "ai" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="soft-ui-2" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      padding: '2rem',
      fontFamily: 'Pretendard, sans-serif'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          borderRadius: '40px',
          padding: '2rem 2.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          border: '2px solid rgba(255, 255, 255, 0.7)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 10px 25px rgba(116, 185, 255, 0.4)'
          }}>
            💬
          </div>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem', 
            fontWeight: '900', 
            margin: 0 
          }}>
            명전이 AI
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
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              borderRadius: msg.sender === 'user' ? '30px 30px 5px 30px' : '30px 30px 30px 5px',
              padding: '1.5rem 2rem',
              maxWidth: '75%',
              color: msg.sender === 'user' ? 'white' : '#2d3436',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: msg.sender === 'user'
                ? '0 10px 30px rgba(116, 185, 255, 0.4)'
                : '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: msg.sender === 'user' ? 'none' : '2px solid rgba(255, 255, 255, 0.7)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* 입력 영역 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
          borderRadius: '35px',
          padding: '1.5rem 2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.7)',
          marginTop: '2rem'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(116, 185, 255, 0.3)',
              borderRadius: '30px',
              padding: '1.25rem 1.75rem',
              color: '#2d3436',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(116, 185, 255, 0.6)';
              e.target.style.boxShadow = '0 6px 20px rgba(116, 185, 255, 0.25)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(116, 185, 255, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            border: 'none',
            borderRadius: '50%',
            width: '55px',
            height: '55px',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(116, 185, 255, 0.5)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 15px 35px rgba(116, 185, 255, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(116, 185, 255, 0.5)';
          }}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoftUI2;

