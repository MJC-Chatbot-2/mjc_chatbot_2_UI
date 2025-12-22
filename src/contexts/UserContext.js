import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // SSO 제거 - 유저 정보 불필요
  // 대화 기록은 로컬스토리지에서 직접 관리
  return (
    <UserContext.Provider value={{}}>
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
