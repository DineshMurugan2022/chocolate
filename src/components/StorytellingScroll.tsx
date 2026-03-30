import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { createRandom } from '@/utils/random';

const img1 = "https://images.unsplash.com/photo-1548324741-28956903d35a?auto=format&fit=crop&q=80&w=1200";
const img2 = "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&q=80&w=1200";
const img3 = "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=1200";
const img4 = "https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=1200";

export default function StorytellingScroll() {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
   });

   const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

   // Phase Control
   const phase1Opacity = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
   const phase1X = useTransform(smoothProgress, [0, 0.35], [0, 100]);
   const peelProgress = useTransform(smoothProgress, [0, 0.3], ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]);

   const phase2Opacity = useTransform(smoothProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
   const phase2Y = useTransform(smoothProgress, [0.3, 0.5], [100, 0]);

   const phase3Opacity = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
   const phase3X = useTransform(smoothProgress, [0.7, 1], [0, -100]);
   const streamHeight = useTransform(smoothProgress, [0.7, 0.9], ["0%", "100%"]);

   return (
      <div ref={containerRef} className="relative h-[400vh] bg-transparent">

         {/* STICKY CANVAS */}
         <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">

            {/* BACKGROUND STORY LABELS */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.05] z-0">
               <motion.h2
                  style={{ x: useTransform(smoothProgress, [0, 1], [-200, 200]) }}
                  className="text-[25vw] font-display font-black uppercase whitespace-nowrap"
               >
                  The Evolution • The Evolution
               </motion.h2>
            </div>

            {/* STEP 1: THE ORIGIN (IMAGE RIGHT - TEXT LEFT) */}
            <motion.div
               style={{ opacity: phase1Opacity, x: phase1X, zIndex: 30 }}
               className="absolute w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20"
            >
               {/* TEXT LEFT */}
               <div className="flex-1 space-y-8 order-2 md:order-1">
                  <div className="space-y-4">
                     <span className="font-body text-[10px] font-black uppercase tracking-[1em] text-burnt-caramel block border-l-4 border-burnt-caramel pl-6">Heritage_Archive</span>
                     <h3 className="text-6xl md:text-8xl font-display font-black text-cocoa-deep italic leading-none">The<br />Mutation</h3>
                  </div>
                  <p className="max-w-md font-serif text-2xl md:text-3xl italic text-cocoa-deep/60 leading-relaxed border-t border-cocoa-deep/5 pt-10">
                     "Our laboratory extracts the genetic essence of the cocoa bean, hand-selected at the moment of peak molecular maturity."
                  </p>
               </div>

               {/* IMAGE RIGHT */}
               <div className="flex-[1.5] relative w-full aspect-video rounded-[50px] overflow-hidden shadow-[0_80px_160px_rgba(26,15,13,0.3)] order-1 md:order-2">
                  <motion.img
                     src="https://images.unsplash.com/photo-1548324741-28956903d35a?auto=format&fit=crop&q=80&w=1200"
                     style={{ clipPath: peelProgress }}
                     className="absolute inset-0 w-full h-full object-cover z-10"
                     alt="Whole Pod"
                  />
                  <img
                     src="https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&q=80&w=1200"
                     className="absolute inset-0 w-full h-full object-cover z-0"
                     alt="Internal Pod"
                  />
               </div>
            </motion.div>

            {/* STEP 2: KINETIC BEANS (CENTERED) */}
            <motion.div
               style={{ opacity: phase2Opacity, y: phase2Y, zIndex: 20 }}
               className="absolute flex flex-col items-center justify-center gap-24 w-full max-w-7xl px-8"
            >
               {/* Dotted Connection Line */}
               <div className="absolute top-1/2 left-0 w-full h-1 overflow-visible pointer-events-none opacity-20 hidden md:block">
                  <svg width="100%" height="100" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
                     <path d="M0 50 Q 125 0, 250 50 T 500 50 T 750 50 T 1000 50" stroke="#B3530F" strokeWidth="2" strokeDasharray="8 8" />
                  </svg>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full relative z-10">
                  {[
                     { img: img4, title: "GENETIC PROCUREMENT", desc: "Selecting the rarest single-origin phenotypes." },
                     { img: img3, title: "SOLAR DEHYDRATION", desc: "Patient moisture reduction under the equatorial sun." },
                     { img: img2, title: "PRECISION SORTING", desc: "Removing outliers to preserve flavor purity." },
                     { img: img1, title: "KINETIC FERMENTATION", desc: "Controlled heat dynamics for complex aromatics." }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: i * 0.8 }}
                        className={`relative group flex flex-col items-center gap-8 ${i % 2 !== 0 ? 'md:translate-y-24' : 'md:-translate-y-12'}`}
                     >
                        <div className="aspect-[4/5] w-full rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105 border-4 border-white/50">
                           <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/40 to-transparent" />
                        </div>

                        <div className="text-center space-y-3 px-4">
                           <span className="font-body text-[8px] font-black uppercase tracking-[0.4em] text-burnt-caramel">Stage 0{i + 1}</span>
                           <h4 className="text-xl font-display font-black text-cocoa-deep leading-tight whitespace-nowrap">{item.title}</h4>
                           <p className="font-serif italic text-xs text-cocoa-deep/50 max-w-[150px] mx-auto leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
               <h3 className="text-4xl md:text-6xl font-display font-black text-cocoa-deep italic opacity-5 tracking-[0.5em] uppercase pointer-events-none select-none">Process Registry</h3>
            </motion.div>

            {/* STEP 3: SYNTHESIS (IMAGE LEFT - TEXT RIGHT) */}
            <motion.div
               style={{ opacity: phase3Opacity, x: phase3X, zIndex: 40 }}
               className="absolute w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20"
            >
               {/* IMAGE LEFT */}
               <div className="flex-1 relative w-full h-[400px] md:h-[600px] flex flex-col items-center">
                  <div className="relative w-12 h-full bg-ivory-warm/20 rounded-full overflow-hidden border border-white/20">
                     <motion.div style={{ height: streamHeight }} className="w-full bg-burnt-caramel rounded-full shadow-[0_0_60px_rgba(179,153,10,0.5)] overflow-hidden flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-b from-burnt-caramel/20 to-burnt-caramel" />
                     </motion.div>
                  </div>
                  <motion.div
                     style={{ scale: useTransform(smoothProgress, [0.85, 1], [0.5, 1]), opacity: useTransform(smoothProgress, [0.85, 0.95], [0, 1]) }}
                     className="absolute -bottom-20 size-[350px] md:size-[600px] rounded-[60px] md:rounded-[100px] bg-transparent backdrop-blur-3xl shadow-[0_80px_150px_rgba(26,15,13,0.4)] overflow-hidden flex items-center justify-center z-50"
                  >
                     <img src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Final Synthesis Result" />
                  </motion.div>
               </div>

               {/* TEXT RIGHT */}
               <div className="flex-1 space-y-8 text-right">
                  <div className="space-y-4">
                     <span className="font-body text-[10px] font-black uppercase tracking-[1em] text-burnt-caramel block border-r-4 border-burnt-caramel pr-6">Archive_Finish</span>
                     <h3 className="text-6xl md:text-8xl font-display font-black text-cocoa-deep italic leading-none">Total<br />Synthesis</h3>
                  </div>
                  <p className="max-w-md ml-auto font-serif text-2xl md:text-3xl italic text-cocoa-deep/60 leading-relaxed border-t border-cocoa-deep/5 pt-10">
                     "Nibs are precision-ground for 72 hours until absolute molecular silkiness is achieved, crystallizing into your requested heritage artifact."
                  </p>
               </div>
            </motion.div>

            {/* DECORATIVE PARTICLES */}
            <div className="absolute inset-0 pointer-events-none">
               {[...Array(10)].map((_, i) => {
                  const rand = createRandom(700 + i * 19);
                  const left = `${rand() * 100}%`;
                  const top = `${rand() * 100}%`;
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
