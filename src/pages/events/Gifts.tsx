import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Gift, Sparkles, Send, Package, Pen, Globe } from 'lucide-react';
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

const hamperTypes = [
  { name: 'The Essentials', price: 'From ₹1,299', items: '6-piece artisan truffle box, branded ribbon, message card' },
  { name: 'The Luxe Hamper', price: 'From ₹3,499', items: '16-piece truffle assortment, silk ribbon, artisan tea, wax seal, hand-lettered card' },
  { name: 'The Grand Gesture', price: 'From ₹7,999', items: '32-piece collection, custom curation, Champagne truffles, premium box, calligraphy card, complimentary delivery' },
  { name: 'The Corporate Gift', price: 'Custom Pricing', items: 'Branded chocolate bars, bulk packaging with company logo, variety assortment, coordinated delivery to multiple addresses' },
];

const giftingSteps = [
  { step: '01', title: 'Choose Your Story', desc: 'Tell us about the person you\'re gifting. Their favorite flavors, the occasion, the feeling you want to create. We\'ll listen carefully.' },
  { step: '02', title: 'We Curate', desc: 'Our team custom-builds the perfect assortment. Each piece is hand-selected to tell a coherent, delicious story.' },
  { step: '03', title: 'We Package with Care', desc: 'Silk ribbons, pressed gold tissue, a hand-lettered card. Every layer of packaging is as beautiful as what\'s inside.' },
  { step: '04', title: 'We Deliver the Moment', desc: 'Time-precise delivery at your desired moment — a birthday morning, an anniversary evening, or a midnight surprise.' },
];

