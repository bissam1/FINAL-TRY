import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export default function OfficeLocations() {
  const offices = [
    {
      city: 'Dubai',
      country: 'United Arab Emirates',
      address: 'Emirates Towers, Sheikh Zayed Road',
      phone: '+971 4 123 4567',
      email: 'dubai@nood-properties.com',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: '15 Berkeley Square, Mayfair',
      phone: '+44 20 7123 4567',
      email: 'london@nood-properties.com',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80'
    },
    {
      city: 'Moscow',
      country: 'Russia',
      address: 'Moscow City, Presnenskaya Naberezhnaya',
      phone: '+7 495 123 4567',
      email: 'moscow@nood-properties.com',
      image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&q=80'
    }
  ]

  return (
    <section id="offices" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Global Presence
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our international network of luxury real estate offices provides local expertise
            with global connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              data-cursor="hover"
            >
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback
                  src={office.image}
                  alt={office.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{office.city}</h3>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{office.country}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4">{office.address}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-3 text-blue-400" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-3 text-blue-400" />
                    <span>{office.email}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between">
                  <button className="text-blue-400 text-sm font-medium flex items-center hover:text-blue-300 transition-colors">
                    View on map
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                  <button className="text-blue-400 text-sm font-medium flex items-center hover:text-blue-300 transition-colors">
                    Contact office
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}