import type { Metadata } from 'next';
import {
  Oswald,
  Open_Sans,
  Playfair_Display,
  Lora,
  Space_Grotesk,
  Inter,
  Righteous,
  Nunito,
} from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const righteous = Righteous({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-righteous',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jesus & The Fishsticks',
  description:
    'Jesus & The Fishsticks — een Eindhovense band met een bijzonder verhaal. Debut EP "Straight from the can" nu uit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={[
        oswald.variable,
        openSans.variable,
        playfairDisplay.variable,
        lora.variable,
        spaceGrotesk.variable,
        inter.variable,
        righteous.variable,
        nunito.variable,
      ].join(' ')}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme', localStorage.getItem('jtf-theme') || 'dark');`,
          }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <AudioPlayer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
