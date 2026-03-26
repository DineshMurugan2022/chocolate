import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { addToCart, decrementQuantity } from '../store/cartSlice';

const CartModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-black z-[201] shadow-2xl p-0 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-display text-white tracking-widest uppercase">Your Selection</h2>
                <p className="text-[10px] text-gold-accent font-bold tracking-[0.2em] uppercase opacity-80">Handcrafted in Tamil Nadu</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:rotate-90 transition-transform duration-300"
              >
                <X className="text-white/40 hover:text-white" size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/20 space-y-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="text-xl font-display">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-start group">
                    <div className="w-28 h-28 bg-noir-900 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    
                    <div className="flex-grow space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-xl font-display text-white leading-tight">{item.name}</h3>
                          <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">70% Dark Chocolate <br /> Single Origin • Vegan</p>
                        </div>
                        <p className="text-xl font-display text-gold-accent">₹{item.price * item.quantity}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-noir-900/50 p-1.5 rounded-lg border border-white/5">
                          <button 
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">{item.quantity.toString().padStart(2, '0')}</span>
                          <button 
                            onClick={() => dispatch(addToCart(item))}
                            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="text-[10px] font-bold tracking-[0.2em] text-white/40 hover:text-red-500 uppercase transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 pb-12 border-t border-white/5 space-y-8 bg-black">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold tracking-widest text-white/40 uppercase">
                    <span>Subtotal</span>
                    <span className="text-white tracking-widest">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold tracking-widest text-white/40 uppercase">
                    <span>Gifting & Shipping</span>
                    <span className="text-white/60">Calculated at next step</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-2">Total Amount</span>
                  <span className="text-4xl font-display text-gold-accent">₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-6">
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-5 bg-gold-accent hover:bg-gold-deep text-black font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 transition-all group"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 opacity-40">
                    <ShieldCheck size={14} className="text-gold-accent" />
                    <span className="text-[9px] font-bold tracking-widest uppercase">Secure Encrypted Transaction</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
