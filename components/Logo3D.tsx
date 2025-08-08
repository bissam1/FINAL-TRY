import { Canvas } from '@react-three/fiber';
import { Center, Float, Environment, Sparkles, PerspectiveCamera, Text } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

// Import country-themed logos
import noodLogoPakistan from '../assets/nood-logo-pakistan.jpg';
import noodLogoUAE from '../assets/nood-logo-uae.jpg';
import noodLogoUK from '../assets/nood-logo-uk.jpg';
import noodLogoRussia from '../assets/nood-logo-russia.jpg';
import noodLogoUS from '../assets/nood-logo-us.jpg';
import noodLogo3D from '../assets/nood-logo-3d.jpg';

interface Logo3DProps {
  animate?: boolean;
  country?: string;
}

function InfinityLoop({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  const infinityGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(-0.25, 0.3, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.25, -0.3, 0),
      new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(0.25, 0.3, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.25, -0.3, 0),
      new THREE.Vector3(-0.5, 0, 0),
    ]);
    
    return new THREE.TubeGeometry(curve, 64, 0.08, 16, true);
  }, []);

  return (
    <mesh ref={meshRef} position={position} geometry={infinityGeometry}>
      <meshStandardMaterial
        color="#F59E0B"
        emissive="#F59E0B"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function BuildingIcon({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main building */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Left building */}
      <mesh position={[-0.4, -0.1, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Right building */}
      <mesh position={[0.4, -0.2, 0]}>
        <boxGeometry args={[0.25, 0.4, 0.25]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function CircularBorder({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[8, 0.15, 16, 100]} />
      <meshStandardMaterial
        color="#FFFFFF"
        emissive="#FFFFFF"
        emissiveIntensity={0.1}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

// Country-specific logo configurations
const countryLogos = {
  pakistan: {
    logo: noodLogoPakistan,
    colors: { primary: '#006600', secondary: '#FFFFFF', accent: '#FF6B35' },
    animation: 'coin-flip',
    particles: '#006600'
  },
  uae: {
    logo: noodLogoUAE,
    colors: { primary: '#FF0000', secondary: '#FFD700', accent: '#000000' },
    animation: 'desert-wave',
    particles: '#FFD700'
  },
  uk: {
    logo: noodLogoUK,
    colors: { primary: '#012169', secondary: '#FFD700', accent: '#C8102E' },
    animation: 'royal-crown',
    particles: '#FFD700'
  },
  russia: {
    logo: noodLogoRussia,
    colors: { primary: '#C41E3A', secondary: '#FFD700', accent: '#FFFFFF' },
    animation: 'kremlin-spin',
    particles: '#FFD700'
  },
  us: {
    logo: noodLogoUS,
    colors: { primary: '#002868', secondary: '#BF0A30', accent: '#FFFFFF' },
    animation: 'eagle-soar',
    particles: '#FFFFFF'
  },
  default: {
    logo: noodLogo3D,
    colors: { primary: '#F59E0B', secondary: '#FFFFFF', accent: '#1E3A8A' },
    animation: 'luxury-float',
    particles: '#F59E0B'
  }
};

function CountryCoinLogo({ country, position }: { country: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const logoConfig = countryLogos[country as keyof typeof countryLogos] || countryLogos.default;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Different animations based on country
      switch (logoConfig.animation) {
        case 'coin-flip':
          meshRef.current.rotation.y = Math.sin(time) * 0.3;
          meshRef.current.rotation.x = Math.cos(time * 1.5) * 0.2;
          break;
        case 'desert-wave':
          meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
          meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
          break;
        case 'royal-crown':
          meshRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
          meshRef.current.rotation.y = time * 0.2;
          break;
        case 'kremlin-spin':
          meshRef.current.rotation.y = time * 0.4;
          meshRef.current.position.y = position[1] + Math.cos(time * 1.5) * 0.08;
          break;
        case 'eagle-soar':
          meshRef.current.position.z = position[2] + Math.sin(time * 1.2) * 0.15;
          meshRef.current.rotation.x = Math.sin(time * 0.8) * 0.1;
          break;
        default:
          meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
          meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[2, 2, 0.3, 32]} />
      <meshStandardMaterial
        color={logoConfig.colors.primary}
        emissive={logoConfig.colors.primary}
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function Logo3DScene({ animate = true, country = 'default' }: Logo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const location = useLocation();
  const logoConfig = countryLogos[country as keyof typeof countryLogos] || countryLogos.default;
  
  // Detect country from route
  const currentCountry = useMemo(() => {
    const path = location.pathname;
    if (path.includes('pakistan')) return 'pakistan';
    if (path.includes('uae') || path.includes('emirates')) return 'uae';
    if (path.includes('uk') || path.includes('kingdom')) return 'uk';
    if (path.includes('russia')) return 'russia';
    if (path.includes('us') || path.includes('states')) return 'us';
    return country || 'default';
  }, [location.pathname, country]);
  
  useFrame((state) => {
    if (groupRef.current && animate) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Center>
          <group>
            {/* Country-themed coin logo */}
            <CountryCoinLogo country={currentCountry} position={[0, 0, 0]} />
            
            {/* 3D Text: INTERNATIONAL */}
            <Center position={[0, 3, 0]}>
              <Text
                font="/fonts/PlayfairDisplay-Bold.woff"
                fontSize={0.8}
                color={logoConfig.colors.secondary}
                anchorX="center"
                anchorY="middle"
              >
                INTERNATIONAL
              </Text>
            </Center>

            {/* 3D Text: NOOD */}
            <Center position={[0, -0.8, 0.5]}>
              <Text
                font="/fonts/PlayfairDisplay-Bold.woff"
                fontSize={1.5}
                color={logoConfig.colors.accent}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor={logoConfig.colors.primary}
              >
                NOOD
              </Text>
            </Center>

            {/* 3D Text: PROPERTIES */}
            <Center position={[0, -3, 0]}>
              <Text
                font="/fonts/PlayfairDisplay-Bold.woff"
                fontSize={0.6}
                color={logoConfig.colors.secondary}
                anchorX="center"
                anchorY="middle"
              >
                PROPERTIES
              </Text>
            </Center>

            {/* Infinity symbol with country colors */}
            <InfinityLoop position={[0, -1.8, 0.2]} />

            {/* Building icon */}
            <BuildingIcon position={[0, 1.2, 0]} />
          </group>
        </Center>
      </Float>

      {/* Country-themed particle effects */}
      <Sparkles
        count={50}
        scale={[20, 20, 20]}
        size={3}
        speed={0.3}
        color={logoConfig.particles}
      />
      
      {/* Additional sparkles for luxury effect */}
      <Sparkles
        count={20}
        scale={[10, 10, 10]}
        size={1.5}
        speed={0.1}
        color={logoConfig.colors.secondary}
      />
    </group>
  );
}

const Logo3D = ({ animate = true }: Logo3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#F59E0B" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Main logo scene */}
        <Logo3DScene animate={animate} />
      </Canvas>
    </div>
  );
};

export default Logo3D;