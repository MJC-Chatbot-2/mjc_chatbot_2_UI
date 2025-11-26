import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useState({
    name: '김학생',
    studentId: '2024123456',
    department: '컴퓨터공학과',
    avatar: '/자산 1.svg'
  });

  const [recentChats] = useState([
    {
      id: 1,
      title: '졸업 요건에 대해 알려주세요',
      lastMessage: '졸업 요건은 총 130학점 이상 이수해야 합니다.',
      timestamp: '2024-01-15 14:30',
      unread: 0
    },
    {
      id: 2,
      title: '수강신청 도움을 받고 싶어요',
      lastMessage: '수강신청은 2월 15일부터 시작됩니다.',
      timestamp: '2024-01-14 09:15',
      unread: 2
    },
    {
      id: 3,
      title: '장학금 신청 방법이 궁금해요',
      lastMessage: '성적 장학금 신청 방법을 알려드리겠습니다.',
      timestamp: '2024-01-13 16:45',
      unread: 1
    },
    {
      id: 4,
      title: '학사일정을 확인하고 싶어요',
      lastMessage: '2024년 1학기 학사일정을 확인해드리겠습니다.',
      timestamp: '2024-01-12 11:20',
      unread: 0
    },
    {
      id: 5,
      title: '휴학 신청 절차가 궁금해요',
      lastMessage: '휴학 신청은 학사지원팀에서 접수받습니다.',
      timestamp: '2024-01-11 10:30',
      unread: 0
    },
    {
      id: 6,
      title: '성적 확인 방법을 알려주세요',
      lastMessage: '성적은 포털시스템에서 확인할 수 있습니다.',
      timestamp: '2024-01-10 15:20',
      unread: 0
    }
  ]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const handleNewChat = () => {
    navigate('/chat');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header-section bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* 햄버거 메뉴 버튼 */}
            <button
              onClick={toggleSidebar}
              className="hamburger-btn"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="user-name text-gray-900">MJC AI Chat</h1>
              <p className="user-info text-gray-500">학사 챗봇</p>
            </div>
          </div>
          {/* 새 채팅 아이콘 버튼 */}
          <button
            onClick={handleNewChat}
            className="new-chat-icon-btn p-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content - 심플한 채팅 시작 화면 */}
      <div className="main-content">
        <div className="chat-start-container">
          {/* AI 아바타 */}
          <div className="ai-avatar-large">
            <img 
              src={user.avatar} 
              alt="MJC AI" 
              className="avatar-image-large"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback-large" style={{display: 'none'}}>
              <span className="avatar-text-large">AI</span>
            </div>
          </div>

          {/* 메인 제목 */}
          <h1 className="main-title">MJC AI Chat</h1>
          <p className="main-subtitle">학사 관련 질문을 자유롭게 물어보세요</p>

          {/* 새 채팅 시작 버튼 */}
          <button
            onClick={handleNewChat}
            className="start-chat-main-btn"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            새 대화 시작하기
          </button>

          {/* 빠른 질문 제안 */}
          <div className="quick-questions">
            <p className="quick-questions-title">빠른 질문</p>
            <div className="question-chips">
              <button 
                onClick={() => navigate('/chat', { state: { autoQuestion: '졸업 요건이 궁금해요' } })}
                className="question-chip"
              >
                졸업 요건이 궁금해요
              </button>
              <button 
                onClick={() => navigate('/chat', { state: { autoQuestion: '수강신청 도움받기' } })}
                className="question-chip"
              >
                수강신청 도움받기
              </button>
              <button 
                onClick={() => navigate('/chat', { state: { autoQuestion: '장학금 정보' } })}
                className="question-chip"
              >
                장학금 정보
              </button>
              <button 
                onClick={() => navigate('/chat', { state: { autoQuestion: '학사일정 확인' } })}
                className="question-chip"
              >
                학사일정 확인
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 사이드바 오버레이 */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* 사이드바 */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="flex items-center space-x-3">
            <div className="profile-avatar bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-xs">AI</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.studentId}</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="close-btn p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="sidebar-content">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">최근 대화</h4>
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    handleChatClick(chat.id);
                    closeSidebar();
                  }}
                  className="chat-item bg-white rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="chat-title font-medium text-gray-900 truncate">{chat.title}</h5>
                      </div>
                      <p className="chat-message text-gray-500 truncate">{chat.lastMessage}</p>
                      <p className="chat-timestamp text-gray-400 mt-1">{chat.timestamp}</p>
                    </div>
                    <div className="text-gray-400 ml-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
