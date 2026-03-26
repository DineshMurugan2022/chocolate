import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2.5 seconds cinematic wait before revealing app
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-white flex items-center justify-center flex-col"
        >
          {/* Animated SVG Logo */}
          <div className="relative mb-8 text-gold-accent flex items-center gap-4">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <span className="material-symbols-outlined text-6xl drop-shadow-[0_0_15px_rgba(255,209,102,0.5)]">flare</span>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                className="text-5xl font-playfair font-bold tracking-widest uppercase text-umber-text"
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              >
                Asian <span className="italic text-gold-accent font-light">Chocolate Store</span>
              </motion.h1>
            </div>
          </div>

          {/* Progress Line */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mt-4">
            <motion.div 
              className="absolute top-0 left-0 h-full w-full bg-gold-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-soft-text font-poppins text-xs tracking-[0.3em] mt-6 uppercase"
          >
            Entering The Connoisseur's Realm
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
