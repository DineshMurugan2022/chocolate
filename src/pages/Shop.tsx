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

import prod1 from '../assets/product/bgremove_5dff1f0908_bgremoved_1774415915012.png';
import prod2 from '../assets/product/choco6.png';
import prod3 from '../assets/product/choco1.jpeg';
import prod4 from '../assets/product/bgremove_af9dbc3bd9_bgremoved_1774415903328.png';
import prod5 from '../assets/product/bgremove_540e951e68_bgremoved_1774415905503.png';
import prod6 from '../assets/product/bgremove_501f18b4f6_bgremoved_1774415893848.png';
import prod7 from '../assets/product/WhatsApp Image 2026-03-23 at 5.27.56 PM.jpeg';
import prod8 from '../assets/product/WhatsApp Image 2026-03-23 at 5.26.05 PM.jpeg';
import prod9 from '../assets/product/WhatsApp Image 2026-03-23 at 5.24.38 PM.jpeg';
import prod10 from '../assets/product/WhatsApp Image 2026-03-23 at 4.57.22 PM.jpeg';
import prod11 from '../assets/product/WhatsApp Image 2026-03-23 at 4.53.41 PM(1).jpeg';

const exhibitionProducts = [
  { _id: 'ex1', name: "Mandala Mix 200g", price: 1250, weight: "200G", image: prod1, category: "Cylindrical Collection" },
  { _id: 'ex2', name: "Lyra Maximum", price: 1450, weight: "200G", image: prod2, category: "Heritage Registry" },
  { _id: 'ex3', name: "Colombia Origin 70%", price: 850, weight: "90G", image: prod3, category: "Single Estate" },
  { _id: 'ex4', name: "Botanical Essence", price: 1100, weight: "150G", image: prod4, category: "Aromatic Blend" },
  { _id: 'ex5', name: "Dark Alchemy", price: 1350, weight: "180G", image: prod5, category: "Noir Series" },
  { _id: 'ex6', name: "Silk Road Nibs", price: 950, weight: "120G", image: prod6, category: "Crunch Matrix" },
  { _id: 'ex7', name: "Golden Leaf Ganache", price: 2100, weight: "250G", image: prod7, category: "Royal Edition" },
  { _id: 'ex8', name: "Midnight Truffle", price: 1800, weight: "200G", image: prod8, category: "Twilight Selection" },
  { _id: 'ex9', name: "Floral Infusion", price: 1050, weight: "100G", image: prod9, category: "Botanical Series" },
  { _id: 'ex10', name: "Zest & Spice", price: 1150, weight: "110G", image: prod10, category: "Spice Registry" },
  { _id: 'ex11', name: "Velvet Cacao", price: 1600, weight: "160G", image: prod11, category: "Smooth Synthesis" }
];

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
    <div className="min-h-screen bg-transparent text-cocoa-deep selection:bg-burnt-caramel selection:text-white overflow-x-hidden relative">

      {/* Background Subtle Organic Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.1]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero Header: Boutique Registry */}
      <section className="pt-48 pb-10 px-6 lg:px-20 relative overflow-hidden grid-line-bg">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-10">
          <div className="flex items-center gap-6">
            <div className="size-2 rounded-full bg-burnt-caramel animate-pulse" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-cocoa-deep/30">The Artisan Registry 2024</span>
          </div>

          <h1 className="text-5xl md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter">
            Heritage <br /> <span className="italic font-light text-cocoa-deep/20 pr-4">Matrix</span> Collection
          </h1>

          <p className="max-w-xl font-serif text-xl md:text-2xl italic text-cocoa-deep/50 leading-relaxed border-l-2 border-burnt-caramel/20 pl-10">
            Witness the full inventory of our Asian estates. From molecular single-origins to botanical floral infusions.
          </p>
        </div>
      </section>

      {/* Interactive Toolbar: Search & Filter */}
      <section className="px-6 lg:px-20 mb-20 sticky top-32 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
          {/* Search Pill */}
          <div className="flex-1 w-full glass-panel !rounded-[100px] p-2 flex items-center gap-2 border border-cocoa-deep/5 hover:border-burnt-caramel/20 transition-all shadow-xl">
            <form onSubmit={handleSearchApply} className="flex-1 flex items-center px-6 relative group">
              <Search size={16} className="text-cocoa-deep/20 group-hover:text-burnt-caramel transition-colors" />
              <input
                type="text"
                placeholder="Registry_ID or Estate_Origin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-body font-black uppercase tracking-[0.4em] py-4 pl-6 placeholder:text-cocoa-deep/10 text-cocoa-deep"
              />
            </form>
            <button className="h-14 px-8 bg-botanical-green rounded-[100px] text-ivory-warm font-body font-black text-[9px] uppercase tracking-[0.4em] hover:bg-burnt-caramel transition-all">Identify</button>
          </div>

          {/* Sort Tool */}
          <div className="glass-panel !rounded-[100px] p-2 flex items-center border border-cocoa-deep/5 min-w-[240px]">
            <div className="px-6 flex items-center gap-4">
              <Filter size={14} className="text-cocoa-deep/20" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border-none focus:ring-0 text-[9px] font-body font-black uppercase tracking-[0.2em] pr-10 cursor-pointer"
              >
                <option value="newest">NEW_HARVESTS</option>
                <option value="priceLow">VALUATION_ASC</option>
                <option value="priceHigh">VALUATION_DESC</option>
                <option value="name">ALPHABETIC_ID</option>
              </select>
              <ChevronDown size={14} className="text-cocoa-deep/20 pointer-events-none -ml-8" />
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
              className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedCategory === cat.name ? 'bg-botanical-green text-ivory-warm border-transparent shadow-xl' : 'bg-white border-cocoa-deep/5 text-cocoa-deep/30 hover:border-burnt-caramel hover:text-burnt-caramel'}`}
            >
              {cat.name}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory('')}
            className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedCategory === '' ? 'bg-cocoa-deep text-white shadow-xl' : 'bg-white border-cocoa-deep/5 text-cocoa-deep/30'}`}
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
                className="size-16 rounded-[20px] bg-burnt-caramel/5 border border-burnt-caramel/20 flex items-center justify-center"
              >
                <div className="size-2 rounded-full bg-burnt-caramel" />
              </motion.div>
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-cocoa-deep/20">Authorized Extraction...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-40 flex flex-col items-center justify-center gap-8 bg-white/40 rounded-[60px] border border-dashed border-cocoa-deep/10">
              <ShoppingBag size={48} className="text-cocoa-deep/5" />
              <p className="font-display text-2xl italic text-cocoa-deep/20">Registry match not found in current sector.</p>
              <button onClick={() => { setSearch(''); setSelectedCategory(''); }} className="font-body text-[9px] uppercase font-black tracking-[0.4em] text-burnt-caramel border-b border-burnt-caramel pb-1">Reset Matrix</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
              <AnimatePresence mode='popLayout'>
                {[...exhibitionProducts, ...products.filter(p => !exhibitionProducts.find(ex => ex.name === p.name))].map((p, idx) => (
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
