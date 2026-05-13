import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Logo from './Logo';

interface ChocolateDripTransitionProps {
  isVisible: boolean;
}

const ChocolateDripTransition: React.FC<ChocolateDripTransitionProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed inset-0 z-[1000] bg-[#1A0F0D] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Animated Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
          
          {/* Animated Glow in the background */}
          <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute size-[600px] bg-gold-soft rounded-full blur-[150px] pointer-events-none"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo with a special transition variant */}
            <div className="mb-12">
                <Logo variant="gold" showText={false} className="scale-[2] md:scale-[3]" />
            </div>

            <div className="flex flex-col items-center space-y-6">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <div className="h-[1px] w-8 bg-gold-soft/30" />
                    <span className="font-body text-[10px] text-gold-soft/60 font-black uppercase tracking-[1rem] pl-[1rem]">Estate Registry</span>
                    <div className="h-[1px] w-8 bg-gold-soft/30" />
                </motion.div>

                <div className="relative w-64 md:w-96 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-soft to-transparent"
                    />
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 text-[9px] font-mono text-gold-soft/20 uppercase tracking-widest"
                >
                    <span>Transmitting</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >_</motion.span>
                    <span>Molecular_Inheritance</span>
                </motion.div>
            </div>
          </motion.div>

          {/* Luxury Border Animation */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent origin-center"
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent origin-center"
          />

          {/* Curtain Exit Panels */}
          <AnimatePresence>
            {!isVisible && (
              <>
                <motion.div 
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[1100] bg-[#1A0F0D]"
                />
                <motion.div 
                    initial={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[1100] bg-[#1A0F0D]"
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChocolateDripTransition;
