import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <AudioPlayer />
      <ThemeSwitcher />
    </>
  );
}
