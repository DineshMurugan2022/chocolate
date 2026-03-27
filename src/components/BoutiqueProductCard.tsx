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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <motion.img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               dispatch(toggleWishlistItem(id));
             }}
             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
           >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
           </button>
           
           <button 
             onClick={() => onAdd?.({ id, name, price, image })}
             className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center transition-all shadow-md hover:bg-black"
           >
              <ShoppingBag size={16} />
           </button>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between items-start">
        <div className="w-full mb-4">
           <h3 className="text-base font-bold text-gray-900 leading-tight mb-1">
             {name}
           </h3>
           <span className="text-xs text-gray-400 font-medium">Premium Chocolate</span>
        </div>

        <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <span className="text-lg font-bold text-gray-900">₹{price}</span>
            <button className="text-blue-600 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
               View <ArrowUpRight size={14} />
            </button>
        </div>
      </div>
    </motion.div>
  );
}
