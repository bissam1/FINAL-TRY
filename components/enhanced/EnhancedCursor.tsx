import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  variant: 'default' | 'hover' | 'link' | 'text' | 'video';
  text?: string;
}

export default function EnhancedCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const [cursor, setCursor] = useState<CursorState>({ variant: 'default' });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.hasAttribute('data-cursor')) {
        const cursorType = target.getAttribute('data-cursor');
        const cursorText = target.getAttribute('data-cursor-text');
        
        setCursor({ 
          variant: cursorType as CursorState['variant'],
          text: cursorText || undefined
        });
      }
    };
    
    const handleMouseLeave = () => {
      setCursor({ variant: 'default' });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('[data-cursor]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          width: cursor.variant === 'default' ? '12px' : '80px',
          height: cursor.variant === 'default' ? '12px' : '80px',
          borderRadius: '50%',
          translateX: cursor.variant === 'default' ? '-6px' : '-40px',
          translateY: cursor.variant === 'default' ? '-6px' : '-40px',
        }}
        animate={{
          scale: cursor.variant === 'default' ? 1 : 1.2,
          backgroundColor: cursor.variant === 'video' ? '#ff7225' : '#ffffff',
          opacity: 0.8,
          transition: { duration: 0.3, ease: 'backOut' }
        }}
      />
      
      {/* Text cursor (for specific elements) */}
      {cursor.text && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] text-white font-medium text-sm flex items-center justify-center"
          style={{
            x: springX,
            y: springY,
            width: '120px',
            height: '120px',
            translateX: '-60px',
            translateY: '-60px',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {cursor.text}
        </motion.div>
      )}
      
      {/* Icon for video playing */}
      {cursor.variant === 'video' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] text-white flex items-center justify-center"
          style={{
            x: springX,
            y: springY,
            translateX: '-12px',
            translateY: '-12px',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 4v16l15-8L6 4z" fill="currentColor" />
          </svg>
        </motion.div>
      )}
    </>
  );
}