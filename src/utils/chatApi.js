/**
 * 채팅 관련 API 호출 유틸리티
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * 사용자의 모든 채팅 세션 조회
 */
export const fetchChatSessions = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/sessions/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[chatApi] 채팅 세션 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 새 채팅 세션 생성
 */
export const createChatSession = async (userId, title = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        user_id: userId,
        title: title,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[chatApi] 채팅 세션 생성 실패:', error);
    throw error;
  }
};

/**
 * 채팅 세션 삭제
 */
export const deleteChatSession = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[chatApi] 채팅 세션 삭제 실패:', error);
    throw error;
  }
};

/**
 * 특정 세션의 대화기록 조회
 */
export const fetchSessionMessages = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/sessions/${sessionId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[chatApi] 대화기록 조회 실패:', error);
    throw error;
  }
};

