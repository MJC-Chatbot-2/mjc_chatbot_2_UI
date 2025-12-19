import React, { useState } from 'react';
import LiquidGlass1 from './mockups/LiquidGlass1';
import LiquidGlass2 from './mockups/LiquidGlass2';
import Neumorphism1 from './mockups/Neumorphism1';
import Neumorphism2 from './mockups/Neumorphism2';
import Glassmorphism1 from './mockups/Glassmorphism1';
import Glassmorphism2 from './mockups/Glassmorphism2';
import SoftUI1 from './mockups/SoftUI1';
import SoftUI2 from './mockups/SoftUI2';
import FlatDesign1 from './mockups/FlatDesign1';
import FlatDesign2 from './mockups/FlatDesign2';
import Skeuomorphism1 from './mockups/Skeuomorphism1';
import Skeuomorphism2 from './mockups/Skeuomorphism2';
import MaterialYou1 from './mockups/MaterialYou1';
import MaterialYou2 from './mockups/MaterialYou2';
import Brutalism1 from './mockups/Brutalism1';
import Brutalism2 from './mockups/Brutalism2';

const MOCKUP_COMPONENTS = {
  'liquid-glass-1': LiquidGlass1,
  'liquid-glass-2': LiquidGlass2,
  'neumorphism-1': Neumorphism1,
  'neumorphism-2': Neumorphism2,
  'glassmorphism-1': Glassmorphism1,
  'glassmorphism-2': Glassmorphism2,
  'soft-ui-1': SoftUI1,
  'soft-ui-2': SoftUI2,
  'flat-design-1': FlatDesign1,
  'flat-design-2': FlatDesign2,
  'skeuomorphism-1': Skeuomorphism1,
  'skeuomorphism-2': Skeuomorphism2,
  'material-you-1': MaterialYou1,
  'material-you-2': MaterialYou2,
  'brutalism-1': Brutalism1,
  'brutalism-2': Brutalism2,
};

const STYLE_CATEGORIES = [
  { name: '리퀴드글래스', styles: ['liquid-glass-1', 'liquid-glass-2'] },
  { name: '뉴모피즘', styles: ['neumorphism-1', 'neumorphism-2'] },
  { name: '글래스모피즘', styles: ['glassmorphism-1', 'glassmorphism-2'] },
  { name: '소프트UI', styles: ['soft-ui-1', 'soft-ui-2'] },
  { name: '플랫디자인', styles: ['flat-design-1', 'flat-design-2'] },
  { name: '스큐어모피즘', styles: ['skeuomorphism-1', 'skeuomorphism-2'] },
  { name: 'Material You', styles: ['material-you-1', 'material-you-2'] },
  { name: 'Brutalism UI', styles: ['brutalism-1', 'brutalism-2'] },
];

const MockupPage = () => {
  const [selectedStyle, setSelectedStyle] = useState('liquid-glass-1');

  const SelectedComponent = MOCKUP_COMPONENTS[selectedStyle] || LiquidGlass1;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 스타일 선택기 */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          스타일 선택
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {STYLE_CATEGORIES.map(category => (
            <div key={category.name}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#6b7280',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {category.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {category.styles.map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: selectedStyle === style 
                        ? '2px solid #667eea' 
                        : '2px solid #e5e7eb',
                      background: selectedStyle === style 
                        ? '#667eea' 
                        : '#f9fafb',
                      color: selectedStyle === style ? '#ffffff' : '#374151',
                      fontWeight: selectedStyle === style ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '0.875rem',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => {
                      if (selectedStyle !== style) {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.borderColor = '#d1d5db';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedStyle !== style) {
                        e.target.style.background = '#f9fafb';
                        e.target.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    {style.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')} {style.split('-').pop()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 컴포넌트 렌더링 */}
      <SelectedComponent />
    </div>
  );
};

export default MockupPage;
