import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Calculator, TrendingUp, Phone, User, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CinematicNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "AR", name: "العربية", flag: "🇦🇪" },
    { code: "UR", name: "اردو", flag: "🇵🇰" },
    { code: "RU", name: "Русский", flag: "🇷🇺" }
  ];

  const navLinks = [
    { name: "Properties", href: "/properties", icon: Globe },
    { name: "Countries", href: "#countries", icon: Globe },
    { name: "Calculator", href: "/investment-calculator", icon: Calculator },
    { name: "ROI Analyzer", href: "/roi-analyzer", icon: TrendingUp },
    { name: "Broker Course", href: "/broker-course", icon: User },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-cinematic' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 cursor-glow">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">N</span>
              </div>
              <span className="text-white font-heading text-xl font-bold">NŌŌD</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-white/80 hover:text-white transition-all duration-300 
                           cursor-glow relative group font-medium"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary 
                                 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white/80 hover:text-white 
                                 transition-all duration-300 cursor-glow">
                  <Languages className="w-4 h-4" />
                  <span>{language}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 glass rounded-lg p-2 opacity-0 
                              invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2 
                               text-white/80 hover:text-white rounded cursor-glow"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/971567575075"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full 
                         transition-all duration-300 cursor-glow hover:scale-105 font-medium"
              >
                WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white cursor-glow p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
            <motion.div
              className="relative z-50 h-full flex flex-col justify-center items-center space-y-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-2xl font-medium cursor-glow hover:text-secondary 
                             transition-all duration-300 flex items-center space-x-3"
                  >
                    <link.icon className="w-6 h-6" />
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.a
                href="https://wa.me/971567575075"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-medium cursor-glow"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => setIsOpen(false)}
              >
                WhatsApp Support
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CinematicNavigation;