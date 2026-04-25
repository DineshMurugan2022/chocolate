import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Leaf, Zap, ShieldCheck, Heart, Droplets } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import HoverRevealProductCard from '@/components/HoverRevealProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import GoldenScrollPath from '@/components/GoldenScrollPath';
import FloatingIngredients from '@/components/FloatingIngredients';
import { fadeDown, fadeUp, stagger } from '@/utils/motion';
import SEO from '@/components/SEO';

export default function DietChocolates() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const fetchDietProducts = useCallback(async () => {
    setLoading(true);
    try {
      // In a real scenario, we'd filter by a 'diet' or 'sugar-free' category
      // For now, we fetch from a placeholder or general shop filtered by tag
      const response = await api.get('/products', { params: { tag: 'sugar-free' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching wellness artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDietProducts();
    window.scrollTo(0, 0);
  }, [fetchDietProducts]);

  return (
    <motion.div
      className="min-h-screen bg-transparent text-cocoa-deep selection:bg-burnt-caramel selection:text-white overflow-x-hidden relative pt-32 space-y-32"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO 
        title="Wellness & Sugar-Free Artisanal Chocolates | British Chocolate Store"
        description="Experience luxury without compromise. Our low-glycemic, sugar-free collection uses natural Karupatti and premium dark cocoa for a guilt-free ritual."
      />
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero: The Wellness Perspective */}
      <motion.section className="pt-24 pb-10 px-6 lg:px-20 text-center space-y-12" variants={fadeDown}>
        <div className="flex items-center justify-center gap-6">
           <div className="h-[1px] w-12 bg-burnt-caramel/30" />
           <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-burnt-caramel/60">The Holistic Registry</span>
           <div className="h-[1px] w-12 bg-burnt-caramel/30" />
        </div>
        <h1 className="text-6xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter text-cocoa-deep">
          The Diet <br /> <span className="italic font-light text-burnt-caramel/20 uppercase tracking-widest pl-4">Shop</span>
        </h1>
        <p className="max-w-2xl mx-auto font-serif text-2xl md:text-3xl italic text-cocoa-deep/40 leading-relaxed">
          Indulgence redefined through the lens of longevity and pure, unrefined botanicals.
        </p>
      </motion.section>

       {/* Wellness Pillars */}
       <motion.section 
         className="px-6 lg:px-20 py-20"
         variants={fadeUp}
         viewport={sectionViewport}
       >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { icon: <Leaf size={32} />, title: 'Zero Sugar', desc: 'Crafted with premium Stevia and molecularly stable sugar alternatives.' },
               { icon: <Droplets size={32} />, title: 'Karupatti Infusions', desc: 'Harnessing the high-mineral, low-GI properties of South Indian Palm Jaggery.' },
               { icon: <Heart size={32} />, title: 'Keto-Premium', desc: 'High-fat, low-carb lattice structures for sustained alchemical energy.' }
             ].map((p, i) => (
               <div key={i} className="group p-12 bg-white/40 border border-gold-soft/10 rounded-[60px] space-y-8 hover:border-burnt-caramel transition-all duration-700">
                 <div className="size-20 rounded-3xl bg-burnt-caramel/10 flex items-center justify-center group-hover:bg-burnt-caramel group-hover:text-white transition-all text-burnt-caramel group-hover:text-white">
                   {p.icon}
                 </div>
                 <div className="space-y-4">
                   <h3 className="text-3xl font-display italic font-black text-cocoa-deep">{p.title}</h3>
                   <p className="font-serif italic text-lg text-cocoa-deep/30">{p.desc}</p>
                 </div>
               </div>
             ))}
          </div>
       </motion.section>

      {/* Sugar-Free Gallery */}
      <motion.section 
        className="px-6 lg:px-20 py-20 space-y-16"
        variants={fadeUp}
        viewport={sectionViewport}
      >
         <div className="text-center space-y-4">
            <span className="font-body text-[10px] text-burnt-caramel/40 uppercase tracking-[0.8em]">Sugar-Free Shop</span>
            <h2 className="text-5xl font-display italic font-black text-cocoa-deep">Our Collection</h2>
         </div>

        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Filtering Purity Matrix...</span>
            </div>
           ) : products.length === 0 ? (
             <div className="py-20 flex flex-col items-center justify-center gap-8 bg-white/40 rounded-[60px] border border-dashed border-gold-soft/20 text-center px-10">
               <ShieldCheck size={48} className="text-cocoa-deep/5 mx-auto" />
               <p className="font-display text-2xl italic text-cocoa-deep/20">Our Sugar-Free vault is currently being replenished. Check back soon for new wellness artifacts.</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
               {products.map((p, idx) => (
                  <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: (idx % 4) * 0.1 }}>
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
            </div>
          )}
        </div>
      </motion.section>

       {/* Educational Section: The Karupatti Secret */}
       <motion.section 
         className="px-6 lg:px-20 py-40 bg-white/40 border-y border-gold-soft/10 text-center"
         variants={fadeUp}
       >
         <div className="max-w-4xl mx-auto space-y-10">
            <div className="size-20 rounded-full bg-burnt-caramel/10 flex items-center justify-center mx-auto border border-burnt-caramel/20">
               <Droplets className="text-burnt-caramel" size={32} />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black italic text-cocoa-deep">The <span className="text-burnt-caramel">Karupatti</span> Advantage</h2>
            <p className="font-serif text-2xl italic text-cocoa-deep/40 leading-relaxed">
              Derived from the ancient palm groves of Tamil Nadu, Karupatti (Palm Jaggery) is a low-glycemic natural sweetener rich in vitamins and minerals. It provides a smoky, earthy baseline that creates a healthier, more complex chocolate profile.
            </p>
            <div className="pt-8">
               <button className="px-12 py-6 bg-burnt-caramel text-white font-body text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-cocoa-deep transition-all">Download Nutrition Portfolio</button>
            </div>
         </div>
       </motion.section>

      <Footer />
    </motion.div>
  );
}
