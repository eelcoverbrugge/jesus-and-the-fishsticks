import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Shows — Jesus & The Fishsticks',
};

export default function ShowsPage() {
  return (
    <>
      <style>{`
        .shows-list { display: flex; flex-direction: column; gap: 1px; }
        .show-item {
          background: var(--card); border: 1px solid var(--border);
          display: grid; grid-template-columns: 100px 1fr auto;
          gap: 2rem; padding: 1.75rem 2rem; align-items: center;
          transition: border-color .2s;
        }
        .show-item:hover { border-color: var(--accent); }
        .show-item.past { opacity: .45; }
        .show-date-box { text-align: center; }
        .show-day { font-family: var(--font-h); font-size: 2.5rem; color: var(--accent); line-height: 1; }
        .show-month { font-family: var(--font-h); font-size: .9rem; text-transform: uppercase; letter-spacing: .1em; color: var(--light); }
        .show-year { font-size: .75rem; color: var(--mid); }
        .show-details h4 { font-family: var(--font-h); font-size: 1.2rem; text-transform: uppercase; margin-bottom: .3rem; }
        .show-venue { color: var(--mid); font-size: .9rem; margin-bottom: .4rem; }
        .show-support { font-size: .78rem; color: var(--muted); }
        .show-tags { display: flex; gap: .5rem; margin-top: .6rem; flex-wrap: wrap; }
        .show-tag { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; padding: .25rem .65rem; background: #1a1a1a; border: 1px solid var(--border); color: var(--mid); }
        .show-action { display: flex; flex-direction: column; gap: .5rem; align-items: flex-end; }
        .badge { font-family: var(--font-h); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; padding: .35rem .9rem; white-space: nowrap; }
        .badge-free    { background: var(--accent); color: var(--black); }
        .badge-past    { border: 1px solid var(--muted); color: var(--muted); background: transparent; }
        .badge-tba     { border: 1px solid #333; color: var(--mid); background: transparent; }
        .badge-tickets { background: var(--red); color: #fff; }
        .shows-section-title {
          font-family: var(--font-h); font-size: 1rem; letter-spacing: .2em;
          text-transform: uppercase; color: var(--mid); margin: 2.5rem 0 1rem;
          padding-bottom: .5rem; border-bottom: 1px solid var(--border);
        }
        .booking-box {
          background: var(--card); border: 1px solid var(--border);
          border-left: 4px solid var(--accent); padding: 2.5rem;
          display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap;
        }
        .booking-box h3 { font-family: var(--font-h); font-size: 1.5rem; text-transform: uppercase; margin-bottom: .5rem; }
        .booking-box p { color: var(--mid); font-size: .9rem; }
        @media (max-width: 640px) {
          .show-item { grid-template-columns: 80px 1fr; }
          .show-action { grid-column: 1 / -1; flex-direction: row; justify-content: flex-start; }
        }
      `}</style>

      <PageHeader
        label="Live"
        title={<>Shows &amp;<br /><em>Agenda</em></>}
        subtitle="Alle optredens van Jesus & The Fishsticks — live is where the magic happens."
      />

      <section>
        <div className="container">
          <p className="section-label">Aankomend</p>
          <h2 className="section-title">Komende optredens</h2>
          <div className="rule"></div>

          <div className="shows-list">
            <div className="show-item">
              <div className="show-date-box">
                <div className="show-day">TBA</div>
                <div className="show-month">2026</div>
              </div>
              <div className="show-details">
                <h4>Volgende show — Binnenkort bekend</h4>
                <p className="show-venue">Locatie nog te bevestigen &nbsp;·&nbsp; Eindhoven e.o.</p>
                <p className="show-support">Houd de socials in de gaten voor updates</p>
              </div>
              <div className="show-action">
                <span className="badge badge-tba">Binnenkort</span>
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--mid)', fontSize: '.85rem', marginTop: '1.5rem' }}>
            Wil je de band boeken? <Link href="/contact" style={{ color: 'var(--accent)' }}>Neem contact op →</Link>
          </p>

          <p className="shows-section-title">Geweest</p>
          <div className="shows-list">
            <div className="show-item past">
              <div className="show-date-box">
                <div className="show-day">14</div>
                <div className="show-month">Mrt</div>
                <div className="show-year">2026</div>
              </div>
              <div className="show-details">
                <h4>Releaseshow — Straight from the can</h4>
                <p className="show-venue">PopEi &nbsp;·&nbsp; Klokgebouw, Eindhoven &nbsp;·&nbsp; Zaal open: 20:00</p>
                <p className="show-support">Met speciale gasten: Mavaotic &amp; Brechtje</p>
                <div className="show-tags">
                  <span className="show-tag">Releaseshow</span>
                  <span className="show-tag">Debut EP</span>
                  <span className="show-tag">Gratis toegang</span>
                </div>
              </div>
              <div className="show-action">
                <span className="badge badge-past">Geweest</span>
                <span className="badge badge-free">Gratis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Boekingen</p>
          <h2 className="section-title">Boek de band</h2>
          <div className="rule"></div>
          <div className="booking-box">
            <div>
              <h3>Interesse in een optreden?</h3>
              <p>Jesus &amp; The Fishsticks staat open voor boekingen voor festivals, club-shows, benefietconcerten en andere evenementen.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">Neem contact op →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
