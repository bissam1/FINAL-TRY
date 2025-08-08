import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, DollarSign, Compass, FileText } from 'lucide-react';

export default function FloatingTools() {
  const [activeToolIndex, setActiveToolIndex] = useState<number | null>(null);
  
  const tools = [
    { icon: Calculator, name: "Mortgage Calculator", color: "#60a5fa" },
    { icon: DollarSign, name: "ROI Calculator", color: "#8b5cf6" },
    { icon: Compass, name: "Visa Guide", color: "#ec4899" },
    { icon: FileText, name: "AED Converter", color: "#f97316" },
  ];

  return (
    <motion.div 
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <div className="flex flex-col gap-4">
        {tools.map((tool, index) => (
          <div key={index} className="relative">
            <motion.button
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveToolIndex(activeToolIndex === index ? null : index)}
              data-cursor="hover"
              data-cursor-text={tool.name}
            >
              <tool.icon style={{ color: tool.color }} size={24} />
            </motion.button>
            
            <AnimatePresence>
              {activeToolIndex === index && (
                <motion.div
                  className="absolute right-20 top-0 w-80 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                  initial={{ opacity: 0, x: 20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 320 }}
                  exit={{ opacity: 0, x: 20, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6">
                    <h3 className="text-white text-lg font-medium mb-4" style={{ color: tool.color }}>
                      {tool.name}
                    </h3>
                    
                    {/* Placeholder for tool content */}
                    <div className="space-y-4">
                      <div className="h-10 bg-white/10 rounded-lg animate-pulse"></div>
                      <div className="h-10 bg-white/10 rounded-lg animate-pulse"></div>
                      <div className="h-10 bg-white/10 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}