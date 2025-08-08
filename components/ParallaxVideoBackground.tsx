import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ParallaxVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const blur = useTransform(scrollY, [0, 300], [0, 8]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-0"
      style={{ y, opacity }}
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)` }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&h=1200&fit=crop"
          alt="Luxury Real Estate Background"
          className="w-full h-full object-cover"
        />
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        {/* Animated Overlay Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}