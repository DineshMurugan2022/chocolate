import { motion } from 'framer-motion';

export default function ChocolateWave() {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 -translate-y-[95%] pointer-events-none">
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="relative block w-full h-[80px] md:h-[120px]"
      >
        {/* Primary Dark Chocolate Flow */}
        <motion.path
          d="M0,30 C150,30 200,80 400,80 C600,80 650,30 800,30 C950,30 1000,80 1200,80 V120 H0 V30 Z"
          fill="#1A0F0D"
          animate={{
            d: [
              "M0,30 C150,30 200,80 400,80 C600,80 650,30 800,30 C950,30 1000,80 1200,80 V120 H0 V30 Z",
              "M0,30 C150,70 200,40 400,40 C600,40 650,70 800,70 C950,70 1000,40 1200,40 V120 H0 V30 Z",
              "M0,30 C150,30 200,80 400,80 C600,80 650,30 800,30 C950,30 1000,80 1200,80 V120 H0 V30 Z"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Dark Chocolate Drips */}
      <div className="absolute top-[40px] left-[15%] w-2 h-6 bg-[#1A0F0D] rounded-full blur-[0.5px] animate-drip" />
      <div className="absolute top-[50px] left-[45%] w-3 h-8 bg-[#1A0F0D] rounded-full blur-[0.5px] animate-drip-slow" />
      <div className="absolute top-[45px] left-[75%] w-2 h-7 bg-[#1A0F0D] rounded-full blur-[0.5px] animate-drip-delayed" />
    </div>
  );
}
