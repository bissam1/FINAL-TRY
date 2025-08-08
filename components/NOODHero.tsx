import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Play } from "lucide-react";
import noodLogo from "@/assets/nood-logo.png";

interface NOODHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundVideo?: string;
  countryCode?: string;
  showExploreButton?: boolean;
  showPlayButton?: boolean;
}

const NOODHero = ({
  title = "NŌŌD INTERNATIONAL PROPERTIES",
  subtitle = "Now Open in the United Kingdom, United States, Pakistan, Russia | HQ in Abu Dhabi",
  description = "Founded by Emirati visionary Hamad Mohammed Rashed Altoob Alshemeili, led globally by CEO Muhammad Bissam. NOOD offers zero-commission rentals, trusted property exposure, and legal safety across 5 markets.",
  backgroundVideo,
  countryCode,
  showExploreButton = true,
  showPlayButton = false
}: NOODHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      {backgroundVideo && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        </motion.div>
      )}

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-6"
        style={{ opacity }}
      >
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Country Code */}
          {countryCode && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-block"
            >
              <span className="text-6xl md:text-8xl font-light text-primary/80 tracking-[0.3em]">
                {countryCode}
              </span>
            </motion.div>
          )}

          {/* 3D Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0, rotateY: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              rotateX: mousePosition.y * 0.1,
              rotateZ: mousePosition.x * 0.1
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1],
              rotateX: { duration: 0.5 },
              rotateZ: { duration: 0.5 }
            }}
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            <div className="relative">
              <img 
                src={noodLogo} 
                alt="NOOD" 
                className="w-20 h-20 md:w-28 md:h-28 object-contain filter drop-shadow-gold"
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="space-y-4"
            style={{
              transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-playfair font-semibold text-luxury tracking-wider leading-tight"
            >
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1, 
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1]
                  }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-4xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-base md:text-lg text-foreground/80 font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8"
          >
            {showExploreButton && (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "var(--shadow-gold)" }}
                whileTap={{ scale: 0.98 }}
                className="magnetic glass px-8 py-4 text-foreground font-medium tracking-[0.1em] rounded-lg hover:bg-primary/10 transition-all duration-300 uppercase"
              >
                Explore Countries
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="magnetic border border-primary/30 px-8 py-4 text-primary font-medium tracking-[0.1em] rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 uppercase"
            >
              Why Abu Dhabi?
            </motion.button>

            {showPlayButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="magnetic flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors duration-300"
                data-cursor="glow"
              >
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-all duration-300">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </div>
                <span className="font-light tracking-wide">Watch Story</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 cursor-pointer magnetic"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-light">
            Scroll to Explore
          </span>
          <ChevronDown size={20} className="text-primary" />
        </motion.div>
      </motion.div>

      {/* Grain Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default NOODHero;