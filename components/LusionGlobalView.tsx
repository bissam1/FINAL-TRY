import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// City data with coordinates and information
const cityData = [
  {
    name: "Abu Dhabi",
    country: "UAE",
    coordinates: { lat: 24.4539, lon: 54.3773 },
    description: "Experience the cultural capital of the UAE with its stunning architecture, pristine beaches, and world-class amenities. Abu Dhabi offers exceptional investment opportunities in luxury real estate.",
    color: "#F5A623",
    path: "uae"
  },
  {
    name: "New York",
    country: "USA", 
    coordinates: { lat: 40.7128, lon: -74.0060 },
    description: "The city that never sleeps offers unparalleled real estate opportunities in Manhattan, Brooklyn, and beyond. From luxury penthouses to commercial investments, New York remains a global real estate hub.",
    color: "#3B82F6",
    path: "usa"
  },
  {
    name: "London",
    country: "UK",
    coordinates: { lat: 51.5074, lon: -0.1278 },
    description: "Discover prime London properties in prestigious neighborhoods. From historic Georgian townhouses to modern luxury developments, London's real estate market offers stability and growth potential.",
    color: "#EF4444",
    path: "uk"
  },
  {
    name: "Moscow",
    country: "Russia",
    coordinates: { lat: 55.7558, lon: 37.6173 },
    description: "Explore Moscow's dynamic real estate landscape, featuring luxury apartments in the city center and exclusive developments. A market rich with history and modern opportunities.",
    color: "#10B981",
    path: "russia"
  },
  {
    name: "Islamabad",
    country: "Pakistan",
    coordinates: { lat: 33.6844, lon: 73.0479 },
    description: "Pakistan's capital offers emerging real estate opportunities with stunning mountain views and modern developments. An ideal destination for investors seeking growth potential.",
    color: "#8B5CF6",
    path: "pakistan"
  }
];

// Enhanced City Mesh Component
const CityMesh = ({ city, index, isActive, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.y += 0.01;
      
      // Pulsing effect for active city
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      } else {
        meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
      }
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
    }
  });

  const position: [number, number, number] = [
    (city.coordinates.lon - 0) * 0.05,
    (city.coordinates.lat - 40) * 0.05,
    -index * 200 - 100
  ];

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main city sphere */}
      <mesh>
        <sphereGeometry args={[15, 32, 32]} />
        <meshStandardMaterial
          color={city.color}
          metalness={0.8}
          roughness={0.2}
          emissive={city.color}
          emissiveIntensity={isActive ? 0.5 : hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Orbit rings */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[25, 1, 8, 32]} />
          <meshBasicMaterial color={city.color} transparent opacity={0.6} />
        </mesh>
      </group>
      
      {/* City label */}
      <Text
        position={[0, 30, 0]}
        fontSize={8}
        color={city.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {city.name}
      </Text>
      
      {/* Country label */}
      <Text
        position={[0, 22, 0]}
        fontSize={4}
        color="#E2E8F0"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        {city.country}
      </Text>
    </group>
  );
};

// Enhanced Particle Field
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.0003;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.0001;
    }
  });

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 5000;
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Distribute particles in a larger space
    posArray[i] = (Math.random() - 0.5) * 2000;
    posArray[i + 1] = (Math.random() - 0.5) * 1000;
    posArray[i + 2] = (Math.random() - 0.5) * 2000;
    
    // Random colors
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5);
    colorArray[i] = color.r;
    colorArray[i + 1] = color.g;
    colorArray[i + 2] = color.b;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Enhanced Camera Controller
const CameraController = ({ targetCityIndex, onCityChange }) => {
  const { camera } = useThree();
  const currentCityIndex = useRef(0);
  
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      
      const direction = event.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(cityData.length - 1, currentCityIndex.current + direction));
      
      if (newIndex !== currentCityIndex.current) {
        currentCityIndex.current = newIndex;
        onCityChange(newIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [onCityChange]);

  useFrame(() => {
    const targetZ = -currentCityIndex.current * 200 - 50;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    
    // Look at the current city
    const currentCity = cityData[currentCityIndex.current];
    if (currentCity) {
      const targetX = (currentCity.coordinates.lon - 0) * 0.05;
      const targetY = (currentCity.coordinates.lat - 40) * 0.05;
      camera.lookAt(targetX, targetY, targetZ);
    }
  });

  return null;
};

