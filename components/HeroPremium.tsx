import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import * as THREE from "three";

interface HeroPremiumProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  countryCode?: string;
  flagEmoji?: string;
}

function FloatingBuilding() {
  const meshRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main building */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 3, 1]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Side buildings */}
        <mesh position={[-1.5, -0.5, 0]}>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        <mesh position={[1.5, -0.8, 0]}>
          <boxGeometry args={[0.8, 1.4, 0.8]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function HeroPremium({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  ctaLink, 
  flagEmoji = "🌍" 
}: HeroPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/20 to-secondary/20" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 animate-morphing"
          style={{
            background: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
            top: "10%",
            left: "10%",
            y: y1,
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-30 animate-morphing"
          style={{
            background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))",
            top: "60%",
            right: "10%",
            y: y2,
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{ opacity }}
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Flag and Country */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl mb-4 animate-float">
              {flagEmoji}
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <span className="glass px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider text-primary">
              {subtitle}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent leading-tight"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg font-semibold rounded-full shadow-luxury hover:shadow-glow transition-all duration-300"
            >
              <Link to={ctaLink}>
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="group glass text-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/20 hover:border-primary/50 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: "Properties", value: "500+" },
              { label: "Countries", value: "5" },
              { label: "Clients", value: "10K+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass p-6 rounded-2xl text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Scene */}
      <div className="absolute top-1/2 right-10 w-64 h-64 hidden lg:block">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingBuilding />
          <Sparkles count={30} scale={[15, 15, 15]} size={2} speed={0.5} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HeroPremium;