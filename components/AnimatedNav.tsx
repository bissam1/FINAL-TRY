import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Building2, ArrowRight } from 'lucide-react';

interface AnimatedNavProps {
  isVisible: boolean;
}

export default function AnimatedNav({ isVisible }: AnimatedNavProps) {
  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Properties', href: '#properties' },
    { label: 'Services', href: '#services' },
    { label: 'Markets', href: '#markets' },
    { label: 'About NOOD', href: '#about' }
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center justify-between backdrop-blur-md bg-black/20 rounded-2xl px-8 py-4 border border-white/10">
        {/* Animated Logo */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ x: -50, opacity: 0 }}
          animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Building2 className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-white font-bold text-xl">NOOD</div>
            <div className="text-gray-300 text-xs tracking-wider">PROPERTIES</div>
          </motion.div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors relative group"
              initial={{ y: -20, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
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
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white px-6 py-2"
            data-cursor="hover"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
}