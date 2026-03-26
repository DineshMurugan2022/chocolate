import MagneticButton from './MagneticButton';

export default function GiftCurations() {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-40 bg-white">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-gold-accent font-poppins font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
          For Someone Special
        </span>
        <h3 className="text-4xl md:text-5xl font-playfair font-bold text-umber-text mb-4">
          Luxury Gift Boxes
        </h3>
        <p className="text-taupe-muted max-w-xl font-poppins text-sm leading-relaxed">
          Perfect for celebrations and premium gifting.
        </p>
      </div>

      <div className="relative group cursor-pointer overflow-hidden rounded-[26px] aspect-[21/9] w-full max-w-5xl mx-auto shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
        {/* Gold Ribbon Animation Overlay */}
        <div className="absolute top-0 right-10 w-16 h-full bg-gradient-to-b from-[#FFD166] via-[#E6A93D] to-[#FFD166] opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100 origin-top transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 shadow-[0_0_30px_rgba(255,209,102,0.5)]">
          <div className="absolute top-1/2 -left-4 w-24 h-8 bg-gradient-to-r from-[#FFD166] to-[#E6A93D] -rotate-12 shadow-lg" />
          <div className="absolute top-1/2 -right-4 w-24 h-8 bg-gradient-to-l from-[#FFD166] to-[#E6A93D] rotate-12 shadow-lg" />
        </div>

        <img
          className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
          alt="Luxury gift box with ribbon and chocolates"
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2640&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 z-10"></div>

        <div className="absolute inset-0 p-12 flex flex-col justify-end z-30">
          <h4 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            The Connoisseur's Chest
          </h4>
          <p className="text-white/80 font-poppins text-sm mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            A full anthology of our signature flavors in a bespoke wooden case, sealed with our signature gold ribbon.
          </p>
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <MagneticButton className="inline-block">
              <button className="px-8 py-3 bg-umber-text hover:bg-gold-accent text-white font-poppins font-semibold rounded-full transition-colors flex items-center gap-2 shadow-lg">
                Shop Gift Boxes <span>→</span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
}

// Sub-components used by GiftCurations
const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
