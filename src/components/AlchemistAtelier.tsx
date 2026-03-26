import { motion } from 'framer-motion';
import { Sparkles, FlaskConical, Beaker, Wand2, ArrowUpRight } from 'lucide-react';

const steps = [
  {
    icon: <FlaskConical size={24} />,
    title: "Genetic Selection",
    desc: "Single-origin heirloom beans hand-picked from micro-climates in Southern India and Southeast Asia.",
    tag: "Origin_Batch_A1"
  },
  {
    icon: <Beaker size={24} />,
    title: "Molecular Melange",
    desc: "Slow-stone grinding for 72 hours until the profile reaches absolute silkiness and zero crystallization.",
    tag: "Viscosity_Registry"
  },
  {
    icon: <Wand2 size={24} />,
    title: "Precision Temper",
    desc: "A precise thermal dance at 31.5°C to create the iconic 'snap' and mirror-like crystalline shine.",
    tag: "Thermal_Dynamics"
  }
];

export default function AlchemistAtelier() {
  return (
    <div className="py-32 px-10 relative overflow-hidden bg-white/40 backdrop-blur-3xl rounded-[60px] border border-cocoa-deep/5">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-burnt-caramel/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-12 rounded-[40px] bg-white border border-cocoa-deep/5 hover:shadow-organic hover:-translate-y-4 transition-all duration-700 flex flex-col justify-between h-[550px]"
            >
              {/* Technical Ghost Background */}
              <div className="absolute top-10 right-10 text-[8vw] font-display font-black text-cocoa-deep/[0.02] select-none pointer-events-none italic">
                 0{idx + 1}
              </div>

              <div className="space-y-8 relative z-10">
                 <div className="size-16 rounded-2xl bg-botanical-green/5 flex items-center justify-center text-burnt-caramel border border-burnt-caramel/10 shadow-sm group-hover:bg-burnt-caramel group-hover:text-white transition-all duration-500">
                    {step.icon}
                 </div>
                 
                 <div className="space-y-4">
                    <span className="font-body text-[9px] font-black uppercase tracking-[0.4em] text-cocoa-deep/20">{step.tag}</span>
                    <h3 className="text-4xl font-display font-medium text-cocoa-deep leading-tight italic group-hover:text-burnt-caramel transition-colors">{step.title}</h3>
                 </div>
              </div>

              <div className="space-y-10 relative z-10">
                 <div className="h-[2px] w-12 bg-burnt-caramel/20 group-hover:w-full transition-all duration-1000" />
                 <p className="font-serif text-xl italic text-cocoa-deep/40 leading-relaxed group-hover:text-cocoa-deep transition-colors">
                   {step.desc}
                 </p>
                 
                 <button className="flex items-center gap-4 font-body text-[8px] font-black uppercase tracking-[0.6em] text-burnt-caramel opacity-0 group-hover:opacity-100 transition-all duration-700">
                    Read_Protocol <ArrowUpRight size={14} />
                 </button>
              </div>

              {/* Bottom Decorative Shimmer */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-botanical-green translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
