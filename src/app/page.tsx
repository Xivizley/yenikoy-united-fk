import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { NewsSection } from '@/components/NewsSection';
import { SquadList } from '@/components/SquadList';
import { KitsSection } from '@/components/KitsSection';
import { FixturesSection } from '@/components/FixturesSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-bg">
      <Navbar />

      <main>
        <HeroSection />
        <NewsSection />
        <SquadList />
        <KitsSection />
        <FixturesSection />
      </main>

      <Footer />
    </div>
  );
}