export default function GiftsEvent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -80px 0px' };

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
      className="min-h-screen bg-transparent text-cocoa-deep selection:bg-burnt-caramel selection:text-white overflow-x-hidden relative"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO
        title="Luxury Chocolate Gifting & Hampers | British Chocolate Store"
        description="The ultimate destination for luxury chocolate gifting. Artisan hampers, personalized message cards, and exquisite packaging for every special moment."
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
          <img src="/gifts_hero.png" alt="Luxury chocolate gifts" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-parchment-base/60 via-parchment-base/40 to-transparent" />
        </div>
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto pt-32 pb-20">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-burnt-caramel/40" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-burnt-caramel/70">The Gifting Protocol</span>
            <div className="h-[1px] w-20 bg-burnt-caramel/40" />
          </div>
          <h1 className="text-7xl md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter text-cocoa-deep">
            Artisanal<br /><span className="italic font-light text-burnt-caramel/30 uppercase tracking-widest pl-4 text-5xl md:text-[6vw]">Gifts</span>
          </h1>
          <p className="max-w-2xl mx-auto font-serif text-xl md:text-2xl italic text-gold-soft/60 leading-relaxed">
            A gift is a message. The chocolate you choose, the packaging you ordain, the words you inscribe — every detail speaks before your recipient takes the first bite. We make sure every detail says something magnificent.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#hampers" className="px-8 py-4 bg-gold-soft text-cocoa-deep font-body font-black uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-full">
              Browse Hampers
            </a>
            <a href="#gallery" className="px-8 py-4 border border-gold-soft/40 text-gold-soft font-body font-black uppercase tracking-widest text-xs hover:border-gold-soft transition-colors rounded-full">
              Shop Gifts
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-transparent z-10" />
      </motion.section>

      {/* ── HOW IT WORKS ── */}
      <motion.section className="px-6 lg:px-20 py-24" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-6xl mx-auto space-y-16">
           <div className="text-center space-y-4">
             <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">Our Process</span>
             <h2 className="text-4xl font-display italic font-black text-cocoa-deep">The Art of Giving, Perfected</h2>
             <p className="max-w-lg mx-auto font-serif text-cocoa-deep/50 leading-relaxed">Four steps to a gift they will never forget.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {giftingSteps.map((s, i) => (
               <div key={i} className="space-y-6 relative">
                 <div className="text-6xl font-display font-black text-burnt-caramel/10">{s.step}</div>
                 <h3 className="text-xl font-display italic font-black text-cocoa-deep">{s.title}</h3>
                 <p className="font-serif text-cocoa-deep/50 leading-relaxed text-sm">{s.desc}</p>
                 {i < 3 && <div className="hidden lg:block absolute top-8 right-0 w-8 h-[1px] bg-gold-soft/20" />}
               </div>
             ))}
           </div>
        </div>
      </motion.section>

       {/* ── STORY + IMAGE ── */}
       <motion.section className="px-6 lg:px-24 py-24 bg-white/40 border-y border-gold-soft/10 max-w-full" variants={fadeUp} viewport={sectionViewport}>
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative rounded-[40px] overflow-hidden aspect-square border border-gold-soft/20">
             <img src="/gifts_hero.png" alt="Luxury gift packaging" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-br from-transparent to-parchment-shadow/60" />
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gold-soft/20">
               <p className="font-serif italic text-cocoa-deep/80 text-sm">"The finest gift has no price — only intention. We simply add chocolate."</p>
               <p className="text-burnt-caramel/40 text-xs mt-2 font-body uppercase tracking-widest">— The British Chocolate Store Gifting Atelier</p>
             </div>
           </div>
           <div className="space-y-8">
             <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">Why It Matters</span>
             <h2 className="text-4xl md:text-5xl font-display italic font-black leading-tight text-cocoa-deep">
               Gifting is an act of seeing someone clearly.
             </h2>
             <p className="font-serif text-cocoa-deep/60 leading-relaxed text-lg">
               The best gifts aren't chosen randomly. They're chosen because the giver truly sees the recipient — their tastes, their personality, their joy. British Chocolate Store helps you translate that seeing into something edible, beautiful, and deeply personal.
             </p>
             <p className="font-serif text-cocoa-deep/60 leading-relaxed text-lg">
               Whether you're gifting a close friend across the table or a business partner across the continent, we provide the same obsessive attention to detail: the right flavors, the right packaging, the right words, delivered at the right moment.
             </p>
           </div>
        </div>
      </motion.section>

      {/* ── HAMPER TYPES ── */}
      <motion.section id="hampers" className="px-6 lg:px-20 py-24" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-6xl mx-auto space-y-16">
         <div className="text-center space-y-4">
           <span className="font-body text-[10px] text-cocoa-deep/50 uppercase tracking-[0.8em]">Gifting Options</span>
           <h2 className="text-4xl font-display italic font-black text-cocoa-deep">Choose Your Hamper</h2>
         </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {hamperTypes.map((h, i) => (
               <div key={i} className={`p-10 rounded-3xl border space-y-4 ${i === 1 ? 'border-burnt-caramel/40 bg-burnt-caramel/5' : 'border-gold-soft/20 bg-white/40'} hover:border-burnt-caramel/40 transition-colors`}>
                 <div className="flex items-start justify-between">
                   <h3 className="text-2xl font-display italic font-black text-cocoa-deep">{h.name}</h3>
                   <span className="text-burnt-caramel font-body font-black text-sm whitespace-nowrap ml-4">{h.price}</span>
                 </div>
                 <p className="font-serif text-cocoa-deep/55 leading-relaxed text-sm">{h.items}</p>
                 <a href="/events" className="inline-block text-xs font-body uppercase tracking-widest text-burnt-caramel/50 hover:text-burnt-caramel border-b border-burnt-caramel/20 hover:border-burnt-caramel/50 transition-colors pb-0.5">
                   Enquire →
                 </a>
               </div>
             ))}
           </div>
        </div>
      </motion.section>

      {/* ── GIFTING FEATURES ── */}
      <motion.section className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display italic font-black">Everything Included</h2>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {[
               { icon: <Sparkles size={28} />, title: 'Luxury Wrapping', desc: 'Silk ribbons, gold-embossed artisanal papers, tissue-pressed layers, and a wax seal. The unwrapping experience is part of the gift.' },
               { icon: <Gift size={28} />, title: 'Curated Hampers', desc: 'Custom symphonies of truffles, chocolate bars, drinking chocolate powder, and artisan accompaniments — all hand-selected for the recipient.' },
               { icon: <Pen size={28} />, title: 'Hand-Lettered Cards', desc: 'Your message, beautifully rendered by our calligraphers on premium cotton paper. Write as much as you want — we\'ll make it art.' },
               { icon: <Send size={28} />, title: 'Precision Delivery', desc: 'Time-at-door delivery, city-wide and interstate. Our logistics team coordinates arrival with your desired gifting moment — even midnight.' },
               { icon: <Package size={28} />, title: 'Corporate Gifting', desc: 'Bulk orders with branded packaging, company logo engraving on chocolate bars, and a dedicated corporate account manager for recurring orders.' },
               { icon: <Globe size={28} />, title: 'International Shipping', desc: 'We ship select non-perishable products globally with temperature-controlled packaging. Loved ones abroad deserve British Chocolate too.' },
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
          <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.8em]">Shop Now</span>
          <h2 className="text-5xl font-display italic font-black">Ready-to-Gift Collections</h2>
        </div>
        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Curating Gift Collection...</span>
            </div>
           ) : products.length === 0 ? (
             <div className="py-20 flex flex-col items-center justify-center gap-8 bg-white/40 rounded-[60px] border border-dashed border-gold-soft/20 text-center px-10">
               <Gift size={48} className="text-cocoa-deep/10" />
               <div className="text-center space-y-3">
                 <p className="font-display text-2xl italic text-cocoa-deep/30">The art of giving requires curation.</p>
                 <p className="font-serif text-cocoa-deep/40 max-w-md">Every gift is built to order. Explore our full collection or contact our concierge for a personalized gifting experience.</p>
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

      <EventsNav />
      <Footer />
    </motion.div>
  );
}
