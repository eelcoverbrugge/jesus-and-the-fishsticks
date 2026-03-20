'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterBar from '@/components/NewsletterBar';

function SizePicker({
  sizes,
  defaultActive,
  disabled = [],
}: {
  sizes: string[];
  defaultActive: string;
  disabled?: string[];
}) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div className="size-picker">
      {sizes.map((size) => (
        <button
          key={size}
          className={`size-btn${active === size ? ' active' : ''}`}
          disabled={disabled.includes(size)}
          onClick={() => !disabled.includes(size) && setActive(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

function AddToCartButton() {
  const [showToast, setShowToast] = useState(false);

  function handleClick() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleClick}>
        In winkelwagen
      </button>
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '2rem',
            background: 'var(--accent)',
            color: 'var(--black)',
            fontFamily: 'var(--font-h)',
            fontSize: '.9rem',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            padding: '1rem 1.75rem',
            zIndex: 999,
            boxShadow: '0 4px 20px rgba(0,0,0,.5)',
          }}
        >
          ✓ Toegevoegd aan winkelwagen
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <style>{`
        .shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
        .product-card {
          background: var(--card); border: 1px solid var(--border);
          display: flex; flex-direction: column;
          transition: border-color .2s, transform .2s;
        }
        .product-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .product-image {
          aspect-ratio: 1; background: #0e0e0e;
          display: flex; align-items: center; justify-content: center;
          font-size: 5rem; opacity: .3; position: relative;
        }
        .product-image .badge-new {
          position: absolute; top: 1rem; left: 1rem;
          background: var(--red); color: #fff;
          font-family: var(--font-h); font-size: .7rem; letter-spacing: .1em;
          text-transform: uppercase; padding: .3rem .75rem;
        }
        .product-image .badge-sold {
          position: absolute; top: 1rem; right: 1rem;
          background: var(--muted); color: #fff;
          font-family: var(--font-h); font-size: .7rem; letter-spacing: .1em;
          text-transform: uppercase; padding: .3rem .75rem;
        }
        .product-info { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; gap: .75rem; }
        .product-name { font-family: var(--font-h); font-size: 1.1rem; text-transform: uppercase; }
        .product-desc { font-size: .85rem; color: var(--mid); flex: 1; }
        .product-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .product-price { font-family: var(--font-h); font-size: 1.3rem; color: var(--accent); }
        .product-price .old { font-size: .85rem; color: var(--muted); text-decoration: line-through; margin-right: .4rem; }
        .size-picker { display: flex; gap: .4rem; flex-wrap: wrap; }
        .size-btn {
          width: 34px; height: 34px; border: 1px solid var(--border);
          background: none; color: var(--mid); font-size: .78rem; cursor: pointer;
          font-family: var(--font-h); transition: border-color .15s, color .15s, background .15s;
        }
        .size-btn:hover, .size-btn.active { border-color: var(--accent); color: var(--black); background: var(--accent); }
        .size-btn:disabled { opacity: .3; cursor: not-allowed; }
        .merch-info-bar {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border); margin-bottom: 3rem;
        }
        .merch-info-item { background: var(--card); padding: 1.5rem 2rem; }
        .merch-info-item .i-label { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--mid); margin-bottom: .4rem; }
        .merch-info-item .i-val { font-family: var(--font-h); font-size: 1rem; color: var(--light); }
        @media (max-width: 640px) {
          .merch-info-bar { grid-template-columns: 1fr; }
        }
      `}</style>

      <PageHeader
        label="Merchandise"
        title={<>De <em>shop</em></>}
        subtitle="Draag de band. T-shirts, hoodies en de EP — rechtstreeks van Jesus & The Fishsticks."
      />

      <section>
        <div className="container">
          <div className="merch-info-bar">
            <div className="merch-info-item">
              <p className="i-label">Verzending</p>
              <p className="i-val">Nederland &amp; België</p>
            </div>
            <div className="merch-info-item">
              <p className="i-label">Levertijd</p>
              <p className="i-val">3–5 werkdagen</p>
            </div>
            <div className="merch-info-item">
              <p className="i-label">Opbrengst</p>
              <p className="i-val">Steunt de foundation</p>
            </div>
          </div>

          <p className="section-label">Kleding</p>
          <h2 className="section-title">Merchandise</h2>
          <div className="rule"></div>

          <div className="shop-grid">

            {/* T-shirt */}
            <div className="product-card">
              <div className="product-image">
                👕
                <span className="badge-new">Nieuw</span>
              </div>
              <div className="product-info">
                <p className="product-name">T-shirt — Logo</p>
                <p className="product-desc">Zwart unisex T-shirt met het Jesus &amp; The Fishsticks logo op de borst. 100% biologisch katoen.</p>
                <div>
                  <p style={{ fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.4rem' }}>Maat</p>
                  <SizePicker sizes={['S', 'M', 'L', 'XL', 'XXL']} defaultActive="M" disabled={['XXL']} />
                </div>
                <div className="product-footer">
                  <p className="product-price">€ 25</p>
                  <AddToCartButton />
                </div>
              </div>
            </div>

            {/* Hoodie */}
            <div className="product-card">
              <div className="product-image">🧥</div>
              <div className="product-info">
                <p className="product-name">Hoodie — Straight from the can</p>
                <p className="product-desc">Zwarte hoodie met EP-artwork op de rug. Warm, zwaar en comfortabel. Unisex fit.</p>
                <div>
                  <p style={{ fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '.4rem' }}>Maat</p>
                  <SizePicker sizes={['S', 'M', 'L', 'XL']} defaultActive="L" disabled={['S']} />
                </div>
                <div className="product-footer">
                  <p className="product-price">€ 45</p>
                  <AddToCartButton />
                </div>
              </div>
            </div>

            {/* Tote bag */}
            <div className="product-card">
              <div className="product-image">🎒</div>
              <div className="product-info">
                <p className="product-name">Tote bag</p>
                <p className="product-desc">Stevige katoenen tas met het bandlogo. Ideaal voor de dagelijkse boodschappen of als concerttas.</p>
                <div className="product-footer">
                  <p className="product-price">€ 15</p>
                  <AddToCartButton />
                </div>
              </div>
            </div>

            {/* EP digital */}
            <div className="product-card">
              <div className="product-image">
                💿
                <span className="badge-new">Uit nu</span>
              </div>
              <div className="product-info">
                <p className="product-name">EP — Straight from the can</p>
                <p className="product-desc">Beluister de debuut-EP gratis via alle streamingdiensten, of download via Bandcamp om de band direct te steunen.</p>
                <div className="product-footer">
                  <p className="product-price">Gratis stream</p>
                  <Link href="/music" className="btn btn-outline btn-sm">Beluisteren →</Link>
                </div>
              </div>
            </div>

            {/* Bundle */}
            <div className="product-card" style={{ borderColor: '#3a3218', background: '#0f0e09' }}>
              <div className="product-image" style={{ background: '#0a0905' }}>🎁</div>
              <div className="product-info">
                <p className="product-name" style={{ color: 'var(--accent)' }}>Fanpakket — Bundle</p>
                <p className="product-desc">T-shirt + Hoodie + Tote bag. Alles in één. Steunen doe je zo.</p>
                <div className="product-footer">
                  <p className="product-price"><span className="old">€ 85</span>€ 70</p>
                  <AddToCartButton />
                </div>
              </div>
            </div>

          </div>

          <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginTop: '2.5rem', textAlign: 'center' }}>
            De opbrengst van de merchandise steunt de Novadic-Kentron Foundation en maakt toekomstige muziekprojecten mogelijk.
          </p>
        </div>
      </section>

      <NewsletterBar
        title="Nieuwe merch als eerste zien"
        description="Schrijf je in en wees de eerste bij nieuwe drops en limited editions."
      />
    </>
  );
}
