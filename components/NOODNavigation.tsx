import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import noodLogo from "@/assets/nood-logo.png";

const NOODNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const countryItems = [
    { label: "🇦🇪 UAE", href: "/uae", flag: "🇦🇪" },
    { label: "🇬🇧 United Kingdom", href: "/uk", flag: "🇬🇧" },
    { label: "🇺🇸 United States", href: "/usa", flag: "🇺🇸" },
    { label: "🇵🇰 Pakistan", href: "/pakistan", flag: "🇵🇰" },
    { label: "🇷🇺 Russia", href: "/russia", flag: "🇷🇺" }
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    { 
      label: "Countries", 
      href: "#", 
      dropdown: true,
      items: countryItems
    },
    { label: "Properties", href: "/properties" },
    { label: "Insights", href: "/insights" },
    { label: "Tools", href: "/tools" },
    { label: "About", href: "/story" }
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "glass shadow-luxury" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="magnetic">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <img 
                  src={noodLogo} 
                  alt="NOOD" 
                  className="w-8 h-8 object-contain filter drop-shadow-gold" 
                />
                <div className="hidden md:flex flex-col">
                  <span className="text-lg font-playfair font-semibold text-luxury tracking-wider">
                    NŌŌD
                  </span>
                  <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase -mt-1">
                    International Properties
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.slice(0, -1).map((item) => (
                <div key={item.href} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="magnetic flex items-center space-x-1 text-sm tracking-[0.05em] font-light transition-all duration-300 hover:text-primary text-foreground/80">
                        <span>{item.label}</span>
                        <ChevronDown size={14} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 glass rounded-lg shadow-luxury overflow-hidden"
                          >
                            {item.items?.map((subItem, index) => (
                              <Link
                                key={subItem.href}
                                to={subItem.href}
                                className="magnetic block px-4 py-3 text-sm hover:bg-primary/10 transition-colors duration-200 border-b border-border/10 last:border-b-0"
                              >
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-center space-x-3"
                                >
                                  <span className="text-lg">{subItem.flag}</span>
                                  <span className="text-foreground/80">{subItem.label.replace(subItem.flag + ' ', '')}</span>
                                </motion.div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`magnetic text-sm tracking-[0.05em] font-light transition-all duration-300 hover:text-primary ${
                        location.pathname === item.href 
                          ? "text-primary" 
                          : "text-foreground/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Button & Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="magnetic hidden md:block glass px-6 py-2 text-sm tracking-[0.05em] text-foreground font-light transition-all duration-300 hover:bg-primary/10 hover:shadow-gold rounded-lg"
              >
                Contact
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="magnetic lg:hidden p-2 text-foreground glass rounded-lg"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
              {/* Mobile Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3 mb-8"
              >
                <img 
                  src={noodLogo} 
                  alt="NOOD" 
                  className="w-12 h-12 object-contain filter drop-shadow-gold" 
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-playfair font-semibold text-luxury tracking-wider">
                    NŌŌD
                  </span>
                  <span className="text-sm text-muted-foreground tracking-[0.2em] uppercase -mt-1">
                    International Properties
                  </span>
                </div>
              </motion.div>

              {/* Countries Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8"
              >
                {countryItems.map((country, index) => (
                  <motion.div
                    key={country.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={country.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="magnetic block glass p-4 rounded-lg text-center hover:bg-primary/10 transition-all duration-300"
                    >
                      <div className="text-2xl mb-2">{country.flag}</div>
                      <div className="text-xs text-foreground/80 font-light">
                        {country.label.replace(country.flag + ' ', '')}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Main Menu Items */}
              {[menuItems[0], menuItems[2], menuItems[3], menuItems[4], menuItems[5]].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="magnetic text-2xl font-light text-foreground hover:text-primary transition-colors duration-300 tracking-[0.05em]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="magnetic glass px-8 py-3 text-lg tracking-[0.05em] text-foreground font-light hover:bg-primary/10 hover:shadow-gold rounded-lg transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/971567575075"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 magnetic"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-luxury hover:shadow-gold transition-all duration-300 animate-glow">
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097"/>
          </svg>
        </div>
      </motion.a>
    </>
  );
};

export default NOODNavigation;