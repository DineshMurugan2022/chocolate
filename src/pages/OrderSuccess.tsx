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
    <div className="min-h-screen bg-parchment-base flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[30%] bg-gold-soft/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[30%] bg-burnt-caramel/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white/40 backdrop-blur-3xl rounded-[40px] p-8 md:p-20 text-center shadow-2xl border border-gold-soft/10 space-y-12"
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="relative">
            <div className="size-32 bg-gold-soft/5 rounded-full flex items-center justify-center animate-gentle">
              <CheckCircle2 size={64} className="text-gold-soft opacity-40" />
            </div>
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.5, type: "spring" }}
               className="absolute -top-2 -right-2 size-10 bg-burnt-caramel rounded-full flex items-center justify-center shadow-lg"
            >
               <PackageCheck size={20} className="text-white" />
            </motion.div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display italic font-black text-cocoa-deep leading-tight">
               Acquisition <br /> Complete
            </h1>
            <div className="flex items-center justify-center gap-4">
               <div className="h-[1px] w-8 bg-gold-soft/30" />
               <p className="text-burnt-caramel font-body font-black uppercase tracking-[0.4em] text-[10px]">
                  Order ID: {orderId.slice(-8).toUpperCase()}
               </p>
               <div className="h-[1px] w-8 bg-gold-soft/30" />
            </div>
          </div>
        </div>

        <p className="text-cocoa-deep/60 font-body font-medium text-lg leading-relaxed max-w-sm mx-auto italic">
           "Your heritage selection has been secured and is now undergoing botanical verification before dispatch."
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <button
            onClick={() => navigate('/profile')}
            className="group relative h-16 bg-cocoa-deep text-white rounded-2xl overflow-hidden shadow-xl transition-all active:scale-95"
          >
            <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] font-body font-black uppercase tracking-[0.2em]">
               Track Shipment <Truck size={18} />
            </span>
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="h-16 bg-white/50 border border-gold-soft/20 text-cocoa-deep font-body font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:border-gold-soft transition-all active:scale-95 shadow-sm"
          >
             Continue Discovery <ArrowRight size={18} />
          </button>
        </div>

        <div className="pt-10 border-t border-gold-soft/10 flex flex-col items-center gap-4">
           <div className="flex items-center gap-3 text-gold-soft/40">
             <span className="text-[9px] font-body font-black uppercase tracking-[0.3em]">Estimated Transit: 72-120 Hours</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
