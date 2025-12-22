/**
 * 채팅 관련 API 호출 유틸리티
 * SSO 제거 - 대화 기록은 로컬스토리지에서 관리
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://10.51.61.37:8000';

/**
 * 채팅 API 호출
 */
export const sendChatMessage = async (message, chatHistory = []) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat_v`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        chat_history: chatHistory
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[chatApi] 채팅 메시지 전송 실패:', error);
    throw error;
  }
};

// 로컬스토리지 키
const CHAT_SESSIONS_KEY = 'mjc_chat_sessions';
const CURRENT_SESSION_KEY = 'mjc_current_session';

/**
 * 로컬스토리지에서 모든 채팅 세션 가져오기
 */
export const getLocalChatSessions = () => {
  try {
    const sessions = localStorage.getItem(CHAT_SESSIONS_KEY);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error('[chatApi] 로컬스토리지 읽기 실패:', error);
    return [];
  }
};

/**
 * 로컬스토리지에 채팅 세션 저장
 */
export const saveLocalChatSessions = (sessions) => {
  try {
    localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('[chatApi] 로컬스토리지 저장 실패:', error);
  }
};

/**
 * 새 채팅 세션 생성 (로컬스토리지)
 */
export const createLocalChatSession = (title = null) => {
  const sessions = getLocalChatSessions();
  
  // 세션 ID 생성 (간단한 UUID 형식)
  const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  const newSession = {
    id: sessionId,
    title: title || '새로운 채팅',
    messages: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // 10개 제한 - 가장 오래된 세션 삭제
  if (sessions.length >= 10) {
    sessions.pop(); // 마지막(가장 오래된) 세션 삭제
  }
  
  // 새 세션을 맨 앞에 추가
  sessions.unshift(newSession);
  saveLocalChatSessions(sessions);
  
  return newSession;
};

/**
 * 특정 채팅 세션 가져오기 (로컬스토리지)
 */
export const getLocalChatSession = (sessionId) => {
  const sessions = getLocalChatSessions();
  return sessions.find(s => s.id === sessionId) || null;
};

/**
 * 채팅 세션에 메시지 추가 (로컬스토리지)
 */
export const addMessageToLocalSession = (sessionId, message) => {
  const sessions = getLocalChatSessions();
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);
  
  if (sessionIndex === -1) return false;
  
  sessions[sessionIndex].messages.push(message);
  sessions[sessionIndex].updated_at = new Date().toISOString();
  
  // 첫 번째 사용자 메시지로 제목 설정
  if (!sessions[sessionIndex].title || sessions[sessionIndex].title === '새로운 채팅') {
    const userMessages = sessions[sessionIndex].messages.filter(m => m.role === 'user');
    if (userMessages.length === 1 && message.role === 'user') {
      sessions[sessionIndex].title = message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '');
    }
  }
  
  // 최근 수정된 세션을 맨 앞으로 이동
  const [updatedSession] = sessions.splice(sessionIndex, 1);
  sessions.unshift(updatedSession);
  
  saveLocalChatSessions(sessions);
  return true;
};

/**
 * 채팅 세션 삭제 (로컬스토리지)
 */
export const deleteLocalChatSession = (sessionId) => {
  const sessions = getLocalChatSessions();
  const filteredSessions = sessions.filter(s => s.id !== sessionId);
  saveLocalChatSessions(filteredSessions);
  return true;
};

/**
 * 현재 세션 ID 저장
 */
export const setCurrentSessionId = (sessionId) => {
  if (sessionId) {
    localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
  } else {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
};

/**
 * 현재 세션 ID 가져오기
 */
export const getCurrentSessionId = () => {
  return localStorage.getItem(CURRENT_SESSION_KEY);
};
