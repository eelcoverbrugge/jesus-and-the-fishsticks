'use client';

import { useState } from 'react';

interface NewsletterBarProps {
  title?: string;
  description?: string;
}

export default function NewsletterBar({
  title = 'Op de hoogte blijven',
  description = 'Schrijf je in voor nieuws, nieuwe shows en updates van Jesus & The Fishsticks.',
}: NewsletterBarProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="newsletter-bar">
      <div className="inner">
        <h3>{title}</h3>
        <p>{description}</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="jouw@emailadres.nl"
            autoComplete="email"
            required
          />
          <button type="submit" className="btn btn-primary">
            {submitted ? 'Ingeschreven ✓' : 'Inschrijven'}
          </button>
        </form>
        <p className="newsletter-fine">Geen spam. Afmelden kan altijd.</p>
      </div>
    </div>
  );
}
