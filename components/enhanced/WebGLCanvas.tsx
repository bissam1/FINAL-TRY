import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import Scene from '../../lib/three/Scene';
import { motion } from 'framer-motion';

export default function WebGLCanvas() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading time for WebGL assets
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Canvas dpr={[1, 2]} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          <Scene />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}