import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { toggleWishlistItem } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-cocoa-deep/20 backdrop-blur-md z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-ivory-warm z-[201] shadow-2xl flex flex-col border-l border-cocoa-deep/5"
          >
            {/* Header */}
            <div className="p-10 border-b border-cocoa-deep/5 flex items-center justify-between bg-white/40 backdrop-blur-xl">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <div className="size-2 rounded-full bg-burnt-caramel animate-pulse" />
                   <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-cocoa-deep/30">The Matrix Selection</span>
                </div>
                <h2 className="text-3xl font-display text-cocoa-deep flex items-center gap-2 italic">
                  Saved <span className="text-burnt-caramel font-light">Selections</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="size-12 bg-white rounded-2xl flex items-center justify-center text-cocoa-deep/40 hover:text-burnt-caramel transition-all border border-cocoa-deep/5 shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-ivory-warm/20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                  <div className="size-24 rounded-full bg-white flex items-center justify-center border border-cocoa-deep/5 shadow-xl">
                    <Heart size={36} className="text-cocoa-deep/10" />
                  </div>
                  <div className="space-y-4">
                    <p className="font-display text-2xl italic text-cocoa-deep">Your curation is empty</p>
                    <p className="text-xs font-body text-cocoa-deep/40 max-w-[200px] leading-relaxed mx-auto">Discover our artisan harvests and save your favorites for later witness.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-burnt-caramel border-b border-burnt-caramel hover:pb-2 transition-all"
                  >
                    Return to Selection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative flex gap-6 p-5 bg-white rounded-3xl border border-cocoa-deep/5 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="size-24 rounded-2xl overflow-hidden border border-cocoa-deep/5 shrink-0 bg-ivory-warm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                           <span className="font-body text-[8px] font-black text-burnt-caramel uppercase tracking-[0.2em]">High Estate</span>
                           <button 
                             onClick={() => dispatch(toggleWishlistItem(item._id))}
                             className="text-cocoa-deep/10 hover:text-rose-400 transition-colors"
                           >
                             <Trash2 size={12} />
                           </button>
                        </div>
                        <h4 className="font-display text-xl text-cocoa-deep italic leading-tight">{item.name}</h4>
                        <p className="text-cocoa-deep font-display font-black text-lg">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 pt-4">
                        <button 
                          onClick={() => {
                            dispatch(addToCart({ ...item, id: item._id, quantity: 1 }));
                          }}
                          className="flex-1 h-10 bg-botanical-green hover:bg-burnt-caramel text-ivory-warm font-body text-[9px] font-black uppercase tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 transition-all shadow-md active:scale-95"
                        >
                          <ShoppingCart size={12} /> Move to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-10 border-t border-cocoa-deep/5 bg-white/40 backdrop-blur-xl">
                 <button 
                   onClick={onClose}
                   className="w-full h-16 bg-white border border-cocoa-deep/10 text-cocoa-deep font-body font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl hover:bg-cocoa-deep hover:text-white transition-all shadow-sm flex items-center justify-center gap-4 group"
                 >
                   Explore the Harvest <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
