import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Perskit — Jesus & The Fishsticks',
};

export default function PressPage() {
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
        .bio-block {
          background: var(--card); border: 1px solid var(--border); padding: 2.5rem;
        }
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
          <div className="kit-grid">
            <div className="kit-card">
              <div className="kit-icon">📄</div>
              <h4>Officiële bio (NL)</h4>
              <p>Volledige Nederlandstalige bandbio, klaar voor publicatie. Inclusief bandgeschiedenis en missie.</p>
              <a href="#" className="btn btn-outline btn-sm">Download PDF</a>
            </div>
            <div className="kit-card">
              <div className="kit-icon">📄</div>
              <h4>Officiële bio (EN)</h4>
              <p>English band biography for international press and festival submissions.</p>
              <a href="#" className="btn btn-outline btn-sm">Download PDF</a>
            </div>
            <div className="kit-card" id="photos">
              <div className="kit-icon">🖼️</div>
              <h4>Persfoto&apos;s</h4>
              <p>Hi-res bandfotos (300 dpi, min. 3000px) voor print en digitaal gebruik. Vrij te gebruiken met credit.</p>
              <a href="#" className="btn btn-outline btn-sm">Download ZIP</a>
            </div>
            <div className="kit-card">
              <div className="kit-icon">🔤</div>
              <h4>Logo&apos;s</h4>
              <p>Bandlogo in zwart, wit en kleur. PNG (transparant) en SVG formaten beschikbaar.</p>
              <a href="#" className="btn btn-outline btn-sm">Download ZIP</a>
            </div>
            <div className="kit-card">
              <div className="kit-icon">🎵</div>
              <h4>EP — Promokopie</h4>
              <p>&apos;Straight from the can&apos; — volledige EP als WAV/MP3 voor recensenten en programmeurs.</p>
              <a href="#" className="btn btn-outline btn-sm">Aanvragen</a>
            </div>
            <div className="kit-card">
              <div className="kit-icon">📦</div>
              <h4>Complete perskit</h4>
              <p>Bio, foto&apos;s, logo&apos;s en technische rider in één ZIP-bestand.</p>
              <a href="#" className="btn btn-primary btn-sm">Download alles</a>
            </div>
          </div>
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
            <p>De band bestaat uit zanger/bassist Styn Pruijn, gitaristen Willem Holthausen en Wim Reijnen, en drummer Robert Smissaert. De naam is bedacht door Holthausen, naar aanleiding van een filosofisch gesprek met Pruijn over muziekgroepen. <em>&quot;Jezus is de bekendste persoon uit de geschiedenis, ook een soort popster. Dus we hebben meteen naamsbekendheid,&quot;</em> aldus Holthausen.</p>
            <p>Jesus &amp; The Fishsticks is nadrukkelijk géén therapeutisch project. De muziek zelf is de therapie en de uitlaatklep. Het collectief werkt aan langetermijnprojecten waarbij structuur, discipline en samenwerking centraal staan. <em>&quot;De songs die ze samen maken worden allemaal kinderen. Daar moet je voor zorgen,&quot;</em> zegt coach Borgers.</p>
            <p>In 2026 bracht de band de debuut-EP <em>&apos;Straight from the can&apos;</em> uit — een rauw en direct document van een band in wording. Het geluid beweegt zich tussen blues, rock-&apos;n-roll en industriële punk. De EP is beschikbaar via alle streamingdiensten.</p>
            <div className="bio-actions">
              <a href="#" className="btn btn-outline btn-sm">Download NL PDF</a>
              <a href="#" className="btn btn-outline btn-sm">Download EN PDF</a>
            </div>
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
              <p>Voor interviews, recensies, vooraankondigingen of andere mediaverzoeken.</p>
              <a href="mailto:pers@jesusandthefishsticks.nl" className="email">pers@jesusandthefishsticks.nl</a>
            </div>
            <Link href="/contact" className="btn btn-primary">Stuur een bericht →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
