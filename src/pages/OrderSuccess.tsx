import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShoppingBag, Truck, PackageCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#357960', '#B3530F', '#D4AF37']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-16 text-center shadow-xl border border-gray-100 space-y-10"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="size-24 bg-[#E5E9E7] rounded-full flex items-center justify-center">
            <CheckCircle2 size={48} className="text-[#357960]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-display italic font-black text-[#1A1A1A]">
              Order Placed!
            </h1>
            <p className="text-[#357960] font-bold uppercase tracking-widest text-xs">
              Ref: {orderId.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-md mx-auto">
          Thank you for your purchase. We've received your order and are now preparing it for delivery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="h-16 bg-[#357960] hover:bg-[#2D6A4F] text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
          >
            Track Order <Truck size={18} />
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="h-16 bg-white border border-gray-200 text-[#1A1A1A] font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95"
          >
            Back to Shop <ShoppingBag size={18} />
          </button>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <PackageCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Expected delivery: 3-5 Business Days</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
