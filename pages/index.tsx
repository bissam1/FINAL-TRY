import { useState, useEffect } from 'react';
import Head from 'next/head';

import AnimatedNav from '@/components/AnimatedNav';
import HeroSection from '@/components/HeroSection';
import ParallaxVideoBackground from '@/components/ParallaxVideoBackground';
import FeaturedProperties from '@/components/FeaturedProperties';
import DestinationsSection from '@/components/DestinationsSection';
import ServicesSection from '@/components/ServicesSection';
import OfficeLocations from '@/components/OfficeLocations';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingTools from '@/components/FloatingTools';
import AIToolsSection from '@/components/AIToolsSection';

export default function Home() {
  const [uiVisible, setUiVisible] = useState(false);
  
  useEffect(() => {
    // Delay UI elements to appear after preloader
    const timer = setTimeout(() => {
      setUiVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>NOOD International Properties | Luxury Real Estate</title>
      </Head>

      <ParallaxVideoBackground />
      <AnimatedNav isVisible={uiVisible} />
      
      <main>
        <HeroSection isVisible={uiVisible} />
        <FeaturedProperties />
        <DestinationsSection />
        <ServicesSection />
        <OfficeLocations />
        <AIToolsSection />
        <ContactSection />
      </main>
      
      <FloatingTools />
      <Footer />
    </>
  );
}
