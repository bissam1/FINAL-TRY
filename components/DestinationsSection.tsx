import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export default function DestinationsSection() {
  const destinations = [
    {
      id: 'dubai',
      name: 'Dubai',
      properties: 184,
      image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?w=800&q=80',
      href: '/country/uae'
    },
    {
      id: 'london',
      name: 'London',
      properties: 129,
      image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80',
      href: '/country/uk'
    },
    {
      id: 'moscow',
      name: 'Moscow',
      properties: 92,
      image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80',
      href: '/country/russia'
    },
    {
      id: 'nyc',
      name: 'New York',
      properties: 143,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      href: '/country/usa'
    }
  ]

  return (
    <section id="markets" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Global Destinations
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore luxury properties in the world's most prestigious markets, each offering
            unique investment opportunities and lifestyles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.a
              key={destination.id}
              href={destination.href}
              className="group relative rounded-xl overflow-hidden h-96 block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              data-cursor="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
              
              <ImageWithFallback
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-white font-medium">{destination.name}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {destination.properties} Properties
                </h3>
                <div className="flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}