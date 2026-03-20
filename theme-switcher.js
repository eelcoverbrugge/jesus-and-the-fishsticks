/**
 * Jesus & The Fishsticks — Theme Switcher
 * Gear icon overlay, 5 layouts, persists via localStorage.
 */
(function () {
  'use strict';

  const THEMES = [
    {
      id: 'dark',
      name: 'Donker',
      desc: 'Metal & Rock',
      colors: ['#080808', '#e8c84a', '#c0392b'],
      fonts: 'Oswald'
    },
    {
      id: 'vintage',
      name: 'Vintage',
      desc: 'Klassiek poster',
      colors: ['#f5efe0', '#b8741a', '#7a2e24'],
      fonts: 'Playfair'
    },
    {
      id: 'neon',
      name: 'Neon',
      desc: 'Cyberpunk glow',
      colors: ['#04040f', '#00f0c0', '#ff0080'],
      fonts: 'Space'
    },
    {
      id: 'minimal',
      name: 'Minimaal',
      desc: 'Clean & wit',
      colors: ['#fafafa', '#e63946', '#457b9d'],
      fonts: 'Inter'
    },
    {
      id: 'retro',
      name: 'Retro 70s',
      desc: 'Warm & groovy',
      colors: ['#160e04', '#ff8c1a', '#c8e000'],
      fonts: 'Righteous'
    }
  ];

  /* ── Apply theme immediately (prevents FOUC) ── */
  function applyTheme(id, save) {
    document.documentElement.setAttribute('data-theme', id);
    if (save) localStorage.setItem('jtf-theme', id);
    document.querySelectorAll('.ts-card').forEach(c => {
      c.classList.toggle('ts-active', c.dataset.theme === id);
    });
    /* Update gear button tooltip */
    const btn = document.getElementById('ts-btn');
    if (btn) btn.title = 'Layout: ' + (THEMES.find(t => t.id === id) || THEMES[0]).name;
  }

  const saved = localStorage.getItem('jtf-theme') || 'dark';
  applyTheme(saved, false);

  /* ── Inject CSS ── */
  const css = `
    /* ── Gear button ── */
    #ts-btn {
      position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 9999;
      width: 52px; height: 52px; border-radius: 50%;
      background: var(--accent, #e8c84a); color: var(--bg, #080808);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(0,0,0,.5);
      transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
    }
    #ts-btn:hover { transform: rotate(60deg) scale(1.08); }
    #ts-btn svg { width: 24px; height: 24px; fill: currentColor; }

    /* ── Panel ── */
    #ts-panel {
      position: fixed; bottom: 5.5rem; right: 1.75rem; z-index: 9998;
      width: 300px;
      background: var(--card, #131313); border: 1px solid var(--border, #1e1e1e);
      box-shadow: 0 8px 40px rgba(0,0,0,.6);
      transform: translateY(20px) scale(.97); opacity: 0; pointer-events: none;
      transition: transform .25s, opacity .25s;
    }
    #ts-panel.open {
      transform: translateY(0) scale(1); opacity: 1; pointer-events: all;
    }
    .ts-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border, #1e1e1e);
    }
    .ts-header span {
      font-family: var(--font-h, 'Oswald', sans-serif);
      font-size: .8rem; letter-spacing: .2em; text-transform: uppercase;
      color: var(--text, #f0ead8);
    }
    .ts-close {
      background: none; border: none; cursor: pointer;
      color: var(--mid, #777); font-size: 1.1rem; line-height: 1;
      padding: 0 .25rem; transition: color .15s;
    }
    .ts-close:hover { color: var(--accent, #e8c84a); }

    /* ── Theme cards ── */
    .ts-grid {
      display: flex; flex-direction: column; gap: 0;
    }
    .ts-card {
      display: flex; align-items: center; gap: .9rem;
      padding: .85rem 1.25rem; cursor: pointer;
      background: none; border: none; text-align: left; width: 100%;
      border-bottom: 1px solid var(--border, #1e1e1e);
      transition: background .15s;
    }
    .ts-card:last-child { border-bottom: none; }
    .ts-card:hover { background: var(--dark, #0e0e0e); }
    .ts-card.ts-active { background: var(--dark, #0e0e0e); }
    .ts-swatches {
      display: flex; gap: 3px; flex-shrink: 0;
    }
    .ts-swatch {
      width: 14px; height: 28px;
      display: block;
    }
    .ts-swatch:first-child { width: 22px; }
    .ts-info { flex: 1; min-width: 0; }
    .ts-name {
      font-family: var(--font-h, 'Oswald', sans-serif);
      font-size: .9rem; text-transform: uppercase; letter-spacing: .05em;
      color: var(--text, #f0ead8); display: block;
    }
    .ts-desc {
      font-size: .72rem; color: var(--mid, #777);
      letter-spacing: .05em; display: block; margin-top: .1rem;
    }
    .ts-check {
      color: var(--accent, #e8c84a); font-size: 1rem; flex-shrink: 0;
      opacity: 0; transition: opacity .15s;
    }
    .ts-card.ts-active .ts-check { opacity: 1; }

    /* Responsive: smaller panel on mobile */
    @media (max-width: 380px) {
      #ts-panel { right: 1rem; width: calc(100vw - 2rem); }
      #ts-btn { right: 1rem; bottom: 1.25rem; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Build UI after DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    const current = localStorage.getItem('jtf-theme') || 'dark';

    /* Gear icon SVG */
    const gearSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>`;

    /* Build theme cards HTML */
    const cardsHTML = THEMES.map(t => `
      <button class="ts-card ${t.id === current ? 'ts-active' : ''}" data-theme="${t.id}">
        <div class="ts-swatches">
          ${t.colors.map(c => `<span class="ts-swatch" style="background:${c}"></span>`).join('')}
        </div>
        <div class="ts-info">
          <span class="ts-name">${t.name}</span>
          <span class="ts-desc">${t.desc} &nbsp;·&nbsp; ${t.fonts}</span>
        </div>
        <span class="ts-check">✓</span>
      </button>
    `).join('');

    /* Gear button */
    const btn = document.createElement('button');
    btn.id = 'ts-btn';
    btn.innerHTML = gearSVG;
    btn.title = 'Layout kiezen';
    btn.setAttribute('aria-label', 'Layout kiezen');

    /* Panel */
    const panel = document.createElement('div');
    panel.id = 'ts-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Layout kiezen');
    panel.innerHTML = `
      <div class="ts-header">
        <span>Kies een layout</span>
        <button class="ts-close" aria-label="Sluiten">✕</button>
      </div>
      <div class="ts-grid">${cardsHTML}</div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    /* Events */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    panel.querySelector('.ts-close').addEventListener('click', () => panel.classList.remove('open'));
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== btn) {
        panel.classList.remove('open');
      }
    });
    panel.querySelectorAll('.ts-card').forEach(card => {
      card.addEventListener('click', () => {
        applyTheme(card.dataset.theme, true);
        /* Brief delay so user sees the checkmark, then close */
        setTimeout(() => panel.classList.remove('open'), 350);
      });
    });
  });
})();
