import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface SplitTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  type?: 'words' | 'chars' | 'lines';
  lineClamp?: number;
}

export default function SplitText({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.5,
  tag = 'div',
  type = 'words',
  lineClamp
}: SplitTextProps) {
  const [elements, setElements] = useState<string[]>([]);
  
  useEffect(() => {
    if (typeof children !== 'string') return;
    
    if (type === 'words') {
      setElements(children.split(' '));
    } else if (type === 'chars') {
      setElements(children.split(''));
    } else if (type === 'lines') {
      setElements(children.split('\n'));
    }
  }, [children, type]);
  
  const TagName = tag;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  };
  
  const childVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      rotateX: 90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { 
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <motion.div
      className={className}
      style={{ 
        lineClamp: lineClamp,
        WebkitLineClamp: lineClamp,
        display: 'flex',
        flexWrap: 'wrap',
        gap: type === 'words' ? '0.25em' : '0',
        overflow: 'hidden',
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="inline-block overflow-hidden"
          variants={childVariants}
          style={{ display: 'inline-block' }}
        >
          <TagName style={{ display: 'inline-block' }}>
            {element}{type === 'words' ? '' : ' '}
          </TagName>
        </motion.div>
      ))}
    </motion.div>
  );
}
