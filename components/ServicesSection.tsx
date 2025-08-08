import { motion } from 'framer-motion'
import { Home, Compass, PiggyBank, Key, ShieldCheck, Building } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Property Sales',
      description: 'Find your dream luxury home with our expert guidance through the entire buying process.'
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: 'Investment Consulting',
      description: 'Strategic advice on real estate investments to maximize returns in premium markets.'
    },
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: 'Financing Solutions',
      description: 'Tailored mortgage and financing options through our network of premium lenders.'
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Property Management',
      description: 'Full-service management for your investment properties, maximizing returns.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Legal Assistance',
      description: 'Expert legal support for property transactions across international markets.'
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Development Projects',
      description: 'Exclusive access to pre-launch luxury developments and investment opportunities.'
    }
  ]

  return (
    <section id="services" className="py-24 px-6 relative bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive suite of luxury real estate services designed to meet
            the unique needs of high-net-worth individuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8 group hover:border-blue-500/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              data-cursor="hover"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center mb-6 text-blue-400 group-hover:text-blue-300 group-hover:border-blue-400 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}