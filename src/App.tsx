import AnimatedNav from '@/components/AnimatedNav';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import ParallaxVideoBackground from '@/components/ParallaxVideoBackground';
import Preloader from '@/components/Preloader';
import { useState, useEffect } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavVisible(true);
      } else {
        setNavVisible(true); // Always visible for better UX
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <CustomCursor />
          <ParallaxVideoBackground />
          <AnimatedNav isVisible={navVisible} />
          <HeroSection isVisible={!loading} />
        </>
      )}
    </>
  );
}