import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Points, 
  PointMaterial, 
  Environment
} from '@react-three/drei';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import * as THREE from 'three';

interface StarsProps {
  count: number;
}

function UE5Stars({ count }: StarsProps) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create spherical distribution
      const radius = Math.random() * 100 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function UE5Nebula() {
  const ref = useRef<THREE.Mesh>(null);
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create nebula-like texture
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)');
    gradient.addColorStop(0.3, 'rgba(50, 150, 255, 0.2)');
    gradient.addColorStop(0.6, 'rgba(20, 100, 200, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 50, 100, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.005;
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -50]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function UE5FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);
  
  const elements = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const element = elements[i];
        child.position.y = element.position[1] + Math.sin(state.clock.getElapsedTime() * element.speed + i) * 3;
        child.rotation.x = state.clock.getElapsedTime() * element.speed;
        child.rotation.y = state.clock.getElapsedTime() * element.speed * 0.7;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {elements.map((element) => (
        <mesh key={element.id} position={element.position} scale={element.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, [scrollY]);

  useFrame(() => {
    const scroll = scrollY.get();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const normalizedScroll = Math.min(scroll / Math.max(maxScroll, 1), 1);
    
    // Camera movement based on scroll
    camera.position.z = 50 - normalizedScroll * 30;
    camera.position.y = normalizedScroll * 20;
    camera.rotation.x = normalizedScroll * 0.5;
  });

  return null;
}

interface UE5SpaceEnvironmentProps {
  children?: React.ReactNode;
  intensity?: number;
}

const UE5SpaceEnvironment: React.FC<UE5SpaceEnvironmentProps> = ({ 
  children, 
  intensity = 1 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.8]);
  const particleIntensity = useTransform(scrollYProgress, [0, 1], [0.5, 1.5]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      {/* UE5-style 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          style={{ 
            background: `radial-gradient(ellipse at center, 
              hsl(220, 40%, 5%) 0%, 
              hsl(220, 60%, 2%) 50%, 
              hsl(0, 0%, 0%) 100%)`
          }}
        >
          <CameraController />
          
          {/* Basic lighting setup */}
          <ambientLight intensity={0.2} color="#004466" />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.4} 
            color="#66aaff"
          />
          
          {/* Simplified particle systems */}
          <UE5Stars count={1500} />
          <UE5Nebula />
          <UE5FloatingElements />
        </Canvas>
      </div>

      {/* Dynamic overlay effects */}
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            hsla(197, 71%, 73%, ${backgroundOpacity}) 0%, 
            hsla(197, 71%, 30%, 0.3) 30%, 
            hsla(220, 60%, 10%, 0.6) 60%, 
            transparent 90%)`,
        }}
      />

      {/* Cinematic grain overlay */}
      <motion.div
        className="fixed inset-0 z-20 pointer-events-none opacity-20"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scan lines effect */}
      <motion.div
        className="fixed inset-0 z-25 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.03) 2px,
            rgba(0, 255, 255, 0.03) 4px
          )`,
          scale: particleIntensity,
        }}
      />

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};

export default UE5SpaceEnvironment;