import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, TrendingUp, Shield, Users } from "lucide-react";

const CountryFlags = () => {
  const navigate = useNavigate();

  const countries = [
    {
      name: "United Arab Emirates",
      code: "AE",
      flag: "🇦🇪",
      route: "/uae",
      description: "Luxury properties in Dubai & Abu Dhabi",
      stats: { roi: "12%", growth: "+8%", properties: "2,500+" },
      theme: "from-amber-600 to-yellow-500",
      language: "Arabic"
    },
    {
      name: "United Kingdom",
      code: "GB",
      flag: "🇬🇧",
      route: "/uk",
      description: "Historic estates & modern developments",
      stats: { roi: "8%", growth: "+4%", properties: "1,800+" },
      theme: "from-blue-800 to-red-600",
      language: "English"
    },
    {
      name: "United States",
      code: "US",
      flag: "🇺🇸",
      route: "/usa",
      description: "Premium properties coast to coast",
      stats: { roi: "10%", growth: "+6%", properties: "3,200+" },
      theme: "from-blue-600 to-red-500",
      language: "English"
    },
    {
      name: "Pakistan",
      code: "PK",
      flag: "🇵🇰",
      route: "/pakistan",
      description: "Emerging markets with high potential",
      stats: { roi: "15%", growth: "+12%", properties: "950+" },
      theme: "from-green-600 to-white",
      language: "Urdu"
    },
    {
      name: "Russia",
      code: "RU",
      flag: "🇷🇺",
      route: "/russia",
      description: "Luxury real estate in major cities",
      stats: { roi: "9%", growth: "+5%", properties: "750+" },
      theme: "from-red-600 to-blue-800",
      language: "Russian"
    }
  ];

  return (
    <section id="countries" className="py-32 px-6 bg-gradient-cinematic relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-secondary/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Global <span className="bg-gradient-gold bg-clip-text text-transparent">Markets</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-accent">
            Discover premium real estate opportunities across five dynamic markets,
            each offering unique advantages for international investors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.code}
              className="group relative cursor-glow"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => navigate(country.route)}
            >
              <div className="glass rounded-3xl p-8 h-full border-2 border-transparent 
                            group-hover:border-secondary/30 transition-all duration-500
                            backdrop-blur-xl shadow-luxury group-hover:shadow-glow">
                
                {/* Flag & Country */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-float">
                    {country.flag}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">
                    {country.name}
                  </h3>
                  <p className="text-sm text-white/70">
                    {country.language}
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/80 text-center mb-6 text-sm">
                  {country.description}
                </p>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <span className="text-white/70 text-sm">ROI</span>
                    </div>
                    <span className="text-secondary font-bold">{country.stats.roi}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-secondary" />
                      <span className="text-white/70 text-sm">Growth</span>
                    </div>
                    <span className="text-green-400 font-bold">{country.stats.growth}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="text-white/70 text-sm">Properties</span>
                    </div>
                    <span className="text-white font-bold">{country.stats.properties}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button className="w-full py-3 bg-gradient-to-r from-secondary/20 to-secondary/30 
                                   rounded-xl text-white font-medium hover:from-secondary/30 
                                   hover:to-secondary/40 transition-all duration-300 cursor-glow
                                   border border-secondary/20">
                    Explore Market
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${country.theme} rounded-3xl 
                               opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-lg`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-white/70 mb-8 font-accent text-lg">
            Ready to explore international real estate opportunities?
          </p>
          <a
            href="https://wa.me/971567575075"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-gold text-black 
                     px-8 py-4 rounded-full font-bold hover:scale-105 transition-all 
                     duration-300 cursor-glow shadow-gold hover:shadow-glow"
          >
            <Users className="w-5 h-5" />
            <span>Speak with an Expert</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CountryFlags;