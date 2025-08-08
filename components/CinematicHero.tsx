import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play, Globe, TrendingUp, Shield } from "lucide-react";
import Logo3D from "./Logo3D";
import CinematicVideoBackground from "./CinematicVideoBackground";

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <CinematicVideoBackground 
        fallbackImage="/public/lovable-uploads/3afe43c4-ed7d-46fe-a386-f9fd0e4975df.png"
        className="absolute inset-0"
      />
      
      <motion.div 
        className="relative z-40 flex items-center justify-center h-full"
        style={{ y, opacity, scale }}
      >
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* 3D Logo */}
          <motion.div
            className="mb-8 h-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <Logo3D animate={true} />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              NŌŌD
            </span>
            <br />
            <span className="text-white/90 text-5xl md:text-6xl lg:text-7xl font-light">
              INTERNATIONAL
            </span>
            <br />
            <span className="text-white/80 text-4xl md:text-5xl lg:text-6xl font-light">
              PROPERTIES
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-4 font-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Now Open in the United Kingdom, United States, Pakistan, Russia
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-secondary/90 mb-12 font-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Headquarters in Abu Dhabi, UAE
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <button
              onClick={() => scrollToSection('countries')}
              className="group relative px-8 py-4 bg-gradient-gold text-black font-semibold rounded-full 
                         transition-all duration-500 hover:scale-105 cursor-glow shadow-gold
                         hover:shadow-glow text-lg min-w-[200px]"
            >
              <Globe className="w-5 h-5 inline mr-2" />
              Explore Countries
              <div className="absolute inset-0 rounded-full bg-gradient-tortoise opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
            
            <button
              onClick={() => scrollToSection('comparison')}
              className="group relative px-8 py-4 glass border-2 border-secondary/30 text-white 
                         font-semibold rounded-full transition-all duration-500 hover:scale-105 
                         cursor-glow hover:border-secondary text-lg min-w-[200px]"
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Why Abu Dhabi?
              <div className="absolute inset-0 rounded-full bg-secondary/10 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {[
              { value: "5", label: "Countries", icon: Globe },
              { value: "0%", label: "Commission", icon: Shield },
              { value: "24/7", label: "Support", icon: Play }
            ].map((stat, index) => (
              <div key={index} className="text-center glass p-4 rounded-xl cursor-glow">
                <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

export default CinematicHero;