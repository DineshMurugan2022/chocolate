import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function FallingSprinkles() {
  const COLORS = [
    '#FF1D8E', // Vivid Pink
    '#FF6000', // Bright Orange
    '#70D000', // Fresh Green
    '#FFD300', // Sunny Yellow
    '#FFFFFF'  // Pure White
  ];

  const sprinkles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      width: 4 + Math.random() * 2, 
      height: 12 + Math.random() * 8, 
      color: COLORS[Math.floor(Math.random() * COLORS.length)], 
      glide: (Math.random() - 0.5) * 300,
      initialRotate: Math.random() * 360
    }));
  }, []);

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
             // Add a subtle 3D highlight/shading effect like the image
             background: `linear-gradient(135deg, ${s.color}FF 0%, ${s.color}DD 40%, rgba(0,0,0,0.15) 100%)`,
             border: '1px solid rgba(255,255,255,0.2)'
           }}
        />
      ))}
    </div>
  );
}
