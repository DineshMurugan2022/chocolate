import { useState, useEffect, memo } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

const ChocolateCursor = memo(function ChocolateCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSealArea, setIsSealArea] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select, .interactive')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
      
      if (target.closest('.seal-target')) {
        setIsSealArea(true);
      } else {
        setIsSealArea(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [shouldReduceMotion]);

  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(mousePosition.x - 12, springConfig);
  const y = useSpring(mousePosition.y - 12, springConfig);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ x, y, pointerEvents: 'none', position: 'fixed', zIndex: 9999, top: 0, left: 0 }}
      animate={{
        scale: isSealArea ? 1.5 : (isHovered ? 2.5 : 1),
        borderRadius: isSealArea ? '10%' : (isHovered ? '20%' : '50%'),
        rotate: isSealArea ? 0 : (isHovered ? 45 : 0),
      }}
      className="hidden md:block"
    >
       {/* The "Chocolate Drop" */}
       <div className="relative">
          <motion.div 
            animate={{ 
               background: isSealArea ? '#8B0000' : (isHovered ? '#B3530F' : '#1A0F0B'),
               width: 24,
               height: 24,
               border: isSealArea ? '2px solid #D4AF37' : 'none'
            }}
            className="rounded-full shadow-lg flex items-center justify-center overflow-hidden" 
          >
             {isSealArea && <div className="text-[6px] text-white font-black italic">B</div>}
          </motion.div>
          {/* Splash Effect on Link Hover */}
          {isHovered && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1.2 }}
               className="absolute inset-0 rounded-full border-2 border-primary/40"
             />
          )}
       </div>
    </motion.div>
  );
});

export default ChocolateCursor;
