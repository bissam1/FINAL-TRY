import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo3D from "./Logo3D";

interface VideoBackgroundProps {
  children?: React.ReactNode;
  showLogo?: boolean;
}

const VideoBackground = ({ children, showLogo = true }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);

    // Check if video is already loaded
    if (video.readyState >= 2) {
      setIsLoaded(true);
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 4K Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{
          filter: 'brightness(0.4) contrast(1.2)',
          transform: 'scale(1.02)',
        }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-resort-with-pools-and-palm-trees-50892-large.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-hotel-pool-aerial-view-4095-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle animated overlay for luxury effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, hsla(45, 93%, 47%, 0.1) 50%, transparent 70%)',
          animation: 'shimmer 8s ease-in-out infinite',
        }}
      />

      {/* Overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10" />

      {/* 3D Logo */}
      <AnimatePresence>
        {showLogo && isLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100 
            }}
          >
            <div className="w-full h-full max-w-6xl">
              <Logo3D />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content overlay */}
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}

      {/* Animated border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
          animate={{
            x: ['100%', '-100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
        />
      </div>
    </div>
  );
};

export default VideoBackground;