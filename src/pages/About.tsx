import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useRef } from 'react';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import milestoneImg1 from '../assets/product/WhatsApp Image 2026-03-20 at 12.57.15 PM.jpeg';
import milestoneImg2 from '../assets/product/WhatsApp Image 2026-03-20 at 12.57.15 PM(1).jpeg';
import milestoneImg3 from '../assets/product/WhatsApp Image 2026-03-20 at 12.57.15 PM(2).jpeg';
import milestoneImg4 from '../assets/product/WhatsApp Image 2026-03-20 at 12.57.15 PM(3).jpeg';
import inheritanceBg from '../assets/artisan-inheritance-bg.png';

const milestones = [
  {
    year: "2000",
    image: milestoneImg4,
    content: "The Genetic Genesis. Our journey began with the identification of rare cacao phenotypes in the deep estates of South India. We laid the foundation for a brand built on chemical purity and curatorial dedication.",
    tag: "Genetic_ID_00"
  },
  {
    year: "2012",
    image: milestoneImg3,
    content: "The Molecular Shift. We evolved our artisanal methodology, incorporating slow-stone grinding and precise thermal dynamics to reach a level of silkiness previously thought impossible in Asian cacao.",
    tag: "Thermal_Evolution"
  },
  {
    year: "2018",
    image: milestoneImg2,
    content: "Botanical Infusion. Embracing the biodiversity of our surroundings, we began marrying pure cacao with rare floral botanicals and spices, creating a new symphony for the modern palate.",
    tag: "Floral_Synergy"
  },
  {
    year: "2024",
    image: milestoneImg1,
    content: "The Inheritance Registry. Today, we exist as a boutique matrix for connoisseurs—focused on responsible harvesting, patient alchemy, and the preservation of heirloom flavor profiles.",
    tag: "Registry_Current"
  }
];

