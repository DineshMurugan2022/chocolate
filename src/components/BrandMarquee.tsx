import { motion } from 'framer-motion';
import { BRANDS } from '@/data/brands';

interface BrandMarqueeProps {
  onBrandClick: (brand: string) => void;
}

export default function BrandMarquee({ onBrandClick }: BrandMarqueeProps) {
  // Split brands into two rows for variety
  const row1 = BRANDS.slice(0, 10);
  const row2 = BRANDS.slice(10, 20);

  // Duplicate items for seamless scrolling
  const marqueeData1 = [...row1, ...row1, ...row1, ...row1];
  const marqueeData2 = [...row2, ...row2, ...row2, ...row2];

  const BrandPlaque = ({ brand }: { brand: typeof BRANDS[0] }) => (
    <motion.div
      onClick={() => onBrandClick(brand.title)}
      className="group relative flex-shrink-0 w-48 md:w-64 aspect-[3/2] mx-4 md:mx-8 rounded-2xl md:rounded-3xl cursor-pointer overflow-hidden backdrop-blur-md bg-white/[0.03] border border-white/10 hover:border-gold-soft/40 transition-all duration-700 shadow-2xl"
      whileHover={{ y: -10, scale: 1.05 }}
    >
      {/* Cinematic Glint */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out" />
      
      {/* Background Logo */}
      <div 
        className="absolute inset-x-8 inset-y-6 md:inset-x-12 md:inset-y-8 bg-contain bg-no-repeat bg-center opacity-40 group-hover:opacity-100 transition-opacity duration-700"
        style={{ backgroundImage: `url("${brand.image}")` }}
      />

      {/* Gold Border Glow */}
      <div className="absolute inset-0 border border-gold-soft/0 group-hover:border-gold-soft/20 transition-all duration-700" />
      
      {/* Bottom Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 background-gradient-to-t from-cocoa-deep/80 to-transparent">
        <h4 className="text-white font-display italic text-sm md:text-lg font-bold truncate">{brand.shortName}</h4>
        <p className="text-gold-soft text-[8px] md:text-[10px] uppercase tracking-widest font-black truncate">{brand.description}</p>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-24 overflow-hidden bg-transparent perspective-2000">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-radial-gradient from-gold-soft/5 to-transparent pointer-events-none opacity-30" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-4 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1 }}
          className="font-body text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-gold-soft block"
        >
          The Artisan Guild
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl font-display italic font-black text-white"
        >
          Global Partnerships
        </motion.h2>
      </div>

      {/* Marquee Container with Slant */}
      <div className="relative z-10 space-y-12 md:space-y-16 -rotate-2 scale-105">
        {/* Row 1: Moving Left */}
        <div className="pause-on-hover overflow-hidden select-none flex">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {marqueeData1.map((brand, idx) => (
              <BrandPlaque key={`r1-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="pause-on-hover overflow-hidden select-none flex">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {marqueeData2.map((brand, idx) => (
              <BrandPlaque key={`r2-${idx}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      {/* Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-cocoa-deep to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-cocoa-deep to-transparent z-20 pointer-events-none" />
      
      {/* Interactive Hint */}
      <div className="mt-16 text-center">
        <p className="font-body text-[10px] uppercase font-black tracking-[0.4em] text-gold-soft opacity-30 animate-pulse">Select an estate to explore its artifacts</p>
      </div>
    </section>
  );
}
