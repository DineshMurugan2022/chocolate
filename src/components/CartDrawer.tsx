import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addToCart, decrementQuantity, removeFromCart } from '@/store/cartSlice';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full sm:max-w-[400px] md:max-w-[440px] h-full shadow-[0_0_80px_rgba(26,15,13,0.2)] relative z-10 flex flex-col overflow-hidden bg-parchment-base border-l border-gold-soft/10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
               <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[40%] bg-gold-soft/10 blur-[80px] rounded-full" />
               <div className="absolute top-[40%] -left-[10%] w-[50%] h-[30%] bg-burnt-caramel/5 blur-[80px] rounded-full" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between p-5 md:p-6 bg-white/40 backdrop-blur-md border-b border-gold-soft/10 shrink-0">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-display italic font-black text-cocoa-deep leading-none">Vault Registry</h2>
                  <span className="bg-burnt-caramel text-white text-[7px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full shadow-sm">
                    {cartItemCount} Artifacts
                  </span>
                </div>
                <p className="text-[8px] font-body font-black uppercase tracking-[0.2em] text-burnt-caramel/60">Heritage Collection</p>
              </div>
              <button
                onClick={onClose}
                className="group p-2 hover:bg-cocoa-deep/5 rounded-full transition-all duration-500"
              >
                <X size={18} className="text-cocoa-deep group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Cart Items Container - Explicit height management for scroller */}
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 space-y-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                  <div className="relative">
                    <div className="size-24 bg-gold-soft/5 rounded-full flex items-center justify-center animate-pulse" />
                    <ShoppingCart size={32} className="absolute inset-0 m-auto text-gold-soft opacity-20" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-cocoa-deep font-display italic text-xl">The vault is currently empty</p>
                    <p className="text-[9px] font-body font-black uppercase tracking-widest text-burnt-caramel/40">Add artifacts to begin</p>
                  </div>
                  <button
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="group flex items-center gap-3 py-3 px-6 border border-gold-soft/20 rounded-full hover:bg-gold-soft/5 transition-all duration-700"
                  >
                    <span className="text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">Explore</span>
                    <Plus size={12} className="text-burnt-caramel group-hover:rotate-90 transition-transform duration-500" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative flex gap-4 pb-6 border-b border-gold-soft/5 last:border-0"
                    >
                      <div className="relative size-14 md:size-16 rounded-[14px] overflow-hidden shrink-0 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-display italic font-black text-cocoa-deep text-sm md:text-base leading-tight truncate">{item.name}</h4>
                            <button 
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="p-1 text-cocoa-deep/10 hover:text-red-500 transition-colors shrink-0"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-body font-medium text-cocoa-deep/30 text-[9px] tracking-tight">₹{item.price.toLocaleString('en-IN')}</span>
                            <div className="h-0.5 w-0.5 rounded-full bg-gold-soft/20" />
                            <span className="text-[7px] font-body font-black uppercase tracking-widest text-gold-soft">100g</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-white/40 border border-gold-soft/5 rounded-full p-0.5 scale-90 origin-left">
                            <button
                              onClick={() => dispatch(decrementQuantity(item.id))}
                              className="size-6 flex items-center justify-center hover:bg-burnt-caramel/10 text-cocoa-deep/40 hover:text-burnt-caramel transition-all rounded-full"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center font-body font-black text-[10px] text-cocoa-deep">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(addToCart(item))}
                              className="size-6 flex items-center justify-center hover:bg-burnt-caramel/10 text-cocoa-deep/40 hover:text-burnt-caramel transition-all rounded-full"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="font-body font-black text-cocoa-deep text-sm tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Reduced height and padding */}
            {items.length > 0 && (
              <div className="relative p-6 md:p-8 bg-white/60 backdrop-blur-2xl border-t border-gold-soft/10 space-y-6 shrink-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-cocoa-deep/30 font-body font-black uppercase text-[9px] tracking-[0.2em]">Summary</span>
                    <div className="h-[1px] flex-1 mx-4 bg-gold-soft/5" />
                    <span className="text-cocoa-deep/60 font-body font-bold text-xs">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <span className="text-cocoa-deep font-display italic text-2xl font-black leading-none">Total Amount</span>
                      <p className="text-[8px] font-body font-black text-gold-soft uppercase tracking-[0.1em]">Heritage Surcharge Included</p>
                    </div>
                    <span className="text-cocoa-deep font-body font-black text-2xl tracking-tighter">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="group relative w-full h-14 bg-cocoa-deep text-white rounded-2xl overflow-hidden shadow-xl transition-all active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em]">
                    Proceed to Checkout
                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                  </span>
                </button>
                
                <p className="text-center text-[8px] font-body font-medium text-cocoa-deep/20 italic">
                   "A legacy of taste, secured in your vault."
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
