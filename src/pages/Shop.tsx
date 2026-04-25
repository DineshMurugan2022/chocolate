import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { Search, ShoppingBag, ChevronDown, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import HoverRevealProductCard from '../components/HoverRevealProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import GoldenScrollPath from '../components/GoldenScrollPath';
import FloatingIngredients from '../components/FloatingIngredients';
import { fadeDown, fadeUp, stagger } from '@/utils/motion';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search and Filter State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (selectedCategory) params.category = selectedCategory;
      if (sortBy === 'priceLow') params.sort = 'priceLow';
      if (sortBy === 'priceHigh') params.sort = 'priceHigh';
      if (sortBy === 'name') params.sort = 'name';

      const response = await api.get('/products', { params });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, sortBy]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchApply = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <motion.div
      className="min-h-screen bg-transparent text-cocoa-deep selection:bg-burnt-caramel selection:text-white overflow-x-hidden relative pt-32 px-6 md:px-12 lg:px-16 space-y-12"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >

      {/* Background Subtle Organic Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.1]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero Header: Boutique Registry */}
      <motion.section
        className="pt-48 pb-10 px-6 lg:px-20 relative overflow-hidden bg-transparent"
        variants={fadeDown}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-10">
          <div className="flex items-center gap-6">
            <div className="size-2 rounded-full bg-burnt-caramel animate-pulse" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-burnt-caramel/30">The Artisan Registry 2024</span>
          </div>

          <h1 className="text-5xl md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter text-cocoa-deep">
            Heritage <br /> <span className="italic font-light text-burnt-caramel/20 pr-4">Matrix</span> Collection
          </h1>

          <p className="max-w-xl font-serif text-xl md:text-2xl italic text-cocoa-deep/50 leading-relaxed border-l-2 border-burnt-caramel/20 pl-10">
            Witness the full inventory of our estates. From molecular single-origins to botanical floral infusions.
          </p>
        </div>
      </motion.section>

      {/* Interactive Toolbar: Search & Filter */}
      <motion.section
        className="px-6 lg:px-20 mb-20 sticky top-32 z-50"
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          {/* Search Pill */}
          <div className="flex-1 w-full bg-white/40 backdrop-blur-3xl !rounded-[100px] p-2 flex items-center gap-2 border border-gold-soft/20 hover:border-burnt-caramel/30 transition-all shadow-xl">
            <form onSubmit={handleSearchApply} className="flex-1 flex items-center px-6 relative group">
              <Search size={16} className="text-burnt-caramel/20 group-hover:text-burnt-caramel transition-colors" />
              <input
                type="text"
                placeholder="Registry_ID or Estate_Origin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-body font-black uppercase tracking-[0.4em] py-4 pl-6 placeholder:text-burnt-caramel/20 text-cocoa-deep"
              />
            </form>
            <button className="h-14 px-8 bg-burnt-caramel rounded-[100px] text-white font-body font-black text-[9px] uppercase tracking-[0.4em] hover:bg-cocoa-deep transition-all shadow-2xl">Identify</button>
          </div>

          {/* Sort Tool */}
          <div className="bg-white/40 backdrop-blur-3xl !rounded-[100px] p-2 flex items-center border border-gold-soft/20 min-w-[240px]">
            <div className="px-6 flex items-center gap-4">
              <Filter size={14} className="text-burnt-caramel/20" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border-none focus:ring-0 text-[9px] font-body font-black uppercase tracking-[0.2em] pr-10 cursor-pointer text-cocoa-deep"
              >
                <option value="newest" className="bg-white">NEW_HARVESTS</option>
                <option value="priceLow" className="bg-white">VALUATION_ASC</option>
                <option value="priceHigh" className="bg-white">VALUATION_DESC</option>
                <option value="name" className="bg-white">ALPHABETIC_ID</option>
              </select>
              <div className="pointer-events-none -ml-8">
                <ChevronDown size={14} className="text-burnt-caramel/20" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Category Registry Bar */}
      <motion.section
        className="px-6 lg:px-20 mb-20 overflow-x-auto no-scrollbar"
        variants={fadeUp}
        viewport={sectionViewport}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="show"
      >
        <div className="flex items-center justify-center gap-6 min-w-max pb-4">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat.name === selectedCategory ? '' : cat.name)}
              className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedCategory === cat.name ? 'bg-burnt-caramel text-white border-transparent shadow-xl' : 'bg-white/40 border-gold-soft/20 text-cocoa-deep/40 hover:border-burnt-caramel hover:text-burnt-caramel'}`}
            >
              {cat.name}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory('')}
            className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedCategory === '' ? 'bg-burnt-caramel text-white shadow-xl' : 'bg-white/40 border-gold-soft/20 text-cocoa-deep/40 hover:border-burnt-caramel hover:text-burnt-caramel'}`}
          >
            ALL_EXHIBITS
          </button>
        </div>
      </motion.section>

      {/* Boutique Results Grid */}
      <motion.section
        className="px-6 lg:px-20 pb-40"
        variants={fadeUp}
        viewport={sectionViewport}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="show"
      >
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
            <div className="py-40 flex flex-col items-center justify-center gap-8 bg-white/20 rounded-[60px] border border-dashed border-burnt-caramel/10">
              <ShoppingBag size={48} className="text-burnt-caramel/5" />
              <p className="font-display text-2xl italic text-cocoa-deep/20">Registry match not found in current sector.</p>
              <button onClick={() => { setSearch(''); setSelectedCategory(''); }} className="font-body text-[9px] uppercase font-black tracking-[0.4em] text-burnt-caramel border-b border-burnt-caramel pb-1 italic hover:text-cocoa-deep hover:border-cocoa-deep transition-all">Reset Matrix</button>
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
                        dispatch(addToCart({
                          id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                          category: product.category
                        }));
                        setIsCartOpen(true);
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
}
