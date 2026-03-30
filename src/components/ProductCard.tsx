import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductViewer3D from '@/components/ProductViewer3D';
import { addToCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';
import { hashString, createRandom } from '@/utils/random';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  color?: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Mock real-time viewers for demonstration
  const viewersSeed = hashString(product._id || product.name || 'product');
  const rand = createRandom(viewersSeed);
  const randomViewers = Math.floor(rand() * 15) + 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass rounded-[2.5rem] p-6 flex flex-col relative group overflow-hidden border-white/40"
    >
      {/* Header Info */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col items-center">
          <span className="px-4 py-1.5 bg-burnt-orange/10 text-burnt-orange border border-burnt-orange/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {product.category}
          </span>
          {product.stock > 0 && product.stock < 10 && (
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 text-[9px] text-gold-accent font-bold uppercase tracking-[0.2em]"
            >
              Limited Reserve
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-noir-400">
          <Eye className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{randomViewers} viewing</span>
        </div>
      </div>

      {/* 3D Model Area */}
      <div className="h-64 relative cursor-grab active:cursor-grabbing">
        <ProductViewer3D color={product.color || '#2D1606'} />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Product Details */}
      <div className="mt-6 flex flex-col flex-grow">
        <h3 
          onClick={() => navigate(`/product/${product._id}`)}
          className="text-3xl font-display text-white mb-1 group-hover:text-burnt-orange transition-colors cursor-pointer"
        >
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">₹{product.price}</span>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-noir-400 mt-1">
              <Package className="w-3 h-3" />
              <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10"
            >
              <Eye className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image || '',
                  quantity: 1
                }));
              }}
              className="p-4 bg-gold-accent hover:bg-[#BDC3C7] text-[#02040A] rounded-2xl shadow-xl transition-all transform hover:scale-110 active:scale-90 group/btn relative overflow-hidden"
            >
              <ShoppingCart className="w-6 h-6 transform group-hover/btn:rotate-12 transition-transform" />
              <motion.div 
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-white/20 rounded-full"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hover decoration */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-satin-gold opacity-0 group-hover:opacity-10 blur-3xl transition-opacity rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;
