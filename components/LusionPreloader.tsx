import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import noodLogo from "@/assets/nood-logo.png";

interface LusionPreloaderProps {
  onComplete?: () => void;
}

const LusionPreloader = ({ onComplete }: LusionPreloaderProps = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-primary/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center space-y-8">
            {/* 3D Rotating Logo */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ 
                scale: 1, 
                rotateY: 0,
                rotateX: [0, 10, 0],
                rotateZ: [0, 2, 0]
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.76, 0, 0.24, 1],
                rotateX: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                },
                rotateZ: { 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <img 
                src={noodLogo} 
                alt="NOOD" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain filter drop-shadow-gold animate-glow"
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Company Name */}
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1 
                className="text-2xl md:text-3xl font-playfair font-semibold text-luxury tracking-wider"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                NŌŌD
              </motion.h1>
              <motion.p 
                className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                International Properties
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-64 md:w-80 space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* Progress Track */}
              <div className="relative h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Glowing dot at progress end */}
                <motion.div
                  className="absolute top-1/2 w-2 h-2 bg-primary rounded-full shadow-gold transform -translate-y-1/2"
                  style={{ left: `${progress}%` }}
                  animate={{
                    boxShadow: [
                      '0 0 5px hsl(var(--primary))',
                      '0 0 15px hsl(var(--primary))',
                      '0 0 5px hsl(var(--primary))'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              {/* Progress Percentage */}
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Loading Experience</span>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ scale: 1.2, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-primary"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Loading Dots */}
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary/60 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Luxury Border Animation */}
          <div className="absolute inset-4 border border-primary/20 rounded-lg">
            <motion.div
              className="absolute inset-0 border border-primary/40 rounded-lg"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LusionPreloader;