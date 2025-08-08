import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Building,
  Users,
  Award,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OfficeLocation {
  country: string;
  flag: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  established: string;
  staff: number;
  specialization: string;
  color: string;
}

const OfficeLocations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const offices: OfficeLocation[] = [
    {
      country: "United Arab Emirates",
      flag: "🇦🇪",
      city: "Abu Dhabi",
      address: "Suite 3413, Al Maqam Tower, ADGM Square, Al Maryah Island, Abu Dhabi, UAE",
      phone: "+971 56 75 75 075",
      email: "abudhabi@noodproperties.com",
      established: "Jan 2024",
      staff: 25,
      specialization: "Luxury Properties & Investment",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      city: "London",
      address: "71-75 Shelton Street, Covent Garden, London, UK",
      phone: "+44 20 4524 7923",
      email: "london@noodproperties.com",
      established: "Mar 2024",
      staff: 18,
      specialization: "Prime London Properties",
      color: "from-blue-500 to-red-500"
    },
    {
      country: "United States",
      flag: "🇺🇸",
      city: "California",
      address: "1535 East Yosemite Ave, Madera, CA 93638, United States",
      phone: "+1 559 514 4516",
      email: "california@noodproperties.com",
      established: "Apr 2024",
      staff: 22,
      specialization: "Commercial & Residential",
      color: "from-blue-600 to-red-600"
    },
    {
      country: "Pakistan",
      flag: "🇵🇰",
      city: "Islamabad",
      address: "Emirates Tower, F-7 Markaz, Islamabad, Pakistan",
      phone: "+92 305 962 4131",
      email: "islamabad@noodproperties.com",
      established: "May 2024",
      staff: 15,
      specialization: "Emerging Market Investment",
      color: "from-green-500 to-green-600"
    },
    {
      country: "Russia",
      flag: "🇷🇺",
      city: "Moscow",
      address: "Coming Soon - Moscow Financial District",
      phone: "Coming Soon",
      email: "moscow@noodproperties.com",
      established: "Jul 2024",
      staff: 8,
      specialization: "Eastern European Markets",
      color: "from-red-500 to-blue-500"
    }
  ];

  return (
    <section ref={containerRef} className="py-24 px-6 bg-gradient-cinematic relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
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
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Global Presence
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-luxury mb-6 leading-tight">
            Our International Offices
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Strategically located across five key markets to serve our global clientele with local expertise and international standards
          </p>
        </motion.div>

        {/* Offices Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.4 + index * 0.15, 
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="group"
            >
              <Card className="glass-subtle border-white/10 overflow-hidden hover:shadow-gold transition-all duration-500 group-hover:scale-[1.02] h-full">
                {/* Header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${office.color}`} />
                
                <CardContent className="p-6 space-y-6">
                  {/* Country and Flag */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{office.flag}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {office.country}
                      </h3>
                      <p className="text-sm text-muted-foreground">{office.city} Office</p>
                    </div>
                  </div>

                  {/* Office Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <div className="text-xs text-muted-foreground">Established</div>
                      <div className="text-sm font-medium text-foreground">{office.established}</div>
                    </div>
                    <div>
                      <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <div className="text-xs text-muted-foreground">Team Size</div>
                      <div className="text-sm font-medium text-foreground">{office.staff}</div>
                    </div>
                    <div>
                      <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <div className="text-xs text-muted-foreground">Rank</div>
                      <div className="text-sm font-medium text-primary">#1</div>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Specialization</div>
                    <div className="text-sm font-medium text-accent">{office.specialization}</div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{office.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-sm text-foreground hover:text-primary transition-colors duration-300 magnetic"
                      >
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a 
                        href={`mailto:${office.email}`}
                        className="text-sm text-foreground hover:text-primary transition-colors duration-300 magnetic"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-center space-x-2 pt-2">
                    <div className={`w-2 h-2 rounded-full ${office.city === "Moscow" ? "bg-yellow-500" : "bg-green-500"} animate-pulse`} />
                    <span className="text-xs text-muted-foreground">
                      {office.city === "Moscow" ? "Opening Soon" : "Now Open"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-4 gap-6"
        >
          {[
            { icon: Globe, value: "5", label: "Countries", color: "text-primary" },
            { icon: Building, value: "88+", label: "Team Members", color: "text-accent" },
            { icon: Users, value: "2,450+", label: "Global Clients", color: "text-foreground" },
            { icon: Award, value: "24/7", label: "Support", color: "text-luxury" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to explore investment opportunities in any of our markets?
          </p>
          <motion.a
            href="mailto:info@noodproperties.com"
            className="magnetic inline-flex items-center space-x-2 bg-primary text-black px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-gold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={18} />
            <span>Contact Our Team</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default OfficeLocations;