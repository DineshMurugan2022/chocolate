import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
  const frameCount = 160;
  const frameIndex = useTransform(smoothProgress, [0.1, 0.85], [1, frameCount]); 
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    return frameIndex.onChange((v) => {
      const idx = Math.floor(v);
      if (idx >= 1 && idx <= frameCount) {
        setCurrentFrame(idx);
      }
    });
  }, [frameIndex]);

  const framePath = `/assets/small_chocolate/ezgif-frame-${currentFrame.toString().padStart(3, '0')}.jpg`;

  // DYNAMIC LAYOUT: SLIDE TO RIGHT & LEFT TEXT
  const xCore = useTransform(smoothProgress, [0.3, 0.6], [0, 300]); 
  const textOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
  const textX = useTransform(smoothProgress, [0.35, 0.55], [-100, 0]);

  // DECORATIVE PARALLAX TYPOGRAPHY
  const typoX1 = useTransform(smoothProgress, [0.1, 0.5], [-200, 200]);
  const typoX2 = useTransform(smoothProgress, [0.3, 0.8], [200, -200]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[250vh] md:h-[400vh] w-full bg-transparent overflow-visible"
    >
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 z-[50] pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.05)]" />
      
      {/* Sticky Cinematic Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* BACKGROUND TYPOGRAPHY - SOLID AS REQUESTED */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none overflow-hidden">
           <motion.div style={{ x: typoX1 }} className="whitespace-nowrap flex gap-20 opacity-10">
              <span className="text-[15vw] font-display font-black uppercase text-cocoa-deep">Molecular Mastery • Patiently Harvested • </span>
              <span className="text-[15vw] font-display font-black uppercase text-cocoa-deep">Molecular Mastery • Patiently Harvested</span>
           </motion.div>
           <motion.div style={{ x: typoX2 }} className="whitespace-nowrap flex gap-20 -mt-20 opacity-10">
              <span className="text-[12vw] font-serif italic text-cocoa-deep">The Inheritance • Boutique Identity • </span>
              <span className="text-[12vw] font-serif italic text-cocoa-deep">The Inheritance • Boutique Identity</span>
           </motion.div>
        </div>

        {/* LAYER 1: THE BREAKING BAR */}
        <motion.div 
           style={{ opacity: barOpacity, zIndex: 30 }}
           className="absolute flex items-center justify-center w-full"
        >
           <motion.div style={{ x: leftX }} className="relative">
              <div 
                className="w-[150px] h-[280px] md:w-[320px] md:h-[550px] bg-cover bg-center rounded-l-[40px] md:rounded-[60px] border-r-4 border-white shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                style={{ 
                   backgroundImage: `url("https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000")`, 
                   backgroundPosition: 'left' 
                }}
              />
           </motion.div>

           <motion.div style={{ x: rightX }} className="relative">
              <div 
                className="w-[150px] h-[280px] md:w-[320px] md:h-[550px] bg-cover bg-center rounded-r-[40px] md:rounded-[60px] border-l-4 border-white shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                style={{ 
                   backgroundImage: `url("https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000")`, 
                   backgroundPosition: 'right' 
                }}
              />
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

        {/* LAYER 3: LEFT SIDE STORYTELLING */}
        <motion.div 
           style={{ opacity: textOpacity, x: textX }}
           className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 w-full max-w-[450px] z-[40] flex flex-col gap-10"
        >
           <div className="space-y-6">
              <span className="font-body text-[12px] font-black uppercase text-burnt-caramel tracking-[1em] block border-l-4 border-burnt-caramel pl-6">Heritage_Archive</span>
              <h2 className="text-6xl md:text-8xl font-display font-black text-cocoa-deep italic leading-tight">
                 Molecular<br/>Inheritance
              </h2>
           </div>

           <div className="p-10 bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-2xl space-y-8">
              <p className="font-serif italic text-2xl text-cocoa-deep/70 leading-relaxed">
                 "Our laboratory extracts the genetic essence of the cocoa bean, resulting in a molecular symmetry that redefines the boutique experience."
              </p>
              
              <div className="flex items-center gap-6">
                 <div className="h-[1px] flex-1 bg-burnt-caramel/20" />
                 <span className="font-body text-[10px] font-bold text-burnt-caramel/60 uppercase tracking-widest leading-none">Registry_No_042</span>
                 <div className="h-[1px] flex-1 bg-burnt-caramel/20" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-cocoa-deep opacity-40">Intensity</span>
                    <span className="block text-xl font-display font-black text-cocoa-deep">88.4% Dark</span>
                 </div>
                 <div className="space-y-2">
                    <span className="block text-[8px] font-black uppercase tracking-widest text-cocoa-deep opacity-40">Origin</span>
                    <span className="block text-xl font-display font-black text-cocoa-deep">Madagascar</span>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Cinematic Particles Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[40]">
           {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0, 0.4, 0], y: [-100, 100], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-1 h-1 bg-gold-accent rounded-full blur-[1px]"
                style={{ left: `${10 + i * 12}%`, top: `${Math.random() * 100}%` }}
              />
           ))}
        </div>

      </div>
    </section>
  );
}
