'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
        .contact-blocks { display: flex; flex-direction: column; gap: 1.5rem; }
        .contact-block {
          background: var(--card); border: 1px solid var(--border); padding: 1.75rem;
        }
        .contact-block .label { font-size: .72rem; letter-spacing: .18em; text-transform: uppercase; color: var(--red); margin-bottom: .6rem; }
        .contact-block h4 { font-family: var(--font-h); font-size: 1.05rem; text-transform: uppercase; margin-bottom: .4rem; }
        .contact-block p { font-size: .88rem; color: var(--mid); margin-bottom: .75rem; }
        .contact-block a { color: var(--accent); text-decoration: none; font-family: var(--font-h); font-size: 1rem; }
        .contact-block a:hover { text-decoration: underline; }
        .socials { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: .5rem; }
        .social-btn {
          display: flex; align-items: center; gap: .5rem;
          background: var(--card); border: 1px solid var(--border);
          padding: .55rem 1rem; text-decoration: none; color: var(--mid);
          font-size: .8rem; transition: border-color .2s, color .2s;
        }
        .social-btn:hover { border-color: var(--accent); color: var(--accent); }
        .form-card { background: var(--card); border: 1px solid var(--border); padding: 2.5rem; }
        .form-card h3 { font-family: var(--font-h); font-size: 1.4rem; text-transform: uppercase; margin-bottom: 1.75rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-success {
          background: #0f2a1a; border: 1px solid #1a4a2a;
          padding: 1.5rem; text-align: center; margin-top: 1rem;
          font-family: var(--font-h); font-size: 1.1rem; color: #2ecc71;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <PageHeader
        label="In contact"
        title={<>Contact &amp;<br /><em>Boekingen</em></>}
        subtitle="Voor boekingen, persverzoeken, samenwerkingen en vragen over de foundation."
      />

      <section>
        <div className="container">
          <div className="contact-grid">

            {/* LEFT */}
            <div className="contact-blocks">
              <div className="contact-block">
                <p className="label">Boekingen</p>
                <h4>Boek de band</h4>
                <p>Interesse in een optreden op jouw festival, evenement of club? We horen graag van je.</p>
                <a href="mailto:booking@jesusandthefishsticks.nl">booking@jesusandthefishsticks.nl</a>
              </div>
              <div className="contact-block">
                <p className="label">Pers &amp; Media</p>
                <h4>Persverzoeken</h4>
                <p>Voor interviews, recensies, vooraankondigingen en andere mediaverzoeken.</p>
                <a href="mailto:pers@jesusandthefishsticks.nl">pers@jesusandthefishsticks.nl</a>
              </div>
              <div className="contact-block">
                <p className="label">Algemeen</p>
                <h4>Algemeen contact</h4>
                <p>Vragen over de band, de foundation of Novadic-Kentron? Stuur een e-mail.</p>
                <a href="mailto:info@jesusandthefishsticks.nl">info@jesusandthefishsticks.nl</a>
              </div>
              <div className="contact-block">
                <p className="label">Locatie</p>
                <h4>Gebaseerd in</h4>
                <p>Eindhoven, Nederland<br />Onderdeel van de Novadic-Kentron Foundation</p>
              </div>
              <div>
                <p style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.75rem' }}>Volg ons</p>
                <div className="socials">
                  <a className="social-btn" href="#">📷 Instagram</a>
                  <a className="social-btn" href="#">👤 Facebook</a>
                  <a className="social-btn" href="#">🎵 Spotify</a>
                  <a className="social-btn" href="#">▶ YouTube</a>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="form-card">
              <h3>Stuur een bericht</h3>
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div>
                      <label htmlFor="fname">Naam</label>
                      <input id="fname" type="text" placeholder="Jouw naam" />
                    </div>
                    <div>
                      <label htmlFor="org">Organisatie</label>
                      <input id="org" type="text" placeholder="Optioneel" />
                    </div>
                  </div>
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" placeholder="jouw@email.nl" required />
                  <label htmlFor="subject">Onderwerp</label>
                  <select id="subject">
                    <option value="">Selecteer een onderwerp</option>
                    <option>Boeking / optreden</option>
                    <option>Persverzoek / interview</option>
                    <option>Samenwerking</option>
                    <option>Foundation / Novadic-Kentron</option>
                    <option>Algemene vraag</option>
                    <option>Anders</option>
                  </select>
                  <label htmlFor="msg">Bericht</label>
                  <textarea id="msg" placeholder="Vertel ons meer…" style={{ minHeight: '160px' }}></textarea>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', cursor: 'pointer' }}>
                    Verstuur bericht
                  </button>
                </form>
              ) : (
                <div className="form-success">
                  ✓ &nbsp; Bericht ontvangen — we nemen zo snel mogelijk contact op.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
