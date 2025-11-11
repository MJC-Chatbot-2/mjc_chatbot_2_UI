import React, { useState } from 'react';
import AskAISection from './AskAISection';
import GlassChatSection from './GlassChatSection';

const MockupPage = () => {
  const [theme, setTheme] = useState('default'); // 'default' or 'glass'

  return (
    <div className="min-h-screen">
      {/* Theme Selector */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`backdrop-blur-md rounded-full p-1 border shadow-lg ${
          theme === 'glass' 
            ? 'bg-white/20 border-white/30' 
            : 'bg-gray-800/20 border-gray-300/30'
        }`}>
          <div className="flex space-x-1">
            <button
              onClick={() => setTheme('default')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                theme === 'default'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : theme === 'glass' 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              기본
            </button>
            <button
              onClick={() => setTheme('glass')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                theme === 'glass'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : theme === 'default' 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
              }`}
            >
              글래스
            </button>
          </div>
        </div>
      </div>

      {/* Render selected theme */}
      {theme === 'default' ? <AskAISection /> : <GlassChatSection />}
    </div>
  );
};

export default MockupPage;




