import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useRef } from 'react';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

const milestones = [
  {
    year: "2000",
    image: "/assets/story/st_3.jpeg",
    content: "The Genetic Genesis. Our journey began with the identification of rare cacao phenotypes in the deep estates of South India. We laid the foundation for a brand built on chemical purity and curatorial dedication.",
    tag: "Genetic_ID_00"
  },
  {
    year: "2012",
    image: "/assets/story/st_2.jpeg",
    content: "The Molecular Shift. We evolved our artisanal methodology, incorporating slow-stone grinding and precise thermal dynamics to reach a level of silkiness previously thought impossible in Asian cacao.",
    tag: "Thermal_Evolution"
  },
  {
    year: "2018",
    image: "/assets/story/st_1.jpeg",
    content: "Botanical Infusion. Embracing the biodiversity of our surroundings, we began marrying pure cacao with rare floral botanicals and spices, creating a new symphony for the modern palate.",
    tag: "Floral_Synergy"
  },
  {
    year: "2024",
    image: "/assets/story/st_0.jpeg",
    content: "The Inheritance Registry. Today, we exist as a boutique matrix for connoisseurs—focused on responsible harvesting, patient alchemy, and the preservation of heirloom flavor profiles.",
    tag: "Registry_Current"
  }
];

export default function About() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-cocoa-deep selection:bg-burnt-caramel selection:text-white relative overflow-hidden">

      {/* Background Grid Motif: The Heritage Fabric */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#1A0F0D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.1]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={() => { }} />

      {/* Hero: The Heritage Matrix */}
      <section className="pt-48 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20 items-end relative z-10">
          <div className="space-y-12">
            <div className="flex items-center gap-6">
              <Logo className="w-40 h-auto opacity-40 hover:opacity-100 transition-opacity" variant="dark" />
              <div className="h-[1px] w-20 bg-cocoa-deep/10" />
              <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-cocoa-deep/30">Heritage_Registry_v2</span>
            </div>
            <h1 className="text-5xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter">
              Asian <br /> <span className="italic font-light text-cocoa-deep/20 pr-4">Heritage</span> <span className="text-burnt-caramel">Odyssey</span>
            </h1>
          </div>

          <div className="pb-4 space-y-10 border-l border-cocoa-deep/5 pl-12">
            <p className="font-serif italic text-2xl md:text-3xl text-cocoa-deep/50 leading-relaxed max-w-sm">
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
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[45%] relative z-10"
            >
              {/* Year Label: Heritage Floating */}
              <div className={`absolute -top-12 ${index % 2 !== 0 ? '-right-12' : '-left-12'} z-20`}>
                <div className="size-40 rounded-full bg-ivory-warm border border-cocoa-deep/5 shadow-2xl flex flex-col items-center justify-center group-hover:bg-burnt-caramel group-hover:text-white transition-all duration-700 overflow-hidden relative">
                   <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                   <span className="font-body text-[9px] font-black uppercase tracking-[0.5em] mb-2 opacity-30">BATCH</span>
                   <span className="text-5xl font-display font-black">{ms.year}</span>
                </div>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[100px] shadow-3xl bg-white p-4 border border-cocoa-deep/[0.03]">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }} />
                <div className="w-full h-full overflow-hidden rounded-[80px]">
                   <img
                     src={ms.image}
                     alt={ms.year}
                     className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-1000 scale-105 group-hover:scale-100"
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
                <h2 className="text-4xl md:text-7xl font-display font-black text-cocoa-deep leading-[0.9] tracking-tight">
                  <span className="font-light italic text-cocoa-deep/30 pr-4 block overflow-hidden">Registry.Entry</span>
                  Phase <span className="text-botanical-green">{ms.year}</span>
                </h2>
              </div>

              <div className="space-y-12">
                <p className="font-serif italic text-2xl md:text-3xl text-cocoa-deep/70 leading-relaxed border-l-4 border-burnt-caramel/10 pl-10">
                   {ms.content}
                </p>
                
                <div className="flex items-center gap-8">
                   <button className="h-16 px-10 bg-white border border-cocoa-deep/5 rounded-2xl flex items-center gap-6 shadow-xl hover:bg-burnt-caramel hover:text-white transition-all transform active:scale-95 group/btn">
                     <span className="font-body text-[10px] font-black uppercase tracking-[0.4em]">Access_Study</span>
                     <ArrowRight size={16} className="group-hover/btn:translate-x-3 transition-transform" />
                   </button>
                   <span className="font-body text-[8px] font-black uppercase tracking-[0.4em] text-cocoa-deep/10">PROTOCOL_SECURED</span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </main>

      {/* Final Inheritance Call */}
      <section className="px-6 lg:px-20 pb-60">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-cocoa-deep rounded-[120px] p-20 md:p-32 text-center text-ivory-warm relative overflow-hidden shadow-3xl group border-4 border-burnt-caramel/10"
        >
          {/* Subtle Rotating Texture Background */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }} />
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-0 opacity-5 flex items-center justify-center pointer-events-none"
          >
            <h3 className="text-[40vw] font-display font-black text-white italic tracking-tighter">HERITAGE</h3>
          </motion.div>

          <div className="relative z-10 space-y-16">
            <div className="flex flex-col items-center gap-10">
              <Logo className="w-64 h-auto opacity-100" variant="light" />
              <div className="h-[2px] w-24 bg-burnt-caramel" />
              <h2 className="text-5xl md:text-[9vw] font-display font-black tracking-tighter max-w-5xl mx-auto leading-[0.85]">
                <span className="italic font-light text-ivory-warm/30 block mb-6">Continue the</span>
                Artisan <br /> <span className="text-burnt-caramel">Inheritance.</span>
              </h2>
            </div>

            <p className="text-xl md:text-3xl font-serif italic max-w-3xl mx-auto text-ivory-warm/40 leading-relaxed">
              Every creation is a dialogue between tradition and imagination. We invite you to experience the next chapter of our botanical odyssey.
            </p>

            <button
              onClick={() => navigate('/shop')}
              className="h-24 px-20 bg-ivory-warm text-cocoa-deep rounded-[32px] font-body font-black text-[11px] uppercase tracking-[0.6em] hover:bg-burnt-caramel hover:text-white transition-all shadow-3xl transform active:scale-95 flex items-center justify-center gap-8 mx-auto group"
            >
              Finalize_Observation <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
