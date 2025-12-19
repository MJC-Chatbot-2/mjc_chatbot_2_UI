import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    // 앱이 처음 렌더링될 때 유저 정보 요청
    const fetchUserInfo = async () => {
      console.log('[UserContext] 유저 정보 요청 시작');
      console.log('[UserContext] API Base URL:', API_BASE_URL);
      console.log('[UserContext] 요청 URL:', `${API_BASE_URL}/api/user/me`);
      
      try {
        console.log('[UserContext] fetch 요청 전송 (credentials: include)');
        const response = await fetch(`${API_BASE_URL}/api/user/me`, {
          method: 'GET',
          credentials: 'include', // 쿠키 자동 전송
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('[UserContext] 응답 받음 - 상태코드:', response.status, response.statusText);
        console.log('[UserContext] 응답 헤더:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
          const data = await response.json();
          console.log('[UserContext] 응답 데이터:', data);
          
          if (data.success && data.user) {
            console.log('[UserContext] 유저 정보 로드 성공:', data.user);
            console.log('[UserContext] 유저 ID:', data.user.id);
            console.log('[UserContext] 학번:', data.user.student_no);
            console.log('[UserContext] 이름:', data.user.name);
            setUserInfo(data.user);
          } else {
            console.warn('[UserContext] 응답은 성공했지만 유저 정보가 없음:', data);
            setUserInfo(null);
          }
        } else {
          // 인증되지 않은 경우 (401) 또는 기타 오류
          const errorText = await response.text();
          console.error('[UserContext] 유저 정보 로드 실패:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          setUserInfo(null);
        }
      } catch (error) {
        console.error('[UserContext] 유저 정보 요청 오류:', error);
        console.error('[UserContext] 오류 상세:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        setUserInfo(null);
      } finally {
        console.log('[UserContext] 로딩 완료');
        setIsLoadingUser(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, isLoadingUser, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

