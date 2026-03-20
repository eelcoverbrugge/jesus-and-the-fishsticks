'use client';

import { useState, useEffect } from 'react';

const THEMES = [
  {
    id: 'dark',
    name: 'Donker',
    desc: 'Metal & Rock',
    colors: ['#080808', '#e8c84a', '#c0392b'],
    fonts: 'Oswald',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    desc: 'Klassiek poster',
    colors: ['#f5efe0', '#b8741a', '#7a2e24'],
    fonts: 'Playfair',
  },
  {
    id: 'neon',
    name: 'Neon',
    desc: 'Cyberpunk glow',
    colors: ['#04040f', '#00f0c0', '#ff0080'],
    fonts: 'Space',
  },
  {
    id: 'minimal',
    name: 'Minimaal',
    desc: 'Clean & wit',
    colors: ['#fafafa', '#e63946', '#457b9d'],
    fonts: 'Inter',
  },
  {
    id: 'retro',
    name: 'Retro 70s',
    desc: 'Warm & groovy',
    colors: ['#160e04', '#ff8c1a', '#c8e000'],
    fonts: 'Righteous',
  },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('jtf-theme') || 'dark';
    setCurrentTheme(saved);
  }, []);

  function applyTheme(id: string) {
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem('jtf-theme', id);
    setCurrentTheme(id);
    setTimeout(() => setIsOpen(false), 350);
  }

  function handleClose() {
    setIsOpen(false);
  }

  // Close panel on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const panel = document.getElementById('ts-panel');
      const btn = document.getElementById('ts-btn');
      if (
        panel &&
        btn &&
        !panel.contains(e.target as Node) &&
        !btn.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const currentThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <>
      <button
        id="ts-btn"
        title={`Layout: ${currentThemeObj.name}`}
        aria-label="Layout kiezen"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>

      <div
        id="ts-panel"
        className={isOpen ? 'open' : ''}
        role="dialog"
        aria-label="Layout kiezen"
      >
        <div className="ts-header">
          <span>Kies een layout</span>
          <button className="ts-close" aria-label="Sluiten" onClick={handleClose}>
            ✕
          </button>
        </div>
        <div className="ts-grid">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              className={`ts-card${currentTheme === theme.id ? ' ts-active' : ''}`}
              data-theme={theme.id}
              onClick={() => applyTheme(theme.id)}
            >
              <div className="ts-swatches">
                {theme.colors.map((color, i) => (
                  <span
                    key={i}
                    className="ts-swatch"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="ts-info">
                <span className="ts-name">{theme.name}</span>
                <span className="ts-desc">
                  {theme.desc} &nbsp;·&nbsp; {theme.fonts}
                </span>
              </div>
              <span className="ts-check">✓</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
