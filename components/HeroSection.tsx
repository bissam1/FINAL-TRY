import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Sparkles, Building2, Search, MapPin, Home } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10"
      style={{ y, opacity }}
    >
      {/* 3D Floating Sphere */}
      <motion.div
        className="relative mb-16"
        initial={{ scale: 0, rotateY: 180 }}
        animate={isVisible ? { scale: 1, rotateY: 0 } : { scale: 0, rotateY: 180 }}
        transition={{ duration: 2, delay: 1, ease: "backOut" }}
      >
        {/* Glow Effects */}
        <motion.div
          className="absolute inset-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-500/40 via-purple-500/20 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity }
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-400/50 via-purple-400/30 to-transparent rounded-full blur-2xl" />
        </motion.div>

        {/* Main 3D Sphere */}
        <motion.div
          className="relative w-40 h-40 mx-auto"
          animate={{
            rotateY: 360,
            rotateX: [0, 10, 0],
          }}
          transition={{
            rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 6, repeat: Infinity }
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-full shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
            <div className="absolute top-4 left-6 w-8 h-8 bg-white/20 rounded-full blur-sm" />
          </div>

          {/* Logo Badge */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-4 shadow-2xl border-4 border-white/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Building2 className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-8"
          whileHover={{ scale: 1.05 }}
          data-cursor="hover"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-gray-300 text-sm">NOOD Properties</span>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
            GLOBAL
          </span>
        </motion.div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-6xl md:text-8xl font-bold text-center mb-16 leading-tight max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        Properties beyond{" "}
        <motion.span
          className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: "200% 200%" }}
        >
          imagination
        </motion.span>
        <br />
        one search away<span className="text-gray-400">.</span>
      </motion.h1>

      {/* Property Search Bar */}
      <motion.div
        className="relative max-w-4xl w-full mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <div className="flex flex-col md:flex-row items-center bg-black/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-2 shadow-2xl">
          <div className="flex items-center flex-1 px-4 w-full">
            <Search className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Luxury penthouse with ocean view, Dubai Marina..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg py-4 w-full"
              data-cursor="hover"
            />
          </div>
          
          <div className="flex items-center space-x-2 mr-2 mt-2 md:mt-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10"
              data-cursor="hover"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10"
              data-cursor="hover"
            >
              <Home className="w-4 h-4 mr-2" />
              Type
            </Button>
          </div>
          
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 rounded-xl px-8 py-4 text-lg mt-2 md:mt-0 w-full md:w-auto"
            data-cursor="hover"
          >
            Search Properties
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-white/10 border-0 text-lg"
          data-cursor="hover"
        >
          <Play className="w-6 h-6 mr-3" />
          Watch the video
        </Button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}