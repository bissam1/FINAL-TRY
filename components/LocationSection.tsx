import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  
  const locations = [
    { name: "Dubai Office", address: "Marina Plaza, Dubai Marina", phone: "+971 4 123 4567" },
    { name: "Abu Dhabi Office", address: "Etihad Towers, Corniche", phone: "+971 2 987 6543" },
    { name: "London Office", address: "Mayfair, London W1J", phone: "+44 20 7123 4567" },
    { name: "New York Office", address: "5th Avenue, New York", phone: "+1 212 456 7890" }
  ];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen w-full py-32 px-8 md:px-16 bg-black/30 backdrop-blur-sm"
      style={{ opacity, scale }}
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Global Presence
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {locations.map((location, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            data-cursor="hover"
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{location.name}</h3>
                <p className="text-gray-400 mt-1">{location.address}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-300">{location.phone}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="mt-20 relative w-full h-[40vh] rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        
        {/* World map or 3D globe visualization would go here */}
        <div className="w-full h-full bg-blue-900/30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1000&fit=crop"
            alt="Global Map"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Properties in 12+ Countries
          </h3>
          <p className="text-gray-300 max-w-2xl">
            NOOD International Properties has a global portfolio spanning major cities worldwide.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
