import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Search, ShoppingBag, ChevronDown, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import HoverRevealProductCard from '../components/HoverRevealProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import GoldenScrollPath from '../components/GoldenScrollPath';
import FloatingIngredients from '../components/FloatingIngredients';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search and Filter State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (selectedCategory) params.category = selectedCategory;
      if (sortBy === 'priceLow') params.sort = 'priceLow';
      if (sortBy === 'priceHigh') params.sort = 'priceHigh';
      if (sortBy === 'name') params.sort = 'name';

      const response = await axios.get(`${API_URL}/products`, { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchApply = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative pt-32 px-6 md:px-12 lg:px-16 space-y-12">

      {/* Background Subtle Organic Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.1]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <GoldenScrollPath />
      <FloatingIngredients />

       {/* Hero Header: Boutique Registry */}
       <section className="pt-48 pb-10 px-6 lg:px-20 relative overflow-hidden bg-transparent">
         <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-10">
           <div className="flex items-center gap-6">
             <div className="size-2 rounded-full bg-gold-soft animate-pulse" />
             <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-gold-soft/30">The Artisan Registry 2024</span>
           </div>

           <h1 className="text-5xl md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter text-gold-soft">
             Heritage <br /> <span className="italic font-light text-gold-soft/20 pr-4">Matrix</span> Collection
           </h1>

           <p className="max-w-xl font-serif text-xl md:text-2xl italic text-gold-soft/50 leading-relaxed border-l-2 border-gold-soft/20 pl-10">
             Witness the full inventory of our Asian estates. From molecular single-origins to botanical floral infusions.
           </p>
         </div>
       </section>

      {/* Interactive Toolbar: Search & Filter */}
      <section className="px-6 lg:px-20 mb-20 sticky top-32 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
           {/* Search Pill */}
          <div className="flex-1 w-full bg-black/40 backdrop-blur-3xl !rounded-[100px] p-2 flex items-center gap-2 border border-gold-soft/10 hover:border-gold-soft/30 transition-all shadow-xl">
            <form onSubmit={handleSearchApply} className="flex-1 flex items-center px-6 relative group">
              <Search size={16} className="text-gold-soft/20 group-hover:text-gold-soft transition-colors" />
              <input
                type="text"
                placeholder="Registry_ID or Estate_Origin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-body font-black uppercase tracking-[0.4em] py-4 pl-6 placeholder:text-gold-soft/10 text-gold-soft"
              />
            </form>
            <button className="h-14 px-8 bg-gold-soft rounded-[100px] text-black font-body font-black text-[9px] uppercase tracking-[0.4em] hover:bg-gold-soft/80 transition-all shadow-2xl">Identify</button>
          </div>

          {/* Sort Tool */}
          <div className="bg-black/40 backdrop-blur-3xl !rounded-[100px] p-2 flex items-center border border-gold-soft/10 min-w-[240px]">
            <div className="px-6 flex items-center gap-4">
              <Filter size={14} className="text-gold-soft/20" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border-none focus:ring-0 text-[9px] font-body font-black uppercase tracking-[0.2em] pr-10 cursor-pointer text-gold-soft"
              >
                <option value="newest" className="bg-cocoa-deep">NEW_HARVESTS</option>
                <option value="priceLow" className="bg-cocoa-deep">VALUATION_ASC</option>
                <option value="priceHigh" className="bg-cocoa-deep">VALUATION_DESC</option>
                <option value="name" className="bg-cocoa-deep">ALPHABETIC_ID</option>
              </select>
              <ChevronDown size={14} className="text-gold-soft/20 pointer-events-none -ml-8" />
            </div>
          </div>
        </div>
      </section>

       {/* Category Registry Bar */}
       <section className="px-6 lg:px-20 mb-20 overflow-x-auto no-scrollbar">
         <div className="flex items-center justify-center gap-6 min-w-max pb-4">
           {categories.map((cat) => (
             <button
               key={cat._id}
               onClick={() => setSelectedCategory(cat.name === selectedCategory ? '' : cat.name)}
               className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedCategory === cat.name ? 'bg-gold-soft text-black border-transparent shadow-xl' : 'bg-black/40 border-gold-soft/10 text-gold-soft/40 hover:border-gold-soft hover:text-gold-soft'}`}
             >
               {cat.name}
             </button>
           ))}
          <button
            onClick={() => setSelectedCategory('')}
            className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedCategory === '' ? 'bg-gold-soft text-black shadow-xl' : 'bg-black/40 border-gold-soft/10 text-gold-soft/40 hover:border-gold-soft hover:text-gold-soft'}`}
          >
            ALL_EXHIBITS
          </button>
        </div>
      </section>

      {/* Boutique Results Grid */}
      <section className="px-6 lg:px-20 pb-40">
        <div className="max-w-[1700px] mx-auto">
           {loading ? (
            <div className="py-40 flex flex-col items-center justify-center gap-10">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="size-16 rounded-[20px] bg-gold-soft/5 border border-gold-soft/20 flex items-center justify-center"
              >
                <div className="size-2 rounded-full bg-gold-soft shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
              </motion.div>
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20 italic">Authorized Extraction Sequence_v09...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-40 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <ShoppingBag size={48} className="text-gold-soft/5" />
              <p className="font-display text-2xl italic text-gold-soft/20">Registry match not found in current sector.</p>
              <button onClick={() => { setSearch(''); setSelectedCategory(''); }} className="font-body text-[9px] uppercase font-black tracking-[0.4em] text-gold-soft border-b border-gold-soft pb-1 italic hover:text-white hover:border-white transition-all">Reset Matrix</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
              <AnimatePresence mode='popLayout'>
                {products.map((p, idx) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <HoverRevealProductCard
                      product={p}
                      onAddToCart={(product) => {
                        dispatch(addToCart({ ...product, quantity: 1 }));
                        setIsCartOpen(true);
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
