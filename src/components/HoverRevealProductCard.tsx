import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShoppingBag, ArrowUpRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export default function HoverRevealProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer flex flex-col items-center"
      onClick={() => navigate('/product/' + product._id)}
    >
      {/* THE FLOATING PRODUCT VIEW */}
      <motion.div
        animate={{
          y: isHovered ? -15 : 0
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full aspect-[4/5] flex flex-col items-center justify-center bg-transparent transition-all"
      >
        {/* PRODUCT IMAGE - FLOATING & CENTERED */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          {/* Subtle Depth Shadow for the Product itself - Enhanced for "No Border" look */}
          <div className="absolute w-[60%] h-12 bg-black/15 blur-3xl rounded-full bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <motion.img
            animate={{
              scale: isHovered ? 1.1 : 0.95,
              rotate: isHovered ? 2 : 0
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={product.image || "https://images.unsplash.com/photo-1548907602-1f062e2a608a?q=80&w=1000"}
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_45px_65px_rgba(212,175,55,0.15)] transition-all duration-700 mix-blend-screen"
            alt={product.name}
          />
        </div>

        {/* PRODUCT INFO - REVEAL AS FLOATING MENU */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-x-0 -bottom-4 z-20 flex flex-col items-center justify-center pointer-events-none"
            >
               {/* Metadata Bubble - Redesigned for Dark Cinematic */}
               <div className="bg-black/60 backdrop-blur-3xl rounded-[28px] p-6 shadow-2xl border border-gold-soft/10 pointer-events-auto space-y-4 min-w-[200px]">
                  <div className="space-y-1 text-center">
                     <span className="font-body text-[8px] font-black uppercase tracking-[0.4em] text-gold-soft/40">
                        {product.category || "Estate Collection"}
                     </span>
                     <h4 className="text-xl font-display font-black text-gold-soft tracking-tight">
                        {product.name}
                     </h4>
                  </div>
                  
                   <div className="flex items-center justify-between border-t border-gold-soft/10 pt-4">
                      <span className="font-body text-[14px] font-black uppercase text-gold-soft">₹{product.price}</span>
                      <div className="flex gap-2">
                         <button
                            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                            className="size-10 bg-gold-soft hover:bg-gold-soft/80 text-black rounded-xl flex items-center justify-center shadow-lg transition-all active:scale-90"
                         >
                            <ShoppingBag size={14} />
                         </button>
                         <button
                            onClick={(e) => { e.stopPropagation(); }}
                            className="size-10 bg-black/40 border border-gold-soft/10 text-gold-soft/40 rounded-xl flex items-center justify-center hover:bg-black transition-all active:scale-90"
                         >
                            <Heart size={14} />
                         </button>
                      </div>
                   </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* EXTERNAL LINK ICON (Pill Style) */}
      <div className="absolute top-4 right-4 size-8 rounded-full bg-black/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-gold-soft/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={14} />
      </div>
    </motion.div>
  );
}
