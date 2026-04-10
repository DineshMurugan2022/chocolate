import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import MagneticButton from './MagneticButton';
interface FeaturedProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface FeaturedProductCardProps {
  product: FeaturedProduct;
  onAdd: (product: FeaturedProduct) => void;
}

const FeaturedProductCard = memo(({ product, onAdd }: FeaturedProductCardProps) => {
  return (
    <div className="relative w-full h-[700px] rounded-[40px] overflow-hidden group">
      {/* Background Texture & Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-cocoa-deep via-cocoa-deep/80 to-cocoa-deep" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A110D] via-[#2B1B17] to-[#1A110D] opacity-95" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-accent/10 rounded-full blur-[100px] z-0" />

      {/* Content Area */}
      <div className="relative z-10 h-full flex flex-col p-12 text-center items-center">
        {/* Breakout Image */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square max-w-[320px] mb-12"
        >
          {/* Intense Shadow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/80 rounded-[100%] blur-3xl opacity-60" />
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4"
          />
        </motion.div>

        {/* Text Details */}
        <div className="space-y-4 mb-10 mt-auto">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-display text-white leading-tight"
          >
            {product.name}
          </motion.h3>
          <div className="flex items-center justify-center gap-2 text-gold-accent">
            <Star size={16} fill="currentColor" />
            <span className="font-poppins font-bold text-sm tracking-widest">{product.rating || 5.0}</span>
          </div>
          <p className="font-body text-soft-text text-sm max-w-xs mx-auto leading-relaxed opacity-60">
            {product.description}
          </p>
        </div>

        {/* Massive Indulge Button */}
        <div className="w-full max-w-[240px]">
          <MagneticButton className="w-full">
            <button 
              onClick={() => onAdd(product)}
              className="w-full py-5 rounded-2xl bg-[#D4AF37] hover:bg-white text-[#1A110D] font-poppins font-bold text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-white/10 group/btn"
            >
              <span className="flex items-center justify-center gap-3">
                <ShoppingCart size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                Indulge Now
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Side Decorative Badge */}
      <div className="absolute top-12 left-12 transform -rotate-90 origin-left">
        <span className="text-[10px] font-bold text-gold-accent/40 tracking-[0.6em] uppercase">Limited Reserve</span>
      </div>
    </div>
  );
});

export default FeaturedProductCard;
