import { } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const img1 = "https://images.unsplash.com/photo-1548324741-28956903d35a?auto=format&fit=crop&q=80&w=1200";
const img2 = "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&q=80&w=1200";
const img3 = "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=1200";
const img4 = "https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=1200";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {


  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-ivory-warm py-40 px-6 lg:px-20">
      
      {/* Background Decorative Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none">
         <h2 className="text-[25vw] font-display font-black text-cocoa-deep/[0.02] tracking-tighter uppercase">Heritage</h2>
      </div>

      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
        
        {/* Left: The Collage Matrix */}
        <div className="relative h-auto flex items-center justify-center py-10">
           <div className="grid grid-cols-2 gap-6 w-full max-w-[500px]">
              {[img1, img2, img3, img4].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`relative aspect-[3/4] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-organic border-4 border-white/50 group ${i % 2 !== 0 ? 'translate-y-12' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`Product ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/20 to-transparent" />
                </motion.div>
              ))}
           </div>

           {/* Layer 3: Text Accent */}
           <div className="absolute -left-10 bottom-1/4 origin-left -rotate-90 z-30 opacity-20">
              <span className="font-body text-[10px] font-black uppercase tracking-[1em] text-burnt-caramel">ESTATE_REFERENCE_09</span>
           </div>
        </div>

        {/* Right: The Narrative Body */}
        <div className="space-y-16">
           <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                 <div className="w-12 h-[1.5px] bg-burnt-caramel/30" />
                 <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-burnt-caramel">Our Identity</span>
              </motion.div>

              <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tight group">
                 Nature’s <br />
                 <span className="italic font-light text-cocoa-deep/30">Inherited</span> <br />
                 <span className="text-botanical-green">Mastery</span>
              </h2>
           </div>

           <div className="space-y-10 pl-12 border-l-2 border-cocoa-deep/5 leading-relaxed">
              <p className="font-serif italic text-2xl md:text-3xl text-cocoa-deep/60 max-w-lg">
                 "We do not create flavor; we respectfully harvest it from the deepest estates of Asia."
              </p>
              <p className="font-body text-sm text-cocoa-deep/40 max-w-md leading-loose uppercase tracking-widest text-[10px] font-bold">
                 From the mist-shrouded valleys of South India to the volcanic soils of the islands, we source only the single-origin beans that define excellence. Our process is one of patient alchemy—slow-churned and hand-pressed for the modern palate.
              </p>
           </div>

           <div className="pt-10">
              <button className="group relative flex items-center gap-10">
                 <div className="size-20 rounded-[30px] bg-botanical-green flex items-center justify-center text-ivory-warm group-hover:bg-burnt-caramel transition-all duration-700 shadow-xl group-hover:scale-110">
                    <span className="font-body font-black text-xs">GO</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="font-body text-[9px] font-black uppercase tracking-[0.4em] text-cocoa-deep/20 mb-1">Manifesto</span>
                    <span className="font-serif text-2xl italic text-cocoa-deep group-hover:text-burnt-caramel transition-colors">The Bean Registry</span>
                 </div>
              </button>
           </div>
        </div>
      </div>

      {/* Side Scroll Element */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 origin-right rotate-90 hidden lg:block">
         <span className="font-body text-[10px] font-bold uppercase tracking-[1em] text-cocoa-deep/5">GENESIS_HARVEST_2024</span>
      </div>
    </section>
  );
}
