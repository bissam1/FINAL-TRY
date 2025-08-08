import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, ChevronRight, Heart, MapPin } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Property {
  id: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  area: string
  image: string
  featured?: boolean
}

export default function FeaturedProperties({ country = '' }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const properties: Property[] = [
    {
      id: '1',
      title: 'Luxury Penthouse with Ocean View',
      location: 'Dubai Marina, UAE',
      price: '$4,250,000',
      beds: 4,
      baths: 5,
      area: '4,500 sq ft',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      featured: true
    },
    {
      id: '2',
      title: 'Exclusive Villa on Palm Jumeirah',
      location: 'Palm Jumeirah, UAE',
      price: '$12,800,000',
      beds: 6,
      baths: 7,
      area: '10,200 sq ft',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      featured: true
    },
    {
      id: '3',
      title: 'Modern Apartment in Downtown',
      location: 'Downtown Dubai, UAE',
      price: '$1,950,000',
      beds: 2,
      baths: 3,
      area: '1,800 sq ft',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80'
    },
    {
      id: '4',
      title: 'Waterfront Mansion with Private Pool',
      location: 'Emirates Hills, UAE',
      price: '$18,500,000',
      beds: 8,
      baths: 10,
      area: '15,000 sq ft',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
      featured: true
    },
  ]

  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'featured') return property.featured
    return true
  })

  const filters = [
    { value: 'all', label: 'All Properties' },
    { value: 'featured', label: 'Featured' },
    { value: 'new', label: 'New Listings' },
    { value: 'luxury', label: 'Ultra Luxury' }
  ]

  return (
    <section id="properties" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Exceptional Properties
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of the world's most extraordinary properties, 
            curated by NOOD International's luxury experts.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filters.map(filter => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.value)}
              className="rounded-full"
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden bg-black/40 backdrop-blur-sm border-gray-800 group">
                <div className="relative h-60 overflow-hidden">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="rounded-full bg-black/30 backdrop-blur-sm text-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  {property.featured && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg">{property.title}</h3>
                    <span className="text-blue-400 font-bold">{property.price}</span>
                  </div>
                  <div className="flex items-center text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-gray-800 pt-4 mt-4">
                    <div className="flex items-center">
                      <span className="mr-4">{property.beds} Beds</span>
                      <span className="mr-4">{property.baths} Baths</span>
                      <span>{property.area}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-400 p-0 hover:text-blue-300">
                      Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            View All Properties
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}