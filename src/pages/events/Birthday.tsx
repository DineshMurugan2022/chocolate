import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Zap, Star, Gift, MessageCircle, Clock, CheckCircle } from 'lucide-react';
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

const birthdayIdeas = [
  { title: 'Truffle Towers', desc: 'A stacked pyramid of 24 artisan truffles — a showstopping centerpiece for any birthday table, customized with the celebrant\'s favorite flavors.' },
  { title: 'Personal Bark Boards', desc: 'A bespoke hand-painted chocolate bark featuring the guest of honor\'s name, age, and a personalized message rendered in edible gold leaf.' },
  { title: 'Memory Box Sets', desc: 'A curated selection of 12 truffles inspired by 12 memories — we work with you to translate beloved stories into flavor experiences.' },
];

const funFacts = [
  { stat: '24', label: 'Flavors Available', note: 'From Mango Chili to Aged Rum Raisin' },
  { stat: '2hr', label: 'Express Delivery', note: 'Available across Chennai city limits' },
  { stat: '100%', label: 'Natural Ingredients', note: 'No artificial colors or preservatives' },
  { stat: '5★', label: 'Average Rating', note: 'From over 800 birthday orders' },
];

export default function BirthdayEvent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -80px 0px' };

  const fetchBirthdayProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', { params: { event: 'Birthday' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching birthday artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBirthdayProducts();
    window.scrollTo(0, 0);
  }, [fetchBirthdayProducts]);

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO
        title="Artisanal Birthday Collections | ChocoLux"
        description="Celebrate another orbit with extraordinary chocolate. Festive curations, party packs, and personalized truffles for the most memorable birthdays."
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
          <img src="/birthday_hero.png" alt="Birthday chocolates" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-cocoa-deep/60 via-cocoa-deep/40 to-cocoa-deep" />
        </div>
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto pt-32 pb-20">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-gold-soft/40" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/70">The Celebration Registry</span>
            <div className="h-[1px] w-20 bg-gold-soft/40" />
          </div>
          <h1 className="text-7xl md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter">
            Birthday<br /><span className="italic font-light text-gold-soft/30 uppercase tracking-widest pl-4 text-5xl md:text-[6vw]">Festival</span>
          </h1>
          <p className="max-w-2xl mx-auto font-serif text-xl md:text-2xl italic text-gold-soft/60 leading-relaxed">
            Birthdays are rare. They deserve chocolate that's even rarer. We craft every piece to honor the remarkable person being celebrated — from the explosion of flavors to the final golden flourish on the ribbon.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#ideas" className="px-8 py-4 bg-gold-soft text-cocoa-deep font-body font-black uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-full">
              Get Inspired
            </a>
            <a href="#gallery" className="px-8 py-4 border border-gold-soft/40 text-gold-soft font-body font-black uppercase tracking-widest text-xs hover:border-gold-soft transition-colors rounded-full">
              Shop Collection
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cocoa-deep to-transparent z-10" />
      </motion.section>

      {/* ── STATS ── */}
      <motion.section className="px-6 lg:px-20 py-16 border-y border-gold-soft/10 bg-white/[0.02]" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {funFacts.map((f, i) => (
            <div key={i} className="space-y-2">
              <p className="text-5xl font-display font-black text-gold-soft">{f.stat}</p>
              <p className="font-body uppercase tracking-widest text-xs text-gold-soft/70">{f.label}</p>
              <p className="font-serif text-xs text-gold-soft/40 italic">{f.note}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── STORY ── */}
      <motion.section className="px-6 lg:px-24 py-24 max-w-7xl mx-auto" variants={fadeUp} viewport={sectionViewport}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-[40px] overflow-hidden aspect-square">
            <img src="/birthday_hero.png" alt="Birthday celebration chocolates" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cocoa-deep/70" />
          </div>
          <div className="space-y-8">
            <span className="font-body text-[10px] text-gold-soft/50 uppercase tracking-[0.8em]">Why ChocoLux?</span>
            <h2 className="text-4xl md:text-5xl font-display italic font-black leading-tight">
              Because you only turn 30 — or 1, or 60 — exactly once.
            </h2>
            <p className="font-serif text-gold-soft/60 leading-relaxed text-lg">
              We believe a birthday gift should carry emotional weight. Not just sweetness. Each ChocoLux birthday creation begins with a conversation: What does this person love? What are their memories? What flavor makes them smile?
            </p>
            <p className="font-serif text-gold-soft/60 leading-relaxed text-lg">
              From there, our chocolatiers build something entirely personal — a truffle tower topped with edible gold, a personalized bark board spelling out their name, or a midnight-delivery surprise box packed with their favorite childhood flavors, elevated to luxury.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── BIRTHDAY IDEAS ── */}
      <motion.section id="ideas" className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-body text-[10px] text-gold-soft/50 uppercase tracking-[0.8em]">Signature Creations</span>
            <h2 className="text-4xl font-display italic font-black">Birthday Specials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {birthdayIdeas.map((idea, i) => (
              <div key={i} className="p-10 rounded-3xl bg-white/[0.03] border border-gold-soft/10 hover:border-gold-soft/30 transition-colors space-y-4">
                <h3 className="text-2xl font-display italic font-black">{idea.title}</h3>
                <p className="font-serif text-gold-soft/55 leading-relaxed">{idea.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SERVICE HIGHLIGHTS ── */}
      <motion.section className="px-6 lg:px-20 py-20" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display italic font-black">How We Celebrate With You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Zap size={28} />, title: 'Party Packs', desc: 'Bite-sized assortments for 10 to 500 guests. Each piece individually wrapped with a personalized birthday sticker and a tiny hand-folded message scroll.' },
              { icon: <Star size={28} />, title: 'Custom Toppings & Engravings', desc: 'Personalized names, ages, and silhouettes rendered in edible gold dust. We can even recreate your child\'s favorite cartoon in chocolate!' },
              { icon: <Clock size={28} />, title: 'Midnight Surprise Delivery', desc: 'Love doesn\'t wait for office hours. Our midnight drop service brings chocolate magic to the door at the stroke of 12, city-wide.' },
              { icon: <Gift size={28} />, title: 'Luxury Hamper Builds', desc: 'Choose your chocolates, add a bottle of wine or artisan tea, and we\'ll build a hamper worthy of a magazine spread. Every detail attended to.' },
              { icon: <MessageCircle size={28} />, title: 'Personalized Message Cards', desc: 'A hand-lettered card on premium cotton paper, included with every order. Write as much as you need — our calligraphers handle the rest.' },
              { icon: <CheckCircle size={28} />, title: 'Dietary Accommodations', desc: 'Vegan, sugar-free, and nut-free options available across the full range. No one should miss out on extraordinary chocolate.' },
            ].map((s, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-gold-soft/10 space-y-5 hover:border-gold-soft/30 transition-colors">
                <div className="text-gold-soft w-fit">{s.icon}</div>
                <h3 className="text-xl font-display italic font-black">{s.title}</h3>
                <p className="font-serif text-gold-soft/50 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── PRODUCT GALLERY ── */}
      <motion.section id="gallery" className="px-6 lg:px-20 py-24 bg-white/[0.02] border-t border-gold-soft/10 space-y-16" variants={fadeUp} viewport={sectionViewport}>
        <div className="text-center space-y-4">
          <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.8em]">Shop the Collection</span>
          <h2 className="text-5xl font-display italic font-black">Birthday Favourites</h2>
        </div>
        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Curating Birthday Collection...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <Gift size={48} className="text-gold-soft/10" />
              <div className="text-center space-y-3">
                <p className="font-display text-2xl italic text-gold-soft/30">Every birthday is a milestone.</p>
                <p className="font-serif text-gold-soft/40 max-w-md">Our birthday collection is crafted to order. Explore our full shop or contact us to create a personalized birthday chocolate experience.</p>
              </div>
              <a href="/shop" className="px-6 py-3 bg-gold-soft/10 border border-gold-soft/30 text-gold-soft rounded-full font-body uppercase tracking-widest text-xs hover:bg-gold-soft/20 transition-colors">Browse All Collections</a>
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
