import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Slightly longer for cinematic effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: 'blur(20px)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-[#030308] flex items-center justify-center flex-col overflow-hidden"
        >
          {/* Animated Background Grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }} />

          {/* Golden Kolam / Lotus Symbol */}
          <div className="relative mb-12">
            <motion.svg 
              width="160" 
              height="160" 
              viewBox="0 0 100 100" 
              className="drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <motion.path
                d="M50 10 Q60 30 90 40 Q70 50 60 90 Q50 70 10 60 Q30 50 50 10 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="50" cy="50" r="2"
                fill="#D4AF37"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ delay: 1, duration: 1 }}
              />
              {/* Petals */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.path
                  key={i}
                  d="M50 50 Q65 35 80 50 Q65 65 50 50"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  style={{ originX: '50px', originY: '50px', rotate: angle }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 1.5 }}
                />
              ))}
            </motion.svg>
            
            {/* Liquid Ripple Effect */}
            <motion.div 
               animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
               className="absolute inset-0 border border-gold-soft/30 rounded-full"
            />
          </div>

          {/* Simple Regional Greeting */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-gold-soft font-display text-4xl italic font-light tracking-[0.2em]"
              >
                Vanakkam
              </motion.h2>
            </div>
            
            <div className="h-px w-12 bg-gold-soft/20 my-2" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-gold-soft font-body text-[10px] uppercase tracking-[0.6em]"
            >
              Preparing Your Treats
            </motion.p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-20 w-40 h-[1px] bg-white/5 overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 3, ease: [0.6, 0.05, -0.01, 0.9] }}
              className="w-full h-full bg-gold-soft shadow-[0_0_10px_rgba(212,175,55,0.8)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
