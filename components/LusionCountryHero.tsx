import { motion } from 'framer-motion';

interface LusionCountryHeroProps {
  title: string;
  subtitle: string;
  description: string;
  countryCode: string;
}

const LusionCountryHero = ({ 
  title, 
  subtitle, 
  description, 
  countryCode 
}: LusionCountryHeroProps) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-carbon overflow-hidden">
      {/* Metallic background elements */}
      <div className="absolute inset-0 bg-gradient-metallic opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/2 rounded-full blur-xl animate-pulse delay-500" />
      </div>
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 text-white tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              {title}
            </motion.h1>
            
            <motion.h2
              className="text-2xl md:text-4xl text-white/80 font-light mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {subtitle}
            </motion.h2>
            
            <div className="w-32 h-px bg-gradient-chrome mx-auto mb-8" />
            
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LusionCountryHero;