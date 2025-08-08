import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPropertiesMenu, setShowPropertiesMenu] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { 
      href: "/properties", 
      label: "Properties",
      hasDropdown: true,
      subItems: [
        { href: "/uae", label: "UAE" },
        { href: "/usa", label: "USA" },
        { href: "/uk", label: "UK" },
        { href: "/russia", label: "Russia" },
        { href: "/pakistan", label: "Pakistan" },
      ]
    },
    { href: "/insights", label: "Insights" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/10 backdrop-blur-md border-b border-secondary/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="text-2xl font-bold text-secondary tracking-tight">
              NŌŌD
            </div>
            <div className="text-sm text-foreground/70 tracking-widest">
              PROPERTIES
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setShowPropertiesMenu(true)}
                    onMouseLeave={() => setShowPropertiesMenu(false)}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="flex items-center text-foreground/80 hover:text-secondary transition-colors duration-300 font-medium cursor-pointer"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </motion.div>
                    
                    <AnimatePresence>
                      {showPropertiesMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 bg-card/95 backdrop-blur-lg border border-secondary/20 rounded-lg shadow-luxury min-w-40"
                        >
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="block px-4 py-3 text-foreground/80 hover:text-secondary hover:bg-secondary/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to={item.href}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="text-foreground/80 hover:text-secondary transition-colors duration-300 font-medium"
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                )}
              </div>
            ))}
            <Button variant="luxury" size="default" className="ml-4">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card/20 backdrop-blur-md border-t border-secondary/10"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <div key={item.href}>
                  <Link to={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      className="block text-foreground/80 hover:text-secondary transition-colors duration-300 font-medium py-2"
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-foreground/60 hover:text-secondary transition-colors duration-300 py-1 text-sm"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button variant="luxury" size="default" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;