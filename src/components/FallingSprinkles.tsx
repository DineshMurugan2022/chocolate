import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, memo } from 'react';
import { createRandom } from '@/utils/random';

const COLORS = [
  '#FF1D8E', // Vivid Pink
  '#FF6000', // Bright Orange
  '#70D000', // Fresh Green
  '#FFD300', // Sunny Yellow
  '#FFFFFF'  // Pure White
];

const FallingSprinkles = memo(function FallingSprinkles() {
  const shouldReduceMotion = useReducedMotion();
  const sprinkles = useMemo(() => {
    // If reduced motion is preferred, significantly reduce count or disable
    const count = shouldReduceMotion ? 0 : 60;
    return Array.from({ length: count }).map((_, i) => {
      const rand = createRandom(1000 + i * 17);
      return {
        id: i,
        left: `${rand() * 100}%`,
        delay: rand() * 8,
        duration: 8 + rand() * 12,
        width: 4 + rand() * 2, 
        height: 12 + rand() * 8, 
        color: COLORS[Math.floor(rand() * COLORS.length)], 
        glide: (rand() - 0.5) * 300,
        initialRotate: rand() * 360
      };
    });
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
      {sprinkles.map((s) => (
        <motion.div
           key={s.id}
           initial={{ y: -100, x: s.left, rotate: s.initialRotate, opacity: 0 }}
           animate={{ 
             y: '110vh', 
             x: `calc(${s.left} + ${s.glide}px)`,
             rotate: s.initialRotate + 720,
             opacity: [0, 1, 1, 0] 
           }}
           transition={{
             duration: s.duration,
             repeat: Infinity,
             delay: s.delay,
             ease: "linear"
           }}
           className="absolute rounded-full shadow-md"
           style={{
             width: `${s.width}px`,
             height: `${s.height}px`,
             backgroundColor: s.color,
             background: `linear-gradient(135deg, ${s.color}FF 0%, ${s.color}DD 40%, rgba(0,0,0,0.15) 100%)`,
             border: '1px solid rgba(255,255,255,0.2)'
           }}
        />
      ))}
    </div>
  );
});

export default FallingSprinkles;
