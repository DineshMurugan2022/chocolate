import React from 'react';
import { motion } from 'framer-motion';

const CelestialBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-celestial-bg">
      {/* Deep Space Gradient */}
      <div 
        className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,#0A0A1F_0%,#030308_100%)]" 
      />

      {/* Aurora Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-aurora-purple/20 blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-10%', '10%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-aurora-cyan/15 blur-[150px]"
      />

      {/* Particle Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen"
        style={{ 
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />
      
      {/* Holographic Scanlines / Grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)', 
          backgroundSize: '100px 100px'
        }} 
      />
    </div>
  );
};

export default CelestialBackground;
