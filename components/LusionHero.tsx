import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, Building2, MapPin, Users, Star } from 'lucide-react';

// Enhanced 3D Logo Component
const Logo3D = () => {
  const logoRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={logoRef}>
        <Text
          fontSize={8}
          letterSpacing={0.1}
          color="#F5A623"
          anchorX="center"
          anchorY="middle"
          position={[0, 1, 0]}
        >
          NŌŌD
        </Text>
        <Text
          fontSize={2}
          letterSpacing={0.05}
          color="#E2E8F0"
          anchorX="center"
          anchorY="middle"
          position={[0, -2, 0]}
        >
          INTERNATIONAL PROPERTIES
        </Text>
      </group>
    </Float>
  );
};

// Enhanced Video Background with Three.js
const VideoBackground = ({ children, showLogo = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const ParticleField = () => {
    const particlesRef = useRef<THREE.Points>(null);
    
    useFrame((state) => {
      if (particlesRef.current) {
        particlesRef.current.rotation.x = state.clock.elapsedTime * 0.0001;
        particlesRef.current.rotation.y = state.clock.elapsedTime * 0.0002;
      }
    });

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 500;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    return (
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial 
          size={1.5} 
          color="#64748B" 
          transparent 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-gradient-cinematic"
      style={{ scale, opacity }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={0.8} />
          <ParticleField />
          {showLogo && <Logo3D />}
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 z-10" />

      <div className="absolute inset-0 pointer-events-none z-20">
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {children && (
        <div className="relative z-30 w-full h-full">
          {children}
        </div>
      )}
    </motion.div>
  );
};

interface LusionHeroProps {
  navigateToGlobalView?: () => void;
  navigateToCountryPage?: (country: string) => void;
}

const LusionHero = ({ navigateToGlobalView, navigateToCountryPage }: LusionHeroProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const countries = [
    { name: "United Arab Emirates", code: "UAE", path: "uae", flag: "🇦🇪" },
    { name: "United States", code: "USA", path: "usa", flag: "🇺🇸" },
    { name: "United Kingdom", code: "UK", path: "uk", flag: "🇬🇧" },
    { name: "Russia", code: "RU", path: "russia", flag: "🇷🇺" },
    { name: "Pakistan", code: "PK", path: "pakistan", flag: "🇵🇰" },
    { name: "India", code: "IN", path: "india", flag: "🇮🇳" }
  ];

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoBackground showLogo={false}>
        <div className="relative z-40 flex flex-col justify-center items-center h-full max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              NŌŌD
            </motion.h1>
            
            <motion.p
              className="text-2xl md:text-4xl text-muted-foreground font-light mb-8 tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              International Properties
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              Discover extraordinary luxury real estate opportunities across the globe with AI-powered insights and premium market analysis.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <Button
              onClick={navigateToGlobalView}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-gold hover:shadow-glow transform hover:scale-105"
            >
              <Globe className="mr-3 h-6 w-6" />
              Explore Global View
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button
              onClick={() => navigateToCountryPage?.('uae')}
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              <Building2 className="mr-3 h-6 w-6" />
              View Properties
            </Button>
          </motion.div>

          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-center mb-8 text-foreground">
              Our Global Destinations
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {countries.map((country, index) => (
                <motion.div
                  key={country.code}
                  className="group cursor-pointer"
                  onClick={() => navigateToCountryPage?.(country.path)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="bg-card/80 backdrop-blur-md border border-border/20 rounded-xl p-4 text-center transition-all duration-300 hover:bg-card/90 hover:shadow-elegant group-hover:border-accent/30">
                    <div className="text-3xl mb-2">{country.flag}</div>
                    <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {country.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default LusionHero;