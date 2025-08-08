import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingPreloaderProps {
  onComplete: () => void;
}

export default function LoadingPreloader({ onComplete }: LoadingPreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          gsap.to(".preloader", { 
            opacity: 0, 
            duration: 0.7, 
            delay: 0.5, 
            onComplete 
          });
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const digits = Math.floor(progress).toString().padStart(2, '0');

  return (
    <div className="preloader fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-foreground text-4xl font-bold flex items-center">
        <span className="preloader-digit overflow-hidden h-12 flex items-center">
          <div 
            className="transition-transform duration-300"
            style={{ 
              transform: `translateY(-${parseInt(digits[0]) * 3}rem)` 
            }}
          >
            {[0,1,2,3,4,5,6,7,8,9].map(num => (
              <div key={num} className="h-12 flex items-center">{num}</div>
            ))}
          </div>
        </span>
        <span className="preloader-digit overflow-hidden h-12 flex items-center">
          <div 
            className="transition-transform duration-300"
            style={{ 
              transform: `translateY(-${parseInt(digits[1]) * 3}rem)` 
            }}
          >
            {[0,1,2,3,4,5,6,7,8,9].map(num => (
              <div key={num} className="h-12 flex items-center">{num}</div>
            ))}
          </div>
        </span>
        <span>%</span>
      </div>
    </div>
  );
}