import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">Jesus &amp; The Fishsticks</div>
      <nav className="footer-nav">
        <Link href="/about">Over ons</Link>
        <Link href="/music">Muziek</Link>
        <Link href="/shows">Shows</Link>
        <Link href="/gallery">Foto&apos;s</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/press">Pers</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <p>Eindhoven &nbsp;·&nbsp; 2026 &nbsp;·&nbsp; Blues · Rock-&apos;n-Roll · Industriële Punk</p>
      <p style={{ marginTop: '1rem', fontSize: '.7rem' }}>
        Gebaseerd op een artikel van Frank van den Muijsenberg, Eindhovens Dagblad, 14 maart 2026
      </p>
    </footer>
  );
}