// City Info Overlay Component
const CityInfoOverlay = ({ city, isVisible, onNavigate, onClose }) => {
  if (!city) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Content */}
          <motion.div
            className="relative bg-card/90 backdrop-blur-md border border-border/20 rounded-2xl p-8 max-w-2xl mx-auto shadow-luxury"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
            
            <motion.h2
              className="text-4xl font-heading font-bold mb-2"
              style={{ color: city.color }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {city.name}
            </motion.h2>
            
            <motion.p
              className="text-xl text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {city.country}
            </motion.p>
            
            <motion.p
              className="text-lg leading-relaxed mb-8 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {city.description}
            </motion.p>
            
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => onNavigate(city.path)}
                className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-accent/90 hover:scale-105 shadow-gold"
              >
                Explore Properties
              </button>
              
              <button
                onClick={onClose}
                className="border border-border/30 text-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-card/80 backdrop-blur-sm"
              >
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Global View Component
interface LusionGlobalViewProps {
  navigateToCountryPage?: (country: string) => void;
  onClose?: () => void;
}

const LusionGlobalView = ({ navigateToCountryPage, onClose }: LusionGlobalViewProps) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cityData[0]);

  const handleCityChange = useCallback((newIndex: number) => {
    setCurrentCityIndex(newIndex);
    setSelectedCity(cityData[newIndex]);
  }, []);

  const handleCityClick = (city: typeof cityData[0]) => {
    setSelectedCity(city);
    setShowCityInfo(true);
  };

  const handleNavigateToCountry = (countryPath: string) => {
    setShowCityInfo(false);
    navigateToCountryPage?.(countryPath);
  };

  return (
    <div className="fixed inset-0 z-40 bg-background">
      {/* Back button */}
      <button
        onClick={onClose}
        className="fixed top-6 left-6 z-50 bg-card/80 backdrop-blur-md border border-border/20 rounded-full w-12 h-12 flex items-center justify-center text-foreground hover:bg-card/90 transition-all duration-300 shadow-elegant"
      >
        ←
      </button>

      {/* Instructions */}
      <div className="fixed top-6 right-6 z-50 bg-card/80 backdrop-blur-md border border-border/20 rounded-lg p-4 text-sm text-muted-foreground">
        Scroll to navigate between cities
      </div>

      {/* Three.js Scene */}
      <Canvas camera={{ position: [0, 0, 100], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 0, 100]} intensity={0.8} color="#F5A623" />
        
        <ParticleField />
        
        {cityData.map((city, index) => (
          <CityMesh
            key={city.name}
            city={city}
            index={index}
            isActive={index === currentCityIndex}
            onClick={() => handleCityClick(city)}
          />
        ))}
        
        <CameraController
          targetCityIndex={currentCityIndex}
          onCityChange={handleCityChange}
        />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      {/* Current city indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          className="bg-card/90 backdrop-blur-md border border-border/20 rounded-lg px-6 py-3 shadow-elegant"
          key={selectedCity.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-foreground">{selectedCity.name}</h3>
          <p className="text-sm text-muted-foreground">{selectedCity.country}</p>
        </motion.div>
      </div>

      {/* City dots indicator */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        {cityData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCityChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentCityIndex
                ? 'bg-accent shadow-gold'
                : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
            }`}
          />
        ))}
      </div>

      {/* City Info Modal */}
      <CityInfoOverlay
        city={selectedCity}
        isVisible={showCityInfo}
        onNavigate={handleNavigateToCountry}
        onClose={() => setShowCityInfo(false)}
      />
    </div>
  );
};

export default LusionGlobalView;