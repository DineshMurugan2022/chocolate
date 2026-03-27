import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addToCart, decrementQuantity } from '@/store/cartSlice';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
            className="absolute inset-0 bg-cocoa-deep/20 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-md bg-cocoa-deep h-full shadow-[-30px_0_60px_rgba(0,0,0,0.4)] relative z-10 flex flex-col border-l border-gold-soft/10 overflow-hidden"
          >
            {/* Soft Organic Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  x: [0, 40, -40, 0]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[10%] -left-[10%] w-full aspect-square bg-burnt-caramel/10 blur-[120px] rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 0],
                  y: [0, 40, -40, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[10%] -right-[10%] w-full aspect-square bg-gold-soft/10 blur-[100px] rounded-full"
              />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-10 border-b border-gold-soft/10 bg-black/40 backdrop-blur-3xl">
               <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-gold-soft" />
                    <span className="font-body text-[9px] font-black uppercase tracking-[0.4em] text-gold-soft/30">Registry Batch 2024</span>
                 </div>
                 <h2 className="text-3xl font-display text-gold-soft italic">
                    Your <span className="text-gold-soft/60 font-light">Inventory</span>
                 </h2>
               </div>
               <button 
                 onClick={onClose}
                 className="size-12 rounded-2xl bg-black/40 border border-gold-soft/10 shadow-sm text-gold-soft/40 hover:text-gold-soft flex items-center justify-center transition-all"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Cart Items */}
             <div className="relative z-10 flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar bg-black/20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-10 text-center px-4">
                   <div className="relative size-32 bg-black/40 rounded-full flex items-center justify-center border border-gold-soft/10 shadow-2xl">
                    <ShoppingBag size={48} strokeWidth={1} className="text-gold-soft/10" />
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute inset-0 bg-gold-soft rounded-full blur-2xl"
                    />
                  </div>
                   <div className="space-y-4">
                    <p className="font-display text-2xl italic text-gold-soft">Your inventory is vacant.</p>
                    <p className="text-[10px] font-body font-black uppercase text-gold-soft/30 tracking-[0.4em] max-w-[200px] mx-auto leading-loose italic">
                       Begin your artisanal harvest in our collection matrix.
                    </p>
                  </div>
                  <button 
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="h-14 px-10 bg-black/40 border border-gold-soft/10 text-gold-soft font-body font-black text-[9px] uppercase tracking-[0.5em] rounded-xl hover:bg-gold-soft hover:text-black transition-all shadow-md group italic"
                  >
                    Enter the Boutique <ArrowRight size={14} className="inline ml-3 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                    <motion.div 
                     key={item.id}
                     layout
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="flex gap-6 p-5 rounded-[32px] bg-black/40 backdrop-blur-3xl border border-gold-soft/10 group shadow-sm hover:shadow-xl transition-all duration-500"
                   >
                     <div className="size-24 rounded-2xl overflow-hidden bg-black/20 border border-gold-soft/10 flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                       <div className="space-y-1">
                         <div className="flex items-center justify-between">
                            <span className="font-body text-[8px] font-black text-gold-soft/60 uppercase tracking-[0.2em] italic">{item.category || 'Limited Piece'}</span>
                            <span className="font-mono text-[9px] text-gold-soft/20 uppercase tracking-tighter italic">REF_{item.id.slice(-4).toUpperCase()}</span>
                         </div>
                         <h4 className="font-display text-xl text-gold-soft italic leading-tight truncate pr-4">{item.name}</h4>
                         <span className="font-display font-black text-lg text-gold-soft shadow-sm">₹{item.price * item.quantity}</span>
                       </div>
                                            <div className="flex items-center gap-4 bg-black/40 self-start p-1.5 rounded-xl border border-gold-soft/10 mt-4">
                         <button 
                           onClick={() => dispatch(decrementQuantity(item.id))}
                           className="size-8 flex items-center justify-center text-gold-soft/30 hover:text-gold-soft hover:bg-black/60 rounded-lg transition-all"
                         >
                           <Minus size={14} />
                         </button>
                         <span className="text-xs font-body font-black text-gold-soft min-w-[24px] text-center">{item.quantity}</span>
                         <button 
                           onClick={() => dispatch(addToCart(item))}
                           className="size-8 flex items-center justify-center text-gold-soft/30 hover:text-gold-soft hover:bg-black/60 rounded-lg transition-all"
                         >
                           <Plus size={14} />
                         </button>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
               <div className="relative z-10 p-10 border-t border-gold-soft/10 bg-black/40 backdrop-blur-3xl space-y-10">
                 <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <span className="font-body text-gold-soft/40 tracking-[0.4em] uppercase text-[9px] font-black italic">Subtotal valuation</span>
                     <span className="font-display font-black text-xl text-gold-soft">₹{totalPrice}</span>
                   </div>
                   <div className="flex items-center justify-between pt-6 border-t border-gold-soft/10">
                     <span className="font-body text-gold-soft/20 tracking-[0.4em] uppercase text-[10px] font-black italic">Net Liquidation</span>
                     <span className="text-5xl font-display font-black text-gold-soft tracking-tighter">₹{totalPrice.toFixed(0)}</span>
                   </div>
                 </div>
                 
                 <button 
                   onClick={() => {
                       onClose();
                       navigate('/checkout');
                   }}
                   className="w-full h-20 bg-gold-soft hover:bg-gold-soft/80 text-black font-body font-black rounded-2xl text-[10px] uppercase tracking-[0.6em] shadow-2xl transition-all group overflow-hidden relative active:scale-[0.98] italic"
                 >
                   <span className="relative z-10 flex items-center justify-center gap-4">
                      Finalize Acquisition <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                   </span>
                 </button>
               </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
