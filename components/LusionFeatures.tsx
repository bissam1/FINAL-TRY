import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Shield, TrendingUp, Globe, Calculator, FileText } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LusionFeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Premium Properties",
    description: "Curated selection of luxury real estate investments with proven track records."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Legal Safety",
    description: "Complete legal protection and compliance across all international markets."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "High ROI",
    description: "Exceptional returns on investment with transparent market analysis."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Reach",
    description: "International presence across UAE, UK, USA, Pakistan, and Russia."
  },
  {
    icon: <Calculator className="w-8 h-8" />,
    title: "Investment Tools",
    description: "Advanced calculators and analysis tools for informed decision making."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Zero Commission",
    description: "No hidden fees or commissions on rental agreements and transactions."
  }
];

const LusionFeatures = ({ 
  features = defaultFeatures, 
  title = "Why Choose NOOD",
  subtitle = "Beyond Visions Within Reach"
}: LusionFeaturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-[0.2em] text-white/40 uppercase font-light mb-4"
          >
            {subtitle}
          </motion.h3>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + index * 0.1,
                ease: "easeOut"
              }}
              className="group relative"
            >
              {/* Feature Card */}
              <div className="relative border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04]">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 text-white/60 group-hover:text-white/80 transition-colors duration-300"
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-light text-white mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 scale-0 bg-gradient-to-br from-white/[0.03] to-transparent transition-transform duration-500 group-hover:scale-100 origin-bottom-right" />
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-white/20 to-transparent transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden border border-white/20 px-12 py-4 text-white transition-all duration-500 hover:border-white/40"
          >
            <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-light">
              Learn More
            </span>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LusionFeatures;