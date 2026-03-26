import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef } from 'react';

export default function HeroV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -150]);
  const rotateIngredient = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-ivory-warm pt-32 pb-20 px-6 lg:px-20"
    >
      {/* Dynamic Organic Background Shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-burnt-caramel/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left: Botanical Typography */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="flex items-center gap-6 px-4 py-2 bg-botanical-green/5 border border-botanical-green/10 rounded-full"
           >
              <span className="w-2 h-2 rounded-full bg-burnt-caramel animate-pulse" />
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-botanical-green/60">Estate Registry: Sree Dev, Chennai</span>
           </motion.div>

           <h1 className="text-6xl md:text-8xl lg:text-[110px] font-display font-black leading-[0.85] tracking-tight text-cocoa-deep">
             <span className="block italic font-light text-burnt-caramel mb-4">Crafted from</span>
             <span className="block -mt-4">Nature's</span>
             <span className="block text-botanical-green">Mastery</span>
           </h1>

           <p className="max-w-md font-serif text-xl md:text-2xl italic text-cocoa-deep/50 leading-relaxed pl-6 border-l-2 border-burnt-caramel">
              Symphony of organic cocoa, precision-crafted in the Sree Dev Estates of Chennai by DN Food & Craft Innovative.
           </p>

           <div className="flex flex-col sm:flex-row items-center gap-8 pt-8">
              <button 
                className="group relative h-[72px] px-12 bg-botanical-green text-ivory-warm rounded-2xl font-body font-bold uppercase tracking-widest text-xs flex items-center justify-center overflow-hidden transition-all hover:translate-y-[-5px]"
              >
                 <span className="relative z-10">Begin the Journey</span>
                 <div className="absolute inset-x-0 bottom-0 h-0 bg-burnt-caramel group-hover:h-full transition-all duration-500 opacity-20" />
              </button>
              
              <button className="flex items-center gap-5 group py-4">
                 <div className="size-12 rounded-2xl bg-ivory-warm border border-cocoa-deep/10 flex items-center justify-center text-burnt-caramel group-hover:bg-burnt-caramel group-hover:text-white transition-all shadow-lg group-hover:shadow-burnt-caramel/20">
                    <Play size={18} fill="currentColor" />
                 </div>
                 <span className="font-body font-bold uppercase text-[10px] tracking-widest text-cocoa-deep/40 group-hover:text-cocoa-deep transition-colors">The Bean Story</span>
              </button>
           </div>
        </div>

        {/* Right: The High-End Organic Mask Collage */}
        <div className="relative flex items-center justify-center h-full min-h-[600px]">
           {/* Main Organic Mask Frame */}
           <motion.div 
             style={{ y: y1 }}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden organic-shape shadow-[0_45px_100px_rgba(26,15,13,0.15)] z-20 group"
           >
              <img 
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop" 
                alt="Luxury Chocolate"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/40 to-transparent" />
           </motion.div>

           {/* Floating Organic Accents */}
           <motion.div 
             style={{ y: y2, rotate: rotateIngredient }}
             className="absolute top-10 -right-10 w-40 h-40 animate-gentle z-30"
           >
              <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-contain drop-shadow-2xl rounded-3xl" alt="" />
           </motion.div>

           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute -bottom-20 -left-10 w-72 h-72 bg-botanical-green/5 rounded-full blur-[80px]"
           />
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 origin-left -rotate-90 hidden lg:block">
         <span className="font-body text-[10px] font-bold uppercase tracking-[0.8em] text-cocoa-deep/10">DN_FOOD_CRAFT_INNOVATIVE</span>
      </div>
    </section>
  );
}
