/**
 * Jesus & The Fishsticks — Global Audio Player
 * Sticky bottom bar, works on every page, persists state.
 */
(function () {
  'use strict';

  /* ── Playlist ─────────────────────────────────────────────────── */
  const PLAYLIST = [
    {
      title:  'Straight from the Can',
      artist: 'Jesus & The Fishsticks',
      genre:  'Blues',
      src:    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      title:  'Fishsticks Blues',
      artist: 'Jesus & The Fishsticks',
      genre:  'Blues',
      src:    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      title:  'Jesus on the Radio',
      artist: 'Jesus & The Fishsticks',
      genre:  'Rock & Roll',
      src:    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title:  'Novadic Nights',
      artist: 'Jesus & The Fishsticks',
      genre:  'Rock & Roll',
      src:    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
    {
      title:  'PopEi Shuffle',
      artist: 'Jesus & The Fishsticks',
      genre:  'Industriële Punk',
      src:    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
    }
  ];

  /* ── State ────────────────────────────────────────────────────── */
  let currentIndex = 0;
  let isPlaying    = false;
  let audio        = new Audio();
  audio.volume     = 0.8;
  audio.preload    = 'metadata';

  /* ── Inject CSS ───────────────────────────────────────────────── */
  const css = `
    /* Push page content up so player doesn't overlap footer */
    body { padding-bottom: 72px; }

    /* Shift gear icon above the player */
    #ts-btn   { bottom: 90px !important; }
    #ts-panel { bottom: 9.5rem !important; }

    /* ── Player bar ── */
    #ap {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9000;
      height: 72px;
      background: var(--card, #131313);
      border-top: 1px solid var(--border, #1e1e1e);
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 0 1.5rem;
      padding: 0 1.5rem;
      transition: background .3s, border-color .3s;
    }

    /* Neon theme: glowing top border */
    [data-theme="neon"] #ap {
      border-top: 1px solid var(--accent);
      box-shadow: 0 -4px 30px rgba(0,240,192,.12);
    }

    /* ── Left: track info ── */
    .ap-track {
      display: flex; align-items: center; gap: .9rem;
      min-width: 0;
    }
    .ap-art {
      width: 44px; height: 44px; flex-shrink: 0;
      background: var(--dark, #0e0e0e);
      border: 1px solid var(--border, #1e1e1e);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
    }
    .ap-info { min-width: 0; }
    .ap-title {
      font-family: var(--font-h, 'Oswald', sans-serif);
      font-size: .85rem; text-transform: uppercase; letter-spacing: .05em;
      color: var(--text, #f0ead8);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: block;
    }
    .ap-artist {
      font-size: .72rem; color: var(--mid, #777);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      display: block; margin-top: .1rem;
    }
    .ap-genre-tag {
      display: inline-block; margin-top: .25rem;
      font-size: .6rem; letter-spacing: .1em; text-transform: uppercase;
      color: var(--accent, #e8c84a);
    }

    /* ── Center: controls + progress ── */
    .ap-center {
      display: flex; flex-direction: column; align-items: center; gap: .35rem;
      min-width: 280px;
    }
    .ap-controls {
      display: flex; align-items: center; gap: .5rem;
    }
    .ap-btn {
      background: none; border: none; cursor: pointer;
      color: var(--mid, #777); font-size: 1rem; padding: .35rem;
      transition: color .15s, transform .1s;
      display: flex; align-items: center; justify-content: center;
      border-radius: 50%;
    }
    .ap-btn:hover { color: var(--text, #f0ead8); }
    .ap-btn:active { transform: scale(.9); }
    .ap-btn svg { width: 18px; height: 18px; fill: currentColor; }

    #ap-play-btn {
      width: 38px; height: 38px;
      background: var(--accent, #e8c84a);
      color: var(--bg, #080808) !important;
      border-radius: 50%;
    }
    #ap-play-btn:hover { filter: brightness(1.1); }
    [data-theme="neon"] #ap-play-btn {
      box-shadow: 0 0 15px rgba(0,240,192,.5);
    }
    #ap-play-btn svg { width: 16px; height: 16px; }

    /* Shuffle / repeat */
    .ap-btn.active { color: var(--accent, #e8c84a) !important; }

    /* Progress */
    .ap-timeline {
      display: flex; align-items: center; gap: .6rem; width: 100%;
    }
    .ap-time {
      font-size: .65rem; color: var(--mid, #777);
      font-variant-numeric: tabular-nums; min-width: 30px;
    }
    .ap-time.right { text-align: right; }
    .ap-progress {
      flex: 1; height: 3px; background: var(--border, #1e1e1e);
      border-radius: 2px; cursor: pointer; position: relative;
    }
    .ap-progress:hover .ap-progress-fill::after { opacity: 1; }
    .ap-progress-fill {
      height: 100%; background: var(--accent, #e8c84a);
      border-radius: 2px; width: 0%; transition: width .25s linear;
      position: relative; pointer-events: none;
    }
    .ap-progress-fill::after {
      content: ''; position: absolute; right: -5px; top: -4px;
      width: 11px; height: 11px; border-radius: 50%;
      background: var(--accent, #e8c84a);
      opacity: 0; transition: opacity .15s;
    }
    [data-theme="neon"] .ap-progress-fill {
      box-shadow: 0 0 6px var(--accent);
    }

    /* ── Right: volume + playlist toggle ── */
    .ap-right {
      display: flex; align-items: center; gap: .75rem; justify-content: flex-end;
    }
    .ap-vol {
      display: flex; align-items: center; gap: .5rem;
    }
    .ap-vol-slider {
      -webkit-appearance: none; appearance: none;
      width: 70px; height: 3px; border-radius: 2px;
      background: var(--border, #1e1e1e); outline: none; cursor: pointer;
      background-image: linear-gradient(var(--accent, #e8c84a), var(--accent, #e8c84a));
      background-size: 80% 100%; background-repeat: no-repeat;
    }
    .ap-vol-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 11px; height: 11px;
      border-radius: 50%; background: var(--accent, #e8c84a); cursor: pointer;
    }
    .ap-vol-slider::-moz-range-thumb {
      width: 11px; height: 11px; border: none; border-radius: 50%;
      background: var(--accent, #e8c84a); cursor: pointer;
    }

    /* ── Playlist drawer ── */
    #ap-playlist {
      position: fixed; bottom: 72px; left: 0; right: 0; z-index: 8999;
      background: var(--dark, #0e0e0e);
      border-top: 1px solid var(--border, #1e1e1e);
      max-height: 260px; overflow-y: auto;
      transform: translateY(100%); opacity: 0; pointer-events: none;
      transition: transform .3s cubic-bezier(.25,.46,.45,.94), opacity .3s;
    }
    #ap-playlist.open {
      transform: translateY(0); opacity: 1; pointer-events: all;
    }
    .ap-pl-item {
      display: grid; grid-template-columns: 32px 1fr auto;
      align-items: center; gap: 1rem;
      padding: .75rem 1.5rem; cursor: pointer;
      border-bottom: 1px solid var(--border, #1e1e1e);
      transition: background .15s;
    }
    .ap-pl-item:last-child { border-bottom: none; }
    .ap-pl-item:hover { background: var(--card, #131313); }
    .ap-pl-item.playing { background: var(--card, #131313); }
    .ap-pl-num {
      font-family: var(--font-h, 'Oswald', sans-serif);
      font-size: .8rem; color: var(--mid, #777); text-align: center;
    }
    .ap-pl-item.playing .ap-pl-num { color: var(--accent, #e8c84a); }
    .ap-pl-info .ap-pl-title {
      font-family: var(--font-h, 'Oswald', sans-serif);
      font-size: .88rem; text-transform: uppercase; letter-spacing: .04em;
      color: var(--text, #f0ead8); display: block;
    }
    .ap-pl-item.playing .ap-pl-title { color: var(--accent, #e8c84a); }
    .ap-pl-info .ap-pl-genre {
      font-size: .7rem; color: var(--mid, #777); display: block; margin-top: .1rem;
    }
    .ap-pl-dur { font-size: .72rem; color: var(--muted, #444); }

    /* ── Loading indicator ── */
    .ap-loading { display: none; }
    .ap-loading.active { display: block; }
    #ap-play-btn.loading { opacity: .6; }

    /* ── Mobile responsive ── */
    @media (max-width: 640px) {
      #ap {
        grid-template-columns: 1fr auto;
        height: auto; min-height: 60px;
        padding: .5rem 1rem; gap: .5rem;
      }
      .ap-center { min-width: unset; width: 100%; grid-column: 1 / -1; order: 3; padding-bottom: .25rem; }
      .ap-right { grid-column: 2; grid-row: 1; }
      .ap-vol { display: none; }
      body { padding-bottom: 100px; }
      #ap-playlist { bottom: 100px; }
    }
    @media (max-width: 380px) {
      .ap-genre-tag { display: none; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── SVG icons ────────────────────────────────────────────────── */
  const icons = {
    play:     `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
    pause:    `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
    prev:     `<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>`,
    next:     `<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`,
    volHigh:  `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
    volMute:  `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>`,
    list:     `<svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`,
    shuffle:  `<svg viewBox="0 0 24 24"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>`,
    repeat:   `<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>`
  };

  /* ── Helpers ──────────────────────────────────────────────────── */
  function fmt(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  /* ── Build DOM ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    const track = PLAYLIST[currentIndex];

    /* Player bar */
    const ap = document.createElement('div');
    ap.id = 'ap';
    ap.innerHTML = `
      <!-- Left: track info -->
      <div class="ap-track">
        <div class="ap-art">🥫</div>
        <div class="ap-info">
          <span class="ap-title">${track.title}</span>
          <span class="ap-artist">${track.artist}</span>
          <span class="ap-genre-tag">${track.genre}</span>
        </div>
      </div>

      <!-- Center: controls + progress -->
      <div class="ap-center">
        <div class="ap-controls">
          <button class="ap-btn" id="ap-shuffle" title="Willekeurig">${icons.shuffle}</button>
          <button class="ap-btn" id="ap-prev"    title="Vorige">${icons.prev}</button>
          <button class="ap-btn" id="ap-play-btn" title="Afspelen">${icons.play}</button>
          <button class="ap-btn" id="ap-next"    title="Volgende">${icons.next}</button>
          <button class="ap-btn" id="ap-repeat"  title="Herhalen">${icons.repeat}</button>
        </div>
        <div class="ap-timeline">
          <span class="ap-time" id="ap-cur">0:00</span>
          <div class="ap-progress" id="ap-progress">
            <div class="ap-progress-fill" id="ap-fill"></div>
          </div>
          <span class="ap-time right" id="ap-dur">0:00</span>
        </div>
      </div>

      <!-- Right: volume + playlist -->
      <div class="ap-right">
        <div class="ap-vol">
          <button class="ap-btn" id="ap-mute" title="Geluid">${icons.volHigh}</button>
          <input type="range" class="ap-vol-slider" id="ap-vol" min="0" max="1" step="0.01" value="0.8" />
        </div>
        <button class="ap-btn" id="ap-list-btn" title="Afspeellijst">${icons.list}</button>
      </div>
    `;

    /* Playlist drawer */
    const drawer = document.createElement('div');
    drawer.id = 'ap-playlist';
    drawer.innerHTML = PLAYLIST.map((t, i) => `
      <div class="ap-pl-item ${i === 0 ? 'playing' : ''}" data-index="${i}">
        <span class="ap-pl-num">${i + 1}</span>
        <div class="ap-pl-info">
          <span class="ap-pl-title">${t.title}</span>
          <span class="ap-pl-genre">${t.genre}</span>
        </div>
        <span class="ap-pl-dur" id="ap-pl-dur-${i}">—</span>
      </div>
    `).join('');

    document.body.appendChild(drawer);
    document.body.appendChild(ap);

    /* ── DOM refs ── */
    const playBtn    = document.getElementById('ap-play-btn');
    const prevBtn    = document.getElementById('ap-prev');
    const nextBtn    = document.getElementById('ap-next');
    const shuffleBtn = document.getElementById('ap-shuffle');
    const repeatBtn  = document.getElementById('ap-repeat');
    const muteBtn    = document.getElementById('ap-mute');
    const volSlider  = document.getElementById('ap-vol');
    const listBtn    = document.getElementById('ap-list-btn');
    const progress   = document.getElementById('ap-progress');
    const fill       = document.getElementById('ap-fill');
    const curEl      = document.getElementById('ap-cur');
    const durEl      = document.getElementById('ap-dur');
    const titleEl    = ap.querySelector('.ap-title');
    const artistEl   = ap.querySelector('.ap-artist');
    const genreEl    = ap.querySelector('.ap-genre-tag');

    let isShuffle = false;
    let isRepeat  = false;
    let isMuted   = false;
    let prevVol   = 0.8;

    /* ── Load track ── */
    function loadTrack(index, autoplay) {
      const t = PLAYLIST[index];
      currentIndex = index;
      audio.src    = t.src;
      audio.load();
      titleEl.textContent  = t.title;
      artistEl.textContent = t.artist;
      genreEl.textContent  = t.genre;
      fill.style.width     = '0%';
      curEl.textContent    = '0:00';
      durEl.textContent    = '0:00';

      /* Update playlist highlight */
      document.querySelectorAll('.ap-pl-item').forEach((el, i) => {
        el.classList.toggle('playing', i === index);
      });

      if (autoplay) {
        audio.play().then(() => {
          isPlaying = true;
          playBtn.innerHTML = icons.pause;
        }).catch(() => {});
      } else {
        isPlaying = false;
        playBtn.innerHTML = icons.play;
      }
    }

    /* ── Play / Pause ── */
    function togglePlay() {
      if (audio.paused) {
        audio.play().then(() => {
          isPlaying = true;
          playBtn.innerHTML = icons.pause;
        }).catch(() => {});
      } else {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = icons.play;
      }
    }

    /* ── Next track ── */
    function nextTrack() {
      let next;
      if (isRepeat) {
        next = currentIndex;
      } else if (isShuffle) {
        do { next = Math.floor(Math.random() * PLAYLIST.length); }
        while (next === currentIndex && PLAYLIST.length > 1);
      } else {
        next = (currentIndex + 1) % PLAYLIST.length;
      }
      loadTrack(next, isPlaying);
    }

    /* ── Prev track ── */
    function prevTrack() {
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
      } else {
        const prev = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
        loadTrack(prev, isPlaying);
      }
    }

    /* ── Events ── */
    playBtn.addEventListener('click',    togglePlay);
    nextBtn.addEventListener('click',    nextTrack);
    prevBtn.addEventListener('click',    prevTrack);

    shuffleBtn.addEventListener('click', () => {
      isShuffle = !isShuffle;
      shuffleBtn.classList.toggle('active', isShuffle);
    });

    repeatBtn.addEventListener('click', () => {
      isRepeat = !isRepeat;
      repeatBtn.classList.toggle('active', isRepeat);
    });

    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      audio.muted = isMuted;
      muteBtn.innerHTML = isMuted ? icons.volMute : icons.volHigh;
      volSlider.value   = isMuted ? 0 : prevVol;
    });

    volSlider.addEventListener('input', () => {
      const v = parseFloat(volSlider.value);
      audio.volume = v;
      prevVol      = v;
      isMuted      = (v === 0);
      audio.muted  = isMuted;
      muteBtn.innerHTML = isMuted ? icons.volMute : icons.volHigh;
      /* Update slider track fill */
      volSlider.style.backgroundSize = (v * 100) + '% 100%';
    });

    /* Progress bar scrubbing */
    let isScrubbing = false;
    progress.addEventListener('mousedown', startScrub);
    progress.addEventListener('touchstart', startScrub, { passive: true });

    function startScrub(e) {
      isScrubbing = true;
      scrub(e);
      document.addEventListener('mousemove', scrub);
      document.addEventListener('mouseup',   stopScrub);
      document.addEventListener('touchmove', scrub, { passive: true });
      document.addEventListener('touchend',  stopScrub);
    }
    function stopScrub() {
      isScrubbing = false;
      document.removeEventListener('mousemove', scrub);
      document.removeEventListener('mouseup',   stopScrub);
      document.removeEventListener('touchmove', scrub);
      document.removeEventListener('touchend',  stopScrub);
    }
    function scrub(e) {
      const rect = progress.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      fill.style.width = (pct * 100) + '%';
      if (audio.duration) audio.currentTime = pct * audio.duration;
    }

    /* Playlist toggle */
    listBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      listBtn.classList.toggle('active', drawer.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && e.target !== listBtn) {
        drawer.classList.remove('open');
        listBtn.classList.remove('active');
      }
    });

    /* Playlist items */
    drawer.querySelectorAll('.ap-pl-item').forEach(item => {
      item.addEventListener('click', () => {
        loadTrack(parseInt(item.dataset.index), true);
        drawer.classList.remove('open');
        listBtn.classList.remove('active');
      });
    });

    /* ── Audio events ── */
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration || isScrubbing) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      fill.style.width      = pct + '%';
      curEl.textContent     = fmt(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
      durEl.textContent = fmt(audio.duration);
      /* Fill playlist durations */
      const durEl2 = document.getElementById(`ap-pl-dur-${currentIndex}`);
      if (durEl2) durEl2.textContent = fmt(audio.duration);
    });

    audio.addEventListener('ended', nextTrack);

    audio.addEventListener('waiting', () => { playBtn.classList.add('loading'); });
    audio.addEventListener('playing', () => { playBtn.classList.remove('loading'); });

    /* ── Init ── */
    loadTrack(0, false);

    /* ── Global API (used by music.html tracklist) ── */
    window.apPlayTrack = function (index) {
      loadTrack(index, true);
    };

    /* ── Keyboard shortcuts ── */
    document.addEventListener('keydown', (e) => {
      /* Only if not typing in an input */
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      if (e.code === 'ArrowRight') audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
      if (e.code === 'ArrowLeft')  audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
  });
})();
