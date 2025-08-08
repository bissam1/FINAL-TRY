import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CinematicVideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  children?: React.ReactNode;
  className?: string;
}

const CinematicVideoBackground: React.FC<CinematicVideoBackgroundProps> = ({
  videoSrc,
  fallbackImage = "/public/lovable-uploads/3afe43c4-ed7d-46fe-a386-f9fd0e4975df.png",
  children,
  className = ""
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow, cinematic playback
    }
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-cinematic z-10" />
      
      {/* Video background */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fallbackImage})`,
            filter: "brightness(0.4) contrast(1.2) saturate(0.8)"
          }}
        />
      )}
      
      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Content overlay */}
      <div className="relative z-30 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default CinematicVideoBackground;