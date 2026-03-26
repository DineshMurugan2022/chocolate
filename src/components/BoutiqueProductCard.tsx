import { ShoppingBag, Heart, ArrowUpRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '@/store/wishlistSlice';
import type { RootState, AppDispatch } from '@/store';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  onAdd?: (item: any) => void;
}

export default function BoutiqueProductCard({ id, name, price, image, onAdd }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlistItems.some(i => i._id === id || i.id === id);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-white rounded-[32px] border border-cocoa-deep/5 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
    >
      {/* Product Image Area - Refined Height */}
      <div className="relative aspect-square overflow-hidden bg-cocoa-deep/5">
        <motion.img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Delicate Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-botanical-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Action Buttons - Floating Style */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               dispatch(toggleWishlistItem(id));
             }}
             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md ${isWishlisted ? 'bg-burnt-caramel text-white' : 'bg-white text-cocoa-deep hover:bg-burnt-caramel hover:text-white'}`}
           >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
           </button>
           
           <button 
             onClick={() => onAdd?.({ id, name, price, image })}
             className="w-10 h-10 rounded-full bg-botanical-green text-white flex items-center justify-center transition-all shadow-lg hover:bg-burnt-caramel"
           >
              <ShoppingBag size={16} />
           </button>
        </div>

        {/* Top Badge (Refined) */}
        <div className="absolute top-4 left-4 z-20">
           <span className="font-body text-[8px] font-black uppercase tracking-[0.3em] text-white bg-botanical-green/60 backdrop-blur-md px-3 py-1 rounded-full">
              Hand-Harvested
           </span>
        </div>
      </div>

      {/* Content Area - Compact & Elegant */}
      <div className="flex-1 p-6 flex flex-col justify-between items-start gap-4">
        <div className="w-full space-y-2">
           <div className="flex items-center justify-between">
              <span className="font-serif italic text-xs text-burnt-caramel">Estate Collection</span>
              <span className="font-body font-black text-[10px] text-cocoa-deep/20 tracking-tighter">REF_{id.slice(-4).toUpperCase()}</span>
           </div>
           
           <h3 className="text-xl font-display font-medium leading-tight text-cocoa-deep transition-colors group-hover:text-burnt-caramel">
             {name}
           </h3>
        </div>

        <div className="w-full h-[1px] bg-cocoa-deep/5" />

        <div className="w-full flex items-center justify-between">
            <span className="text-2xl font-display font-black text-cocoa-deep">₹{price}</span>
            <button className="flex items-center gap-2 text-cocoa-deep/40 group-hover:text-burnt-caramel transition-colors font-body font-bold uppercase text-[8px] tracking-widest">
               Detail <ArrowUpRight size={12} />
            </button>
        </div>
      </div>

      {/* Elegant Hover Glow Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-burnt-caramel transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
}
