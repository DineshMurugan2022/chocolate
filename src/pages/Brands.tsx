import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import type { Product } from '@/types';
import { Search, ShoppingBag, ChevronDown, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import HoverRevealProductCard from '../components/HoverRevealProductCard';
import CollectionCard from '../components/CollectionCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import GoldenScrollPath from '../components/GoldenScrollPath';
import FloatingIngredients from '../components/FloatingIngredients';
import { fadeDown, fadeUp, stagger } from '@/utils/motion';
import { BRANDS } from '@/data/brands';

export default function Brands() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search and Filter State
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';
  
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [sortBy, setSortBy] = useState('newest');
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const { data: products = [], isLoading: loading, refetch } = useQuery<Product[]>({
    queryKey: ['products', { search, selectedBrand, sortBy }],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (selectedBrand) params.brand = selectedBrand;
      if (sortBy === 'priceLow') params.sort = 'priceLow';
      if (sortBy === 'priceHigh') params.sort = 'priceHigh';
      if (sortBy === 'name') params.sort = 'name';

      const response = await api.get('/products', { params });
      return response.data.products || response.data;
    }
  });

  const handleSearchApply = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative pt-32 px-6 md:px-12 lg:px-16 space-y-12"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO 
        title={selectedBrand ? `${selectedBrand} Collection` : "Our Partner Brands"}
        description={`Discover exquisite creations from ${selectedBrand || "the world's finest chocolate houses"}. Artisanal chocolates curated for the connoisseurs of Tamil Nadu.`}
      />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.1]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero Header: Partner Brands */}
      <motion.section
        className="pt-48 pb-10 px-6 lg:px-20 relative overflow-hidden bg-transparent"
        variants={fadeDown}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-10">
          <div className="flex items-center gap-6">
            <div className="size-2 rounded-full bg-gold-soft animate-pulse" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-gold-soft/30">Global Partnership Registry</span>
          </div>

          <h1 className="text-5xl md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter text-gold-soft">
            Atelier <br /> <span className="italic font-light text-gold-soft/20 pr-4">Partner</span> Brands
          </h1>

          <p className="max-w-xl font-serif text-xl md:text-2xl italic text-gold-soft/50 leading-relaxed border-l-2 border-gold-soft/20 pl-10">
            Discover exquisite creations curated directly from the world's finest chocolate houses and artisanal crafters.
          </p>
        </div>
      </motion.section>

      {/* Interactive Toolbar: Search & Filter */}
      <motion.section
        className="px-6 lg:px-20 mb-20 sticky top-32 z-50"
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full bg-black/40 backdrop-blur-3xl !rounded-[100px] p-2 flex items-center gap-2 border border-gold-soft/10 hover:border-gold-soft/30 transition-all shadow-xl">
            <form onSubmit={handleSearchApply} className="flex-1 flex items-center px-6 relative group">
              <Search size={16} className="text-gold-soft/20 group-hover:text-gold-soft transition-colors" />
              <input
                type="text"
                placeholder="Search Brands or Origins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-body font-black uppercase tracking-[0.4em] py-4 pl-6 placeholder:text-gold-soft/10 text-gold-soft"
              />
            </form>
            <button 
              onClick={handleSearchApply}
              className="h-14 px-8 bg-gold-soft rounded-[100px] text-black font-body font-black text-[9px] uppercase tracking-[0.4em] hover:bg-gold-soft/80 transition-all shadow-2xl"
            >
              Search
            </button>
          </div>

          <div className="bg-black/40 backdrop-blur-3xl !rounded-[100px] p-2 flex items-center border border-gold-soft/10 min-w-[240px]">
            <div className="px-6 flex items-center gap-4">
              <Filter size={14} className="text-gold-soft/20" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border-none focus:ring-0 text-[9px] font-body font-black uppercase tracking-[0.2em] pr-10 cursor-pointer text-gold-soft"
              >
                <option value="newest" className="bg-cocoa-deep text-white">NEW_ARRIVAL</option>
                <option value="priceLow" className="bg-cocoa-deep text-white">PRICE_ASC</option>
                <option value="priceHigh" className="bg-cocoa-deep text-white">PRICE_DESC</option>
                <option value="name" className="bg-cocoa-deep text-white">ALPHABETIC</option>
              </select>
              <ChevronDown size={14} className="text-gold-soft/20 pointer-events-none -ml-8" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Brands Registry Bar */}
      <motion.section
        className="px-6 lg:px-20 mb-20 overflow-x-auto no-scrollbar"
        variants={fadeUp}
        viewport={sectionViewport}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="show"
      >
        <div className="flex items-center justify-center gap-6 min-w-max pb-4">
          {BRANDS.map((b) => (
            <button
              key={b.shortName}
              onClick={() => setSelectedBrand(b.title === selectedBrand ? '' : b.title)}
              className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedBrand === b.title ? 'bg-gold-soft text-black border-transparent shadow-xl' : 'bg-black/40 border-gold-soft/10 text-gold-soft/40 hover:border-gold-soft hover:text-gold-soft'}`}
            >
              {b.shortName}
            </button>
          ))}
          <button
            onClick={() => setSelectedBrand('')}
            className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedBrand === '' ? 'bg-gold-soft text-black shadow-xl' : 'bg-black/40 border-gold-soft/10 text-gold-soft/40 hover:border-gold-soft hover:text-gold-soft'}`}
          >
            ALL_BRANDS
          </button>
        </div>
      </motion.section>

      {/* Boutique Results Grid or Collection Grid */}
      <motion.section
        className="px-6 lg:px-20 pb-40 min-h-[500px]"
        variants={fadeUp}
        viewport={sectionViewport}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="show"
      >
        <div className="max-w-[1700px] mx-auto">
          {!search && !selectedBrand ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {BRANDS.map((b, i) => (
                   <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <CollectionCard 
                         title={b.title} 
                         image={b.image} 
                         description={b.description} 
                         isLogo={true}
                         onClick={() => setSelectedBrand(b.title)} 
                      />
                   </motion.div>
                ))}
             </div>
          ) : loading ? (
            <div className="py-40 flex flex-col items-center justify-center gap-10">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="size-16 rounded-[20px] bg-gold-soft/5 border border-gold-soft/20 flex items-center justify-center"
              >
                <div className="size-2 rounded-full bg-gold-soft shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
              </motion.div>
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20 italic">Extracting Brand Matrix...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-40 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <ShoppingBag size={48} className="text-gold-soft/5" />
              <p className="font-display text-2xl italic text-gold-soft/20">No creations found for this brand.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedBrand(''); }} 
                className="font-body text-[9px] uppercase font-black tracking-[0.4em] text-gold-soft border-b border-gold-soft pb-1 italic hover:text-white hover:border-white transition-all shadow-none bg-transparent"
              >
                Clear Selection
              </button>
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
                      product={{
                        ...p,
                        image: p.image || '',
                        color: '' // Add default color if missing
                      }}
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
