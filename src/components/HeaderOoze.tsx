import { motion } from 'framer-motion';

export default function HeaderOoze() {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-[-1]">
      <svg 
        viewBox="0 0 1200 100" 
        preserveAspectRatio="none" 
        className="w-full h-[90px] md:h-[120px]"
      >
        <defs>
          <linearGradient id="solid-choco-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A0F0D" />
            <stop offset="90%" stopColor="#1A0F0D" />
            <stop offset="100%" stopColor="#0C0706" />
          </linearGradient>
          <linearGradient id="surface-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Thick Dark Chocolate Body - More Compact Drips */}
        <motion.path
          d="M0,0 H1200 V70 C1000,95 900,65 800,80 C700,95 600,60 400,85 C200,95 100,65 0,80 V0 Z"
          fill="url(#solid-choco-gradient)"
          animate={{
            d: [
              "M0,0 H1200 V70 C1000,95 900,65 800,80 C700,95 600,60 400,85 C200,95 100,65 0,80 V0 Z",
              "M0,0 H1200 V80 C1000,80 900,95 800,85 C700,80 600,85 400,80 C200,85 100,95 0,70 V0 Z",
              "M0,0 H1200 V70 C1000,95 900,65 800,80 C700,95 600,60 400,85 C200,95 100,65 0,80 V0 Z"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glossy Edge Highlight - Tighter Rim */}
        <motion.path
          d="M0,68 C100,92 200,98 400,84 C600,88 700,92 800,74 C900,78 1000,92 1200,68"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{
             d: [
              "M0,68 C100,92 200,98 400,84 C600,88 700,92 800,74 C900,78 1000,92 1200,68",
              "M0,78 C100,78 200,92 400,78 C600,85 700,78 800,85 C900,92 1000,92 1200,62",
              "M0,68 C100,92 200,98 400,84 C600,88 700,92 800,74 C900,78 1000,92 1200,68"
             ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <rect width="1200" height="50" fill="url(#surface-shine)" />
      </svg>
    </div>
  );
}
