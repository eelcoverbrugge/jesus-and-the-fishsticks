'use client';

import PageHeader from '@/components/PageHeader';
import NewsletterBar from '@/components/NewsletterBar';

const TRACKS = [
  { num: '01', title: 'Straight from the Can', genre: 'Blues' },
  { num: '02', title: 'Fishsticks Blues', genre: 'Blues' },
  { num: '03', title: 'Jesus on the Radio', genre: 'Rock & Roll' },
  { num: '04', title: 'Novadic Nights', genre: 'Rock & Roll' },
  { num: '05', title: 'PopEi Shuffle', genre: 'Industriële Punk' },
];

function playTrackFromList(index: number) {
  window.dispatchEvent(new CustomEvent('jtf-play-track', { detail: index }));
}

export default function MusicPage() {
  return (
    <>
      <style>{`
        .ep-layout { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; align-items: start; }
        .ep-cover {
          background: var(--card); border: 1px solid var(--border);
          padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 1.25rem;
          position: sticky; top: 80px;
        }
        .ep-vinyl {
          width: 180px; height: 180px; border-radius: 50%;
          background: conic-gradient(#111, #1a1a1a 10%, #111 20%, #1a1a1a 30%, #111 40%, #1a1a1a 50%, #111 60%, #1a1a1a 70%, #111 80%, #1a1a1a 90%, #111);
          border: 3px solid #222; display: flex; align-items: center; justify-content: center;
          animation: spin 8s linear infinite; animation-play-state: paused; cursor: pointer;
        }
        .ep-vinyl:hover { animation-play-state: running; }
        .ep-vinyl-label {
          width: 62px; height: 62px; border-radius: 50%; background: var(--accent); border: 2px solid #c8a830;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: var(--font-h); font-size: .45rem; letter-spacing: .05em;
          text-transform: uppercase; color: var(--black); text-align: center; line-height: 1.3;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ep-title { font-family: var(--font-h); font-size: 1.3rem; text-transform: uppercase; color: var(--accent); text-align: center; }
        .ep-sub { font-size: .75rem; color: var(--mid); letter-spacing: .1em; text-transform: uppercase; }
        .genre-tags { display: flex; flex-wrap: wrap; gap: .5rem; justify-content: center; }
        .tag { background: #1a1a1a; border: 1px solid var(--border); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; padding: .3rem .75rem; color: var(--light); }
        .stream-section h3 { font-family: var(--font-h); font-size: 1.4rem; text-transform: uppercase; margin-bottom: 1.5rem; }
        .stream-list { display: flex; flex-direction: column; gap: .75rem; }
        .stream-btn {
          display: flex; align-items: center; gap: 1rem;
          background: var(--card); border: 1px solid var(--border);
          padding: 1rem 1.25rem; text-decoration: none; color: var(--light);
          transition: border-color .2s, transform .15s;
        }
        .stream-btn:hover { border-color: var(--accent); transform: translateX(4px); }
        .stream-btn .s-icon { font-size: 1.4rem; width: 30px; text-align: center; }
        .stream-btn .s-label { font-family: var(--font-h); letter-spacing: .08em; text-transform: uppercase; font-size: 1rem; }
        .stream-btn .s-sub { font-size: .78rem; color: var(--mid); }
        .stream-btn .s-arrow { margin-left: auto; color: var(--accent); font-size: 1.1rem; }
        .ep-about { margin-top: 3rem; padding-top: 3rem; border-top: 1px solid var(--border); }
        .ep-about p { color: #bbb; margin-bottom: 1.1rem; }
        .soundbite {
          background: var(--card); border-left: 4px solid var(--accent);
          padding: 1.5rem 2rem; margin: 2rem 0;
          font-family: var(--font-h); font-size: 1.2rem; color: var(--light); line-height: 1.4;
        }
        .soundbite cite { display: block; font-size: .78rem; font-style: normal; color: var(--mid); margin-top: .75rem; }
        .tl-list { display: flex; flex-direction: column; gap: 1px; }
        .tl-item {
          display: grid; grid-template-columns: 40px 1fr auto;
          align-items: center; gap: 1.25rem;
          background: var(--card); border: 1px solid var(--border);
          padding: 1rem 1.5rem; cursor: pointer;
          transition: border-color .15s, background .15s;
        }
        .tl-item:hover { border-color: var(--accent); background: var(--dark); }
        .tl-item:hover .tl-play-btn { opacity: 1; }
        .tl-num {
          font-family: var(--font-h); font-size: .8rem; color: var(--muted);
          letter-spacing: .05em; text-align: center;
        }
        .tl-item:hover .tl-num { color: var(--accent); }
        .tl-info { display: flex; flex-direction: column; gap: .15rem; }
        .tl-title {
          font-family: var(--font-h); font-size: 1rem; text-transform: uppercase;
          letter-spacing: .05em; color: var(--text);
        }
        .tl-genre { font-size: .72rem; color: var(--mid); }
        .tl-play-btn {
          background: var(--accent); border: none; cursor: pointer;
          width: 32px; height: 32px; border-radius: 50%;
          color: var(--bg); font-size: .7rem;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity .15s, transform .1s;
          flex-shrink: 0;
        }
        .tl-play-btn:hover { transform: scale(1.1); }
        @media (max-width: 768px) {
          .ep-layout { grid-template-columns: 1fr; }
          .ep-cover { position: static; }
        }
      `}</style>

      <PageHeader
        label="Discografie"
        title={<><em>Straight</em><br />from the can</>}
        subtitle="Debut EP van Jesus & The Fishsticks — nu beschikbaar op alle streamingdiensten."
      />

      <section>
        <div className="container">
          <div className="ep-layout">

            {/* COVER */}
            <div className="ep-cover">
              <div className="ep-vinyl">
                <div className="ep-vinyl-label"><span>J &amp; TF</span><span>EP · 2026</span></div>
              </div>
              <p className="ep-title">Straight from the can</p>
              <p className="ep-sub">Debut EP &nbsp;·&nbsp; 2026</p>
              <div className="genre-tags">
                <span className="tag">Blues</span>
                <span className="tag">Rock &amp; Roll</span>
                <span className="tag">Industriële Punk</span>
              </div>
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', textAlign: 'center', marginTop: '.5rem' }}>Hover op de plaat om te draaien</p>
            </div>

            {/* INFO + STREAM */}
            <div>
              <div className="stream-section">
                <h3>Beluister de EP</h3>
                <div className="stream-list">
                  <a href="#" className="stream-btn">
                    <span className="s-icon">🎵</span>
                    <div><p className="s-label">Spotify</p><p className="s-sub">Open in Spotify</p></div>
                    <span className="s-arrow">→</span>
                  </a>
                  <a href="#" className="stream-btn">
                    <span className="s-icon">🎶</span>
                    <div><p className="s-label">Apple Music</p><p className="s-sub">Open in Apple Music</p></div>
                    <span className="s-arrow">→</span>
                  </a>
                  <a href="#" className="stream-btn">
                    <span className="s-icon">☁️</span>
                    <div><p className="s-label">SoundCloud</p><p className="s-sub">Gratis luisteren</p></div>
                    <span className="s-arrow">→</span>
                  </a>
                  <a href="#" className="stream-btn">
                    <span className="s-icon">🎸</span>
                    <div><p className="s-label">Bandcamp</p><p className="s-sub">Download of stream</p></div>
                    <span className="s-arrow">→</span>
                  </a>
                  <a href="#" className="stream-btn">
                    <span className="s-icon">📺</span>
                    <div><p className="s-label">YouTube Music</p><p className="s-sub">Open in YouTube</p></div>
                    <span className="s-arrow">→</span>
                  </a>
                </div>
              </div>

              <div className="ep-about">
                <p className="section-label">Over de EP</p>
                <p>Het resultaat van alle inspanningen is te horen op de debuut-EP <em>Straight from the can</em>. De band houdt van allerlei genres: van blues tot rock-&apos;n-roll en industriële punk. De plaat is een eerlijk document van een band in wording — rauw, direct en recht uit het hart.</p>
                <div className="soundbite">
                  Het gaat ons niet om het verkopen van een plaat. We willen mensen kennis laten maken met de band en de foundation waaruit we voortkomen.
                  <cite>— Willem Holthausen, gitarist</cite>
                </div>
                <p>De release is tot stand gekomen dankzij de samenwerking tussen de bandleden, coach Ruud Borgers en de Novadic-Kentron Foundation — een organisatie die muzikale (ex-)cliënten uit de verslavingszorg een professioneel platform biedt.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="tracklist">
        <div className="container">
          <p className="section-label">Afspeellijst</p>
          <h2 className="section-title">Tracks</h2>
          <div className="rule"></div>
          <p style={{ color: 'var(--mid)', fontSize: '.9rem', marginBottom: '1.75rem' }}>
            Gebruik de mediaspeler onderaan de pagina om nummers af te spelen.
            Klik op een nummer om direct te beginnen.
          </p>
          <div className="tl-list">
            {TRACKS.map((track, i) => (
              <div key={i} className="tl-item" onClick={() => playTrackFromList(i)}>
                <span className="tl-num">{track.num}</span>
                <div className="tl-info">
                  <span className="tl-title">{track.title}</span>
                  <span className="tl-genre">{track.genre}</span>
                </div>
                <button className="tl-play-btn" aria-label="Afspelen">▶</button>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '1.25rem' }}>
            ⌨ Spatiebalk = play/pause &nbsp;·&nbsp; ← → = 10 seconden terug/vooruit
          </p>
        </div>
      </section>

      <NewsletterBar
        title="Nieuwe muziek als eerste horen"
        description="Schrijf je in voor updates over aankomende releases en shows."
      />
    </>
  );
}
