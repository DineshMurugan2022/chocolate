import { motion, useScroll, useSpring, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { createRandom } from '@/utils/random';

import img1 from '../assets/product/cocoa-selection.jpg';
import img2 from '../assets/product/cocoa-drying.jpg';
import img3 from '../assets/product/cocoa-sorting.jpg';
import img4 from '../assets/product/cocoa-fermentation.jpg';
import imgStage3 from '../assets/product/stage3.jpeg';
import beanImg from '../assets/cocoa-bean.png';
import podImg from '../assets/cacao-pod.png';
import mintImg from '../assets/mint-leaf.png';

// ── Cycling word ──────────────────────────────────────────────────────────────
const WORDS = ['ORIGIN', 'ALCHEMY', 'RITUAL', 'LEGACY'];

function CyclingWord() {
   const [idx, setIdx] = useState(0);
   useEffect(() => {
      const t = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 1800);
      return () => clearInterval(t);
   }, []);
   return (
      <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom">
         {WORDS.map((w, i) => (
            <motion.span
               key={w}
               className="absolute left-0 font-display font-black italic text-gold-soft"
               initial={{ y: '110%', opacity: 0 }}
               animate={i === idx
                  ? { y: '0%', opacity: 1 }
                  : { y: i === (idx - 1 + WORDS.length) % WORDS.length ? '-110%' : '110%', opacity: 0 }
               }
               transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            >
               {w}
            </motion.span>
         ))}
         <span className="invisible font-display font-black italic">ALCHEMY</span>
      </span>
   );
}

// ── Char-by-char word ─────────────────────────────────────────────────────────
function AnimatedWord({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
   return (
      <span className={`inline-flex overflow-hidden ${className}`}>
         {text.split('').map((ch, i) => (
            <motion.span
               key={i}
               initial={{ y: '105%', opacity: 0, rotateX: -90, rotateY: 15 }}
               whileInView={{ y: '0%', opacity: 1, rotateX: 0, rotateY: 0 }}
               viewport={{ once: true, margin: '0px' }}
               transition={{ 
                  duration: 0.9, 
                  delay: delay + i * 0.05, 
                  ease: [0.215, 0.61, 0.355, 1],
                  opacity: { duration: 0.4, delay: delay + i * 0.05 }
               }}
               style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
            >
               {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
         ))}
      </span>
   );
}

// ── Count-up number ───────────────────────────────────────────────────────────
function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
   const [val, setVal] = useState(0);
   const ref = useRef<HTMLSpanElement>(null);
   const started = useRef(false);
   useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
         if (e.isIntersecting && !started.current) {
            started.current = true;
            const ctrl = animate(0, to, {
               duration,
               ease: 'easeOut',
               onUpdate: v => setVal(Math.round(v)),
            });
            return () => ctrl.stop();
         }
      }, { threshold: 0.5 });
      obs.observe(el);
      return () => obs.disconnect();
   }, [to, duration]);
   return <span ref={ref}>{val}</span>;
}

// ── Marquee ───────────────────────────────────────────────────────────────────
function Marquee({ text, speed = 40 }: { text: string; speed?: number }) {
   const repeated = Array(6).fill(text).join('  •  ');
   return (
      <div className="w-full overflow-hidden select-none">
         <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap font-body text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gold-soft/35"
         >
            {repeated}
         </motion.div>
      </div>
   );
}

