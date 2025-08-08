import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Building, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Users, 
  Award,
  ArrowRight,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyShowcaseProps {
  title?: string;
  subtitle?: string;
  properties?: PropertyData[];
}

interface PropertyData {
  id: string;
  title: string;
  location: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  type: string;
  developer: string;
  completion: string;
  roi: string;
  image: string;
  video?: string;
  features: string[];
  description: string;
}

const PropertyShowcase = ({ 
  title = "Featured Abu Dhabi Properties",
  subtitle = "Discover premium investment opportunities in the capital of luxury",
  properties = []
}: PropertyShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Default premium properties data if none provided
  const defaultProperties: PropertyData[] = [
    {
      id: "1",
      title: "Al Maryah Vista Penthouse",
      location: "Al Maryah Island, Abu Dhabi",
      price: "AED 12,500,000",
      size: "4,200 sq ft",
      bedrooms: 4,
      bathrooms: 5,
      type: "Penthouse",
      developer: "Miral",
      completion: "Q4 2024",
      roi: "8.2%",
      image: "/videos/abu-dhabi-skyline.mp4",
      features: ["Marina Views", "Private Pool", "Smart Home", "Concierge"],
      description: "Luxury penthouse with panoramic views of Abu Dhabi's skyline and marina. Features premium finishes and world-class amenities."
    },
    {
      id: "2", 
      title: "Saadiyat Beach Residence",
      location: "Saadiyat Island, Abu Dhabi",
      price: "AED 8,750,000",
      size: "3,800 sq ft",
      bedrooms: 5,
      bathrooms: 4,
      type: "Villa",
      developer: "Aldar",
      completion: "Ready",
      roi: "7.8%",
      image: "/videos/abu-dhabi-skyline.mp4",
      features: ["Beach Access", "Golf Course", "Private Garden", "Security"],
      description: "Beachfront villa on prestigious Saadiyat Island with direct beach access and world-class cultural attractions nearby."
    },
    {
      id: "3",
      title: "Capital Gate Tower Suite",
      location: "Capital Centre, Abu Dhabi",
      price: "AED 3,200,000",
      size: "1,850 sq ft",
      bedrooms: 2,
      bathrooms: 3,
      type: "Apartment",
      developer: "ADNEC",
      completion: "Ready",
      roi: "9.1%",
      image: "/videos/abu-dhabi-skyline.mp4",
      features: ["Iconic Building", "City Views", "Hotel Services", "Investment"],
      description: "Luxury apartment in the iconic leaning tower with guaranteed rental returns and hotel management services."
    }
  ];

  const displayProperties = properties.length > 0 ? properties : defaultProperties;

  return (
    <section ref={containerRef} className="py-24 px-6 bg-gradient-luxury relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 mb-6"
          >
            <Building className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Premium Properties
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-luxury mb-6 leading-tight">
            {title}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {displayProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.4 + index * 0.2, 
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="group"
            >
              <Card className="glass-subtle border-white/10 overflow-hidden hover:shadow-gold transition-all duration-500 group-hover:scale-[1.02]">
                {/* Property Image/Video */}
                <div className="relative h-64 overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                    <source src={property.image} type="video/mp4" />
                  </video>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  
                  {/* Property Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="glass px-3 py-1 text-xs font-medium text-primary uppercase tracking-wider">
                      {property.type}
                    </span>
                  </div>
                  
                  {/* ROI Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary/90 text-black px-3 py-1 text-xs font-bold rounded-full">
                      {property.roi} ROI
                    </span>
                  </div>
                  
                  {/* Play Button */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                      <Play size={20} className="text-primary ml-1" fill="currentColor" />
                    </div>
                  </motion.div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Title and Location */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin size={14} className="mr-1" />
                      {property.location}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-luxury">
                    {property.price}
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{property.bedrooms}</div>
                      <div className="text-muted-foreground">Bedrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{property.bathrooms}</div>
                      <div className="text-muted-foreground">Bathrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{property.size}</div>
                      <div className="text-muted-foreground">Size</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 3).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="text-xs text-primary">+{property.features.length - 3} more</span>
                    )}
                  </div>

                  {/* Developer and Completion */}
                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/10 pt-4">
                    <div>
                      <div className="text-muted-foreground">Developer</div>
                      <div className="font-medium text-foreground">{property.developer}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Completion</div>
                      <div className="font-medium text-foreground">{property.completion}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="magnetic flex-1 border-primary/30 text-primary hover:bg-primary/10"
                    >
                      Virtual Tour
                    </Button>
                    <Button 
                      size="sm" 
                      className="magnetic flex-1 bg-primary text-black hover:bg-primary/90"
                    >
                      Details
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="magnetic bg-primary text-black hover:bg-primary/90 px-8 py-4 text-lg font-medium tracking-wide"
          >
            View All Properties
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { icon: TrendingUp, value: "12.8%", label: "Average ROI", color: "text-primary" },
            { icon: Building, value: "2,450+", label: "Properties", color: "text-accent" },
            { icon: Users, value: "8,900+", label: "Investors", color: "text-foreground" },
            { icon: Award, value: "#1", label: "Investment Hub", color: "text-luxury" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
              className="text-center glass-subtle rounded-lg p-6 hover:shadow-gold transition-all duration-300"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyShowcase;