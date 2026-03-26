import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, ArrowRight, Share2, ShieldCheck, History } from 'lucide-react';
import confetti from 'canvas-confetti';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#B3530F', '#14211A', '#F5F2ED'] };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-warm text-cocoa-deep selection:bg-burnt-caramel selection:text-white relative overflow-hidden">
      
      {/* Background Subtle Organic Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={() => {}} />
      
      <main className="pt-48 pb-40 px-6 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Animated Check Certification */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="size-32 bg-botanical-green rounded-[48px] flex items-center justify-center mb-16 shadow-2xl border-8 border-white group transition-transform hover:scale-110"
        >
          <Check size={56} className="text-white" strokeWidth={3} />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-12 max-w-3xl"
        >
          <div className="space-y-6">
             <div className="flex items-center justify-center gap-6">
                <ShieldCheck className="size-5 text-burnt-caramel" />
                <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-burnt-caramel">Acquisition Verified</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-display font-black text-cocoa-deep leading-[0.9] tracking-tighter italic">
               The Harvest <br />
               <span className="text-cocoa-deep/20 font-light not-italic">is Yours.</span>
             </h1>
          </div>
          
          <p className="font-serif text-xl md:text-2xl italic text-cocoa-deep/50 leading-relaxed px-10 border-l-2 border-r-2 border-cocoa-deep/5 py-4">
            Thank you for your curatorial patronage. Your bespoke botanical selection has been authorized and entered our atelier for final slow-curing and hand-packaging.
          </p>
        </motion.div>

        {/* Action Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-8"
        >
          <button 
            onClick={() => navigate('/profile')}
            className="h-20 px-12 bg-cocoa-deep text-white rounded-[30px] font-body font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 hover:bg-burnt-caramel transition-all shadow-2xl active:scale-95 group"
          >
            Track_Heritage_History <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="h-20 px-12 bg-white border border-cocoa-deep/5 text-cocoa-deep rounded-[30px] font-body font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 hover:bg-ivory-warm transition-all shadow-md active:scale-95"
          >
            Explore_New_Manifests <ShoppingBag size={18} />
          </button>
        </motion.div>

        {/* Technical Logistics Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 1 }}
           className="mt-24 p-12 bg-white/40 backdrop-blur-3xl border border-white rounded-[60px] max-w-xl w-full flex items-center justify-between shadow-organic group"
        >
           <div className="text-left flex items-center gap-8">
              <div className="size-16 rounded-[24px] bg-ivory-warm flex items-center justify-center text-burnt-caramel">
                 <History size={24} />
              </div>
              <div className="space-y-1">
                 <p className="font-body text-[9px] font-black text-cocoa-deep/30 uppercase tracking-[0.4em]">Logistics Protocol</p>
                 <p className="text-2xl font-display text-cocoa-deep italic">Arrival in 3-5 <span className="text-botanical-green">Mastery</span> Days</p>
              </div>
           </div>
           <button className="size-16 rounded-[24px] bg-white border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/20 hover:text-burnt-caramel hover:bg-ivory-warm transition-all">
              <Share2 size={24} />
           </button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
