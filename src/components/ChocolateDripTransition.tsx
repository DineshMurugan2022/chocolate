import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ChocolateDripTransitionProps {
  isVisible: boolean;
}

const ChocolateDripTransition: React.FC<ChocolateDripTransitionProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[1000] bg-ivory-warm flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Botanical Mist background decoration */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300vw] h-[300vw] text-[60vw] font-display font-black text-cocoa-deep/[0.015] select-none pointer-events-none italic whitespace-nowrap"
          >
            ESTATE_REGISTRY_HERITAGE_ATELIER_BOTANICAL_BOUTIQUE_ESTATE
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-botanical-green/5 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 text-center flex flex-col items-center gap-12"
          >
            <div className="flex items-center gap-6">
                <Sparkles size={20} className="text-burnt-caramel/40" />
                <span className="font-body text-[10px] text-cocoa-deep/20 font-black uppercase tracking-[0.8em]">Inducting_Heritage</span>
                <Sparkles size={20} className="text-burnt-caramel/40" />
            </div>

            <div className="space-y-4">
              <h1 className="text-cocoa-deep text-8xl md:text-[14rem] font-display font-black tracking-[-0.04em] leading-[0.8] italic select-none">
                Boutique<span className="text-botanical-green">.</span>
              </h1>
              <div className="flex items-center justify-center gap-4 py-6 border-y border-cocoa-deep/5 mt-8">
                 <span className="font-body text-[9px] font-black text-cocoa-deep/40 uppercase tracking-[0.6em]">ESTATE_42/B_REGISTRY</span>
                 <div className="size-2 rounded-full bg-burnt-caramel animate-pulse" />
                 <span className="font-body text-[9px] font-black text-cocoa-deep/40 uppercase tracking-[0.6em]">MARINA_WAY_CHENNAI</span>
              </div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 400 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              className="h-[2px] bg-cocoa-deep/5 relative"
            >
               <motion.div 
                 animate={{ left: ['0%', '100%', '0%'] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-0 w-20 h-full bg-botanical-green/40 shadow-[0_0_20px_rgba(56,94,68,0.3)]"
               />
            </motion.div>
          </motion.div>

          {/* Luxury Corner Decals */}
          <div className="absolute top-20 left-20 border-l border-t border-cocoa-deep/10 w-20 h-20 opacity-40 rounded-tl-[40px]" />
          <div className="absolute bottom-20 right-20 border-r border-b border-cocoa-deep/10 w-20 h-20 opacity-40 rounded-br-[40px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChocolateDripTransition;
