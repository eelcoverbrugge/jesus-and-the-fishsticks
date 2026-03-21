import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { getUpcomingShows, getPastShows, type Show } from '@/lib/sanity';

export const revalidate = 60;

export const metadata = {
  title: 'Shows — Jesus & The Fishsticks',
};

// ── Helpers ───────────────────────────────────────────────────────────

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? '?' : d.getDate().toString();
}

function formatMonth(dateStr: string) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('nl-NL', { month: 'short' });
}

function formatYear(dateStr: string) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? '' : d.getFullYear().toString();
}

function StatusBadge({ status, price }: { status: Show['status']; price?: string }) {
  const map: Record<Show['status'], { cls: string; label: string }> = {
    upcoming:   { cls: 'badge-free',    label: price || 'Aankomend' },
    tba:        { cls: 'badge-tba',     label: 'Binnenkort' },
    'sold-out': { cls: 'badge-tickets', label: 'Uitverkocht' },
    past:       { cls: 'badge-past',    label: 'Geweest' },
  };
  const { cls, label } = map[status] ?? map.tba;
  return <span className={`badge ${cls}`}>{label}</span>;
}

function ShowItem({ show, isPast }: { show: Show; isPast?: boolean }) {
  return (
    <div className={`show-item${isPast ? ' past' : ''}`}>
      <div className="show-date-box">
        {show.status === 'tba' ? (
          <>
            <div className="show-day">TBA</div>
            <div className="show-month">{formatYear(show.date)}</div>
          </>
        ) : (
          <>
            <div className="show-day">{formatDay(show.date)}</div>
            <div className="show-month">{formatMonth(show.date)}</div>
            <div className="show-year">{formatYear(show.date)}</div>
          </>
        )}
      </div>
      <div className="show-details">
        <h4>{show.title}</h4>
        <p className="show-venue">
          {[show.venue, show.city].filter(Boolean).join(' · ')}
          {show.doorsOpen && ` · Zaal open: ${show.doorsOpen}`}
        </p>
        {show.guestActs && (
          <p className="show-support">Met speciale gasten: {show.guestActs}</p>
        )}
        {show.notes && <p className="show-support">{show.notes}</p>}
        {show.tags && show.tags.length > 0 && (
          <div className="show-tags">
            {show.tags.map((tag) => (
              <span key={tag} className="show-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="show-action">
        <StatusBadge status={show.status} price={show.price} />
        {show.ticketUrl && show.status !== 'past' && (
          <a href={show.ticketUrl} className="badge badge-tickets" target="_blank" rel="noopener noreferrer">
            Tickets →
          </a>
        )}
        {show.price && show.price !== show.status && show.status === 'upcoming' && (
          <span className="badge badge-free">{show.price}</span>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────

export default async function ShowsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingShows(), getPastShows()]);

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
        .badge { font-family: var(--font-h); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; padding: .35rem .9rem; white-space: nowrap; text-decoration: none; }
        .badge-free    { background: var(--accent); color: var(--black); }
        .badge-past    { border: 1px solid var(--muted); color: var(--muted); background: transparent; }
        .badge-tba     { border: 1px solid #333; color: var(--mid); background: transparent; }
        .badge-tickets { background: var(--red); color: #fff; }
        .shows-section-title {
          font-family: var(--font-h); font-size: 1rem; letter-spacing: .2em;
          text-transform: uppercase; color: var(--mid); margin: 2.5rem 0 1rem;
          padding-bottom: .5rem; border-bottom: 1px solid var(--border);
        }
        .no-shows { color: var(--mid); font-size: .9rem; padding: 1.5rem 0; }
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

          {upcoming.length > 0 ? (
            <div className="shows-list">
              {upcoming.map((show) => (
                <ShowItem key={show._id} show={show} />
              ))}
            </div>
          ) : (
            <p className="no-shows">Nog geen shows gepland — houd de socials in de gaten.</p>
          )}

          <p style={{ color: 'var(--mid)', fontSize: '.85rem', marginTop: '1.5rem' }}>
            Wil je de band boeken? <Link href="/contact" style={{ color: 'var(--accent)' }}>Neem contact op →</Link>
          </p>

          {past.length > 0 && (
            <>
              <p className="shows-section-title">Geweest</p>
              <div className="shows-list">
                {past.map((show) => (
                  <ShowItem key={show._id} show={show} isPast />
                ))}
              </div>
            </>
          )}
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
