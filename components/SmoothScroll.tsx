import { ReactNode, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 20, 
    stiffness: 100,
    mass: 0.8
  });
  
  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;
    
    const setBodyHeight = () => {
      if (scrollRef.current) {
        document.body.style.height = `${scrollRef.current.scrollHeight}px`;
      }
    };
    
    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);
    
    return () => {
      window.removeEventListener('resize', setBodyHeight);
      document.body.style.height = '';
    };
  }, []);
  
  return (
    <>
      <div ref={scrollRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden' }}>
        <motion.div
          ref={containerRef}
          style={{ 
            y: useTransform(smoothProgress, [0, 1], [0, -scrollRef.current?.scrollHeight || 0]),
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%'
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
