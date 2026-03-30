import { motion } from 'framer-motion';
import { createRandom } from '@/utils/random';

interface LiquidDripDividerProps {
  color?: string;
  className?: string;
  flipped?: boolean;
}

export default function LiquidDripDivider({ 
  color = "#F5F2ED", // ivory-warm
  className = "", 
  flipped = false 
}: LiquidDripDividerProps) {
  return (
    <div className={`relative w-full h-40 md:h-64 overflow-hidden pointer-events-none ${className} ${flipped ? 'rotate-180 mb-[-1px]' : 'mt-[-1px]'}`}>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-full fill-current"
        style={{ color }}
      >
        <motion.path
          initial={{ d: "M0,96L80,128C160,160,320,224,480,213.3C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" }}
          animate={{
            d: [
              "M0,96L80,128C160,160,320,224,480,213.3C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z",
              "M0,64L80,96C160,128,320,192,480,186.7C640,181,800,107,960,85.3C1120,64,1280,96,1360,112L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z",
              "M0,96L80,128C160,160,320,224,480,213.3C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Botanical Spores instead of drips */}
        {[...Array(6)].map((_, i) => {
           const rand = createRandom(500 + i * 31);
           const radius = 2 + rand() * 3;
           const duration = 8 + rand() * 5;
           return (
           <motion.circle
             key={i}
             cx={200 + (i * 240)}
             cy={150 + (i * 20)}
             r={radius}
             className="fill-botanical-green/10"
             animate={{ 
               y: [0, -40, 0],
               opacity: [0, 1, 0],
               x: [0, 20, 0]
             }}
             transition={{ 
               duration, 
               repeat: Infinity, 
               delay: i * 1.5,
               ease: "easeInOut"
             }}
           />
        )})}
      </svg>
      
      {/* Luxury Registry Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-burnt-caramel/20 to-transparent" />
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-5">
         <span className="font-body text-[8px] font-black uppercase tracking-[1em] text-cocoa-deep">Registry Protocol</span>
      </div>
    </div>
  );
}
