import Link from 'next/link';
import NewsletterBar from '@/components/NewsletterBar';

export default function Home() {
  return (
    <>
      <style>{`
        /* ── HERO ── */
        #hero {
          min-height: 100vh; display: grid; place-items: center;
          padding: 6rem 2rem 4rem; position: relative; overflow: hidden; border: none;
        }
        .hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse at 15% 60%, rgba(192,57,43,.18) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 40%, rgba(232,200,74,.07) 0%, transparent 55%);
        }
        .hero-inner { position: relative; text-align: center; max-width: 800px; }
        .hero-eyebrow {
          font-family: var(--font-h); font-size: .8rem; letter-spacing: .35em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 2rem;
        }
        .hero-title {
          font-family: var(--font-h);
          font-size: clamp(3.5rem, 13vw, 9rem);
          font-weight: 700; line-height: .9; text-transform: uppercase;
        }
        .hero-title .t-light { color: var(--light); display: block; }
        .hero-title .t-amp   { color: var(--red); font-size: .5em; display: block; letter-spacing: .05em; }
        .hero-title .t-gold  { color: var(--accent); display: block; }
        .hero-sub {
          margin: 2rem auto 0; font-size: 1.1rem; color: var(--mid); max-width: 500px;
        }
        .hero-ctas {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2.5rem;
        }
        .hero-ep-strip {
          margin-top: 3.5rem; display: inline-flex; align-items: center; gap: 1rem;
          border: 1px solid var(--border); padding: .75rem 1.5rem;
          font-size: .85rem; color: var(--mid);
        }
        .hero-ep-strip strong { color: var(--accent); font-family: var(--font-h); font-size: 1rem; }
        .scroll-hint {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: .4rem;
          color: var(--muted); font-size: .7rem; letter-spacing: .15em; text-transform: uppercase;
        }
        .scroll-arrow {
          width: 18px; height: 18px;
          border-right: 2px solid var(--muted); border-bottom: 2px solid var(--muted);
          transform: rotate(45deg); animation: bounce 1.8s ease-in-out infinite;
        }
        @keyframes bounce {
          0%,100% { transform: rotate(45deg) translateY(0); }
          50%      { transform: rotate(45deg) translateY(5px); }
        }

        /* ── TEASERS ── */
        .teaser-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        .teaser-card {
          background: var(--card); border: 1px solid var(--border);
          padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1rem;
          text-decoration: none; color: inherit;
          transition: border-color .2s, transform .2s;
        }
        .teaser-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .teaser-card .icon { font-size: 2rem; }
        .teaser-card h3 {
          font-family: var(--font-h); font-size: 1.3rem;
          text-transform: uppercase; color: var(--light);
        }
        .teaser-card p { font-size: .9rem; color: var(--mid); flex: 1; }
        .teaser-card .cta {
          font-family: var(--font-h); font-size: .75rem;
          letter-spacing: .15em; text-transform: uppercase; color: var(--accent);
          margin-top: .5rem;
        }
        .teaser-card .cta::after { content: ' →'; }

        /* Highlighted teaser */
        .teaser-card.highlight {
          background: #0f0e09; border-color: #3a3218;
        }
        .teaser-card.highlight h3 { color: var(--accent); }

        /* ── UPCOMING SHOW TEASER ── */
        .show-teaser {
          background: var(--card); border: 1px solid var(--border);
          padding: 2.5rem 3rem; display: flex; align-items: center; gap: 3rem;
          position: relative; overflow: hidden;
        }
        .show-teaser::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--red), var(--accent));
        }
        .show-teaser-date { text-align: center; flex-shrink: 0; }
        .show-teaser-date .day { font-family: var(--font-h); font-size: 3.5rem; color: var(--accent); line-height: 1; }
        .show-teaser-date .month { font-family: var(--font-h); font-size: 1.1rem; text-transform: uppercase; color: var(--light); }
        .show-teaser-date .year  { font-size: .8rem; color: var(--mid); }
        .show-teaser-info { flex: 1; }
        .show-teaser-info h3 { font-family: var(--font-h); font-size: 1.6rem; text-transform: uppercase; margin-bottom: .25rem; }
        .show-teaser-info .venue { color: var(--mid); margin-bottom: .5rem; }
        .show-teaser-info .guests { font-size: .8rem; color: var(--muted); }
        .show-teaser-badge { font-family: var(--font-h); font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; padding: .4rem 1rem; background: var(--accent); color: var(--black); white-space: nowrap; }

        /* ── EP TEASER ── */
        .ep-teaser {
          display: grid; grid-template-columns: auto 1fr; gap: 3rem; align-items: center;
        }
        .ep-vinyl {
          width: 180px; height: 180px; border-radius: 50%; flex-shrink: 0;
          background: conic-gradient(#111, #1a1a1a 10%, #111 20%, #1a1a1a 30%, #111 40%, #1a1a1a 50%, #111 60%, #1a1a1a 70%, #111 80%, #1a1a1a 90%, #111);
          border: 3px solid #222; display: flex; align-items: center; justify-content: center;
          animation: spin 8s linear infinite; animation-play-state: paused;
        }
        .ep-vinyl:hover { animation-play-state: running; }
        .ep-vinyl-label {
          width: 62px; height: 62px; border-radius: 50%; background: var(--accent); border: 2px solid #c8a830;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: var(--font-h); font-size: .45rem; letter-spacing: .05em;
          text-transform: uppercase; color: var(--black); text-align: center; line-height: 1.3;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ep-teaser-info h3 { font-family: var(--font-h); font-size: 1.8rem; text-transform: uppercase; color: var(--accent); }
        .ep-teaser-info .sub { font-size: .8rem; color: var(--mid); letter-spacing: .1em; text-transform: uppercase; margin: .25rem 0 1rem; }
        .ep-teaser-info p { color: #bbb; margin-bottom: 1.25rem; }
        .genre-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
        .tag { background: #1a1a1a; border: 1px solid var(--border); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; padding: .35rem .8rem; color: var(--light); }

        /* ── MERCH TEASER ── */
        .merch-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
        .merch-item {
          background: var(--card); padding: 2rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: .75rem;
        }
        .merch-item .icon { font-size: 2.5rem; }
        .merch-item .name { font-family: var(--font-h); font-size: 1rem; text-transform: uppercase; }
        .merch-item .price { font-size: .9rem; color: var(--accent); }

        /* ── GALLERY PREVIEW ── */
        .gallery-preview-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: .75rem; margin-bottom: 1.5rem;
        }
        /* ── CONTACT TEASER ── */
        .contact-teaser-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
        }
        /* ── ABOUT TEASER ── */
        .about-teaser-grid { max-width: 600px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .teaser-grid { grid-template-columns: 1fr 1fr; }
          .about-teaser-grid { grid-template-columns: 1fr 1fr; }
          .ep-teaser { grid-template-columns: 1fr; }
          .ep-vinyl { width: 140px; height: 140px; }
          .show-teaser { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding: 2rem; }
          .merch-strip { grid-template-columns: 1fr; }
          .gallery-preview-grid { grid-template-columns: repeat(2,1fr); }
          .contact-teaser-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .teaser-grid { grid-template-columns: 1fr; }
          .about-teaser-grid { grid-template-columns: 1fr; }
          .gallery-preview-grid { grid-template-columns: repeat(2,1fr); }
        }
      `}</style>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <p className="hero-eyebrow">Eindhoven &nbsp;·&nbsp; Blues &nbsp;·&nbsp; Rock-&apos;n-Roll &nbsp;·&nbsp; Industriële Punk</p>
          <h1 className="hero-title">
            <span className="t-light">Jesus</span>
            <span className="t-amp">&amp;</span>
            <span className="t-gold">The Fishsticks</span>
          </h1>
          <p className="hero-sub">Geen therapeutisch clubje — maar een band met een missie.</p>
          <div className="hero-ctas">
            <Link href="/music" className="btn btn-primary">Beluister de EP</Link>
            <Link href="/shows" className="btn btn-outline">Aankomende shows</Link>
          </div>
          <div className="hero-ep-strip">
            <span>🥫</span>
            <span>Debut EP &nbsp;<strong>&quot;Straight from the can&quot;</strong>&nbsp; — nu op alle streamingdiensten</span>
          </div>
        </div>
        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* OVER ONS TEASER */}
      <section>
        <div className="container">
          <p className="section-label">Het verhaal</p>
          <h2 className="section-title">Een band met een bijzonder verhaal</h2>
          <div className="rule"></div>
          <p style={{ color: '#bbb', maxWidth: '640px', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Jesus &amp; The Fishsticks is een Eindhovens collectief dat muzikale (ex-)cliënten uit de verslavingszorg een professioneel podium geeft. Opgericht door Cor Verbrugge, begeleid door coach Ruud Borgers — en gedreven door de muziek zelf.
          </p>
          <div className="teaser-grid about-teaser-grid">
            <Link className="teaser-card" href="/about">
              <span className="icon">🎸</span>
              <h3>Over de band</h3>
              <p>Het verhaal, de leden, de missie en de foundation achter de muziek.</p>
              <span className="cta">Lees meer</span>
            </Link>
            <Link className="teaser-card highlight" href="/about#members">
              <span className="icon">👥</span>
              <h3>De bandleden</h3>
              <p>Styn, Willem, Wim en Robert — vier mensen, één geluid.</p>
              <span className="cta">Maak kennis</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MUZIEK TEASER */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Muziek</p>
          <h2 className="section-title">Straight from the can</h2>
          <div className="rule"></div>
          <div className="ep-teaser">
            <div className="ep-vinyl">
              <div className="ep-vinyl-label"><span>J &amp; TF</span><span>EP</span></div>
            </div>
            <div className="ep-teaser-info">
              <h3>Straight from the can</h3>
              <p className="sub">Debut EP &nbsp;·&nbsp; 2026</p>
              <p>Rauw, direct en recht uit het hart. De debuut-EP van Jesus &amp; The Fishsticks is nu beschikbaar via alle streamingdiensten.</p>
              <div className="genre-tags">
                <span className="tag">Blues</span>
                <span className="tag">Rock &amp; Roll</span>
                <span className="tag">Industriële Punk</span>
              </div>
              <Link href="/music" className="btn btn-primary">Naar de muziekpagina →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWS TEASER */}
      <section>
        <div className="container">
          <p className="section-label">Live</p>
          <h2 className="section-title">Aankomende shows</h2>
          <div className="rule"></div>
          <div className="show-teaser">
            <div className="show-teaser-date">
              <div className="day">14</div>
              <div className="month">Mrt</div>
              <div className="year">2026</div>
            </div>
            <div className="show-teaser-info">
              <h3>Releaseshow — Straight from the can</h3>
              <p className="venue">PopEi &nbsp;·&nbsp; Klokgebouw, Eindhoven &nbsp;·&nbsp; Zaal open: 20:00</p>
              <p className="guests">Met speciale gasten: Mavaotic &amp; Brechtje</p>
            </div>
            <span className="show-teaser-badge">Gratis</span>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/shows" className="btn btn-outline">Alle shows &amp; agenda →</Link>
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Beeldmateriaal</p>
          <h2 className="section-title">Foto &amp; Video</h2>
          <div className="rule"></div>
          <div className="gallery-preview-grid">
            {['🎸', '🎤', '🥁', '🎶'].map((emoji, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', opacity: '.6' }}>{emoji}</div>
            ))}
          </div>
          <Link href="/gallery" className="btn btn-outline">Bekijk alle foto&apos;s &amp; video&apos;s →</Link>
        </div>
      </section>

      {/* MERCH TEASER */}
      <section>
        <div className="container">
          <p className="section-label">Merchandise</p>
          <h2 className="section-title">Shop</h2>
          <div className="rule"></div>
          <p style={{ color: '#bbb', marginBottom: '2rem' }}>Draag de band. T-shirts, hoodies en de EP — rechtstreeks van de band.</p>
          <div className="merch-strip">
            <div className="merch-item">
              <span className="icon">👕</span>
              <span className="name">T-shirt</span>
              <span className="price">€ 25</span>
            </div>
            <div className="merch-item">
              <span className="icon">🧥</span>
              <span className="name">Hoodie</span>
              <span className="price">€ 45</span>
            </div>
            <div className="merch-item">
              <span className="icon">💿</span>
              <span className="name">EP — Straight from the can</span>
              <span className="price">Digitaal · Gratis stream</span>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/shop" className="btn btn-primary">Naar de shop →</Link>
          </div>
        </div>
      </section>

      {/* PERS TEASER */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Media</p>
          <h2 className="section-title">Perskit &amp; Pers</h2>
          <div className="rule"></div>
          <div className="teaser-grid">
            <Link className="teaser-card" href="/press#bio">
              <span className="icon">📄</span>
              <h3>Officiële bio</h3>
              <p>Volledige bandbio in NL &amp; EN, klaar voor publicatie.</p>
              <span className="cta">Download</span>
            </Link>
            <Link className="teaser-card" href="/press#photos">
              <span className="icon">🖼️</span>
              <h3>Persfoto&apos;s</h3>
              <p>Hi-res bandfotos (300 dpi) voor print en digitaal gebruik.</p>
              <span className="cta">Download</span>
            </Link>
            <Link className="teaser-card" href="/press#news">
              <span className="icon">📰</span>
              <h3>In het nieuws</h3>
              <p>Eindhovens Dagblad — Frank van den Muijsenberg, 14 maart 2026.</p>
              <span className="cta">Lees artikel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterBar
        title="Op de hoogte blijven"
        description="Schrijf je in voor nieuws, nieuwe shows en updates van Jesus & The Fishsticks."
      />

      {/* CONTACT TEASER */}
      <section>
        <div className="container contact-teaser-grid">
          <div>
            <p className="section-label">Boekingen</p>
            <h2 className="section-title">Wil je de band boeken?</h2>
            <div className="rule"></div>
            <p style={{ color: '#bbb', marginBottom: '1.5rem' }}>Voor boekingen, persverzoeken en samenwerkingen: we horen graag van je.</p>
            <Link href="/contact" className="btn btn-primary">Neem contact op →</Link>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-h)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--mid)', marginBottom: '.5rem' }}>E-mail</p>
            <a href="mailto:info@jesusandthefishsticks.nl" style={{ color: 'var(--accent)', fontFamily: 'var(--font-h)', fontSize: '1.1rem', textDecoration: 'none' }}>info@jesusandthefishsticks.nl</a>
            <p style={{ fontFamily: 'var(--font-h)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--mid)', margin: '1.5rem 0 .5rem' }}>Gebaseerd in</p>
            <p style={{ color: 'var(--light)' }}>Eindhoven, Nederland</p>
          </div>
        </div>
      </section>
    </>
  );
}
