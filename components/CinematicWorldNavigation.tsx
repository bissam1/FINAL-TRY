import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plane, Building2, TrendingUp, Users, Award } from 'lucide-react';

// Import country assets
import pakistanFlag from '../assets/pakistan-flag.jpg';
import uaeFlag from '../assets/uae-flag.jpg';
import ukFlag from '../assets/uk-flag.jpg';
import russiaFlag from '../assets/russia-flag.jpg';
import usFlag from '../assets/us-flag.jpg';

interface Country {
  id: string;
  name: string;
  capital: string;
  flag: string;
  route: string;
  color: string;
  gradient: string;
  stats: {
    properties: string;
    roi: string;
    growth: string;
  };
  position: {
    x: number;
    y: number;
  };
}

const countries: Country[] = [
  {
    id: 'pakistan',
    name: 'Pakistan',
    capital: 'Islamabad',
    flag: pakistanFlag,
    route: '/pakistan-premium',
    color: '#006600',
    gradient: 'linear-gradient(135deg, #006600 0%, #4CAF50 100%)',
    stats: { properties: '500+', roi: '18%', growth: '+25%' },
    position: { x: 20, y: 30 }
  },
  {
    id: 'uae',
    name: 'UAE',
    capital: 'Abu Dhabi',
    flag: uaeFlag,
    route: '/uae-premium',
    color: '#FF0000',
    gradient: 'linear-gradient(135deg, #FF0000 0%, #FFD700 100%)',
    stats: { properties: '800+', roi: '22%', growth: '+35%' },
    position: { x: 80, y: 25 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    capital: 'London',
    flag: ukFlag,
    route: '/uk-premium',
    color: '#012169',
    gradient: 'linear-gradient(135deg, #012169 0%, #C8102E 100%)',
    stats: { properties: '1200+', roi: '15%', growth: '+20%' },
    position: { x: 10, y: 15 }
  },
  {
    id: 'russia',
    name: 'Russia',
    capital: 'Moscow',
    flag: russiaFlag,
    route: '/russia-premium',
    color: '#C41E3A',
    gradient: 'linear-gradient(135deg, #C41E3A 0%, #FFD700 100%)',
    stats: { properties: '600+', roi: '20%', growth: '+30%' },
    position: { x: 70, y: 10 }
  },
  {
    id: 'us',
    name: 'United States',
    capital: 'New York',
    flag: usFlag,
    route: '/us-premium',
    color: '#002868',
    gradient: 'linear-gradient(135deg, #002868 0%, #BF0A30 100%)',
    stats: { properties: '2000+', roi: '16%', growth: '+22%' },
    position: { x: 15, y: 40 }
  }
];

interface CinematicWorldNavigationProps {
  onCountrySelect?: (country: Country) => void;
}

export const CinematicWorldNavigation: React.FC<CinematicWorldNavigationProps> = ({ onCountrySelect }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0); // 0: world, 1: country, 2: capital
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const springScale = useSpring(scale, { stiffness: 300, damping: 50 });

  const handleCountryClick = async (country: Country) => {
    setIsTransitioning(true);
    setSelectedCountry(country);
    
    // First zoom: Focus on country
    setZoomLevel(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Second zoom: Focus on capital
    setZoomLevel(2);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to country page
    onCountrySelect?.(country);
    navigate(country.route);
  };

  const zoomVariants = {
    world: {
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    country: {
      scale: 2.5,
      x: selectedCountry ? -(selectedCountry.position.x - 50) * 10 : 0,
      y: selectedCountry ? -(selectedCountry.position.y - 50) * 10 : 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    capital: {
      scale: 4,
      x: selectedCountry ? -(selectedCountry.position.x - 50) * 15 : 0,
      y: selectedCountry ? -(selectedCountry.position.y - 50) * 15 : 0,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Cinematic World Map */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2071')",
          scale: springScale,
          opacity
        }}
        animate={{
          scale: zoomLevel === 0 ? 1 : zoomLevel === 1 ? 2.5 : 4,
          x: selectedCountry ? -(selectedCountry.position.x - 50) * (zoomLevel === 1 ? 10 : 15) : 0,
          y: selectedCountry ? -(selectedCountry.position.y - 50) * (zoomLevel === 1 ? 10 : 15) : 0
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Countries */}
        {countries.map((country, index) => (
          <motion.div
            key={country.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${country.position.x}%`,
              top: `${country.position.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: selectedCountry?.id === country.id ? 1.5 : 1, 
              opacity: 1,
              filter: selectedCountry && selectedCountry.id !== country.id ? 'blur(4px)' : 'blur(0px)'
            }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ 
              scale: selectedCountry ? 1 : 1.2,
              transition: { duration: 0.3 }
            }}
            onClick={() => handleCountryClick(country)}
          >
            {/* Flag Marker */}
            <motion.div
              className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl"
              style={{ background: country.gradient }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={country.flag} 
                alt={country.name}
                className="w-full h-full object-cover"
              />
              
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: country.color }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Country Info Card */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur-md rounded-xl p-6 min-w-72 border border-white border-opacity-20"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{country.name}</h3>
              <p className="text-gray-300 mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {country.capital}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                  <p className="text-sm text-gray-400">Properties</p>
                  <p className="text-white font-bold">{country.stats.properties}</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-400" />
                  <p className="text-sm text-gray-400">ROI</p>
                  <p className="text-white font-bold">{country.stats.roi}</p>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                  <p className="text-sm text-gray-400">Growth</p>
                  <p className="text-white font-bold">{country.stats.growth}</p>
                </div>
              </div>

              <motion.button
                className="w-full py-2 px-4 rounded-lg font-semibold text-white"
                style={{ background: country.gradient }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plane className="w-4 h-4 inline mr-2" />
                Explore {country.name}
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Header */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">
            NOOD <span className="text-gold">International</span>
          </h1>
          <div className="flex space-x-4">
            {countries.map((country) => (
              <motion.button
                key={country.id}
                className="w-12 h-8 rounded overflow-hidden border-2 border-white border-opacity-30"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleCountryClick(country)}
              >
                <img 
                  src={country.flag} 
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Entering {selectedCountry?.name}
              </h2>
              <p className="text-gray-400">
                Destination: {selectedCountry?.capital}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicWorldNavigation;