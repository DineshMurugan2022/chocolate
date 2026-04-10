import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';

export default function GoldenScrollPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll();
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Create a wavy path that spans the entire page height
  // Memoize the path to prevent re-generation on every render
  const pathData = useMemo(() => {
    const segments = 25;
    const height = 15000;
    const width = 100;
    let d = `M ${width / 2} 0`;
    
    for (let i = 1; i <= segments; i++) {
        const y = (height / segments) * i;
        const x = i % 2 === 0 ? width * 0.7 : width * 0.3;
        const cp1y = y - (height / segments) * 0.5;
        const cp2y = y - (height / segments) * 0.5;
        d += ` C ${width / 2} ${cp1y}, ${x} ${cp2y}, ${width / 2} ${y}`;
    }
    return d;
  }, []);

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-full pointer-events-none z-[5] opacity-60 hidden md:block" style={{ position: 'absolute' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 15000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          ref={pathRef}
          d={pathData || "M0 0"}
          stroke="#D4AF37"
          strokeWidth="3.5"
          strokeDasharray={pathLength}
          style={{ strokeDashoffset: useTransform(pathProgress, [0, 1], [pathLength, 0]) }}
          strokeLinecap="round"
        />
        {/* Deep background shadow for absolute visibility */}
        <path
          d={pathData || "M0 0"}
          stroke="#1A0F0D"
          strokeWidth="1.5"
          opacity="0.8"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Intense Glowing Sparkle on the path tip */}
      <motion.div
        style={{
          top: useTransform(pathProgress, [0, 1], ["0%", "100%"]),
          left: "50%",
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute w-6 h-6 bg-gold-soft rounded-full blur-[2px] shadow-[0_0_20px_#D4AF37,0_0_40px_rgba(212,175,55,0.4)]"
      />
    </div>
  );
}
