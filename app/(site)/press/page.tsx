import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { getPressDownloads, type PressDownload } from '@/lib/sanity';

export const revalidate = 60;

export const metadata = {
  title: 'Perskit — Jesus & The Fishsticks',
};

const CATEGORY_LABELS: Record<PressDownload['category'], string> = {
  'bio-nl':     'Bio (NL)',
  'bio-en':     'Bio (EN)',
  photos:       "Persfoto's",
  logos:        "Logo's",
  'tech-rider': 'Tech rider',
  other:        'Overig',
};

const CATEGORY_ICONS: Record<PressDownload['category'], string> = {
  'bio-nl':     '📄',
  'bio-en':     '📄',
  photos:       '🖼️',
  logos:        '🔤',
  'tech-rider': '🎚️',
  other:        '📦',
};

export default async function PressPage() {
  const downloads = await getPressDownloads();

  return (
    <>
      <style>{`
        .kit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
        .kit-card {
          background: var(--card); border: 1px solid var(--border);
          padding: 2rem; display: flex; flex-direction: column; gap: 1rem;
          transition: border-color .2s;
        }
        .kit-card:hover { border-color: var(--accent); }
        .kit-icon { font-size: 2.2rem; }
        .kit-card h4 { font-family: var(--font-h); font-size: 1rem; text-transform: uppercase; letter-spacing: .05em; }
        .kit-card p { font-size: .85rem; color: var(--mid); flex: 1; }
        .kit-empty { color: var(--mid); font-size: .9rem; padding: 1rem 0; }
        .news-list { display: flex; flex-direction: column; gap: 1px; }
        .news-item {
          background: var(--card); border: 1px solid var(--border);
          padding: 1.75rem 2rem; display: grid; grid-template-columns: 1fr auto;
          gap: 2rem; align-items: center; transition: border-color .2s;
        }
        .news-item:hover { border-color: var(--accent); }
        .news-source { font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; color: var(--red); margin-bottom: .4rem; }
        .news-title { font-family: var(--font-h); font-size: 1.2rem; margin-bottom: .4rem; }
        .news-meta { font-size: .82rem; color: var(--mid); }
        .news-excerpt { font-size: .88rem; color: #999; margin-top: .6rem; font-style: italic; }
        .bio-block { background: var(--card); border: 1px solid var(--border); padding: 2.5rem; }
        .bio-block p { color: #bbb; margin-bottom: 1rem; }
        .bio-block p:last-of-type { margin-bottom: 0; }
        .bio-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.75rem; }
        .press-contact {
          background: #0f0e09; border: 1px solid #2a2510;
          padding: 2.5rem; display: flex; justify-content: space-between; align-items: center;
          gap: 2rem; flex-wrap: wrap;
        }
        .press-contact h3 { font-family: var(--font-h); font-size: 1.4rem; text-transform: uppercase; margin-bottom: .4rem; }
        .press-contact p { color: var(--mid); font-size: .9rem; }
        .press-contact a.email { display: block; margin-top: .75rem; color: var(--accent); font-family: var(--font-h); font-size: 1.05rem; text-decoration: none; }
        @media (max-width: 640px) {
          .news-item { grid-template-columns: 1fr; }
        }
      `}</style>

      <PageHeader
        label="Media"
        title={<>Pers &amp;<br /><em>Perskit</em></>}
        subtitle="Alles wat journalisten, bloggers en programmeurs nodig hebben over Jesus & The Fishsticks."
      />

      {/* DOWNLOADS */}
      <section id="bio">
        <div className="container">
          <p className="section-label">Downloads</p>
          <h2 className="section-title">Persmateriaal</h2>
          <div className="rule"></div>

          {downloads.length > 0 ? (
            <div className="kit-grid">
              {downloads.map((dl) => (
                <div key={dl._id} className="kit-card">
                  <div className="kit-icon">{CATEGORY_ICONS[dl.category]}</div>
                  <h4>{dl.title}</h4>
                  {dl.description && <p>{dl.description}</p>}
                  <a
                    href={dl.fileUrl}
                    className="btn btn-outline btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="kit-empty">Persmateriaal wordt binnenkort toegevoegd.</p>
          )}
        </div>
      </section>

      {/* BIO */}
      <section id="bio-text" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Officiële bio</p>
          <h2 className="section-title">Over de band</h2>
          <div className="rule"></div>
          <div className="bio-block">
            <p><strong style={{ color: 'var(--light)' }}>Jesus &amp; The Fishsticks</strong> is een Eindhovens muziekproject dat (ex-)cliënten uit de verslavingszorg en GGZ een professioneel podium geeft. De organisatie is opgericht door Cor Verbrugge (Novadic-Kentron) en wordt muzikaal begeleid door de ervaren Eindhovense muzikant Ruud Borgers.</p>
            <p>De band bestaat uit zanger/bassist Styn Pruijn, gitaristen Willem Holthausen en Wim Reijnen, en drummer Robert Smissaert. De naam is bedacht door Holthausen, naar aanleiding van een filosofisch gesprek met Pruijn over muziekgroepen.</p>
            <p>Jesus &amp; The Fishsticks is nadrukkelijk géén therapeutisch project. De muziek zelf is de therapie en de uitlaatklep. In 2026 bracht de band de debuut-EP <em>&apos;Straight from the can&apos;</em> uit — nu beschikbaar via alle streamingdiensten.</p>
            {downloads.filter((d) => d.category === 'bio-nl' || d.category === 'bio-en').length > 0 && (
              <div className="bio-actions">
                {downloads
                  .filter((d) => d.category === 'bio-nl' || d.category === 'bio-en')
                  .map((dl) => (
                    <a
                      key={dl._id}
                      href={dl.fileUrl}
                      className="btn btn-outline btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download {CATEGORY_LABELS[dl.category]}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NIEUWS */}
      <section id="news">
        <div className="container">
          <p className="section-label">Pers</p>
          <h2 className="section-title">In het nieuws</h2>
          <div className="rule"></div>
          <div className="news-list">
            <div className="news-item">
              <div>
                <p className="news-source">Eindhovens Dagblad</p>
                <p className="news-title">Jesus &amp; The Fishsticks: geen therapeutisch clubje, maar een band met een missie</p>
                <p className="news-meta">Frank van den Muijsenberg &nbsp;·&nbsp; 14 maart 2026</p>
                <p className="news-excerpt">&quot;Jesus &amp; The Fishsticks trekken de aandacht met hun naam en overtuigen met hun bijzondere verhaal.&quot;</p>
              </div>
              <a href="#" className="btn btn-outline btn-sm" style={{ whiteSpace: 'nowrap' }}>Lees artikel →</a>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS CONTACT */}
      <section style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Perscontact</h2>
          <div className="rule"></div>
          <div className="press-contact">
            <div>
              <h3>Vragen voor de pers?</h3>
              <p>Voor interviews, recensies, vooraankondigingen of andere mediaverzoeken — of om persmateriaal aan te vragen.</p>
              <a href="mailto:pers@jesusandthefishsticks.nl" className="email">pers@jesusandthefishsticks.nl</a>
            </div>
            <Link href="/contact" className="btn btn-primary">Stuur een bericht →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
