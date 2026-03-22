'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

const FILTER_TABS = ['Alles', 'Live', 'Band', 'Studio', 'Behind the scenes'];

const GALLERY_ITEMS = [
  {
    className: 'wide',
    img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=675&fit=crop&q=80',
    caption: 'Releaseshow — PopEi, Klokgebouw · 14 mrt 2026',
    category: 'Live',
  },
  {
    className: 'tall',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=800&fit=crop&q=80',
    caption: 'Styn Pruijn — Zang & Bas',
    category: 'Band',
  },
  {
    className: '',
    img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop&q=80',
    caption: 'Willem Holthausen — Gitaar',
    category: 'Band',
  },
  {
    className: '',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80',
    caption: 'Wim Reijnen — Gitaar',
    category: 'Live',
  },
  {
    className: '',
    img: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&h=600&fit=crop&q=80',
    caption: 'Robert Smissaert — Drums',
    category: 'Band',
  },
  {
    className: '',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop&q=80',
    caption: 'In de studio · 2025',
    category: 'Studio',
  },
  {
    className: '',
    img: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=800&h=600&fit=crop&q=80',
    caption: 'Repetitie · Eindhoven',
    category: 'Behind the scenes',
  },
  {
    className: '',
    img: 'https://images.unsplash.com/photo-1506157786151-b8491531ae41?w=800&h=600&fit=crop&q=80',
    caption: 'Klokgebouw · PopEi',
    category: 'Live',
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('Alles');

  return (
    <>
      <style>{`
        .filter-tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .filter-tab {
          font-family: var(--font-h); font-size: .78rem; letter-spacing: .12em;
          text-transform: uppercase; padding: .55rem 1.2rem; cursor: pointer;
          border: 1px solid var(--border); color: var(--mid); background: transparent;
          transition: border-color .2s, color .2s, background .2s;
        }
        .filter-tab:hover, .filter-tab.active { border-color: var(--accent); color: var(--black); background: var(--accent); }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .75rem;
        }
        .gallery-item {
          background: var(--card); border: 1px solid var(--border);
          aspect-ratio: 4/3;
          position: relative; overflow: hidden; cursor: pointer;
        }
        .gallery-item img, .gallery-item span[style] {
          transition: transform .4s ease !important;
        }
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-item.tall { aspect-ratio: 3/4; grid-row: span 2; }
        .gallery-item.wide { grid-column: span 2; aspect-ratio: 16/9; }
        .gallery-placeholder { font-size: 3.5rem; opacity: .12; user-select: none; }
        .gallery-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: .75rem 1rem;
          background: linear-gradient(transparent, rgba(0,0,0,.85));
          font-size: .78rem; letter-spacing: .05em;
          transform: translateY(100%); transition: transform .25s;
        }
        .gallery-item:hover .gallery-caption { transform: translateY(0); }
        .gallery-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,.5);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity .25s;
          font-family: var(--font-h); font-size: .8rem;
          letter-spacing: .2em; text-transform: uppercase; color: var(--accent);
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .video-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .video-card {
          background: var(--card); border: 1px solid var(--border); overflow: hidden;
          transition: border-color .2s;
        }
        .video-card:hover { border-color: var(--accent); }
        .video-thumb {
          aspect-ratio: 16/9; background: #0a0a0a;
          display: flex; align-items: center; justify-content: center;
          font-size: 4rem; opacity: .25; position: relative;
        }
        .play-btn {
          position: absolute; width: 56px; height: 56px; border-radius: 50%;
          background: var(--accent); display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; color: var(--black); opacity: .9; cursor: pointer;
          transition: transform .2s, opacity .2s;
        }
        .video-card:hover .play-btn { transform: scale(1.1); opacity: 1; }
        .video-info { padding: 1.25rem; }
        .video-info h4 { font-family: var(--font-h); font-size: 1rem; text-transform: uppercase; margin-bottom: .3rem; }
        .video-info p { font-size: .82rem; color: var(--mid); }
        .press-note {
          background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--accent);
          padding: 1.5rem 2rem; display: flex; align-items: center; gap: 1.5rem;
        }
        .press-note .icon { font-size: 2rem; flex-shrink: 0; }
        .press-note p { color: #bbb; font-size: .9rem; }
        .press-note p strong { color: var(--light); }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-item.tall { aspect-ratio: 4/3; grid-row: span 1; }
          .gallery-item.wide { grid-column: span 1; aspect-ratio: 4/3; }
          .video-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <PageHeader
        label="Beeldmateriaal"
        title={<>Foto&apos;s &amp;<br /><em>Video</em></>}
        subtitle="Persmateriaal, livefoto's en behind-the-scenes van Jesus & The Fishsticks."
      />

      {/* PHOTO GALLERY */}
      <section>
        <div className="container">
          <p className="section-label">Fotografie</p>
          <h2 className="section-title">Galerij</h2>
          <div className="rule"></div>

          <div className="filter-tabs">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                className={`filter-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {GALLERY_ITEMS
              .filter((item) => activeTab === 'Alles' || item.category === activeTab)
              .map((item, i) => (
                <div key={i} className={`gallery-item${item.className ? ` ${item.className}` : ''}`}>
                  <Image src={item.img} alt={item.caption} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 33vw" />
                  <div className="gallery-overlay">Bekijk foto</div>
                  <div className="gallery-caption">{item.caption}</div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Film</p>
          <h2 className="section-title">Video</h2>
          <div className="rule"></div>
          <div className="video-grid">
            <div className="video-card">
              <div className="video-thumb">
                🎬
                <div className="play-btn">▶</div>
              </div>
              <div className="video-info">
                <h4>Releaseshow — Live @ PopEi</h4>
                <p>Volledige opname van de releaseshow in het Klokgebouw, 14 maart 2026</p>
              </div>
            </div>
            <div className="video-card">
              <div className="video-thumb">
                🎥
                <div className="play-btn">▶</div>
              </div>
              <div className="video-info">
                <h4>Behind the scenes — Studio</h4>
                <p>De opnames van &apos;Straight from the can&apos; van binnenuit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS NOTE */}
      <section>
        <div className="container">
          <div className="press-note">
            <span className="icon">📦</span>
            <div>
              <p><strong>Persmateriaal nodig?</strong> Hi-res persfoto&apos;s en bandmateriaal zijn beschikbaar via de perskit. Download alles wat je nodig hebt voor publicatie.</p>
              <div style={{ marginTop: '1rem' }}>
                <Link href="/press" className="btn btn-outline btn-sm">Naar de perskit →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
