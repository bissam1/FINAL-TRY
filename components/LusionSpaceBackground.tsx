import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

interface StarsProps {
  count: number;
}

function Stars({ count }: StarsProps) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      ref.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 5;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={1.2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 2;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.1}
        emissive="#00ffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

interface LusionSpaceBackgroundProps {
  children?: React.ReactNode;
}

const LusionSpaceBackground: React.FC<LusionSpaceBackgroundProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const cameraZ = useTransform(scrollYProgress, [0, 1], [50, 10]);
  const particleScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.9]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 75 }}
          style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #000000 100%)' }}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* Animated Stars */}
          <Stars count={2000} />
          
          {/* Particle Field */}
          <ParticleField count={800} />
          
          {/* Floating Orbs */}
          <FloatingOrb position={[-20, 10, -10]} />
          <FloatingOrb position={[15, -5, -15]} />
          <FloatingOrb position={[-10, -15, -5]} />
          <FloatingOrb position={[25, 8, -20]} />
        </Canvas>
      </div>

      {/* Scroll-reactive overlay effects */}
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            hsla(197, 71%, 73%, ${backgroundOpacity}) 0%, 
            hsla(2, 6%, 23%, 0.4) 40%, 
            transparent 70%)`,
        }}
      />

      {/* Particle overlay animation */}
      <motion.div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          scale: particleScale,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};

export default LusionSpaceBackground;