import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, ChevronDown, Check, Zap, Star, ShieldCheck, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import HoverRevealProductCard from '../components/HoverRevealProductCard';
import CorporateInquiryForm from '../components/CorporateInquiryForm';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import GoldenScrollPath from '../components/GoldenScrollPath';
import FloatingIngredients from '../components/FloatingIngredients';
import { fadeDown, fadeUp, stagger } from '@/utils/motion';
import chatgptImg from '@/assets/ChatGPT Image Apr 8, 2026, 11_06_34 AM.png';
import SEO from '@/components/SEO';

export default function CorporateEvents() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const fetchCorporateProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', { params: { event: 'Corporate' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching corporate artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCorporateProducts();
    window.scrollTo(0, 0);
  }, [fetchCorporateProducts]);

  return (
    <motion.div
      className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative pt-32 space-y-32"
      variants={stagger(0.16)}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
    >
      <SEO 
        title="Corporate Gifting & Bespoke Enterprise Solutions | ChocoLux"
        description="Elevate your corporate relationships with ChocoLux. Premium artisanal gifting solutions for enterprises in Chennai, Coimbatore, and across India. Custom branding and bulk logistics available."
      />
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />
      <FloatingIngredients />

      {/* Hero: The Corporate Matrix */}
      <motion.section className="pt-24 pb-10 px-6 lg:px-20 text-center space-y-12" variants={fadeDown}>
        <div className="flex items-center justify-center gap-6">
           <div className="h-[1px] w-12 bg-gold-soft/30" />
           <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/60">Enterprise Gifting Protocol</span>
           <div className="h-[1px] w-12 bg-gold-soft/30" />
        </div>
        <h1 className="text-6xl md:text-[9vw] font-display font-black leading-[0.8] tracking-tighter">
          The Corporate <br /> <span className="italic font-light text-gold-soft/20 uppercase tracking-widest pl-4">Registry</span>
        </h1>
        <p className="max-w-2xl mx-auto font-serif text-2xl md:text-3xl italic text-gold-soft/40 leading-relaxed">
          Strategizing professional connections through the architecture of fine cacao and bespoke curation.
        </p>
      </motion.section>

      {/* Enterprise Values in India */}
      <motion.section 
        className="px-6 lg:px-20 py-20 bg-white/[0.02] border-y border-gold-soft/10"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12">
              <div className="space-y-4">
                 <span className="font-body text-[11px] text-gold-soft font-black uppercase tracking-[0.5em]">The Regional Standard</span>
                 <h2 className="text-5xl md:text-7xl font-display italic font-black text-ivory-warm leading-tight">Elite Gifting in <br /> Tamil Nadu</h2>
              </div>
              <p className="font-serif text-xl italic text-ivory-warm/60 leading-relaxed border-l-2 border-gold-soft/20 pl-10">
                From the boardroom high-rises of **Old Mahabalipuram Road** to the industrial powerhouses of **Coimbatore**, we provide the gold standard in enterprise appreciation. Our protocol includes specialized options for **Pongal**, **Diwali**, and **Annual Milestones**.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { title: 'Custom Identity', desc: 'Seal every box with your corporate insignia.' },
                   { title: 'Bulk Logistics', desc: 'Secure transit to thousands of stakeholders globally.' },
                   { title: 'Curated Portfolios', desc: 'Tiered gifting levels for different engagement scales.' },
                   { title: 'Tax Compliance', desc: 'Seamless GST integration for large scale acquisitions.' }
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
                alt="Corporate Enterprise Gifting"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-gold-soft/10 text-center">
                 <ShieldCheck className="mx-auto text-gold-soft mb-4" size={32} />
                 <p className="font-serif italic text-lg text-gold-soft">Trusted by Fortune 500 partners across the Indian subcontinent.</p>
              </div>
        </div>
        </div>
      </motion.section>

      {/* Bespoke Branding Spotlight: Logo on Cocoa */}
      <motion.section 
        className="px-6 lg:px-20 py-20"
        variants={fadeUp}
        viewport={sectionViewport}
      >
         <div className="max-w-7xl mx-auto rounded-[80px] bg-gradient-to-br from-[#1A1A1A] to-black border border-gold-soft/10 p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative group">
            <div className="absolute top-0 right-0 size-96 bg-gold-soft/5 blur-[120px] rounded-full group-hover:bg-gold-soft/10 transition-all duration-1000" />
            
            <div className="flex-1 space-y-10 relative z-10">
               <div className="space-y-4">
                  <span className="font-body text-[11px] text-gold-soft font-black uppercase tracking-[0.5em]">The Corporate Signature</span>
                  <h2 className="text-5xl md:text-7xl font-display italic font-black text-ivory-warm">Your Logo <br /> <span className="text-gold-soft not-italic">on Cocoa</span></h2>
               </div>
               <p className="font-serif text-2xl italic text-gold-soft/40 leading-relaxed">
                 Transform our artisanal bars into your brand's private artifact. We use high-precision laser-etching technology to place your corporate insignia directly onto the chocolate surface.
               </p>
               <ul className="space-y-4 pt-4">
                  {[
                    'Laser-Etched Chocolate Insignia',
                    'Custom Gold-Foil Outer Sleeves',
                    'Bespoke Silk-Lined Presentation Boxes'
                  ].map(feature => (
                    <li key={feature} className="flex items-center gap-4 text-[10px] font-body font-black uppercase tracking-widest text-white/50">
                       <Star size={16} className="text-gold-soft" /> {feature}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-[40px] border border-gold-soft/10 bg-black/40 flex items-center justify-center p-12 text-center group-hover:border-gold-soft transition-all duration-700">
               <div className="space-y-8">
                  <div className="size-48 border-[3px] border-dashed border-gold-soft/20 rounded-full flex flex-col items-center justify-center p-8 mx-auto -rotate-12 group-hover:rotate-0 group-hover:border-gold-soft transition-all duration-1000">
                     <span className="font-display text-2xl italic font-black text-gold-soft opacity-30 group-hover:opacity-100">YOUR <br /> LOGO</span>
                  </div>
                  <div className="space-y-3">
                     <p className="font-body text-[12px] font-black uppercase tracking-widest text-gold-soft">The Branding Matrix</p>
                     <p className="font-serif italic text-white/20 italic">Visualizing your identity in cacao.</p>
                  </div>
               </div>
               <Sparkles size={24} className="absolute top-12 left-12 text-gold-soft opacity-20" />
               <Sparkles size={16} className="absolute bottom-12 right-12 text-gold-soft opacity-20" />
            </div>
         </div>
      </motion.section>

      {/* Corporate Artifact Highlights */}
      <motion.section 
        className="px-6 lg:px-20 py-20 space-y-16"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <div className="text-center space-y-6">
           <span className="font-body text-[10px] text-gold-soft/40 uppercase tracking-[0.8em]">Signature Selections</span>
           <h2 className="text-5xl font-display italic font-black">Corporate Showcase</h2>
        </div>

        <div className="max-w-[1700px] mx-auto min-h-[400px]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-10">
              <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20 animate-pulse">Processing Enterprise Registry...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-8 bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
              <ShoppingBag size={48} className="text-gold-soft/5" />
              <p className="font-display text-2xl italic text-gold-soft/20">Establishing connection to the corporate vault...</p>
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

      {/* Engagement Matrix: Service Blocks */}
      <motion.section 
        className="px-6 lg:px-20 py-20"
        variants={fadeUp}
        viewport={sectionViewport}
      >
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap size={32} />, title: 'Expedited Fulfillment', desc: 'Secure same-day dispatch for critical professional gestures.' },
              { icon: <Star size={32} />, title: 'Bespoke Branding', desc: 'Laser-etched logos on premium cocoa and custom box identity.' },
              { icon: <ShieldCheck size={32} />, title: 'Enterprise Support', desc: 'Dedicated curators for large-scale logistics and planning.' }
            ].map((s, i) => (
               <div key={i} className="p-10 bg-white/[0.02] border border-gold-soft/10 rounded-[40px] space-y-6 hover:border-gold-soft transition-all">
                  <div className="text-gold-soft">{s.icon}</div>
                  <h3 className="text-2xl font-display italic font-black">{s.title}</h3>
                  <p className="font-serif italic text-gold-soft/40">{s.desc}</p>
               </div>
            ))}
         </div>
      </motion.section>

      {/* Corporate Inquiry Matrix */}
      <motion.section 
        className="px-6 lg:px-20 py-20"
        variants={fadeUp}
        viewport={sectionViewport}
      >
        <CorporateInquiryForm />
      </motion.section>

      {/* Contact Hub */}
      <motion.section className="px-6 lg:px-20 py-20 bg-black/40 border-t border-gold-soft/10" variants={fadeUp}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
           <div className="space-y-4">
              <Mail className="mx-auto opacity-30" size={24} />
              <p className="font-body text-[10px] font-black uppercase tracking-widest opacity-20">DIRECT_LINE</p>
              <p className="text-xl font-display italic">concierge@chocolux.asia</p>
           </div>
           <div className="space-y-4">
              <Phone className="mx-auto opacity-30" size={24} />
              <p className="font-body text-[10px] font-black uppercase tracking-widest opacity-20">VOICE_FREQ</p>
              <p className="text-xl font-display italic">+91 44 2833 0000</p>
           </div>
           <div className="space-y-4">
              <MapPin className="mx-auto opacity-30" size={24} />
              <p className="font-body text-[10px] font-black uppercase tracking-widest opacity-20">CENTRAL_STATION</p>
              <p className="text-xl font-display italic">Chennai, Tamil Nadu</p>
           </div>
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
