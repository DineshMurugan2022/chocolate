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
            className="w-full max-w-md bg-[#F8FAF9] h-full shadow-2xl relative z-10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-[#357960]" size={24} />
                <h2 className="text-xl font-bold text-[#1A1A1A]">Shopping Cart</h2>
                <span className="bg-[#E5E9E7] text-[#357960] text-[10px] font-bold px-3 py-1 rounded-full">
                  {cartItemCount} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingCart size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="text-[#357960] font-bold text-sm hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                  >
                    <div className="size-20 bg-white rounded-xl border border-gray-100 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-[#1A1A1A] text-sm md:text-base truncate">{item.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">₹{item.price.toFixed(2)} each <span className="bg-gray-100 px-2 py-0.5 rounded ml-2">100 gms</span></p>
                        </div>
                        <span className="font-bold text-[#357960]">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-[#1A1A1A]">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Subtotal ({cartItemCount} items)</span>
                    <span className="text-gray-500 font-bold">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#1A1A1A] font-extrabold text-lg">Total</span>
                    <span className="text-[#1A1A1A] font-extrabold text-xl">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full h-14 bg-[#357960] hover:bg-[#2D6A4F] text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center text-base"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
