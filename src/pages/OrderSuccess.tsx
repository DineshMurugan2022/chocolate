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
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#D4AF37', '#1A0F0D', '#000000'] };

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
    <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-black relative overflow-hidden">
      
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
          className="size-32 bg-gold-soft rounded-[48px] flex items-center justify-center mb-16 shadow-2xl border-8 border-black/40 group transition-transform hover:scale-110"
        >
          <Check size={56} className="text-black" strokeWidth={3} />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="space-y-12 max-w-3xl"
        >
          <div className="space-y-6">
             <div className="flex items-center justify-center gap-6">
                <ShieldCheck className="size-5 text-gold-soft" />
                <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-gold-soft/40">Acquisition Verified</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-display font-black text-gold-soft leading-[0.9] tracking-tighter italic uppercase">
               The Harvest <br />
               <span className="text-gold-soft/20 font-light not-italic">is Yours.</span>
             </h1>
          </div>
          
          <p className="font-serif text-xl md:text-2xl italic text-gold-soft/50 leading-relaxed px-10 border-l-2 border-r-2 border-gold-soft/5 py-4">
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
            className="h-20 px-12 bg-gold-soft text-black rounded-[30px] font-body font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 hover:bg-gold-soft/80 transition-all shadow-2xl active:scale-95 group"
          >
            Track_Heritage_History <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="h-20 px-12 bg-black/40 border border-gold-soft/10 text-gold-soft rounded-[30px] font-body font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 hover:bg-black/60 transition-all shadow-md active:scale-95"
          >
            Explore_New_Manifests <ShoppingBag size={18} />
          </button>
        </motion.div>

        {/* Technical Logistics Card */}
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-24 p-12 bg-black/40 backdrop-blur-3xl border border-gold-soft/10 rounded-[60px] max-w-xl w-full flex items-center justify-between shadow-2xl group"
         >
            <div className="text-left flex items-center gap-8">
               <div className="size-16 rounded-[24px] bg-gold-soft/10 flex items-center justify-center text-gold-soft">
                  <History size={24} />
               </div>
               <div className="space-y-1">
                  <p className="font-body text-[9px] font-black text-gold-soft/30 uppercase tracking-[0.4em]">Logistics Protocol</p>
                  <p className="text-2xl font-display text-gold-soft italic uppercase">Arrival in 3-5 <span className="text-gold-soft">Mastery</span> Days</p>
               </div>
            </div>
            <button className="size-16 rounded-[24px] bg-black/40 border border-gold-soft/10 flex items-center justify-center text-gold-soft/20 hover:text-gold-soft hover:bg-black/60 transition-all">
               <Share2 size={24} />
            </button>
         </motion.div>
      </main>

      <Footer />
    </div>
  );
}
