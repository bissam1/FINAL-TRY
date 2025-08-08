import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { locations } from '../lib/data';

export default function GlobalLocations() {
  return (
    <section id="locations" className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Global Presence</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            With offices in key real estate markets around the world, NOOD International Properties
            provides unparalleled service wherever you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-black/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl overflow-hidden shadow-xl transition-transform group-hover:scale-[1.02] group-hover:shadow-blue-500/20 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img
            src={location.image}
            alt={location.city}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h3 className="text-white text-xl font-bold">{location.city}</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">{location.country}</p>
              <p className="text-sm text-gray-500">{location.timezone}</p>
            </div>
            <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              {location.properties} Properties
            </div>
          </div>
          
          <p className="text-gray-400 mb-4">{location.description}</p>
          
          <div className="flex items-center gap-2">
            <img
              src={location.agentPhoto}
              alt={location.agentName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{location.agentName}</p>
              <p className="text-xs text-gray-500">Regional Director</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}