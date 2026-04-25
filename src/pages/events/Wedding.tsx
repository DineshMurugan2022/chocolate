import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Star, Sparkles, Heart, Diamond, CheckCircle } from 'lucide-react';
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
import EventsNav from '@/components/EventsNav';

const packages = [
  { name: 'Pearl', price: '₹4,999', guests: 'Up to 50 guests', perks: ['50 signature bonbons', 'Gold-foil gift boxes', 'Personal message card', 'Standard delivery'] },
  { name: 'Diamond', price: '₹14,999', guests: 'Up to 200 guests', perks: ['200 assorted truffles', 'Silk-ribbon hampers', 'Branded ribbon & wax seal', 'Chocolate fountain (2 hrs)', 'Dedicated concierge'] },
  { name: 'Royal', price: '₹34,999', guests: 'Up to 500 guests', perks: ['500+ premium pieces', 'Bespoke flavor design', 'Rose & saffron enrobing', 'Grand dessert table setup', 'Wedding cake collaboration', 'VIP tasting session'] },
];

const testimonials = [
  { name: 'Priya & Arjun', event: 'Grand Reception, Chennai', quote: 'Our guests are still talking about those rose truffle return gifts six months later. British Chocolate Store made our wedding magical.' },
  { name: 'Meera Suresh', event: 'Engagement Ceremony, Coimbatore', quote: 'The bespoke flavors were a reflection of our personalities. Saffron for him, cardamom for me. Perfection.' },
  { name: 'Keerthana & Surya', event: 'Wedding Dinner, Madurai', quote: 'The chocolate fountain was the centerpiece of our reception. Every photograph is a work of art.' },
];

