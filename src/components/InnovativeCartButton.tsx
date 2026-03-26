import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface InnovativeCartButtonProps {
  count: number;
  onClick: () => void;
}

const InnovativeCartButton: React.FC<InnovativeCartButtonProps> = ({ count, onClick }) => {
  return (
    <MagneticButton onClick={onClick} className="relative z-[110]">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group p-4 flex items-center justify-center"
      >
        {/* Button Background with Glass Effect */}
        <div className="absolute inset-0 bg-ivory-bg/60 backdrop-blur-xl border border-gold-accent/40 rounded-full group-hover:bg-ivory-bg/80 group-hover:border-gold-accent transition-colors duration-500 shadow-xl" />

        {/* Inner Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="relative">
          <ShoppingBag className="w-6 h-6 text-umber-text group-hover:text-gold-accent transition-colors duration-500" strokeWidth={1.5} />

          {/* Liquid Notification Badge */}
          <AnimatePresence>
            {count > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -2, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                  y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
                className="absolute -top-3 -right-3 min-w-[22px] h-[22px] flex items-center justify-center"
              >
                {/* Liquid Blob Effect Background */}
                <svg className="absolute inset-0 w-full h-full text-gold-accent filter drop-shadow-[0_2px_8px_rgba(255,215,0,0.5)]" viewBox="0 0 100 100">
                  <motion.path
                    d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
                    animate={{
                      d: [
                        "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z",
                        "M50,15 C75,15 85,35 85,50 C85,65 75,85 50,85 C25,85 15,65 15,50 C15,35 25,15 50,15 Z",
                        "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    fill="currentColor"
                  />
                </svg>

                {/* Count Text */}
                <span className="relative z-10 text-[10px] font-bold text-white mt-[1px]">
                  {count}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hover Text Tooltip (Minimalist) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 whitespace-nowrap pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-umber-text bg-white/80 px-4 py-2 rounded-full backdrop-blur-md border border-black/5 shadow-sm">
            View Bag
          </span>
        </motion.div>
      </motion.div>
    </MagneticButton>
  );
};

export default InnovativeCartButton;
