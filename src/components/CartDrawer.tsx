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
            className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-full shadow-[0_0_80px_rgba(26,15,13,0.2)] relative z-10 flex flex-col overflow-hidden bg-parchment-base border-l border-gold-soft/10"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
               <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[40%] bg-gold-soft/10 blur-[80px] rounded-full" />
               <div className="absolute top-[40%] -left-[10%] w-[50%] h-[30%] bg-burnt-caramel/5 blur-[80px] rounded-full" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between p-6 md:p-8 bg-white/40 backdrop-blur-md border-b border-gold-soft/10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-display italic font-black text-cocoa-deep">Vault Registry</h2>
                  <span className="bg-burnt-caramel text-white text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full shadow-sm">
                    {cartItemCount} Artifacts
                  </span>
                </div>
                <p className="text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel/60">Your Personal Heritage Collection</p>
              </div>
              <button
                onClick={onClose}
                className="group p-3 hover:bg-cocoa-deep/5 rounded-full transition-all duration-500"
              >
                <X size={22} className="text-cocoa-deep group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="relative flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                  <div className="relative">
                    <div className="size-32 bg-gold-soft/5 rounded-full flex items-center justify-center animate-pulse" />
                    <ShoppingCart size={48} className="absolute inset-0 m-auto text-gold-soft opacity-20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-cocoa-deep font-display italic text-2xl">The vault is currently empty</p>
                    <p className="text-[10px] font-body font-black uppercase tracking-widest text-burnt-caramel/40">Begin your botanical odyssey to add artifacts</p>
                  </div>
                  <button
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="group flex items-center gap-4 py-4 px-8 border border-gold-soft/20 rounded-full hover:bg-gold-soft/5 transition-all duration-700"
                  >
                    <span className="text-[10px] font-body font-black uppercase tracking-[0.4em] text-burnt-caramel">Explore Registry</span>
                    <Plus size={14} className="text-burnt-caramel group-hover:rotate-90 transition-transform duration-500" />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative flex gap-6 md:gap-8 pb-10 border-b border-gold-soft/10 last:border-0"
                  >
                    <div className="relative size-24 md:size-32 rounded-[24px] overflow-hidden shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-display italic font-black text-cocoa-deep text-lg md:text-2xl leading-tight group-hover:text-burnt-caramel transition-colors">{item.name}</h4>
                          <button 
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="p-2 text-cocoa-deep/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-body font-medium text-cocoa-deep/40 text-xs md:text-sm tracking-tight">₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} each</span>
                          <div className="h-1 w-1 rounded-full bg-gold-soft/30" />
                          <span className="text-[9px] font-body font-black uppercase tracking-widest text-gold-soft bg-gold-soft/5 px-2 py-0.5 rounded">Artisan Grade</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center bg-white/50 backdrop-blur-sm border border-gold-soft/10 rounded-full overflow-hidden p-1 shadow-sm">
                          <button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="size-8 flex items-center justify-center hover:bg-burnt-caramel/10 text-cocoa-deep/60 hover:text-burnt-caramel transition-all rounded-full"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-body font-black text-sm text-cocoa-deep tracking-tighter">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className="size-8 flex items-center justify-center hover:bg-burnt-caramel/10 text-cocoa-deep/60 hover:text-burnt-caramel transition-all rounded-full"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                           <span className="block text-[8px] font-body font-black text-burnt-caramel/40 uppercase tracking-widest mb-1">Subtotal</span>
                           <span className="font-body font-black text-cocoa-deep text-lg tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="relative p-6 md:p-10 bg-white/60 backdrop-blur-2xl border-t border-gold-soft/10 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-cocoa-deep/40 font-body font-black uppercase text-[10px] tracking-[0.3em]">Vault Summary</span>
                    <div className="h-[1px] flex-1 mx-6 bg-gold-soft/10" />
                    <span className="text-cocoa-deep/60 font-body font-bold text-sm">₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-cocoa-deep font-display italic text-3xl font-black">Total Amount</span>
                      <p className="text-[9px] font-body font-black text-gold-soft uppercase tracking-[0.2em]">Including Heritage Surcharge</p>
                    </div>
                    <span className="text-cocoa-deep font-body font-black text-4xl tracking-tighter">₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="group relative w-full h-16 bg-cocoa-deep text-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(26,15,13,0.3)] transition-all active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-body font-black uppercase tracking-[0.5em]">
                    Proceed to Checkout
                    <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                  </span>
                </button>
                
                <p className="text-center text-[9px] font-body font-medium text-cocoa-deep/30 italic">
                   "A legacy of taste, secured in your personal vault."
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
