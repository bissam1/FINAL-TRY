import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        setCursorVariant("button");
      } else if (target.tagName === 'A' || target.closest('a')) {
        setCursorVariant("link");
      } else if (target.classList.contains('magnetic')) {
        setCursorVariant("magnetic");
      } else if (target.classList.contains('cursor-glow')) {
        setCursorVariant("glow");
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorVariant("text");
      } else if (target.dataset.cursor) {
        setCursorVariant(target.dataset.cursor);
      } else {
        setCursorVariant("hover");
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant("default");
    };

    const handleMouseEnterPage = () => setIsVisible(true);
    const handleMouseLeavePage = () => setIsVisible(false);

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnterPage);
    document.addEventListener("mouseleave", handleMouseLeavePage);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], .magnetic, .cursor-glow, input, textarea, [data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnterPage);
      document.removeEventListener("mouseleave", handleMouseLeavePage);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: "rgba(255, 215, 0, 1)",
      mixBlendMode: "normal" as const,
    },
    hover: {
      scale: 1.5,
      opacity: 0.8,
      backgroundColor: "rgba(255, 215, 0, 0.8)",
      mixBlendMode: "difference" as const,
    },
    button: {
      scale: 2.5,
      opacity: 0.6,
      backgroundColor: "rgba(255, 215, 0, 1)",
      mixBlendMode: "multiply" as const,
    },
    link: {
      scale: 2,
      opacity: 0.9,
      backgroundColor: "rgba(255, 215, 0, 0.9)",
      mixBlendMode: "difference" as const,
    },
    magnetic: {
      scale: 3,
      opacity: 0.7,
      backgroundColor: "rgba(255, 215, 0, 0.8)",
      mixBlendMode: "screen" as const,
    },
    glow: {
      scale: 4,
      opacity: 0.4,
      backgroundColor: "rgba(255, 215, 0, 0.6)",
      mixBlendMode: "screen" as const,
    },
    text: {
      scale: 0.3,
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
    }
  };

  const followerVariants = {
    default: {
      scale: 1,
      opacity: 0.3,
    },
    hover: {
      scale: 1.2,
      opacity: 0.2,
    },
    button: {
      scale: 1.5,
      opacity: 0.15,
    },
    link: {
      scale: 1.3,
      opacity: 0.25,
    },
    magnetic: {
      scale: 2,
      opacity: 0.1,
    },
    glow: {
      scale: 2.5,
      opacity: 0.05,
    },
    text: {
      scale: 0.5,
      opacity: 0.4,
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: 8,
          height: 8,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          ...cursorVariants[cursorVariant as keyof typeof cursorVariants],
          x: 0,
          y: 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35,
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* Follower ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border-2"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: 32,
          height: 32,
          borderColor: "rgba(255, 215, 0, 0.4)",
          background: "transparent",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={followerVariants[cursorVariant as keyof typeof followerVariants]}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          delay: 0.05
        }}
      />
      
      {/* Glow effect for special interactions */}
      {(cursorVariant === "glow" || cursorVariant === "magnetic" || cursorVariant === "button") && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{ 
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
            width: 80,
            height: 80,
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)",
            filter: "blur(20px)"
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: cursorVariant === "magnetic" ? 0.6 : 0.3, 
            scale: cursorVariant === "magnetic" ? 1.5 : 1 
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Trail effect for movement */}
      <motion.div
        className="fixed pointer-events-none z-[9996] rounded-full"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          width: 4,
          height: 4,
          background: "rgba(255, 215, 0, 0.6)",
          filter: "blur(2px)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;