import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createRandom } from '@/utils/random';
import chocolateGate from '../assets/chocolate-gate.png';

export default function MeltHero() {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
   });

   const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

   // STEP 1: INITIAL BREAK (0% - 25% Scroll) 
   const leftX = useTransform(smoothProgress, [0, 0.25], [0, -900]);
   const rightX = useTransform(smoothProgress, [0, 0.25], [0, 900]);
   const barOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]);

   // STEP 2: FRAME-BY-FRAME CINEMATIC (10% - 85% Scroll) - EARLIER REVEAL
   const frameCount = 161;
   const frameIndex = useTransform(smoothProgress, [0.1, 0.85], [1, frameCount]);
   const [currentFrame, setCurrentFrame] = useState(1);

   useEffect(() => {
      return frameIndex.on("change", (v) => {
         const idx = Math.floor(v);
         if (idx >= 1 && idx <= frameCount) {
            setCurrentFrame(idx);
         }
      });
   }, [frameIndex]);

   const framePath = `/assets/small_chocolate/ezgif-frame-${currentFrame.toString().padStart(3, '0')}.jpg`;

   // DYNAMIC LAYOUT: SLIDE TO RIGHT & LEFT TEXT (Adjusted for mobile)
   const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
   const xCore = useTransform(smoothProgress, [0.3, 0.6], [0, isMobile ? 80 : 400]);
   const textOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
   const textX = useTransform(smoothProgress, [0.35, 0.55], isMobile ? [0, 0] : [-100, 0]);

   return (
      <section
         ref={containerRef}
         className="relative h-[160vh] md:h-[400vh] w-full bg-transparent overflow-visible"
      >
         {/* Cinematic Vignette Overlay */}
         <div className="absolute inset-0 z-[50] pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.05)]" />

         {/* Sticky Cinematic Stage */}
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

            {/* Dynamic Welcome Message */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 2 }}
               style={{ opacity: barOpacity }}
               className="absolute top-[22%] md:top-[18%] z-40 text-center space-y-4"
            >
               <p className="font-body text-[10px] md:text-[14px] font-black uppercase tracking-[1em] text-gold-soft">The Asian Chocolate Store</p>
               <h1 className="text-4xl md:text-7xl font-display italic font-black text-gold-soft">Crafted with Heritage</h1>
               <div className="flex flex-col items-center gap-10 mt-20 opacity-60">
                  <span className="font-body text-[9px] font-black uppercase tracking-[0.5em] text-gold-soft">Scroll to Discover</span>
                  <div className="w-[1px] h-20 bg-gradient-to-b from-gold-soft to-transparent" />
               </div>
            </motion.div>


            {/* LAYER 1: THE BREAKING BAR - Now redesigned as Stunning Heritage Gates */}
            <motion.div
               style={{ opacity: barOpacity, zIndex: 30 }}
               className="absolute flex items-center justify-center w-full"
            >
               <motion.div style={{ x: leftX }} className="relative group/gate">
                  {/* Glass Reflection Overlay */}
                  <div className="absolute inset-0 z-20 opacity-0 group-hover/gate:opacity-30 transition-opacity bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                  <div
                     className="w-[160px] h-[280px] md:w-[380px] md:h-[650px] bg-cover bg-center rounded-l-[40px] md:rounded-[80px] border-r-[6px] border-burnt-caramel/40 shadow-[0_60px_120px_rgba(26,15,13,0.6)] relative overflow-hidden"
                     style={{
                        backgroundImage: `url("${chocolateGate}")`,
                        backgroundPosition: 'left center'
                     }}
                  >
                     {/* Artisan Golden Foil Breaking Edge */}
                     <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-burnt-caramel/60 to-transparent" />
                  </div>
               </motion.div>

               <motion.div style={{ x: rightX }} className="relative group/gate">
                  {/* Glass Reflection Overlay */}
                  <div className="absolute inset-0 z-20 opacity-0 group-hover/gate:opacity-30 transition-opacity bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                  <div
                     className="w-[160px] h-[280px] md:w-[380px] md:h-[650px] bg-cover bg-center rounded-r-[40px] md:rounded-[80px] border-l-[6px] border-burnt-caramel/40 shadow-[0_60px_120px_rgba(26,15,13,0.6)] relative overflow-hidden"
                     style={{
                        backgroundImage: `url("${chocolateGate}")`,
                        backgroundPosition: 'right center'
                     }}
                  >
                     {/* Artisan Golden Foil Breaking Edge */}
                     <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-burnt-caramel/60 to-transparent" />
                  </div>
               </motion.div>
            </motion.div>

            {/* LAYER 2: THE FRAME SEQUENCE (SLIDE TO RIGHT) */}
            <motion.div
               style={{
                  opacity: useTransform(smoothProgress, [0.05, 0.2, 0.85, 0.95], [0, 1, 1, 0]),
                  x: xCore,
                  scale: useTransform(smoothProgress, [0.1, 0.6], [0.7, 1.1]),
                  zIndex: 20
               }}
               className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
               <div className="relative w-full max-w-[850px] aspect-video flex flex-col items-center justify-center">
                  {/* Cinematic Glow Aura */}
                  <div className="absolute inset-0 bg-gold-soft/20 blur-[100px] z-0 pointer-events-none" />

                  <img
                     src={framePath}
                     className="w-full h-full object-contain mix-blend-multiply z-10 drop-shadow-[0_40px_80px_rgba(26,15,13,0.1)]"
                     alt="Cinematic Chocolate Sequence"
                  />
               </div>
            </motion.div>

            {/* LAYER 3: MINIMALIST FLOATING GOLDEN TEXT - REDESIGNED & RESPONSIVE */}
            <motion.div
               style={{ opacity: textOpacity, x: textX }}
               className="absolute left-[5%] md:left-[10%] top-[30%] md:top-[60%] -translate-y-0 md:-translate-y-1/2 w-[90%] md:w-full md:max-w-[750px] z-[40]"
            >
               <div className="space-y-8 md:space-y-16 pt-20 md:pt-0">
                  {/* Floating Minimalist Header */}
                  <div className="flex items-center gap-4 md:gap-10">
                     <div className="h-[1px] w-12 md:w-24 bg-gold-soft/40" />
                     <span className="font-body text-[9px] md:text-[12px] font-black uppercase text-gold-soft tracking-[0.8rem] md:tracking-[1.5rem] opacity-70">Heritage_Archive</span>
                  </div>

                  {/* Ultra-Large Minimalist Typography */}
                  <div className="space-y-4 md:space-y-6">
                     <h2 className="text-4xl md:text-[6.5vw] font-display font-black text-gold-soft leading-[0.85] tracking-tighter italic drop-shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                        Molecular<br />Inheritance
                     </h2>
                     <div className="h-[2px] md:h-[4px] w-16 md:w-32 bg-gold-soft" />
                  </div>

                  {/* Floating Quote - No Background */}
                  <p className="font-serif italic text-lg md:text-4xl text-gold-soft leading-[1.3] font-light max-w-2xl">
                     "Our laboratory extracts the <span className="underline decoration-gold-soft/30 underline-offset-[12px]">genetic essence</span> of the cocoa bean."
                  </p>

                  {/* Minimalist Data Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 pt-10 md:pt-16 border-t border-gold-soft/10">
                     <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3rem] md:tracking-[0.6rem] text-gold-soft/50">Registry_Intensity</span>
                        <div className="flex items-baseline gap-2 md:gap-4">
                           <span className="text-5xl md:text-7xl font-display font-black text-gold-soft leading-none">88.4</span>
                           <span className="text-[8px] md:text-sm font-body text-gold-soft/40 uppercase tracking-[0.2em] md:tracking-[0.3em]">SRI_UNIT</span>
                        </div>
                     </div>

                     <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3rem] md:tracking-[0.6rem] text-gold-soft/50">Estate_Registry</span>
                        <span className="block text-3xl md:text-6xl font-display font-black text-gold-soft italic leading-none">
                           Madagascar
                        </span>
                     </div>
                  </div>

                  {/* Subtle Footer Authentication */}
                  <div className="flex items-center gap-8 pt-10 opacity-30">
                     <span className="font-mono text-[10px] text-gold-soft tracking-widest">AUTH_VERIFIED_2026</span>
                     <div className="h-[1px] flex-1 bg-gold-soft/20" />
                     <span className="font-mono text-[10px] text-gold-soft">ESTATE_NO_42</span>
                  </div>
               </div>
            </motion.div>

            {/* Cinematic Particles Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[40]">
               {[...Array(8)].map((_, i) => {
                  const rand = createRandom(900 + i * 23);
                  const top = `${rand() * 100}%`;
                  return (
                     <motion.div
                        key={i}
                        animate={{ opacity: [0, 0.4, 0], y: [-100, 100], scale: [0.5, 1.2, 0.5] }}
                        transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1 h-1 bg-gold-accent rounded-full blur-[1px]"
                        style={{ left: `${10 + i * 12}%`, top }}
                     />
                  )
               })}
            </div>

         </div>
      </section>
   );
}
