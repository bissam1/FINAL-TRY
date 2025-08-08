import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// ====================================================================================================
// Mock Libraries for Self-Contained Code
// ====================================================================================================

// Mock for 'next/head'
const Head = ({ children }) => <>{children}</>;

// Mock for 'next/router'
const useRouter = () => ({
  pathname: '/',
  query: { country: 'uae' },
  push: (path) => console.log(`Navigating to ${path}`),
});

// Mock UI Components with TypeScript types
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  props?: any;
}

const Button = ({ children, onClick, className, ...props }: ButtonProps) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg text-white font-medium ${className}`} {...props}>
    {children}
  </button>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent = ({ children, className }: CardContentProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = ({ children, className }: CardTitleProps) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription = ({ children, className }: CardDescriptionProps) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

interface InputProps {
  className?: string;
  props?: any;
}

const Input = ({ className, ...props }: InputProps) => (
  <input className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

interface TextareaProps {
  className?: string;
  props?: any;
}

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

interface TabsProps {
  children: React.ReactNode;
  activeTab: string;
}

const Tabs = ({ children, activeTab }: TabsProps) => {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);
  const tabTriggers = React.Children.map(children, child => {
    if (child.type.name === 'TabsList') {
      return React.cloneElement(child, {
        onTabClick: (value: string) => setLocalActiveTab(value),
        activeTab: localActiveTab
      });
    }
    return child;
  });
  return <div>{tabTriggers}</div>;
};

interface TabsListProps {
  children: React.ReactNode;
  onTabClick: (value: string) => void;
  activeTab: string;
  className?: string;
}

const TabsList = ({ children, onTabClick, activeTab, className }: TabsListProps) => (
  <div className={className}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { onClick: () => onTabClick(child.props.value), activeTab: activeTab })
    )}
  </div>
);

interface TabsTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
  activeTab: string;
  value: string;
  className?: string;
}

const TabsTrigger = ({ children, onClick, activeTab, value, className }: TabsTriggerProps) => (
  <button onClick={onClick} className={`${className} ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-400'}`}>
    {children}
  </button>
);

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  activeTab: string;
}

const TabsContent = ({ children, value, activeTab }: TabsContentProps) => value === activeTab ? <div>{children}</div> : null;

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
}

const Slider = ({ value, onValueChange, min, max, step }: SliderProps) => (
  <input type="range" min={min} max={max} step={step} value={value[0]} onChange={(e) => onValueChange([Number(e.target.value)])} />
);

// ====================================================================================================
// Consolidated Component Definitions
// ====================================================================================================

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => (
  <img src={src} alt={alt} className={className} onError={(e: any) => e.target.src = 'https://placehold.co/800x600'} />
);

interface AnimatedNavProps {
  isVisible: boolean;
}

const AnimatedNav = ({ isVisible }: AnimatedNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const navItems = [
    { label: 'Properties', href: '#properties' },
    { label: 'Locations', href: '#offices' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' }
  ];
  const languages = ['EN', 'AR', 'UR', 'RU'];
  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']);

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
          <motion.div className="flex items-center space-x-3" initial={{ x: -50, opacity: 0 }} animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <motion.div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="M18 22v-4"/><path d="M12 22v-4"/><path d="M6 22v-4"/><path d="M18 18V8"/><path d="M12 18V4"/><path d="M6 18v-8"/><path d="M4 22h16"/></svg>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="text-white font-bold text-xl">NOOD</div>
              <div className="text-gray-300 text-xs tracking-wider">PROPERTIES</div>
            </motion.div>
          </motion.div>
          <motion.div className="hidden md:flex items-center space-x-8" initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {navItems.map((item, index) => (
              <motion.a key={item.label} href={item.href} className="text-gray-300 hover:text-white transition-colors relative group"
                initial={{ y: -20, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
                data-cursor="hover">
                {item.label}
                <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full" transition={{ duration: 0.3 }} />
              </motion.a>
            ))}
            <motion.div className="flex items-center space-x-2 ml-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z"/><path d="M2 12h20"/></svg>
              <select className="bg-transparent text-gray-300 border-none outline-none cursor-pointer" value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} data-cursor="hover">
                {languages.map(lang => (<option key={lang} value={lang} className="bg-gray-900">{lang}</option>))}
              </select>
            </motion.div>
          </motion.div>
          <motion.button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} whileTap={{ scale: 0.9 }} data-cursor="hover">
            {isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 6 6 18M6 6l12 12"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>}
          </motion.button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.a key={item.label} href={item.href} className="text-white text-3xl font-medium" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} onClick={() => setIsMenuOpen(false)} data-cursor="hover">
                  {item.label}
                </motion.a>
              ))}
              <motion.div className="flex items-center space-x-4 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                {languages.map((lang, index) => (
                  <motion.button key={lang} className={`px-4 py-2 rounded-full ${currentLanguage === lang ? 'bg-blue-600 text-white' : 'text-gray-400'}`} onClick={() => setCurrentLanguage(lang)} whileHover={{ scale: 1.1 }} data-cursor="hover">
                    {lang}
                  </motion.button>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white px-8 py-6 text-xl mt-8" onClick={() => setIsMenuOpen(false)} data-cursor="hover">
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};