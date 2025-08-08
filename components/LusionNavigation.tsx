import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const LusionNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "UAE", href: "/uae" },
    { label: "USA", href: "/usa" },
    { label: "UK", href: "/uk" },
    { label: "Pakistan", href: "/pakistan" },
    { label: "Russia", href: "/russia" },
    { label: "Properties", href: "/properties" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-black/80 backdrop-blur-md border-b border-white/5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/story">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-white font-light text-xl tracking-[0.1em]"
              >
                NOOD
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.slice(1, -2).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm tracking-[0.05em] font-light transition-all duration-300 hover:text-white ${
                    location.pathname === item.href 
                      ? "text-white" 
                      : "text-white/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Contact Button & Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="hidden md:block border border-white/20 px-6 py-2 text-sm tracking-[0.05em] text-white font-light transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              >
                Contact
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white"
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-light text-white hover:text-white/60 transition-colors duration-300 tracking-[0.05em]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LusionNavigation;