import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Gift, Sparkles, Send } from 'lucide-react';
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

export default function GiftsEvent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const fetchGiftProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', { params: { event: 'Gifts' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching gift artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGiftProducts();
    window.scrollTo(0, 0);
  }, [fetchGiftProducts]);

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative pt-32 space-y-32"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO 
        title="Luxury Chocolate Gifting & Hampers | ChocoLux"
        description="The ultimate destination for luxury chocolate gifting. Artisan hampers, personalized message cards, and exquisite packaging for every special moment."
      />
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero */}
      <motion.section className="pt-24 pb-10 px-6 lg:px-20 text-center space-y-12" variants={fadeDown}>
        <div className="flex items-center justify-center gap-6">
           <div className="h-[1px] w-12 bg-gold-soft/30" />
           <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/60">The Gifting Protocol</span>
           <div className="h-[1px] w-12 bg-gold-soft/30" />
        </div>
        <h1 className="text-6xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter">
          Artisanal <br /> <span className="italic font-light text-gold-soft/20 uppercase tracking-widest pl-4">Gifts</span>
        </h1>
        <p className="max-w-2xl mx-auto font-serif text-2xl md:text-3xl italic text-gold-soft/40 leading-relaxed">
          Transforming moments into memories through the physical form of affection.
        </p>
      </motion.section>

      {/* Product Highlights */}
      <motion.section 
        className="px-6 lg:px-20 py-20 space-y-16"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Syncing Gifting Matrix...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <Gift size={48} className="text-gold-soft/5" />
              <p className="font-display text-2xl italic text-gold-soft/20">The art of giving requires curation. Explore our collections or contact a concierge.</p>
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

      {/* Gifting Features */}
      <motion.section className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10" variants={fadeUp}>
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Sparkles size={32} />, title: 'Luxury Wrapping', desc: 'Silk ribbons and gold-embossed artisanal papers.' },
              { icon: <Gift size={32} />, title: 'Curated Hampers', desc: 'Symphonies of truffles, beans, and drinking chocolate.' },
              { icon: <Send size={32} />, title: 'Direct Delivery', desc: 'Global shipping with precise arrival registries.' }
            ].map((s, i) => (
               <div key={i} className="space-y-6">
                  <div className="text-gold-soft mx-auto w-fit">{s.icon}</div>
                  <h3 className="text-2xl font-display italic font-black">{s.title}</h3>
                  <p className="font-serif italic text-gold-soft/40 leading-relaxed">{s.desc}</p>
               </div>
            ))}
         </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}
