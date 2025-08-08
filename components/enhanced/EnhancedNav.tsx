import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Building2, Globe, Menu, X, ArrowRight } from 'lucide-react';

interface EnhancedNavProps {
  isVisible: boolean;
}

export default function EnhancedNav({ isVisible }: EnhancedNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY, 
    [0, 100], 
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );
  
  const languages = ['EN', 'AR', 'UR', 'RU'];
  const navItems = [
    { label: 'Properties', href: '#properties' },
    { label: 'Locations', href: '#locations' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' }
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ background: navBackground }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ x: -50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              data-cursor="hover"
            >
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-white font-bold text-xl">NOOD</div>
              <div className="text-gray-300 text-xs tracking-wider">PROPERTIES</div>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
                initial={{ y: -20, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
                data-cursor="hover"
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            <motion.div
              className="flex items-center space-x-2 ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Globe className="text-gray-300 w-4 h-4" />
              <select 
                className="bg-transparent text-gray-300 border-none outline-none cursor-pointer"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                data-cursor="hover"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang} className="bg-gray-900">
                    {lang}
                  </option>
                ))}
              </select>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:block"
          >
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white px-6 py-2"
              data-cursor="hover"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="hover"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-white text-3xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setIsMenuOpen(false)}
                  data-cursor="hover"
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div
                className="flex items-center space-x-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang}
                    className={`px-4 py-2 rounded-full ${currentLanguage === lang ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                    onClick={() => setCurrentLanguage(lang)}
                    whileHover={{ scale: 1.1 }}
                    data-cursor="hover"
                  >
                    {lang}
                  </motion.button>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white px-8 py-6 text-xl mt-8"
                  onClick={() => setIsMenuOpen(false)}
                  data-cursor="hover"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}