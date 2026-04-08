import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';

interface CollectionCardProps {
  title: string;
  image: string;
  description?: string;
  onClick: () => void;
  shape?: "portrait" | "landscape" | "circle";
  isLogo?: boolean;
}

export default function CollectionCard({ title, image, description, onClick, shape = "portrait", isLogo = false }: CollectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const shapeClasses = {
    portrait: "aspect-[4/5] rounded-[2.5rem]",
    landscape: "aspect-video rounded-[3rem]",
    circle: "aspect-square rounded-full"
  };

  // Filigree Corner Component
  const Filigree = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`absolute size-16 md:size-24 pointer-events-none opacity-0 group-hover:opacity-60 transition-all duration-1000 fill-gold-soft ${className}`}>
      <path d="M10,10 Q30,10 30,30 T50,50 Q10,50 10,10 Z M0,0 L10,0 Q10,10 0,10 Z" />
      <path d="M20,10 C20,10 40,20 40,40 C40,60 20,70 10,70" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );

  return (
    <div className="perspective-2000">
      <motion.div 
        className={`group relative cursor-pointer overflow-hidden backdrop-blur-3xl transition-all duration-700 ${isLogo ? 'bg-white/[0.02] border border-white/10 hover:border-gold-soft/30' : 'bg-black border border-gold-soft/20'} shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] ${shapeClasses[shape]}`}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Spotlight */}
        <motion.div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [x, y],
              ([latestX, latestY]) => `radial-gradient(circle at calc(50% + ${latestX}px) calc(50% + ${latestY}px), rgba(212,175,55,0.1) 0%, transparent 60%)`
            )
          }}
        />

        {/* Gold Filigree Corners */}
        {isLogo && (
          <>
            <Filigree className="top-4 left-4" />
            <Filigree className="top-4 right-4 rotate-90" />
            <Filigree className="bottom-4 left-4 -rotate-90" />
            <Filigree className="bottom-4 right-4 rotate-180" />
          </>
        )}

        {/* Inner Gold Frame */}
        <div className="absolute inset-4 border border-gold-soft/5 rounded-[2rem] pointer-events-none group-hover:border-gold-soft/20 transition-colors duration-700" />

        {/* Background Element / Logo */}
        <motion.div 
          className={`absolute inset-0 transition-transform duration-1000 group-hover:scale-110 ${isLogo ? 'bg-contain bg-no-repeat bg-center m-4 md:m-6' : 'bg-cover bg-center opacity-60 group-hover:opacity-100'}`}
          style={{ 
            backgroundImage: `url("${image}")`,
            transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)'
          }}
        />
        
        {/* Cinematic Glint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />

        {/* Content Overlays */}
        {!isLogo && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-700" />
        )}

        {isLogo && (
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}
        
        {/* Textual Plaque */}
        <div 
          className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end"
          style={{ transform: isHovered ? 'translateZ(80px)' : 'translateZ(0px)' }}
        >
          <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <h3 className={`text-2xl md:text-4xl font-display font-black text-white italic tracking-tight drop-shadow-2xl ${isLogo ? 'opacity-0 group-hover:opacity-100' : ''}`}>
              {title}
            </h3>
            {description && (
              <p className="font-body text-[10px] uppercase font-black tracking-[0.5em] text-gold-soft mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                {description}
              </p>
            )}
            <div className={`h-[1px] bg-gradient-to-r from-transparent via-gold-soft to-transparent mt-8 transition-all duration-1000 ease-out ${isLogo ? 'w-0 group-hover:w-full' : 'w-16 group-hover:w-full'}`} />
          </div>
        </div>

        {/* Reflection Highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
