import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Building2, ArrowRight } from "lucide-react";
import Logo3D from "./Logo3D";

const NavigationPremium = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const countries = [
    { name: "United Arab Emirates", path: "/uae", flag: "🇦🇪", code: "AE" },
    { name: "United Kingdom", path: "/uk", flag: "🇬🇧", code: "GB" },
    { name: "United States", path: "/usa", flag: "🇺🇸", code: "US" },
    { name: "Russia", path: "/russia", flag: "🇷🇺", code: "RU" },
    { name: "Pakistan", path: "/pakistan", flag: "🇵🇰", code: "PK" },
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "glass backdrop-blur-xl shadow-luxury" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 relative">
                  <Logo3D animate={true} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-white font-bold text-xl font-heading">NŌŌD</div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    International Properties
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`relative text-sm font-medium transition-colors hover:text-primary group ${
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Countries Dropdown */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Markets
                </Button>
                
                <motion.div
                  className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl shadow-luxury border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <div className="p-4 space-y-2">
                    {countries.map((country) => (
                      <Link
                        key={country.code}
                        to={country.path}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group/item"
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-sm font-medium text-white group-hover/item:text-primary transition-colors">
                          {country.name}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow transition-all duration-300 rounded-full px-6"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-50 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            
            <motion.div
              className="relative flex flex-col items-center justify-center h-full px-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Navigation Items */}
              <div className="space-y-8 text-center mb-12">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="block text-3xl font-heading font-bold text-white hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Countries */}
              <div className="grid grid-cols-1 gap-4 w-full max-w-sm mb-12">
                {countries.map((country, index) => (
                  <motion.div
                    key={country.code}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      to={country.path}
                      className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-white/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-3xl">{country.flag}</span>
                      <span className="text-lg font-medium text-white">
                        {country.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg rounded-full shadow-luxury"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationPremium;