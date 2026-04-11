import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Users, Heart, Home, Leaf, Sun } from 'lucide-react';
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

const heritageFlavors = [
  { name: 'Karupatti Kouverture', origin: 'Thanjavur, Tamil Nadu', note: 'Palm jaggery slow-melted into 72% dark chocolate. Smoky, earthy, ancient.' },
  { name: 'Cardamom Cloud', origin: 'Idukki, Kerala', note: 'Green cardamom-infused white chocolate ganache. Floral, delicate, homely.' },
  { name: 'Tamarind Toffee', origin: 'Madurai, Tamil Nadu', note: 'Sweet-sour tamarind caramel in milk chocolate. Bold, tangy, nostalgic.' },
  { name: 'Coconut Rose Truffle', origin: 'Kanyakumari, Tamil Nadu', note: 'Toasted coconut filling with rose-water ganache. Like a celebration in a bite.' },
];

const occasions = [
  { icon: <Sun size={28} />, title: 'Festival Sharing Boxes', desc: 'Pongal, Diwali, Onam — our seasonal boxes honor every Indian festival with region-inspired flavors and traditional motifs on the packaging.' },
  { icon: <Home size={28} />, title: 'Housewarming Hampers', desc: 'A grand welcome for a new chapter. Our housewarming bundles pair premium chocolate with artisan spices, local honey, and a handwritten blessing card.' },
  { icon: <Users size={28} />, title: 'Reunion Share Boards', desc: 'Large-format rustic chocolate boards with 40+ pieces across flavor families — designed for family reunions and long-table celebrations.' },
  { icon: <Leaf size={28} />, title: 'Heritage Recipe Crates', desc: 'A curated crate of 8 chocolates inspired by traditional Tamil Nadu recipes — grandmother\'s cooking, reimagined in fine couverture.' },
  { icon: <Heart size={28} />, title: 'Elder Gifting Sets', desc: 'Specially crafted sugar-free, low-glycemic options with Indian flavors — an act of love for the elders in your family who deserve the sweetest care.' },
  { icon: <ShoppingBag size={28} />, title: 'Monthly Family Subscriptions', desc: 'A rotating selection of seasonal flavors delivered to your home every month. The gift of connection, month after month.' },
];

export default function FamilyEvent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -80px 0px' };

  const fetchFamilyProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', { params: { event: 'Family' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching family artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFamilyProducts();
    window.scrollTo(0, 0);
  }, [fetchFamilyProducts]);

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO
        title="Family Gathering & Tradition Collections | ChocoLux"
        description="Share the love with artisanal chocolate designed for the whole family. From traditional Karupatti truffles to modern sharing crates, we celebrate the bond of togetherness."
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
          <img src="/family_hero.png" alt="Family chocolate gathering" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-cocoa-deep/60 via-cocoa-deep/40 to-cocoa-deep" />
        </div>
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto pt-32 pb-20">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-gold-soft/40" />
            <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/70">The Hearth Registry</span>
            <div className="h-[1px] w-20 bg-gold-soft/40" />
          </div>
          <h1 className="text-7xl md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter">
            Family<br /><span className="italic font-light text-gold-soft/30 uppercase tracking-widest pl-4 text-5xl md:text-[6vw]">Curation</span>
          </h1>
          <p className="max-w-2xl mx-auto font-serif text-xl md:text-2xl italic text-gold-soft/60 leading-relaxed">
            The richest flavors in the world are the ones shared with people you love. ChocoLux crafts experiences designed for the whole family — from the youngest grandchild to the eldest matriarch — rooted in heritage, elevated to luxury.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#heritage" className="px-8 py-4 bg-gold-soft text-cocoa-deep font-body font-black uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-full">
              Heritage Flavors
            </a>
            <a href="#occasions" className="px-8 py-4 border border-gold-soft/40 text-gold-soft font-body font-black uppercase tracking-widest text-xs hover:border-gold-soft transition-colors rounded-full">
              Family Occasions
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cocoa-deep to-transparent z-10" />
      </motion.section>

      {/* ── PHILOSOPHY ── */}
      <motion.section className="px-6 lg:px-24 py-24 max-w-7xl mx-auto" variants={fadeUp} viewport={sectionViewport}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="font-body text-[10px] text-gold-soft/50 uppercase tracking-[0.8em]">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-display italic font-black leading-tight">
              Chocolate rooted in the flavors your grandmother loved.
            </h2>
            <p className="font-serif text-gold-soft/60 leading-relaxed text-lg">
              We are deeply proud of our South Indian heritage. From the palm jaggery of Thanjavur to the cardamom valleys of Idukki, we source ingredients that have fed families for generations and transform them into something new, without losing what made them special.
            </p>
            <p className="font-serif text-gold-soft/60 leading-relaxed text-lg">
              Our Family Collection is built on the belief that food is memory. Every chocolate we craft carries a thread back to a simpler time — a festival afternoon, a grandparent's kitchen, the smell of coconut oil and cardamom on a Sunday morning. We just make it a little more golden.
            </p>
          </div>
          <div className="relative rounded-[40px] overflow-hidden aspect-square">
            <img src="/family_hero.png" alt="Family sharing chocolate" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tl from-cocoa-deep/60 to-transparent" />
          </div>
        </div>
      </motion.section>

      {/* ── HERITAGE FLAVORS ── */}
      <motion.section id="heritage" className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-body text-[10px] text-gold-soft/50 uppercase tracking-[0.8em]">Taste Your Roots</span>
            <h2 className="text-4xl font-display italic font-black">Heritage Signature Flavors</h2>
            <p className="max-w-xl mx-auto font-serif text-gold-soft/50">Flavors crafted from regional Tamil Nadu and South Indian ingredients, elevated to couverture chocolate excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heritageFlavors.map((f, i) => (
              <div key={i} className="p-10 rounded-3xl border border-gold-soft/15 bg-white/[0.02] hover:border-gold-soft/30 transition-colors space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-display italic font-black">{f.name}</h3>
                  <span className="text-xs font-body text-gold-soft/30 uppercase tracking-widest ml-4 text-right">{f.origin}</span>
                </div>
                <p className="font-serif text-gold-soft/55 leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── FAMILY OCCASIONS ── */}
      <motion.section id="occasions" className="px-6 lg:px-20 py-24" variants={fadeUp} viewport={sectionViewport}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-body text-[10px] text-gold-soft/50 uppercase tracking-[0.8em]">For Every Gathering</span>
            <h2 className="text-4xl font-display italic font-black">Family Occasions We Love</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {occasions.map((o, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-gold-soft/10 space-y-5 hover:border-gold-soft/30 transition-colors">
                <div className="text-gold-soft w-fit">{o.icon}</div>
                <h3 className="text-xl font-display italic font-black">{o.title}</h3>
                <p className="font-serif text-gold-soft/50 leading-relaxed text-sm">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── PRODUCT GALLERY ── */}
      <motion.section className="px-6 lg:px-20 py-24 bg-white/[0.02] border-t border-gold-soft/10 space-y-16" variants={fadeUp} viewport={sectionViewport}>
        <div className="text-center space-y-4">
          <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.8em]">Shop the Collection</span>
          <h2 className="text-5xl font-display italic font-black">Made for the Whole Family</h2>
        </div>
        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center animate-pulse">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Curating Family Collection...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <Users size={48} className="text-gold-soft/10" />
              <div className="text-center space-y-3">
                <p className="font-display text-2xl italic text-gold-soft/30">Sharing is the oldest ritual.</p>
                <p className="font-serif text-gold-soft/40 max-w-md">Our family collections can be built to order. Explore our shop or contact us to build your own family sharing crate.</p>
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