// ── Phase Indicator ───────────────────────────────────────────────────────────
function PhaseIndicator({ progress }: { progress: any }) {
   const PHASES = ['ORIGIN', 'MUTATION', 'REGISTRY', 'SYNTHESIS'];
   return (
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 md:gap-10 z-[100] hidden sm:flex pointer-events-none">
         {PHASES.map((p, i) => {
            const start = i * 0.25;
            const end = (i + 1) * 0.25;
            const op = useTransform(progress, [start - 0.1, start, end - 0.05, end], [0.15, 1, 1, 0.15]);
            const scale = useTransform(progress, [start - 0.1, start, end - 0.05, end], [0.8, 1.1, 1.1, 0.8]);
            return (
               <motion.div key={p} style={{ opacity: op, scale }} className="flex items-center gap-3 md:gap-5 group pointer-events-auto">
                  <div className="w-[2px] h-8 md:h-14 bg-gold-soft/10 relative overflow-hidden rounded-full backdrop-blur-sm">
                     <motion.div 
                        style={{ height: useTransform(progress, [start, end], ['0%', '100%']) }} 
                        className="absolute top-0 left-0 w-full bg-gold-soft shadow-[0_0_15px_rgba(212,175,55,0.6)]" 
                     />
                  </div>
                  <span className="font-body text-[7px] md:text-[9px] font-black uppercase tracking-[0.4em] text-ivory-warm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:text-gold-soft transition-colors whitespace-nowrap">
                     {p}
                  </span>
               </motion.div>
            );
         })}
      </div>
   );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function StorytellingScroll() {
   const containerRef = useRef<HTMLDivElement>(null);
   const { width: windowWidth } = useWindowSize();
   const isMobile = windowWidth < 768;

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['start start', 'end end'],
   });

   const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

   // Phase 0: Headline fades out early
   const headlineOpacity = useTransform(smoothProgress, [0, 0.12, 0.20], [1, 1, 0]);
   const headlineY       = useTransform(smoothProgress, [0.10, 0.22], [0, -80]);
   const headlineScale   = useTransform(smoothProgress, [0.10, 0.22], [1, 0.92]);

   // Phase 1 - Responsive X offset
   const phase1Opacity = useTransform(smoothProgress, [0.22, 0.35, 0.45], [0, 1, 0]);
   const phase1X = useTransform(
      smoothProgress, 
      [0.22, 0.45], 
      [isMobile ? -20 : -60, isMobile ? 40 : 120]
   );
   const peelProgress  = useTransform(smoothProgress, [0.22, 0.42], ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)']);

   // Phase 2
   const phase2Opacity = useTransform(smoothProgress, [0.42, 0.52, 0.68, 0.76], [0, 1, 1, 0]);
   const phase2Y       = useTransform(smoothProgress, [0.42, 0.56], [80, 0]);

   // Phase 3
   const phase3Opacity = useTransform(smoothProgress, [0.74, 0.84, 1], [0, 1, 1]);
   const phase3X       = useTransform(smoothProgress, [0.76, 1], [0, -80]);
   const streamHeight  = useTransform(smoothProgress, [0.78, 0.95], ['0%', '100%']);

   // Premium Background Glows
   const bgGlow1 = useTransform(smoothProgress, [0, 0.3, 0.6, 1], ['rgba(179, 83, 15, 0)', 'rgba(179, 83, 15, 0.08)', 'rgba(179, 83, 15, 0.05)', 'rgba(212, 175, 55, 0.1)']);
   const bgGlow2 = useTransform(smoothProgress, [0.4, 0.8, 1], ['rgba(26, 15, 11, 0)', 'rgba(212, 175, 55, 0.03)', 'rgba(179, 83, 15, 0.15)']);
   const spotlightX = useTransform(smoothProgress, [0, 1], ['-10%', '110%']);

   return (
      <div ref={containerRef} className="relative h-[500vh] bg-cocoa-deep overflow-visible">
         <PhaseIndicator progress={smoothProgress} />
         
         <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none pt-16 md:pt-0">
            {/* Dynamic Background Lighting */}
            <motion.div style={{ backgroundColor: bgGlow1 }} className="absolute inset-0 z-0" />
            <motion.div 
               style={{ 
                  background: `radial-gradient(circle at ${spotlightX} 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)`,
               }}
               className="absolute inset-0 z-0" 
            />
            <motion.div style={{ background: `radial-gradient(circle at center, ${bgGlow2}, transparent 70%)` }} className="absolute inset-0 z-0" />

            {/* Ghost watermark */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.04] z-0 overflow-hidden">
               <motion.h2
                  style={{ x: useTransform(smoothProgress, [0, 1], [-100, 100]) }}
                  className="text-[15vw] md:text-[22vw] font-display font-black uppercase whitespace-nowrap text-gold-soft"
               >
                  The Evolution • The Evolution
               </motion.h2>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                PHASE 0 — CINEMATIC HEADLINE (compact)
            ═══════════════════════════════════════════════════════════ */}
            <motion.div
               style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale, zIndex: 50 }}
               className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 gap-0"
            >
               {/* Eyebrow */}
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-3 mb-1"
               >
                  <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: '3rem' }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="h-px bg-burnt-caramel"
                  />
                  <span className="font-body text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-burnt-caramel">
                     The Cocoa Chronicles
                  </span>
                  <motion.div
                     initial={{ width: 0 }}
                     whileInView={{ width: '3rem' }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="h-px bg-burnt-caramel"
                  />
               </motion.div>

               {/* Main headline */}
               <div className="text-center leading-none mb-0.5 w-full">
                  <div className="text-4xl sm:text-6xl md:text-[5.5vw] font-display font-black text-ivory-warm uppercase tracking-[-0.01em] leading-[0.9] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] px-4">
                     <AnimatedWord text="WHERE" delay={0.1} className="block" />
                     <span className="block">
                        <AnimatedWord text="BEAN" delay={0.3} />
                        <span className="inline-block w-2" />
                        <AnimatedWord text="BECOMES" delay={0.5} className="italic text-gold-soft" />
                     </span>
                  </div>

                  {/* Cycling word */}
                  <div className="text-3xl sm:text-5xl md:text-[4.8vw] font-display font-black uppercase tracking-[-0.01em] leading-tight mt-1">
                     <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="text-ivory-warm/25 mr-1.5"
                     >
                        [
                     </motion.span>
                     <CyclingWord />
                     <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="text-ivory-warm/25 ml-1.5"
                     >
                        ]
                     </motion.span>
                  </div>
               </div>

               {/* Self-drawing underline */}
               <motion.svg
                  viewBox="0 0 500 16"
                  className="w-full max-w-lg mb-1 overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <motion.path
                     d="M0 8 Q 125 2, 250 8 T 500 8"
                     fill="none"
                     stroke="#D4AF37"
                     strokeWidth="1"
                     strokeLinecap="round"
                     initial={{ pathLength: 0, opacity: 0 }}
                     whileInView={{ pathLength: 1, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.4, delay: 0.7, ease: 'easeInOut' }}
                  />
               </motion.svg>

               {/* Stats row */}
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.7 }}
                  className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center gap-y-3 sm:gap-y-4 mb-2 px-4 w-full max-w-2xl"
               >
                  {[
                     { num: 161, suffix: ' FRAMES', label: 'Cinematic Sequences' },
                     { num: 4,   suffix: ' ESTATES', label: 'Single-Origin Cocoa' },
                     { num: 72,  suffix: ' HOURS', label: 'Precision Grinding' },
                  ].map(({ num, suffix, label }, idx) => (
                     <div key={label} className={`text-center px-2 sm:px-4 md:px-8 ${idx > 0 ? 'sm:border-l border-gold-soft/15' : ''}`}>
                        <p className="font-display font-black text-xl sm:text-xl md:text-3xl text-gold-soft leading-none">
                           <CountUp to={num} duration={2} />{suffix}
                        </p>
                        <p className="font-body text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-ivory-warm/35 mt-1">{label}</p>
                     </div>
                  ))}
               </motion.div>

               {/* Marquee */}
               <motion.div
                  className="w-full overflow-hidden mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.8 }}
               >
                  <Marquee text="THE EVOLUTION OF CHOCOLATE  •  HARVESTED FROM RARE SINGLE-ORIGIN ESTATES  •  HAND-CURATED FOR THE MODERN CONNOISSEUR" />
               </motion.div>

               {/* Scroll cue */}
               <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               >
                  <span className="font-body text-[7px] font-black uppercase tracking-[0.5em] text-gold-soft/35">Scroll to Explore</span>
                  <svg className="w-3 h-3 text-gold-soft/25" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                     <path d="M8 0v20M2 14l6 6 6-6" />
                  </svg>
               </motion.div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════
                PHASE 1 — THE MUTATION
            ═══════════════════════════════════════════════════════════ */}
             <motion.div
                style={{ opacity: phase1Opacity, x: phase1X, zIndex: 30 }}
                className="absolute w-full max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-20"
             >
                <div className="flex-1 space-y-3 md:space-y-8 order-2 md:order-1 text-center md:text-left">
                   <div className="space-y-2 md:space-y-4 inline-flex flex-col items-center md:items-start">
                      <span className="font-body text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[1em] text-burnt-caramel block border-l-4 border-burnt-caramel pl-4 md:pl-6">Heritage_Archive</span>
                      <h3 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-ivory-warm italic leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">The<br className="hidden md:block" /> Mutation</h3>
                   </div>
                   <p className="max-w-md font-serif text-base sm:text-2xl md:text-3xl italic text-ivory-warm/80 leading-relaxed border-t border-gold-soft/20 pt-4 md:pt-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mx-auto md:mx-0">
                      "Our laboratory extracts the genetic essence of the cocoa bean, hand-selected at the moment of <span className="text-gold-soft drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">peak molecular maturity</span>."
                   </p>
                </div>
                <div className="flex-[1.5] relative w-full aspect-video md:aspect-[16/10] rounded-[24px] md:rounded-[50px] overflow-hidden shadow-[0_30px_60px_rgba(26,15,13,0.4)] order-1 md:order-2">
                   <motion.img src={img3} style={{ clipPath: peelProgress }} className="absolute inset-0 w-full h-full object-cover z-10" alt="Whole Pod" />
                   <img src={img4} className="absolute inset-0 w-full h-full object-cover z-0" alt="Internal Pod" />
                </div>
             </motion.div>

            {/* ═══════════════════════════════════════════════════════════
                PHASE 2 — KINETIC GRID
            ═══════════════════════════════════════════════════════════ */}
            <motion.div
               style={{ opacity: phase2Opacity, y: phase2Y, zIndex: 20 }}
               className="absolute flex flex-col items-center justify-center gap-6 md:gap-24 w-full max-w-7xl px-4 md:px-8"
            >
               <div className="absolute top-1/2 left-0 w-full h-1 overflow-visible pointer-events-none opacity-20 hidden lg:block">
                  <svg width="100%" height="100" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                     <path d="M0 50 Q 125 0, 250 50 T 500 50 T 750 50 T 1000 50" stroke="#B3530F" strokeWidth="2" strokeDasharray="8 8" />
                  </svg>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 w-full relative z-10 overflow-y-auto max-h-[75vh] md:max-h-none py-6 md:py-0 no-scrollbar">
                  {[
                     { img: img4, title: 'GENETIC PROCUREMENT', desc: 'Selecting the rarest single-origin phenotypes.' },
                     { img: img3, title: 'SOLAR DEHYDRATION',   desc: 'Patient moisture reduction under the equatorial sun.' },
                     { img: img2, title: 'PRECISION SORTING',   desc: 'Removing outliers to preserve flavor purity.' },
                     { img: img1, title: 'KINETIC FERMENTATION',desc: 'Controlled heat dynamics for complex aromatics.' },
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: i * 0.8 }}
                        className={`relative group flex flex-col items-center gap-3 md:gap-8 ${i % 2 !== 0 ? 'lg:translate-y-24' : 'lg:-translate-y-12'}`}
                     >
                        <div className="aspect-[4/5] w-28 sm:w-48 md:w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105 border-2 md:border-4 border-white/50">
                           <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/40 to-transparent" />
                        </div>
                        <div className="text-center space-y-1 md:space-y-3 px-2 md:px-4">
                           <span className="font-body text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-burnt-caramel">Stage 0{i + 1}</span>
                           <h4 className="text-xs sm:text-base md:text-xl font-display font-black text-ivory-warm leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2">{item.title}</h4>
                           <p className="font-serif italic text-[9px] md:text-xs text-ivory-warm/60 max-w-[150px] mx-auto leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
               <h3 className="text-xl sm:text-4xl md:text-6xl font-display font-black text-ivory-warm italic opacity-5 tracking-[0.2em] md:tracking-[0.5em] uppercase pointer-events-none select-none">Process Registry</h3>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════
                PHASE 3 — TOTAL SYNTHESIS
            ═══════════════════════════════════════════════════════════ */}
            <motion.div
               style={{ opacity: phase3Opacity, x: phase3X, zIndex: 40 }}
               className="absolute w-full max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20"
            >
               <div className="flex-1 relative w-full h-[250px] sm:h-[400px] md:h-[600px] flex flex-col items-center order-1 md:order-1">
                  <div className="relative w-6 md:w-12 h-full bg-ivory-warm/20 rounded-full overflow-hidden border border-white/20">
                     <motion.div style={{ height: streamHeight }} className="w-full bg-burnt-caramel rounded-full shadow-[0_0_60px_rgba(179,153,10,0.5)] overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-b from-burnt-caramel/20 to-burnt-caramel" />
                     </motion.div>
                  </div>
                  <motion.div
                     style={{ scale: useTransform(smoothProgress, [0.90, 1], [0.5, 1]), opacity: useTransform(smoothProgress, [0.90, 0.97], [0, 1]) }}
                     className="absolute -bottom-6 md:-bottom-20 w-[90vw] md:w-[600px] h-auto aspect-square md:size-[600px] rounded-[32px] md:rounded-[100px] bg-transparent backdrop-blur-3xl shadow-[0_40px_100px_rgba(26,15,13,0.4)] overflow-hidden z-50 border border-white/10"
                  >
                     <img src={imgStage3} className="w-full h-full object-cover" alt="Final Synthesis Result" />
                  </motion.div>
               </div>
               <div className="flex-1 space-y-4 md:space-y-8 text-center md:text-right order-2 md:order-2">
                  <div className="space-y-2 md:space-y-4 inline-flex flex-col items-center md:items-end">
                     <span className="font-body text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[1em] text-burnt-caramel block border-r-4 border-burnt-caramel pr-4 md:pr-6 text-right">Archive_Finish</span>
                     <h3 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-ivory-warm italic leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">Total<br className="hidden md:block" /> Synthesis</h3>
                  </div>
                  <p className="max-w-md mx-auto md:ml-auto md:mr-0 font-serif text-base sm:text-2xl md:text-3xl italic text-ivory-warm/80 leading-relaxed border-t border-gold-soft/20 pt-4 md:pt-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                     "Nibs are precision-ground for 72 hours until <span className="text-gold-soft drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">absolute molecular silkiness</span> is achieved, crystallizing into your requested heritage artifact."
                  </p>
               </div>
            </motion.div>

            {/* Premium Floating Assets (Macro Ingredients) */}
            <motion.img 
               src={beanImg} 
               style={{ 
                  y: useTransform(smoothProgress, [0, 1], [200, -400]),
                  rotate: useTransform(smoothProgress, [0, 1], [0, 180]),
                  rotateX: useTransform(smoothProgress, [0, 1], [0, 45]),
                  opacity: useTransform(smoothProgress, [0.1, 0.3, 0.6, 0.8], [0, 0.4, 0.4, 0]),
                  filter: 'blur(3px)',
                  scale: useTransform(smoothProgress, [0, 1], [0.8, 1.2]),
               }}
               className="absolute left-[2%] top-[15%] w-40 md:w-80 z-10 pointer-events-none hidden sm:block"
            />
            <motion.img 
               src={podImg} 
               style={{ 
                  y: useTransform(smoothProgress, [0, 1], [300, -600]),
                  rotate: useTransform(smoothProgress, [0, 1], [-30, 90]),
                  rotateY: useTransform(smoothProgress, [0, 1], [0, 30]),
                  opacity: useTransform(smoothProgress, [0.3, 0.5, 0.8, 0.95], [0, 0.3, 0.3, 0]),
                  filter: 'blur(6px)',
                  scale: useTransform(smoothProgress, [0, 1], [1, 1.5]),
               }}
               className="absolute right-[5%] top-[25%] w-64 md:w-[500px] z-10 pointer-events-none hidden sm:block"
            />
            <motion.img 
               src={mintImg} 
               style={{ 
                  y: useTransform(smoothProgress, [0, 1], [0, -300]),
                  rotate: useTransform(smoothProgress, [0, 1], [0, 720]),
                  rotateZ: useTransform(smoothProgress, [0, 1], [0, 45]),
                  opacity: useTransform(smoothProgress, [0.6, 0.8, 1], [0, 0.4, 0.4]),
                  filter: 'blur(2px)',
                  scale: useTransform(smoothProgress, [0, 1], [0.7, 1.1]),
               }}
               className="absolute left-[12%] bottom-[10%] w-32 md:w-64 z-10 pointer-events-none hidden sm:block"
            />

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none">
               {[...Array(10)].map((_, i) => {
                  const rand = createRandom(700 + i * 19);
                  const left = `${rand() * 100}%`;
                  const top  = `${rand() * 100}%`;
                  const duration = 5 + rand() * 5;
                  return (
                     <motion.div
                        key={i}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.2, 0] }}
                        transition={{ duration, repeat: Infinity }}
                        className="absolute w-1 h-1 bg-burnt-caramel rounded-full blur-[1px]"
                        style={{ left, top }}
                     />
                  );
               })}
            </div>

         </div>
      </div>
   );
}
