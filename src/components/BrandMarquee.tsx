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
      className="group relative flex-shrink-0 w-40 md:w-56 aspect-[3/2] mx-6 md:mx-12 cursor-pointer transition-all duration-700"
      whileHover={{ y: -8, scale: 1.1 }}
    >
      {/* Brand Logo - Removed filters that were causing some logos to disappear */}
      <div 
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-80 group-hover:opacity-100 transition-all duration-700 p-4 md:p-6"
        style={{ backgroundImage: `url("${brand.image}")` }}
      />

      {/* Minimalistic label that appears on hover */}
      <div className="absolute inset-x-0 -bottom-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        <span className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-burnt-caramel/80">
          {brand.shortName}
        </span>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-24 overflow-hidden bg-transparent perspective-2000">
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
          className="text-4xl md:text-7xl font-display italic font-black text-cocoa-deep"
        >
          Global Partnerships
        </motion.h2>
      </div>

      {/* Marquee Container with Subtle Slant */}
      <div className="relative z-10 space-y-12 md:space-y-16 -rotate-1 scale-100">
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
      
      {/* Interactive Hint */}
      <div className="mt-16 text-center">
        <p className="font-body text-[10px] uppercase font-black tracking-[0.4em] text-gold-soft opacity-60 animate-pulse">Select an estate to explore its artifacts</p>
      </div>
    </section>
  );
}
