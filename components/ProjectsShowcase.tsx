import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function ProjectsShowcase() {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const projects = [
    {
      title: "Dubai Marina Villas",
      description: "Luxury waterfront properties with stunning ocean views",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&h=1200&fit=crop",
      color: "#60a5fa"
    },
    {
      title: "Palm Jumeirah Residences",
      description: "Exclusive residences on Dubai's iconic palm-shaped island",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&h=1200&fit=crop",
      color: "#8b5cf6"
    },
    {
      title: "Downtown Penthouses",
      description: "Sophisticated penthouses in the heart of the city",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000&h=1200&fit=crop",
      color: "#ec4899"
    },
    {
      title: "Business Bay Apartments",
      description: "Modern apartments in Dubai's thriving business district",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=2000&h=1200&fit=crop",
      color: "#f97316"
    }
  ];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen w-full py-32 px-8 md:px-16"
      style={{ y }}
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Featured Properties
      </motion.h2>
      
      <div className="flex flex-col md:flex-row gap-10">
        {/* Project Navigation */}
        <div className="md:w-1/3 space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`cursor-pointer relative overflow-hidden ${activeProject === index ? 'pl-6' : 'pl-0'}`}
              onClick={() => setActiveProject(index)}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-cursor="hover"
            >
              <motion.div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: project.color }}
                animate={{ 
                  height: activeProject === index ? '100%' : '30%',
                  opacity: activeProject === index ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
              />
              
              <h3 
                className={`text-2xl md:text-3xl font-medium transition-all duration-300 ${activeProject === index ? 'text-white' : 'text-gray-400'}`}
              >
                {project.title}
              </h3>
              
              <motion.p
                className="text-gray-400 mt-2 max-w-md"
                animate={{ 
                  height: activeProject === index ? 'auto' : '0',
                  opacity: activeProject === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {project.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
        
        {/* Project Image */}
        <div className="md:w-2/3 relative h-[50vh] md:h-[70vh]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: activeProject === index ? 1 : 0,
                scale: activeProject === index ? 1 : 0.9,
                zIndex: activeProject === index ? 10 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              <motion.div
                className="absolute bottom-8 left-8 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeProject === index ? 1 : 0,
                  y: activeProject === index ? 0 : 20
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="hover"
                >
                  View Property
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
