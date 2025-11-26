import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCollection from '@/components/FeaturedCollection';
import WhyRoomify from '@/components/WhyRoomify';
import Testimonials from '@/components/Testimonials';
import { Lookbook, DesignJournal, AboutSection, Newsletter, Footer } from '@/components/AllSections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedCollection />
      <WhyRoomify />
      <Lookbook />
      <Testimonials />
      <DesignJournal />
      <AboutSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
