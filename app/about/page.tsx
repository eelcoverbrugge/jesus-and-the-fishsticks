import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterBar from '@/components/NewsletterBar';

export const metadata = {
  title: 'Over ons — Jesus & The Fishsticks',
};

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-body { display: grid; grid-template-columns: 3fr 2fr; gap: 4rem; align-items: start; }
        .about-text p { color: #bbb; margin-bottom: 1.2rem; }
        .about-text p.lead { color: var(--light); font-size: 1.1rem; }
        .pullquote {
          background: var(--card); border-left: 4px solid var(--accent);
          padding: 2rem; position: relative; margin-bottom: 2rem;
        }
        .pullquote::before {
          content: '\\201C'; font-family: Georgia, serif; font-size: 5rem;
          color: var(--accent); opacity: .25; position: absolute; top: -.8rem; left: .8rem; line-height: 1;
        }
        .pullquote p { font-family: var(--font-h); font-size: 1.35rem; line-height: 1.35; color: var(--light); }
        .pullquote cite { display: block; margin-top: 1rem; font-size: .8rem; font-style: normal; color: var(--mid); letter-spacing: .05em; }

        .members-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.5rem; }
        .member-card {
          background: var(--card); border: 1px solid var(--border); padding: 2rem 1.5rem; text-align: center;
          transition: border-color .2s, transform .2s;
        }
        .member-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .member-avatar {
          width: 80px; height: 80px; border-radius: 50%; background: #1a1a1a;
          margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center;
          font-size: 2rem; border: 2px solid var(--border);
        }
        .member-card:hover .member-avatar { border-color: var(--accent); }
        .member-name { font-family: var(--font-h); font-size: 1.15rem; text-transform: uppercase; margin-bottom: .2rem; }
        .member-role { font-size: .75rem; color: var(--accent); letter-spacing: .12em; text-transform: uppercase; margin-bottom: .75rem; }
        .member-bio { font-size: .85rem; color: var(--mid); }

        .staff-row { margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border); display: flex; gap: 2.5rem; flex-wrap: wrap; }
        .staff-item span { color: var(--mid); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; display: block; margin-bottom: .2rem; }
        .staff-item strong { color: var(--light); }

        .foundation-box {
          background: var(--card); border: 1px solid var(--border); border-left: 4px solid var(--red); padding: 2.5rem;
        }
        .foundation-box p { color: #bbb; margin-bottom: 1rem; }
        .foundation-box p:last-child { margin-bottom: 0; }

        @media (max-width: 768px) {
          .about-body { grid-template-columns: 1fr; }
        }
      `}</style>

      <PageHeader
        label="Het verhaal"
        title={<>Over <em>de band</em></>}
        subtitle="Een Eindhovens collectief met een bijzonder verhaal — gedreven door muziek, niet door therapie."
      />

      {/* VERHAAL */}
      <section>
        <div className="container">
          <p className="section-label">Oorsprong</p>
          <h2 className="section-title">Hoe het begon</h2>
          <div className="rule"></div>
          <div className="about-body">
            <div className="about-text">
              <p className="lead">Jesus &amp; The Fishsticks trekken de aandacht met hun naam — en overtuigen met hun bijzondere verhaal.</p>
              <p>Zanger en bassist Styn Pruijn filosofeerde ooit over een groep genaamd <em>The Fishsticks About Jesus</em>. Toen hij dat vertelde aan gitarist Willem Holthausen, bedacht die ter plekke de huidige naam. <em>&quot;Ik ben overtuigd christen, maar dat heeft er niks mee te maken,&quot;</em> benadrukt Pruijn.</p>
              <p>Holthausen vult aan: <em>&quot;Jezus is de bekendste persoon uit de geschiedenis, ook een soort popster. Dus we hebben meteen naamsbekendheid.&quot;</em></p>
              <p>De organisatie achter de band is opgericht door Cor Verbrugge, medewerker bij Novadic-Kentron. Zijn doel: muzikale (ex-)cliënten uit de verslavingszorg of GGZ een professioneel podium geven. Onder leiding van coach Ruud Borgers — een ervaren Eindhovense muzikant — ging de groep repeteren en werken aan eigen nummers.</p>
              <p>Borgers: <em>&quot;De band is een organisme dat constant verandert. In het begin hadden de muzikanten alleen intenties voor de korte termijn. Op een gegeven moment is een band ontstaan. De songs die ze samen maken worden allemaal kinderen. Daar moet je voor zorgen.&quot;</em></p>
              <p>Pruijn over de lange termijn: <em>&quot;Voor een verslaafde voelt alles heel urgent; er moet nú iets gebeuren. Het is moeilijk een ruimte te creëren waarbinnen je kan groeien.&quot;</em> De band slaagde er toch in.</p>
            </div>
            <div>
              <blockquote className="pullquote">
                <p>De muziek zelf is de therapie en de uitlaatklep.</p>
                <cite>— Ruud Borgers, coach van de band</cite>
              </blockquote>
              <blockquote className="pullquote">
                <p>Het gaat ons niet om het verkopen van een plaat. We willen mensen kennis laten maken met de band.</p>
                <cite>— Willem Holthausen, gitarist</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section id="members" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <p className="section-label">De mensen</p>
          <h2 className="section-title">Bandleden</h2>
          <div className="rule"></div>
          <div className="members-grid">
            <div className="member-card">
              <div className="member-avatar">🎤</div>
              <p className="member-name">Styn Pruijn</p>
              <p className="member-role">Zang &amp; Bas</p>
              <p className="member-bio">Initiatiefnemer en filosoof achter de bandnaam. Overtuigd christen met een scherp gevoel voor woorden en teksten.</p>
            </div>
            <div className="member-card">
              <div className="member-avatar">🎸</div>
              <p className="member-name">Willem Holthausen</p>
              <p className="member-role">Gitaar</p>
              <p className="member-bio">Bedacht ter plekke de naam Jesus &amp; The Fishsticks. Woordvoerder en creatieve motor van de band.</p>
            </div>
            <div className="member-card">
              <div className="member-avatar">🎸</div>
              <p className="member-name">Wim Reijnen</p>
              <p className="member-role">Gitaar</p>
              <p className="member-bio">Brengt textuur en diepte aan het gitaargeluid van de band.</p>
            </div>
            <div className="member-card">
              <div className="member-avatar">🥁</div>
              <p className="member-name">Robert Smissaert</p>
              <p className="member-role">Drums</p>
              <p className="member-bio">Gerekruteerd door Borgers; speelden eerder samen in rockband Bo/The Rude. <em>&quot;Ik heb Robert gevraagd, omdat ik merkte dat hij echt behoefte had aan muziek.&quot;</em></p>
            </div>
          </div>
          <div className="staff-row">
            <div className="staff-item"><span>Coach</span><strong>Ruud Borgers</strong></div>
            <div className="staff-item"><span>Oprichter</span><strong>Cor Verbrugge</strong></div>
            <div className="staff-item"><span>Organisatie</span><strong>Novadic-Kentron Foundation</strong></div>
          </div>
        </div>
      </section>

      {/* FOUNDATION */}
      <section>
        <div className="container">
          <p className="section-label">Achtergrond</p>
          <h2 className="section-title">De foundation</h2>
          <div className="rule"></div>
          <div className="foundation-box">
            <p>Jesus &amp; The Fishsticks is <strong style={{ color: 'var(--light)' }}>geen therapeutisch clubje</strong> voor ex-verslaafden. De muziek <em>zelf</em> is de therapie — en de uitlaatklep. De organisatie biedt muzikale (ex-)cliënten uit de verslavingszorg en GGZ een professioneel platform om te groeien als muzikant en als mens.</p>
            <p>Borgers: <em>&quot;De songs die ze samen maken worden allemaal kinderen. Daar moet je voor zorgen. Elke week was er een dag waarop ze er voor de band moesten zijn.&quot;</em> Die structuur en toewijding zijn de kern van het project.</p>
            <p>Holthausen: <em>&quot;Het gaat ons niet om het verkopen van een plaat. We willen mensen kennis laten maken met de band en de foundation waaruit we voortkomen.&quot;</em></p>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-outline">Contact opnemen</Link>
            <Link href="/press" className="btn btn-outline">Perskit</Link>
          </div>
        </div>
      </section>

      <NewsletterBar
        title="Op de hoogte blijven"
        description="Nieuws, shows en updates — rechtstreeks in je inbox."
      />
    </>
  );
}
