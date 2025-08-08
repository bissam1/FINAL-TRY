import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

// ====================================================================================================
// Component Imports
// NOTE: These components must exist in your project's file system (e.g., in a `components` folder).
// ====================================================================================================
import EnhancedPreloader from './components/EnhancedPreloader';
import EnhancedCursor from './components/EnhancedCursor';
import EnhancedNav from './components/EnhancedNav';
import ParallaxVideoBackground from './components/ParallaxVideoBackground';
import HeroSection from './components/HeroSection';
import FeaturedProperties from './components/FeaturedProperties';
import DestinationsSection from './components/DestinationsSection';
import ServicesSection from './components/ServicesSection';
import OfficeLocations from './components/OfficeLocations';
import AIToolsSection from './components/AIToolsSection';
import ContactSection from './components/ContactSection';
import FloatingTools from './components/FloatingTools';
import Footer from './components/Footer';

// ====================================================================================================
// Data Models and Constants
// You would typically define these in a separate file like `types.ts`
// ====================================================================================================
const COUNTRIES = {
  uae: { name: 'United Arab Emirates', videoSrc: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5', currency: 'AED', language: 'ar' },
  uk: { name: 'United Kingdom', videoSrc: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd', currency: 'GBP', language: 'en' },
  russia: { name: 'Russia', videoSrc: 'https://images.unsplash.com/photo-1513326738677-b964603b136d', currency: 'RUB', language: 'ru' }
};

// ====================================================================================================
// Main Application Component
// ====================================================================================================
export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const currentPath = router.pathname;
  const isHomePage = currentPath === '/' || currentPath === '/home';
  const isCountryPage = currentPath.startsWith('/country/');

  return (
    <div className="bg-background text-foreground font-body antialiased">
      {/* Renders the Preloader and then the main content */}
      {isLoading && <EnhancedPreloader onComplete={handlePreloaderComplete} />}
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <AnimatePresence mode="wait">
          <EnhancedCursor />
          {isHomePage && (
            <>
              <ParallaxVideoBackground />
              <EnhancedNav isVisible={!isLoading} />
              <main>
                <HeroSection isVisible={!isLoading} />
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
          )}

          {isCountryPage && (
            <CountryPage />
          )}

          {!isHomePage && !isCountryPage && <Component {...pageProps} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ====================================================================================================
// Individual Page Components (as seen in your original files)
// ====================================================================================================

function CountryPage() {
  const router = useRouter();
  const { country } = router.query;
  const [uiVisible, setUiVisible] = useState(false);
  const countryData = COUNTRIES[country as keyof typeof COUNTRIES] || COUNTRIES.uae;

  useEffect(() => {
    const timer = setTimeout(() => {
      setUiVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!country) return null;

  return (
    <>
      <Head>
        <title>NOOD Properties | {countryData.name}</title>
      </Head>
      <EnhancedNav isVisible={uiVisible} />
      <main>
        {/* Placeholder for your CountryHero component */}
        {/* <CountryHero country={countryData.name} videoSrc={countryData.videoSrc} isVisible={uiVisible} /> */}
        {/* Placeholder for your CountryInfo component */}
        {/* <CountryInfo country={country as string} /> */}
        <FeaturedProperties country={country as string} />
        <AIToolsSection />
      </main>
      <FloatingTools />
      <Footer />
    </>
  );
}
