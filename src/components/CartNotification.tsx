import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import type { RootState } from '@/store';
import { clearNotification } from '@/store/cartSlice';

const CartNotification = () => {
  const { lastAddedItem } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (lastAddedItem) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Delay clearing from state to allow exit animation
        setTimeout(() => dispatch(clearNotification()), 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, dispatch]);

  return (
    <AnimatePresence>
      {isVisible && lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          className="fixed bottom-8 right-8 z-[300] w-full max-w-sm"
        >
          <div className="glass-morphism overflow-hidden rounded-[2rem] border border-white/20 bg-[#02040A]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="p-5 flex items-center gap-4">
              {/* Product Image */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-black/20 shrink-0 border border-white/10">
                <img 
                  src={lastAddedItem.image} 
                  alt={lastAddedItem.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <p className="text-[10px] font-bold text-gold-accent uppercase tracking-[0.2em] mb-1">Added to Selection</p>
                <h4 className="text-sm font-display text-white leading-tight mb-1">{lastAddedItem.name}</h4>
                <p className="text-xs text-white/50 font-medium">₹{lastAddedItem.price}</p>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-white/5 rounded-full text-white/30 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="h-1 bg-gradient-to-r from-gold-accent/50 to-gold-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;
