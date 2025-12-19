import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { fetchChatSessions, createChatSession, deleteChatSession } from '../utils/chatApi';
import ConfirmDialog from './ConfirmDialog';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo, isLoadingUser } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 유저 정보 처리: 이름이 비어있으면 "김학생"으로 표시
  const user = useMemo(() => {
    if (!userInfo) {
      return {
        name: '김학생',
        studentId: '-',
        avatar: '/자산 1.svg'
      };
    }
    return {
      name: userInfo.name || '김학생',
      studentId: userInfo.student_no || '-',
      avatar: '/자산 1.svg'
    };
  }, [userInfo]);

  const [recentChats, setRecentChats] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  // 최근 대화기록 로드
  const loadChatSessions = async () => {
    if (!userInfo?.id) {
      setIsLoadingChats(false);
      return;
    }

    try {
      setIsLoadingChats(true);
      const data = await fetchChatSessions(userInfo.id);
      
      if (data.success && data.sessions) {
        // 세션 데이터를 컴포넌트 형식으로 변환
        const formattedChats = data.sessions.map(session => {
          const date = new Date(session.updated_at || session.created_at);
          const now = new Date();
          const diffMs = now - date;
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          
          let timestampStr = '';
          if (diffDays === 0) {
            // 오늘
            const hours = date.getHours();
            const minutes = date.getMinutes();
            timestampStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          } else if (diffDays === 1) {
            timestampStr = '어제';
          } else if (diffDays < 7) {
            timestampStr = `${diffDays}일 전`;
          } else {
            timestampStr = date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
          }

          return {
            id: session.id,
            title: session.title || '새로운 채팅',
            lastMessage: '', // 마지막 메시지는 별도로 가져와야 함
            timestamp: timestampStr,
            unread: 0
          };
        });
        setRecentChats(formattedChats);
      }
    } catch (error) {
      console.error('[Dashboard] 채팅 세션 로드 실패:', error);
      setRecentChats([]);
    } finally {
      setIsLoadingChats(false);
    }
  };

  useEffect(() => {
    loadChatSessions();
  }, [userInfo]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const handleNewChat = async () => {
    if (!userInfo?.id) {
      console.error('[Dashboard] 사용자 정보가 없습니다.');
      return;
    }

    try {
      // 현재 세션 개수 확인
      const data = await fetchChatSessions(userInfo.id);
      
      if (data.success && data.count >= 10) {
        // 10개 이상이면 확인 다이얼로그 표시
        setPendingAction(() => async () => {
          // 가장 오래된 세션을 삭제하고 새 세션 생성
          // 백엔드에서 자동으로 처리하므로 그냥 생성하면 됨
          await createNewChatSession();
        });
        setShowConfirmDialog(true);
      } else {
        // 10개 미만이면 바로 생성
        await createNewChatSession();
      }
    } catch (error) {
      console.error('[Dashboard] 새 채팅 생성 실패:', error);
      alert('새 채팅을 생성하는 중 오류가 발생했습니다.');
    }
  };

  const createNewChatSession = async () => {
    try {
      const data = await createChatSession(userInfo.id, null);
      
      if (data.success && data.session) {
        // 새 세션으로 이동
        navigate(`/chat/${data.session.id}`);
      } else {
        throw new Error('세션 생성 실패');
      }
    } catch (error) {
      console.error('[Dashboard] 세션 생성 실패:', error);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDialog(false);
    if (pendingAction) {
      await pendingAction();
      setPendingAction(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const handleDeleteClick = (e, chatId) => {
    e.stopPropagation(); // 채팅 클릭 이벤트 방지
    setSessionToDelete(chatId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDeleteSession = async () => {
    if (!sessionToDelete) return;

    try {
      const data = await deleteChatSession(sessionToDelete);
      
      if (data.success) {
        // 목록 새로고침
        await loadChatSessions();
        setShowDeleteDialog(false);
        setSessionToDelete(null);
      } else {
        throw new Error('세션 삭제 실패');
      }
    } catch (error) {
      console.error('[Dashboard] 세션 삭제 실패:', error);
      alert('채팅을 삭제하는 중 오류가 발생했습니다.');
      setShowDeleteDialog(false);
      setSessionToDelete(null);
    }
  };

  const handleCancelDeleteSession = () => {
    setShowDeleteDialog(false);
    setSessionToDelete(null);
  };

  const handleNewChatWithQuestion = async (question) => {
    if (!userInfo?.id) {
      console.error('[Dashboard] 사용자 정보가 없습니다.');
      return;
    }

    try {
      // 현재 세션 개수 확인
      const data = await fetchChatSessions(userInfo.id);
      
      if (data.success && data.count >= 10) {
        // 10개 이상이면 확인 다이얼로그 표시
        setPendingAction(() => async () => {
          await createNewChatSessionWithQuestion(question);
        });
        setShowConfirmDialog(true);
      } else {
        // 10개 미만이면 바로 생성
        await createNewChatSessionWithQuestion(question);
      }
    } catch (error) {
      console.error('[Dashboard] 새 채팅 생성 실패:', error);
      alert('새 채팅을 생성하는 중 오류가 발생했습니다.');
    }
  };

  const createNewChatSessionWithQuestion = async (question) => {
    try {
      const data = await createChatSession(userInfo.id, null);
      
      if (data.success && data.session) {
        // 새 세션으로 이동 (자동 질문 포함)
        navigate(`/chat/${data.session.id}`, { state: { autoQuestion: question } });
      } else {
        throw new Error('세션 생성 실패');
      }
    } catch (error) {
      console.error('[Dashboard] 세션 생성 실패:', error);
      throw error;
    }
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
              <svg className="w-6 h-6 hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="user-name text-gray-900">명전이</h1>
            </div>
          </div>
          {/* 새 채팅 아이콘 버튼 */}
          <button
            onClick={handleNewChat}
            className="new-chat-icon-btn"
          >
            <svg className="w-5 h-5 pencil-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                onClick={async () => {
                  const question = '졸업 요건이 궁금해요';
                  await handleNewChatWithQuestion(question);
                }}
                className="question-chip"
              >
                졸업 요건이 궁금해요
              </button>
              <button 
                onClick={async () => {
                  const question = '수강신청 도움받기';
                  await handleNewChatWithQuestion(question);
                }}
                className="question-chip"
              >
                수강신청 도움받기
              </button>
              <button 
                onClick={async () => {
                  const question = '장학금 정보';
                  await handleNewChatWithQuestion(question);
                }}
                className="question-chip"
              >
                장학금 정보
              </button>
              <button 
                onClick={async () => {
                  const question = '학사일정 확인';
                  await handleNewChatWithQuestion(question);
                }}
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
            {isLoadingChats ? (
              <div className="text-center py-4 text-gray-500">로딩 중...</div>
            ) : recentChats.length === 0 ? (
              <div className="text-center py-4 text-gray-500">대화 기록이 없습니다.</div>
            ) : (
              <div className="space-y-1">
                {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="chat-item bg-white rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer border border-gray-100 relative group"
                >
                  <div 
                    onClick={() => {
                      handleChatClick(chat.id);
                      closeSidebar();
                    }}
                    className="flex items-center justify-between pr-8"
                  >
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
                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => handleDeleteClick(e, chat.id)}
                    className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-red-100 rounded-full text-red-500"
                    title="채팅 삭제"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 확인 다이얼로그 (10개 제한) */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="채팅방 제한 안내"
        message="채팅방은 최대 10개까지 생성할 수 있습니다. 가장 오래된 채팅방을 삭제하고 새 채팅방을 생성하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="삭제하고 생성"
        cancelText="취소"
      />

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="채팅 삭제"
        message="이 채팅을 삭제하시겠습니까? 삭제된 채팅은 복구할 수 없습니다."
        onConfirm={handleConfirmDeleteSession}
        onCancel={handleCancelDeleteSession}
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  );
};

export default Dashboard;
