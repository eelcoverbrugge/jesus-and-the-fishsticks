'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const PLAYLIST = [
  {
    title: 'Straight from the Can',
    artist: 'Jesus & The Fishsticks',
    genre: 'Blues',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Fishsticks Blues',
    artist: 'Jesus & The Fishsticks',
    genre: 'Blues',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Jesus on the Radio',
    artist: 'Jesus & The Fishsticks',
    genre: 'Rock & Roll',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    title: 'Novadic Nights',
    artist: 'Jesus & The Fishsticks',
    genre: 'Rock & Roll',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    title: 'PopEi Shuffle',
    artist: 'Jesus & The Fishsticks',
    genre: 'Industriële Punk',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

function fmt(s: number) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

// SVG icons
const icons = {
  play: (
    <svg viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  prev: (
    <svg viewBox="0 0 24 24">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  ),
  volHigh: (
    <svg viewBox="0 0 24 24">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  ),
  volMute: (
    <svg viewBox="0 0 24 24">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24">
      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
    </svg>
  ),
  shuffle: (
    <svg viewBox="0 0 24 24">
      <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
    </svg>
  ),
  repeat: (
    <svg viewBox="0 0 24 24">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
    </svg>
  ),
};

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isScrubbing = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create audio on mount (client-only)
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audio.preload = 'metadata';
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      if (!isScrubbing.current) {
        setCurrentTime(audio.currentTime);
      }
    });
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setDurations((prev) => ({ ...prev, [audio.src]: audio.duration }));
    });
    audio.addEventListener('waiting', () => setIsLoading(true));
    audio.addEventListener('playing', () => setIsLoading(false));

    // Load first track
    audio.src = PLAYLIST[0].src;
    audio.load();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Listen for custom play-track events from music page
  useEffect(() => {
    function handlePlayTrack(e: Event) {
      const idx = (e as CustomEvent<number>).detail;
      loadTrack(idx, true);
    }
    window.addEventListener('jtf-play-track', handlePlayTrack);
    return () => window.removeEventListener('jtf-play-track', handlePlayTrack);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTrack = useCallback(
    (index: number, autoplay: boolean) => {
      const audio = audioRef.current;
      if (!audio) return;
      const track = PLAYLIST[index];
      setCurrentIndex(index);
      audio.src = track.src;
      audio.load();
      setCurrentTime(0);
      setDuration(0);

      if (autoplay) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        setIsPlaying(false);
      }
    },
    []
  );

  // Handle track end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleEnded() {
      let next: number;
      if (isRepeat) {
        next = currentIndex;
      } else if (isShuffle) {
        do {
          next = Math.floor(Math.random() * PLAYLIST.length);
        } while (next === currentIndex && PLAYLIST.length > 1);
      } else {
        next = (currentIndex + 1) % PLAYLIST.length;
      }
      loadTrack(next, true);
    }

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentIndex, isRepeat, isShuffle, loadTrack]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      const audio = audioRef.current;
      if (!audio) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'ArrowRight') {
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
      }
      if (e.code === 'ArrowLeft') {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function nextTrack() {
    let next: number;
    if (isRepeat) {
      next = currentIndex;
    } else if (isShuffle) {
      do {
        next = Math.floor(Math.random() * PLAYLIST.length);
      } while (next === currentIndex && PLAYLIST.length > 1);
    } else {
      next = (currentIndex + 1) % PLAYLIST.length;
    }
    loadTrack(next, isPlaying);
  }

  function prevTrack() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      const prev = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
      loadTrack(prev, isPlaying);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const v = parseFloat(e.target.value);
    setVolume(v);
    audio.volume = v;
    const muted = v === 0;
    setIsMuted(muted);
    audio.muted = muted;
  }

  // Progress bar scrubbing
  function startScrub(e: React.MouseEvent | React.TouchEvent) {
    isScrubbing.current = true;
    scrub(e);
    const onMove = (ev: MouseEvent | TouchEvent) => scrub(ev as unknown as React.MouseEvent);
    const onUp = () => {
      isScrubbing.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onUp);
  }

  function scrub(e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) {
    const audio = audioRef.current;
    const el = progressRef.current;
    if (!el || !audio) return;
    const rect = el.getBoundingClientRect();
    const clientX =
      'touches' in e
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setCurrentTime(pct * (audio.duration || 0));
    if (audio.duration) audio.currentTime = pct * audio.duration;
  }

  const track = PLAYLIST[currentIndex];
  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Close playlist on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!showPlaylist) return;
      const drawer = document.getElementById('ap-playlist');
      const btn = document.getElementById('ap-list-btn');
      if (drawer && btn && !drawer.contains(e.target as Node) && e.target !== btn) {
        setShowPlaylist(false);
      }
    }
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [showPlaylist]);

  return (
    <>
      {/* Playlist drawer */}
      <div id="ap-playlist" className={showPlaylist ? 'open' : ''}>
        {PLAYLIST.map((t, i) => {
          const dur = durations[t.src];
          return (
            <div
              key={i}
              className={`ap-pl-item${i === currentIndex ? ' playing' : ''}`}
              onClick={() => {
                loadTrack(i, true);
                setShowPlaylist(false);
              }}
            >
              <span className="ap-pl-num">{i + 1}</span>
              <div className="ap-pl-info">
                <span className="ap-pl-title">{t.title}</span>
                <span className="ap-pl-genre">{t.genre}</span>
              </div>
              <span className="ap-pl-dur">{dur ? fmt(dur) : '—'}</span>
            </div>
          );
        })}
      </div>

      {/* Player bar */}
      <div id="ap">
        {/* Left: track info */}
        <div className="ap-track">
          <div className="ap-art">🥫</div>
          <div className="ap-info">
            <span className="ap-title">{track.title}</span>
            <span className="ap-artist">{track.artist}</span>
            <span className="ap-genre-tag">{track.genre}</span>
          </div>
        </div>

        {/* Center: controls + progress */}
        <div className="ap-center">
          <div className="ap-controls">
            <button
              className={`ap-btn${isShuffle ? ' active' : ''}`}
              id="ap-shuffle"
              title="Willekeurig"
              onClick={() => setIsShuffle((v) => !v)}
            >
              {icons.shuffle}
            </button>
            <button className="ap-btn" id="ap-prev" title="Vorige" onClick={prevTrack}>
              {icons.prev}
            </button>
            <button
              className={`ap-btn${isLoading ? ' loading' : ''}`}
              id="ap-play-btn"
              title="Afspelen"
              onClick={togglePlay}
            >
              {isPlaying ? icons.pause : icons.play}
            </button>
            <button className="ap-btn" id="ap-next" title="Volgende" onClick={nextTrack}>
              {icons.next}
            </button>
            <button
              className={`ap-btn${isRepeat ? ' active' : ''}`}
              id="ap-repeat"
              title="Herhalen"
              onClick={() => setIsRepeat((v) => !v)}
            >
              {icons.repeat}
            </button>
          </div>
          <div className="ap-timeline">
            <span className="ap-time">{fmt(currentTime)}</span>
            <div
              className="ap-progress"
              id="ap-progress"
              ref={progressRef}
              onMouseDown={startScrub}
              onTouchStart={startScrub}
            >
              <div
                className="ap-progress-fill"
                id="ap-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ap-time right">{fmt(duration)}</span>
          </div>
        </div>

        {/* Right: volume + playlist */}
        <div className="ap-right">
          <div className="ap-vol">
            <button className="ap-btn" id="ap-mute" title="Geluid" onClick={toggleMute}>
              {isMuted ? icons.volMute : icons.volHigh}
            </button>
            <input
              type="range"
              className="ap-vol-slider"
              id="ap-vol"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{
                backgroundSize: `${isMuted ? 0 : volume * 100}% 100%`,
              }}
            />
          </div>
          <button
            className={`ap-btn${showPlaylist ? ' active' : ''}`}
            id="ap-list-btn"
            title="Afspeellijst"
            onClick={(e) => {
              e.stopPropagation();
              setShowPlaylist((v) => !v);
            }}
          >
            {icons.list}
          </button>
        </div>
      </div>
    </>
  );
}
