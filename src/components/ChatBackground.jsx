import React from 'react';

const ChatBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen bg-white overflow-hidden rounded-lg ${className}`}>
      {/* Soft gradient background from bottom center */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-100 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-50 via-transparent to-transparent opacity-60"></div>
      
      {/* Additional subtle radial gradient from bottom center */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center bottom, #ffe1f0 0%, #e5d8ff 30%, transparent 70%)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ChatBackground;


