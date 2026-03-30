import { Heart, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '@/store/wishlistSlice';
import type { RootState, AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  onAdd?: (item: { id: string; name: string; price: number; image: string }) => void;
}

export default function BoutiqueProductCard({ id, name, price, image, onAdd }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlistItems.some(i => i._id === id || i.id === id);

  return (
    <motion.div 
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       onClick={() => navigate(`/product/${id}`)}
       className="group relative flex flex-col h-full bg-black/40 backdrop-blur-3xl rounded-[40px] border border-gold-soft/10 overflow-hidden transition-all duration-700 hover:border-gold-soft/30 hover:-translate-y-3 cursor-pointer shadow-2xl shadow-black/60"
    >
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain p-10 mix-blend-screen transition-all duration-1000 group-hover:scale-115 drop-shadow-[0_20px_40px_rgba(212,175,55,0.15)]"
        />
        
        {/* Quick Actions Aura */}
        <div className="absolute inset-0 bg-gold-soft/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               dispatch(toggleWishlistItem({ id, name, price, image }));
             }}
             className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-300 ${
               isWishlisted 
                 ? 'bg-gold-soft text-black border-gold-soft' 
                 : 'bg-black/60 text-gold-soft/60 border-gold-soft/20 hover:text-gold-soft hover:border-gold-soft'
             }`}
           >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
           </button>
           
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onAdd?.({ id, name, price, image });
             }}
             className="w-12 h-12 rounded-2xl bg-gold-soft text-black flex items-center justify-center transition-all duration-300 hover:bg-gold-soft/80 shadow-xl shadow-gold-soft/20"
           >
              <ShoppingBag size={18} />
           </button>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
             <div className="h-px w-6 bg-gold-soft/20" />
             <span className="text-[8px] font-black text-gold-soft/20 uppercase tracking-[0.4em]">Artifact_Seq</span>
          </div>
          <h3 className="text-2xl font-display font-black text-gold-soft italic capitalize leading-[1.1]">{name}</h3>
        </div>

        <div className="w-full flex items-center justify-between mt-auto pt-6 border-t border-gold-soft/5">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gold-soft/20 uppercase tracking-widest mb-1">Acquisition</span>
              <span className="text-xl font-display font-black text-gold-soft">₹{price}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate(`/product/${id}`); }}
              className="px-6 h-10 rounded-xl border border-gold-soft/10 text-gold-soft/40 font-body font-black text-[8px] uppercase tracking-[0.4em] flex items-center gap-3 hover:bg-gold-soft hover:text-black hover:border-transparent transition-all italic"
            >
               Details <ArrowUpRight size={12} />
            </button>
        </div>
      </div>
    </motion.div>
  );
}