export default function About() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep relative overflow-hidden">

      {/* Background Grid Motif: Removed patterns for minimalistic style */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#1A0F0D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <Header setIsCartOpen={() => { }} />

      {/* Hero: The Heritage Matrix */}
      <section className="pt-48 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20 items-end relative z-10">
          <div className="space-y-12">
            <div className="flex items-center gap-6">
               <Logo className="w-40 h-auto opacity-40 hover:opacity-100 transition-opacity" variant="light" />
               <div className="h-[1px] w-20 bg-gold-soft/10" />
               <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-gold-soft/30">Heritage_Registry_v2</span>
            </div>
            <h1 className="text-5xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter text-gold-soft">
               Asian <br /> <span className="italic font-light text-gold-soft/20 pr-4">Heritage</span> <span className="text-gold-soft">Odyssey</span>
            </h1>
          </div>

          <div className="pb-4 space-y-10 border-l border-cocoa-deep/5 pl-12">
            <p className="font-serif italic text-2xl md:text-3xl text-gold-soft/50 leading-relaxed max-w-sm">
              "We do not create flavor; we respectfully harvest it from the molecular depths of our Asian estates."
            </p>
            <div className="flex flex-wrap gap-10">
               <div className="flex items-center gap-4 opacity-30 group cursor-help">
                  <ShieldCheck size={16} className="text-botanical-green" />
                  <span className="font-body text-[8px] font-black uppercase tracking-[0.4em]">Genetic_Integrity</span>
               </div>
               <div className="flex items-center gap-4 opacity-30 group cursor-help">
                  <Globe size={16} className="text-burnt-caramel" />
                  <span className="font-body text-[8px] font-black uppercase tracking-[0.4em]">Asian_Estate_HQ</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Timeline Registry */}
      <main ref={containerRef} className="max-w-[1400px] mx-auto px-6 lg:px-20 py-40 space-y-80 relative z-10">
        {milestones.map((ms, index) => (
          <div
            key={ms.year}
            className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20 lg:gap-40 group relative`}
          >
            {/* The Vertical Registry Line */}
            <div className={`hidden lg:block absolute top-0 ${index % 2 !== 0 ? 'right-1/2' : 'left-1/2'} w-[1px] h-[150%] bg-cocoa-deep/[0.05] z-0 -translate-y-1/2`} />

            {/* The Artifact Viewer (Image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ 
                y: [0, -15, 0],
                transition: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[32%] relative z-10"
            >
              {/* Year Label: Heritage Floating */}
               <div className={`absolute -top-12 ${index % 2 !== 0 ? '-right-12' : '-left-12'} z-20`}>
                 <div className="size-40 rounded-full bg-black/60 backdrop-blur-xl border border-gold-soft/10 shadow-2xl flex flex-col items-center justify-center group-hover:bg-gold-soft group-hover:text-black transition-all duration-700 overflow-hidden relative">
                   <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                   <span className="font-body text-[9px] font-black uppercase tracking-[0.5em] mb-2 opacity-30 text-gold-soft">BATCH</span>
                   <span className="text-5xl font-display font-black text-gold-soft">{ms.year}</span>
                </div>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[100px] shadow-3xl bg-white p-4 border border-cocoa-deep/[0.03]">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }} />
                <div className="w-full h-full overflow-hidden rounded-[80px]">
                   <motion.img
                     src={ms.image}
                     alt={ms.year}
                     whileHover={{ scale: 1.15, rotate: 2, filter: "grayscale(0%) brightness(110%)" }}
                     transition={{ duration: 0.6 }}
                     className="w-full h-full object-cover grayscale brightness-95 transition-all duration-1000 scale-105"
                   />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cocoa-deep/10 to-transparent" />
              </div>

              {/* Technical Indicator */}
              <div className="absolute right-[-3rem] top-1/2 -translate-y-1/2 w-20 flex flex-col items-center gap-6 opacity-10">
                <div className="w-[1px] h-40 bg-cocoa-deep" />
                <Zap size={14} className="text-burnt-caramel" />
                <div className="w-[1px] h-40 bg-cocoa-deep" />
              </div>
            </motion.div>

            {/* The Curatorial Narrative (Text) */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full lg:w-1/2 space-y-14 relative z-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-[2px] w-12 bg-burnt-caramel" />
                  <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-burnt-caramel/40">{ms.tag}</span>
                </div>
                 <h2 className="text-4xl md:text-7xl font-display font-black text-gold-soft leading-[0.9] tracking-tight">
                   <span className="font-light italic text-gold-soft/30 pr-4 block overflow-hidden">Registry.Entry</span>
                   Phase <span className="text-gold-soft">{ms.year}</span>
                 </h2>
              </div>

              <div className="space-y-12">
                <p className="font-serif italic text-2xl md:text-3xl text-gold-soft/70 leading-relaxed border-l-4 border-gold-soft/10 pl-10">
                   {ms.content}
                </p>
                
                <div className="flex items-center gap-8">
                   <button className="h-16 px-10 bg-black/40 border border-gold-soft/10 rounded-2xl flex items-center gap-6 shadow-xl hover:bg-gold-soft hover:text-black transition-all transform active:scale-95 group/btn text-gold-soft">
                     <span className="font-body text-[10px] font-black uppercase tracking-[0.4em]">Access_Study</span>
                     <ArrowRight size={16} className="group-hover/btn:translate-x-3 transition-transform" />
                   </button>
                   <span className="font-body text-[8px] font-black uppercase tracking-[0.4em] text-gold-soft/20">PROTOCOL_SECURED</span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </main>

      {/* Final Inheritance Call */}
      <section className="px-6 lg:px-20 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[30px] md:rounded-[40px] p-8 md:p-12 text-ivory-warm relative overflow-hidden shadow-2xl group border border-burnt-caramel/20 bg-cocoa-deep"
          style={{ 
            backgroundImage: `url(${inheritanceBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/80 z-0" />

          {/* Texture Background Removed */}
          <div className="absolute inset-0 z-0 opacity-0 pointer-events-none" />
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-0 opacity-5 flex items-center justify-center pointer-events-none"
          >
            <h3 className="text-[40vw] font-display font-black text-white italic tracking-tighter">HERITAGE</h3>
          </motion.div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <Logo className="w-40 h-auto opacity-90" variant="light" />
              <div className="h-[1px] w-12 bg-burnt-caramel" />
              <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight leading-tight">
                <span className="italic font-light text-ivory-warm/30 block text-xs md:text-sm mb-1">Continue the</span>
                Artisan <span className="text-burnt-caramel">Inheritance.</span>
              </h2>
            </div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-6">
              <p className="text-sm md:text-base font-serif italic max-w-sm text-ivory-warm/30 leading-relaxed">
                Every creation is a dialogue between tradition and imagination. We invite you to experience the next chapter.
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="h-14 px-10 md:px-12 bg-ivory-warm text-cocoa-deep rounded-[16px] font-body font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] hover:bg-burnt-caramel hover:text-white transition-all shadow-xl transform active:scale-95 flex items-center justify-center gap-4 md:gap-6 group"
              >
                Start_Observation <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
