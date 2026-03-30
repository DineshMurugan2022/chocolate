import { useState, useEffect } from 'react';
import api from '@/utils/api';
import BoutiqueProductCard from './BoutiqueProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const categories = ["ALL HARVESTS", "DARK ORIGINS", "WHITE SILK", "FLORAL INFUSIONS", "SPICE ESTATES"];

export default function SignatureCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL HARVESTS");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching collection:", err);
      }
    };
    fetchProducts();
  }, []);


  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "ALL HARVESTS") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category.toUpperCase().includes(category.split(' ')[0]));
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="w-full">
      {/* Botanical Category Filter - Centered Pill Style */}
      <div className="flex flex-wrap items-center gap-6 mb-24 justify-center">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleFilter(cat)}
            className={`font-body text-[9px] font-black tracking-[0.3em] uppercase transition-all px-6 py-3 rounded-xl border ${activeCategory === cat ? 'bg-botanical-green text-ivory-warm border-transparent shadow-lg' : 'text-cocoa-deep/20 border-cocoa-deep/5 hover:border-burnt-caramel hover:text-burnt-caramel'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Organic Exhibition Grid - Higher Density (4 Columns Wide) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((p, idx) => (
            <motion.div
              key={p._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full"
            >
              <BoutiqueProductCard
                id={p._id}
                name={p.name}
                description={p.description}
                price={p.price}
                image={p.image}
                onAdd={(item) => {
                  dispatch(addToCart({ ...item, quantity: 1 }));
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Narrative Footer */}
      <div className="mt-40 flex flex-col items-center justify-center gap-6">
         <div className="h-[40px] w-[1.5px] bg-cocoa-deep/10" />
         <span className="font-serif italic text-lg text-cocoa-deep/40">Discover more in our seasonal registry.</span>
      </div>
    </div>
  );
}
