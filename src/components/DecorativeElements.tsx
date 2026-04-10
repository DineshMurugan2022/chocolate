import { motion } from 'framer-motion';
import { memo } from 'react';
import floatingGold from '../assets/branding/floating_gold.png';
import cocoaBeans from '../assets/branding/cocoa_beans.png';

const DecorativeElements = memo(function DecorativeElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Top Left Floating Bean */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 w-64 h-64 opacity-100 blur-[2px]"
      >
        <img src={cocoaBeans} alt="" className="w-full h-full object-contain transform rotate-45" />
      </motion.div>

      {/* Bottom Right Golden Shards */}
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-80 h-80 opacity-100"
      >
        <img src={floatingGold} alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Middle Right Subtle Accent */}
      <motion.div
        animate={{ 
          x: [0, 20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -right-16 w-48 h-48 opacity-100 blur-[1px]"
      >
        <img src={cocoaBeans} alt="" className="w-full h-full object-contain -rotate-12" />
      </motion.div>

      {/* Bloom Pattern Accent */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          opacity: 1
        }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] pointer-events-none z-[-1] blur-3xl opacity-50"
      >
        <img src="/src/assets/branding/bloom_pattern.png" alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Global Grainy Texture for Premium Feel */}
      <div className="absolute inset-0 opacity-[0.03] contrast-125 brightness-100 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
    </div>
  );
});

export default DecorativeElements;
