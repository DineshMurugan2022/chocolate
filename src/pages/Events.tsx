import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { Search, ShoppingBag, ChevronDown, Filter, Check, Star, Zap, Clock, Package } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import HoverRevealProductCard from '../components/HoverRevealProductCard';
import CollectionCard from '../components/CollectionCard';
import CorporateInquiryForm from '../components/CorporateInquiryForm';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import GoldenScrollPath from '../components/GoldenScrollPath';
import FloatingIngredients from '../components/FloatingIngredients';
import { fadeDown, fadeUp, stagger } from '@/utils/motion';
import split1 from '@/assets/split_1.png';
import split2 from '@/assets/split_2.png';
import split3 from '@/assets/split_3.png';
import chatgptImg from '@/assets/ChatGPT Image Apr 8, 2026, 11_06_34 AM.png';
import imagesJpg from '@/assets/images.jpg';
import dippingSetup from '@/assets/dipping_setup.png';
import chocolateTextureBg from '@/assets/chocolate_texture_bg.png';

export default function Events() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Pre-configured Events for Gallery
  const eventTypes = ["Wedding", "Birthday", "Corporate", "Gifting"];
  const eventsData = [
    { title: 'Wedding', image: '/images/collections/event_wedding_1775207370802.png', description: 'Elegant Assortments' },
    { title: 'Birthday', image: '/images/collections/event_birthday_1775207386610.png', description: 'Festive Truffles' },
    { title: 'Corporate', image: '/images/collections/event_corporate_1775207405890.png', description: 'Boardroom Gifts' },
    { title: 'Gifting', image: '/images/collections/event_gifting_1775207422111.png', description: 'Luxury Hampers' }
  ];

  // Search and Filter State
  const [searchParams] = useSearchParams();
  const initialEvent = searchParams.get('event') || '';
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(initialEvent);
  const [sortBy, setSortBy] = useState('newest');
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (selectedEvent) params.event = selectedEvent;
      const response = await api.get('/products', { params });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [search, selectedEvent]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative pt-32 space-y-32"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero: Boutique Celebrations */}
      <motion.section className="pt-24 pb-10 px-6 lg:px-20 text-center space-y-12" variants={fadeDown}>
        <div className="flex items-center justify-center gap-6">
           <div className="h-[1px] w-12 bg-gold-soft/30" />
           <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/60">The Artisan Guild Services</span>
           <div className="h-[1px] w-12 bg-gold-soft/30" />
        </div>
        <h1 className="text-6xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter">
          Bespoke <br /> <span className="italic font-light text-gold-soft/20 uppercase tracking-widest pl-4">Celebrations</span>
        </h1>
        <p className="max-w-2xl mx-auto font-serif text-2xl md:text-3xl italic text-gold-soft/40 leading-relaxed">
          From cinematic corporate gifting to hypnotic chocolate cascades, we curate sensory experiences for the world's most discerning hosts.
        </p>
      </motion.section>

      {/* Corporate Gifting in India */}
      <motion.section 
        className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12">
              <div className="space-y-4">
                 <span className="font-body text-[11px] text-gold-soft font-black uppercase tracking-[0.5em]">Regional Protocol</span>
                 <h2 className="text-5xl md:text-7xl font-display italic font-black text-ivory-warm leading-tight">Corporate Gifting in <br /> Tamil Nadu</h2>
              </div>
              <p className="font-serif text-xl italic text-ivory-warm/60 leading-relaxed border-l-2 border-gold-soft/20 pl-10">
                Corporate Gifting in Tamil Nadu has evolved into a vital strategy for building local and global relationships. From the tech hubs of **Chennai** and **Coimbatore** to the cultural heart of **Madurai**, we bring a premium approach to gifting with luxury chocolates, artisanal hampers, and customized solutions for festivals like **Pongal** and **Diwali**.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { title: 'Luxury Boxes', desc: 'Handcrafted elegance in every bite.' },
                   { title: 'Gourmet Hampers', desc: 'Curated selections for lasting impressions.' },
                   { title: 'Bespoke Branding', desc: 'Custom logos and personalized narrative packaging.' },
                   { title: 'Large-Scale Ops', desc: 'Bulk order support with multi-location shipping.' }
                 ].map((item) => (
                    <div key={item.title} className="space-y-2 group">
                       <h3 className="font-body text-[10px] text-gold-soft font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">{item.title}</h3>
                       <p className="font-serif italic text-sm text-ivory-warm/30">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="relative aspect-square rounded-[60px] overflow-hidden border border-gold-soft/20 group">
              <img 
                src={chatgptImg} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                alt="Corporate Gifting Tamil Nadu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-gold-soft/10">
                 <p className="font-serif italic text-lg text-gold-soft">"Enterprises across **Tamil Nadu** choose us to celebrate milestones and reward excellence with local sophistication."</p>
              </div>
           </div>
        </div>
      </motion.section>

      {/* Chocolate Fountain Packages */}
      <motion.section 
        className="px-6 lg:px-20 py-20"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="max-w-[1400px] mx-auto space-y-20">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <span className="font-body text-[12px] text-gold-soft font-black uppercase tracking-[1em]">The Fountain Registry</span>
                    <h2 className="text-5xl md:text-8xl font-display italic font-black text-ivory-warm underline decoration-gold-soft/20 decoration-skip-ink">Hire & Party Packs</h2>
                 </div>
                 <p className="font-serif text-xl italic text-ivory-warm/60 leading-relaxed border-l-2 border-gold-soft/20 pl-10 hidden lg:block">
                   Our signature cascades provide a hypnotic centerpiece for any gala, seamlessly blending architectural elegance with the aroma of premium couverture.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-6 h-[400px]">
                 <div className="relative rounded-[40px] overflow-hidden border border-gold-soft/10 group">
                    <img 
                      src={imagesJpg} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                      alt="Grand Fountain"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                 </div>
                 <div className="relative rounded-[40px] overflow-hidden border border-gold-soft/10 group translate-y-12">
                    <img 
                      src={dippingSetup} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                      alt="Dipping Setup"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Package 1: Full Service */}
              <div className="relative group p-12 bg-white/[0.02] border border-gold-soft/10 rounded-[60px] overflow-hidden hover:border-gold-soft/40 transition-all duration-700">
                 <div className="absolute top-0 right-0 size-40 bg-gold-soft/5 blur-[80px] rounded-full group-hover:bg-gold-soft/20 transition-all" />
                 <div className="space-y-10 relative z-10">
                    <div className="flex items-center justify-between">
                       <div className="size-16 rounded-2xl bg-gold-soft/10 border border-gold-soft/20 flex items-center justify-center">
                          <Zap className="text-gold-soft" size={32} />
                       </div>
                       <span className="font-body text-[10px] font-black text-gold-soft uppercase tracking-[0.4em]">100 GUESTS</span>
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-4xl font-display italic font-black text-ivory-warm">The Large Event Package</h3>
                       <p className="font-serif italic text-lg text-ivory-warm/40">Perfect for weddings and grand galas.</p>
                    </div>
                    <ul className="space-y-4 font-serif text-sm">
                       {[
                         'Premium 30” Fountain with illumination base',
                         'Choice of Milk, Dark, or White couverture',
                         '14 Gourmet Dipping Items (Strawberries, Waffles, Brownies)',
                         'Professional Artisan Attendant',
                         'Full setup & pack-away service'
                       ].map((item) => (
                          <li key={item} className="flex items-start gap-4 text-ivory-warm/60">
                             <Check className="text-gold-soft shrink-0 mt-1" size={14} /> {item}
                          </li>
                       ))}
                    </ul>
                    <div className="pt-10 flex items-center justify-between border-t border-gold-soft/10 font-body uppercase font-black text-[10px] tracking-widest text-gold-soft">
                       <span>Deposit Required</span>
                       <span>₹10,000.00</span>
                    </div>
                 </div>
              </div>

              {/* Package 2: Party Pack */}
              <div className="relative group p-12 bg-white/[0.02] border border-gold-soft/10 rounded-[60px] overflow-hidden hover:border-gold-soft/40 transition-all duration-700">
                 <div className="absolute top-0 right-0 size-40 bg-gold-soft/5 blur-[80px] rounded-full group-hover:bg-gold-soft/20 transition-all" />
                 <div className="space-y-10 relative z-10">
                    <div className="flex items-center justify-between">
                       <div className="size-16 rounded-2xl bg-gold-soft/10 border border-gold-soft/20 flex items-center justify-center">
                          <Star className="text-gold-soft" size={32} />
                       </div>
                       <span className="font-body text-[10px] font-black text-gold-soft uppercase tracking-[0.4em]">50 GUESTS</span>
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-4xl font-display italic font-black text-ivory-warm">The Complete Party Pack</h3>
                       <p className="font-serif italic text-lg text-ivory-warm/40">Ideal for home events & birthdays.</p>
                    </div>
                    <ul className="space-y-4 font-serif text-sm">
                       {[
                         'Hardware: 17.5” Large Home Fountain',
                         '2.7kg Fountain-Ready Milk Chocolate',
                         'Marshmallows, Devon Fudge, Scottish Shortbread',
                         '200 Bamboo Skewers & 100 Napkins',
                         'Direct Expert Advice Support'
                       ].map((item) => (
                          <li key={item} className="flex items-start gap-4 text-ivory-warm/60">
                             <Check className="text-gold-soft shrink-0 mt-1" size={14} /> {item}
                          </li>
                       ))}
                    </ul>
                    <div className="pt-10 flex items-center justify-between border-t border-gold-soft/10 font-body uppercase font-black text-[10px] tracking-widest text-gold-soft">
                       <span>Total Investment</span>
                       <span>₹10,999.00</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </motion.section>

      {/* How to Prepare Guide (Step-by-Step) */}
      <motion.section 
        className="px-4 md:px-6 lg:px-20 py-20 bg-black/40 backdrop-blur-3xl rounded-[40px] md:rounded-[80px] mx-4 md:mx-6 lg:mx-20 border border-gold-soft/5 overflow-hidden relative"
        variants={fadeUp}
        viewport={sectionViewport}
      >
         {/* Background Illustrative Image (Subtle) */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
             <img 
               src={chocolateTextureBg} 
               className="w-full h-full object-cover" 
               alt="Chocolate Texture"
             />
             <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent" />
          </div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
            <div className="space-y-10">
               <div className="space-y-4">
                  <span className="font-body text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Preparation Registry</span>
                  <h2 className="text-4xl md:text-6xl font-display italic font-black text-ivory-warm">The Art of <br /> The Cascade</h2>
               </div>
               <div className="flex flex-col gap-6">
                 {[
                   { step: '01', title: 'Setup Registry', desc: 'Place on a level surface. Set to "Heat" registry for 3–5 minutes.' },
                   { step: '02', title: 'Molecular Melting', desc: 'Heat buttons in 1-min spurts via microwave or hob method. Do not add water.' },
                   { step: '03', title: 'Start the Flow', desc: 'Pour into the centre bowl. Switch to "Flow" for a seamless cascade.' }
                 ].map((s, i) => (
                    <button 
                      key={s.step}
                      onClick={() => setActiveStep(i)}
                      className={`text-left p-8 rounded-3xl border transition-all ${activeStep === i ? 'bg-gold-soft/10 border-gold-soft shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'border-gold-soft/5 hover:border-gold-soft/20'}`}
                    >
                       <div className="flex items-center gap-6">
                          <span className="font-display text-2xl text-gold-soft/30">{s.step}</span>
                          <div className="space-y-2">
                             <h4 className="font-body text-xs font-black uppercase tracking-[0.2em]">{s.title}</h4>
                             <p className="font-serif italic text-sm text-ivory-warm/40">{s.desc}</p>
                          </div>
                       </div>
                    </button>
                 ))}
               </div>
            </div>

            <div className="space-y-12 flex flex-col justify-center">
               <div className="p-12 bg-white/[0.02] border border-gold-soft/10 rounded-[50px] space-y-10">
                  <div className="flex items-center gap-6">
                     <div className="size-14 rounded-xl bg-gold-soft/10 flex items-center justify-center">
                        <Package className="text-gold-soft" />
                     </div>
                     <h3 className="text-2xl font-display italic font-black tracking-widest text-gold-soft">Fountain-Ready Chocolate</h3>
                  </div>
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <span className="font-body text-[9px] font-black uppercase tracking-widest text-gold-soft opacity-40">The Formula</span>
                        <p className="font-serif italic text-lg leading-relaxed opacity-60">
                          Our exclusive Chocolate Barns formula is designed for perfect viscosity without additional oils. Extra cocoa butter is added directly to buttons for a flawless flow.
                        </p>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                           <span className="font-body text-[8px] font-bold text-gold-soft/30 uppercase">VARIETIES</span>
                           <p className="text-xs font-serif italic">Milk, Dark, White</p>
                        </div>
                        <div className="space-y-1">
                           <span className="font-body text-[8px] font-bold text-gold-soft/30 uppercase">QUALITY</span>
                           <p className="text-xs font-serif italic">Fresh-Melt Guarantee</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.section>

      {/* Event Moments - Visual Gallery */}
      <motion.section 
        className="px-6 lg:px-20 py-20"
        variants={fadeUp}
        viewport={sectionViewport}
      >
         <div className="max-w-[1400px] mx-auto space-y-16">
            <div className="text-center space-y-4">
               <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.6em]">Cinematic Occasions</span>
               <h2 className="text-4xl md:text-6xl font-display italic font-black leading-tight">Glimpses of <br /> Our Service</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { src: split1, label: 'GRAND WEDDINGS' },
                 { src: split2, label: 'CORPORATE GALAS' },
                 { src: split3, label: 'PRIVATE BOUTIQUE' }
               ].map((img, i) => (
                  <div key={i} className="relative aspect-[3/4] rounded-[50px] overflow-hidden border border-gold-soft/10 group">
                     <img 
                       src={img.src} 
                       className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-125" 
                       alt={img.label}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                     <div className="absolute bottom-10 left-10 right-10">
                        <span className="font-body text-[9px] font-black text-white/40 group-hover:text-gold-soft tracking-[0.5em] transition-colors">{img.label}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </motion.section>

      {/* Inquiry Form Section */}
      <motion.section 
        className="px-6 lg:px-20 py-20"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <CorporateInquiryForm />
      </motion.section>

      {/* Legacy Product Gallery Section */}
      <motion.section 
        className="px-6 lg:px-20 py-20 space-y-16"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="text-center space-y-6">
           <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.8em]">Exhibition Highlights</span>
           <h2 className="text-5xl font-display italic font-black">Occasion Gallery</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-20 overflow-x-auto no-scrollbar pb-4">
          {eventTypes.map((eventName) => (
            <button
              key={eventName}
              onClick={() => setSelectedEvent(eventName === selectedEvent ? '' : eventName)}
              className={`h-14 px-8 rounded-2xl font-body font-black text-[9px] uppercase tracking-[0.4em] transition-all border ${selectedEvent === eventName ? 'bg-gold-soft text-black border-transparent shadow-xl' : 'bg-black/40 border-gold-soft/10 text-gold-soft/40 hover:border-gold-soft hover:text-gold-soft'}`}
            >
              {eventName}
            </button>
          ))}
        </div>

        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-10">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20 animate-pulse">Extracting Event Matrix...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <ShoppingBag size={48} className="text-gold-soft/5" />
              <p className="font-display text-2xl italic text-gold-soft/20">No creations found perfectly fitted for this event.</p>
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
