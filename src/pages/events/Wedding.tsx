import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Star, Sparkles, Heart } from 'lucide-react';
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

export default function WeddingEvent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const fetchWeddingProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', { params: { event: 'Wedding' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching wedding artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeddingProducts();
    window.scrollTo(0, 0);
  }, [fetchWeddingProducts]);

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative pt-32 space-y-32"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO 
        title="Bespoke Wedding Chocolate Collections | ChocoLux"
        description="Cinematic chocolate curations for your grand wedding. From elegant return gifts to grand dessert tables, we bring luxury to your celebration in Tamil Nadu and beyond."
      />
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero */}
      <motion.section className="pt-24 pb-10 px-6 lg:px-20 text-center space-y-12" variants={fadeDown}>
        <div className="flex items-center justify-center gap-6">
           <div className="h-[1px] w-12 bg-gold-soft/30" />
           <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/60">The Eternal Registry</span>
           <div className="h-[1px] w-12 bg-gold-soft/30" />
        </div>
        <h1 className="text-6xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter">
          Wedding <br /> <span className="italic font-light text-gold-soft/20 uppercase tracking-widest pl-4">Atelier</span>
        </h1>
        <p className="max-w-2xl mx-auto font-serif text-2xl md:text-3xl italic text-gold-soft/40 leading-relaxed">
          Crafting the molecular symphony for your most sacred union.
        </p>
      </motion.section>

      {/* Featured Registry */}
      <motion.section 
        className="px-6 lg:px-20 py-20 space-y-16"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="text-center space-y-6">
           <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.8em]">Bespoke Selections</span>
           <h2 className="text-5xl font-display italic font-black">The Bridal Gallery</h2>
        </div>

        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Syncing Wedding Matrix...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <ShoppingBag size={48} className="text-gold-soft/5" />
              <p className="font-display text-2xl italic text-gold-soft/20">Each wedding is unique. Contact us for custom curation.</p>
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

      {/* Service Highlights */}
      <motion.section className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10" variants={fadeUp}>
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart size={32} />, title: 'Return Gifts', desc: 'Exquisite tokens for your cherished guests.' },
              { icon: <Sparkles size={32} />, title: 'Grand Fountains', desc: 'Ethereal chocolate cascades for your reception.' },
              { icon: <Star size={32} />, title: 'Tasting Sessions', desc: 'Curate your final menu in our private boutique.' }
            ].map((s, i) => (
               <div key={i} className="p-10 text-center space-y-6">
                  <div className="text-gold-soft mx-auto w-fit">{s.icon}</div>
                  <h3 className="text-2xl font-display italic font-black">{s.title}</h3>
                  <p className="font-serif italic text-gold-soft/40">{s.desc}</p>
               </div>
            ))}
         </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}
