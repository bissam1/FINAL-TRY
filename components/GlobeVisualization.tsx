import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionData = {
  'home': { lat: 0, lon: 0, zoom: 1 },
  'insights': { lat: 24.4539, lon: 54.3773, zoom: 0.05 }, // Abu Dhabi
  'tools': { lat: 40.7128, lon: -74.0060, zoom: 0.05 }, // New York
  'properties': { lat: 51.5074, lon: -0.1278, zoom: 0.05 }, // London
  'contact': { lat: 55.7558, lon: 37.6173, zoom: 0.05 } // Moscow
};

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  const [earthTexture, bumpTexture, cloudsTexture] = useTexture([
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_bump_2048.jpg',
    'https://threejs.org/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.505, 64, 64]} />
        <meshPhongMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial color="#00ffff" size={0.05} />
    </points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    const getCoordinates = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + 180) * Math.PI / 180;
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = (radius * Math.sin(phi) * Math.sin(theta));
      const y = (radius * Math.cos(phi));
      return new THREE.Vector3(x, y, z);
    };

    const masterCameraTimeline = gsap.timeline({ paused: true });
    const initialCameraPosition = new THREE.Vector3(0, 0, 5);
    const initialEarthRotationY = 0;

    camera.position.set(0, 0, 5);

    const sections = document.querySelectorAll('.globe-section');
    sections.forEach((section, index) => {
      const sectionId = section.id;
      const data = sectionData[sectionId as keyof typeof sectionData];

      if (data) {
        let targetCameraPosition;
        let targetEarthRotationY;

        if (sectionId === 'home') {
          targetCameraPosition = initialCameraPosition;
          targetEarthRotationY = initialEarthRotationY;
        } else {
          const pointOnEarth = getCoordinates(data.lat, data.lon, 1.5);
          targetCameraPosition = pointOnEarth.clone().normalize().multiplyScalar(1.5 + data.zoom * 15);
          targetEarthRotationY = -(data.lon) * Math.PI / 180;
        }

        masterCameraTimeline.to(camera.position, {
          x: targetCameraPosition.x,
          y: targetCameraPosition.y,
          z: targetCameraPosition.z,
          ease: "power2.inOut",
          duration: 2
        }, index * 2);
      }
    });

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => masterCameraTimeline.progress(self.progress)
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera]);

  return null;
}

export default function GlobeVisualization() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Earth />
        <Particles />
        <CameraController />
      </Canvas>
    </div>
  );
}