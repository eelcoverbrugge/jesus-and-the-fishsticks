'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Over ons' },
  { href: '/music', label: 'Muziek' },
  { href: '/shows', label: 'Shows' },
  { href: "/gallery", label: "Foto's" },
  { href: '/press', label: 'Pers' },
  // shop bewust weggelaten
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <nav>
      <Link className="nav-logo" href="/">
        J&amp;TF
      </Link>
      <ul className={`nav-links${isOpen ? ' open' : ''}`} id="navLinks">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href ? 'active' : ''}
              onClick={close}
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="nav-cta">
          <Link
            href="/contact"
            className={pathname === '/contact' ? 'active' : ''}
            onClick={close}
          >
            Contact
          </Link>
        </li>
      </ul>
      <button
        className="nav-toggle"
        id="navToggle"
        aria-label="Menu"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
