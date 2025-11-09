import React, { useState } from 'react';

const AskAISection = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! 학사 관련 질문이 있으시면 언제든지 물어보세요. 📚",
      sender: "ai",
      timestamp: "오전 9:30"
    },
    {
      id: 2,
      text: "졸업 요건에 대해 알고 싶어요",
      sender: "user",
      timestamp: "오전 9:31"
    },
    {
      id: 3,
      text: "졸업 요건은 다음과 같습니다:\n\n• 총 130학점 이상 이수\n• 전공 60학점 이상 이수\n• 교양 30학점 이상 이수\n• 졸업논문 또는 졸업작품 완료\n\n더 자세한 정보가 필요하시면 말씀해 주세요!",
      sender: "ai",
      timestamp: "오전 9:32"
    },
    {
      id: 4,
      text: "수강신청은 언제부터 시작되나요?",
      sender: "user",
      timestamp: "오전 9:35"
    },
    {
      id: 5,
      text: "2024년 1학기 수강신청 일정입니다:\n\n📅 1차 수강신청: 2월 15일(목) 10:00\n📅 2차 수강신청: 2월 20일(화) 10:00\n📅 정정기간: 2월 26일(월) ~ 3월 1일(금)\n\n자세한 시간표는 포털에서 확인하실 수 있습니다!",
      sender: "ai",
      timestamp: "오전 9:36"
    }
  ]);

  const suggestions = [
    "졸업 요건 확인하기",
    "수강신청 도움받기",
    "학점 계산기 사용하기",
    "장학금 정보 알아보기",
    "진로 상담 받기",
    "학사일정 확인하기",
    "성적 확인하기",
    "휴학/복학 신청하기",
    "졸업논문 가이드",
    "교수님 상담 예약하기"
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">학사챗봇</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-500">온라인 상태</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 xs:px-4 py-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'ai' && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <span className="text-xs text-gray-500">학사챗봇</span>
                </div>
              )}
              <div
                className={`rounded-2xl px-3 xs:px-4 py-2 xs:py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="px-3 xs:px-4 py-3 bg-white border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">추천 질문</p>
        <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-xs px-3 py-2 rounded-full transition-colors duration-200 touch-manipulation whitespace-nowrap flex-shrink-0"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-3 xs:px-4 py-3 safe-area-pb">
        <div className="flex items-end space-x-2 xs:space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="학사 관련 질문을 입력하세요..."
              className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              style={{ minHeight: '44px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white p-2 xs:p-3 rounded-full transition-colors duration-200 disabled:cursor-not-allowed touch-manipulation flex-shrink-0"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Start Chat Button */}
        <div className="mt-3 text-center">
          <button
            onClick={() => window.location.href = '/chat'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            💬 실제 채팅 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAISection;