export default function WeddingEvent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -80px 0px' };

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
      className="min-h-screen bg-transparent text-cocoa-deep selection:bg-burnt-caramel selection:text-white overflow-x-hidden relative"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO
        title="Bespoke Wedding Chocolate Collections | British Chocolate Store"
        description="Cinematic chocolate curations for your grand wedding. From elegant return gifts to grand dessert tables, we bring luxury to your celebration in Tamil Nadu and beyond."
      />
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />
      <FloatingIngredients />

      {/* ── HERO ── */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        variants={fadeDown}
      >
        <div className="absolute inset-0 z-0">
          <img src="/wedding_hero.png" alt="Wedding chocolates" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-parchment-base/60 via-parchment-base/40 to-transparent" />
        </div>
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto pt-32 pb-20">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-burnt-caramel/40" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-burnt-caramel/70">The Eternal Registry</span>
            <div className="h-[1px] w-20 bg-burnt-caramel/40" />
          </div>
          <h1 className="text-7xl md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter text-cocoa-deep">
            Wedding<br /><span className="italic font-light text-burnt-caramel/30 uppercase tracking-widest pl-4 text-5xl md:text-[6vw]">Atelier</span>
          </h1>
          <p className="max-w-2xl mx-auto font-serif text-xl md:text-2xl italic text-cocoa-deep/60 leading-relaxed">
            Crafting the most sacred sweet chapter of your love story — one bespoke truffle at a time. From intimate elopements to grand 500-guest Tamil Nadu celebrations, British Chocolate Store transforms your wedding day into an edible masterpiece.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#gallery" className="px-8 py-4 bg-burnt-caramel text-white font-body font-black uppercase tracking-widest text-xs hover:bg-cocoa-deep transition-colors rounded-full">
              Explore Gallery
            </a>
            <a href="#packages" className="px-8 py-4 border border-burnt-caramel/40 text-burnt-caramel font-body font-black uppercase tracking-widest text-xs hover:border-burnt-caramel transition-colors rounded-full">
              View Packages
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-transparent z-10" />
      </motion.section>

      {/* ── STORY ── */}
      <motion.section className="px-6 lg:px-24 py-24 space-y-20 max-w-7xl mx-auto" variants={fadeUp} viewport={sectionViewport}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-display italic font-black leading-tight text-cocoa-deep">
              Every love story deserves a chocolate worthy of it.
            </h2>
            <p className="font-serif text-cocoa-deep/60 leading-relaxed text-lg">
              At British Chocolate Store, we believe luxury is not a price point — it is a feeling. Our master chocolatiers in Tamil Nadu source the rarest single-origin cacao from Kerala's Idukki hills, blending it with native spices like cardamom, rose water, and aged saffron from Kashmir to create bonbons that are unmistakably, irreplaceably yours.
            </p>
            <p className="font-serif text-cocoa-deep/60 leading-relaxed text-lg">
              We work with you from the very first tasting session to the final delivery, ensuring that every piece — down to the gold-foil wrapping and the hand-stamped wax seal — reflects the grandeur and intimacy of your union.
            </p>
          </div>
          <div className="relative rounded-[40px] overflow-hidden aspect-square border border-gold-soft/20">
            <img src="/wedding_hero.png" alt="Bridal chocolate collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tl from-parchment-shadow/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gold-soft/20">
              <p className="font-serif italic text-cocoa-deep/80 text-sm leading-relaxed">"The most memorable moments in life deserve the most extraordinary flavors."</p>
              <p className="text-burnt-caramel/40 text-xs mt-2 font-body uppercase tracking-widest">— The British Chocolate Atelier</p>
            </div>
          </div>
        </div>
      </motion.section>

       {/* ── SERVICE HIGHLIGHTS ── */}
       <motion.section className="px-6 lg:px-20 py-20 bg-white/40 border-y border-gold-soft/10" variants={fadeUp} viewport={sectionViewport}>
         <div className="max-w-7xl mx-auto space-y-16">
           <div className="text-center space-y-4">
             <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">What We Offer</span>
             <h2 className="text-4xl font-display italic font-black text-cocoa-deep">A Complete Bridal Chocolate Experience</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
             {[
               { icon: <Heart size={28} />, title: 'Return Gift Curation', desc: 'Exquisitely boxed individual bonbons and assorted mini-hampers for every guest, wrapped in your wedding colors and stamped with your initials.' },
               { icon: <Sparkles size={28} />, title: 'Chocolate Fountains', desc: 'Cascading waterfalls of premium dark, milk, and white couverture chocolate for your reception, complete with artisan dipping accompaniments.' },
               { icon: <Star size={28} />, title: 'Private Tasting Sessions', desc: 'Visit our boutique atelier in Chennai for a private flavor consultation. Design your signature wedding chocolate from cacao origin to final enrobing.' },
               { icon: <Diamond size={28} />, title: 'Dessert Table Design', desc: 'A full-service luxury dessert table curated and styled by our team — a visual and gastronomic installation your guests will never forget.' },
             ].map((s, i) => (
               <div key={i} className="p-8 rounded-3xl bg-white/40 border border-gold-soft/10 space-y-5 hover:border-burnt-caramel/30 transition-colors">
                 <div className="text-burnt-caramel w-fit">{s.icon}</div>
                 <h3 className="text-xl font-display italic font-black text-cocoa-deep">{s.title}</h3>
                 <p className="font-serif text-cocoa-deep/50 leading-relaxed text-sm">{s.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </motion.section>

      {/* ── PRODUCT GALLERY ── */}
      <motion.section id="gallery" className="px-6 lg:px-20 py-24 space-y-16" variants={fadeUp} viewport={sectionViewport}>
         <div className="text-center space-y-4">
           <span className="font-body text-[10px] text-cocoa-deep/40 uppercase tracking-[0.8em]">Bespoke Selections</span>
           <h2 className="text-5xl font-display italic font-black text-cocoa-deep">The Bridal Gallery</h2>
           <p className="max-w-xl mx-auto font-serif text-cocoa-deep/50 leading-relaxed">Each piece is handcrafted in small batches, ensuring a level of quality and detail that no industrial confectionery can match.</p>
         </div>

        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Curating Wedding Collection...</span>
            </div>
           ) : products.length === 0 ? (
             <div className="py-20 flex flex-col items-center justify-center gap-8 bg-white/40 rounded-[60px] border border-dashed border-gold-soft/20">
               <ShoppingBag size={48} className="text-cocoa-deep/5" />
               <div className="text-center space-y-3">
                 <p className="font-display text-2xl italic text-cocoa-deep/30">Each wedding is beautifully unique.</p>
                 <p className="font-serif text-cocoa-deep/40 max-w-md">Our wedding collections are often curated exclusively for each couple. Contact us to begin designing your personalized bridal chocolate registry.</p>
               </div>
               <a href="/shop" className="px-6 py-3 bg-burnt-caramel text-white rounded-full font-body uppercase tracking-widest text-xs hover:bg-cocoa-deep transition-colors">Browse All Collections</a>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {products.map((p, idx) => (
                <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: (idx % 4) * 0.1 }}>
                  <HoverRevealProductCard
                    product={p}
                    onAddToCart={(product) => {
                      dispatch(addToCart({ id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1, category: product.category }));
                      setIsCartOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

       {/* ── PACKAGES ── */}
       <motion.section id="packages" className="px-6 lg:px-20 py-24 bg-white/40 border-y border-gold-soft/10" variants={fadeUp} viewport={sectionViewport}>
         <div className="max-w-6xl mx-auto space-y-16">
           <div className="text-center space-y-4">
             <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">Investment</span>
             <h2 className="text-4xl font-display italic font-black text-cocoa-deep">Wedding Packages</h2>
             <p className="max-w-lg mx-auto font-serif text-cocoa-deep/50">All packages include complimentary custom flavor consultation and branded packaging.</p>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {packages.map((pkg, i) => (
               <div key={i} className={`p-10 rounded-3xl border space-y-8 flex flex-col ${i === 1 ? 'border-burnt-caramel/50 bg-burnt-caramel/5 scale-105' : 'border-gold-soft/20 bg-white/40'}`}>
                 {i === 1 && <span className="text-xs font-body uppercase tracking-widest text-burnt-caramel bg-burnt-caramel/20 px-3 py-1 rounded-full w-fit">Most Popular</span>}
                 <div>
                   <h3 className="text-3xl font-display italic font-black text-cocoa-deep">{pkg.name}</h3>
                   <p className="text-cocoa-deep/50 font-serif text-sm">{pkg.guests}</p>
                 </div>
                 <p className="text-4xl font-display font-black text-burnt-caramel">{pkg.price}</p>
                 <ul className="space-y-3 flex-1">
                   {pkg.perks.map((perk, j) => (
                     <li key={j} className="flex items-start gap-3 font-serif text-sm text-cocoa-deep/70">
                       <CheckCircle size={16} className="text-burnt-caramel/50 mt-0.5 shrink-0" />
                       {perk}
                     </li>
                   ))}
                 </ul>
                 <a href="/events" className="block text-center px-6 py-3 border border-burnt-caramel/40 text-burnt-caramel rounded-full font-body uppercase tracking-widest text-xs hover:bg-burnt-caramel/10 transition-colors">
                   Enquire Now
                 </a>
               </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── TESTIMONIALS ── */}
      <motion.section className="px-6 lg:px-20 py-24" variants={fadeUp} viewport={sectionViewport}>
         <div className="max-w-6xl mx-auto space-y-16">
           <div className="text-center space-y-4">
             <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">Love Stories</span>
             <h2 className="text-4xl font-display italic font-black text-cocoa-deep">What Our Couples Say</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {testimonials.map((t, i) => (
               <div key={i} className="p-10 rounded-3xl bg-white/40 border border-gold-soft/10 space-y-6">
                 <p className="font-serif italic text-cocoa-deep/70 leading-relaxed text-base">"{t.quote}"</p>
                 <div>
                   <p className="font-display font-black text-cocoa-deep">{t.name}</p>
                   <p className="font-body text-xs text-cocoa-deep/40 uppercase tracking-widest">{t.event}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </motion.section>

      <EventsNav />
      <Footer />
    </motion.div>
  );
}
