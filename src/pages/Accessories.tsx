import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';
import { ShoppingBag, Zap, Settings, Hammer, Package, Check, Info, ArrowRight, Star, Plus } from 'lucide-react';
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
import KababImg from '@/assets/KABAB.png';

const HardwareSection = ({ id, title, subtitle, description, image, features, hotspots, index }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} id={id} className="min-h-screen py-40 px-6 lg:px-20 relative flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10"
      >
        <div className={`space-y-12 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
          <div className="space-y-6">
            <span className="font-body text-[12px] font-black uppercase tracking-[0.8em] text-gold-soft/60">INSTRUMENT_00{index + 1}</span>
            <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.85] text-white italic">
              {title.split(' ')[0]} <br /> <span className="text-gold-soft not-italic">{title.split(' ')[1]}</span>
            </h2>
          </div>
          <p className="font-serif text-2xl md:text-4xl italic text-gold-soft/40 leading-relaxed">
            {description}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f: string) => (
              <li key={f} className="flex items-center gap-4 text-[10px] font-body font-black uppercase tracking-widest text-white/50">
                <Check size={16} className="text-gold-soft" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group perspective-1000">
          <motion.div
            className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-gold-soft/10 shadow-2xl"
          >
            <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]" alt={title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Hotspots */}
            {hotspots.map((hs: any, i: number) => (
              <div
                key={i}
                className="absolute group/hs"
                style={{ top: hs.top, left: hs.left }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="size-6 bg-gold-soft rounded-full flex items-center justify-center cursor-help shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                >
                  <Plus size={12} className="text-black" />
                </motion.div>
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-48 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-gold-soft/20 opacity-0 group-hover/hs:opacity-100 transition-all pointer-events-none transform translate-x-4 group-hover/hs:translate-x-0">
                  <p className="font-body text-[8px] font-black uppercase tracking-widest text-gold-soft mb-2">{hs.label}</p>
                  <p className="font-serif italic text-xs text-cocoa-deep leading-relaxed">{hs.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default function Accessories() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

  const hardware = [
    {
      id: "fountain",
      title: "Ceremonial Fountain",
      description: "A breathtaking display of flowing dark chocolate, designed to be the centerpiece of any high-end ritual.",
      image: "/images/accessories/premium_chocolate_fountain_1775819513266.png",
      features: ["Dual-Drive Motor System", "Adjustable Flow Rate", "30-Inch Multi-Tier", "Food-Grade Stainless Steel"],
      hotspots: [
        { top: '30%', left: '40%', label: 'Flow Matrix', desc: 'Precision engineered levels for seamless cascade.' },
        { top: '80%', left: '70%', label: 'Induction Base', desc: 'Quiet heating system maintains 32°C.' }
      ]
    },
    {
      id: "kabab",
      title: "Chocolate Kabab Display",
      description: "A signature serving instrument specifically crafted for the showcase of chocolate-dipped botanical skewers.",
      image: KababImg,
      features: ["Vertical Cacao Pillar", "Artisan Steel Hooks", "Tempered Marble Base", "Ceremonial Tray Support"],
      hotspots: [
        { top: '25%', left: '45%', label: 'Cacao Hook', desc: 'Surgical steel for high-retention dipping.' },
        { top: '75%', left: '35%', label: 'Catch Reservoir', desc: 'Captures artisanal runoff for redirection.' }
      ]
    },
    {
      id: "melter",
      title: "Precision Melter",
      description: "Master the alchemical state of chocolate with induction heating that holds temperature to the exact degree.",
      image: "/images/accessories/chocolate_melting_machine_1775819528652.png",
      features: ["0.1°C Temp Precision", "Integrated Thermometer", "Ceramic Coating", "Heirloom Build Quality"],
      hotspots: [
        { top: '45%', left: '55%', label: 'Alchemic Control', desc: 'Digital registry for precise tempering curves.' },
        { top: '15%', left: '30%', label: 'Thermal Sink', desc: 'Ensures zero hot-spots on the cacao lattice.' }
      ]
    },
    {
      id: "baking",
      title: "Baking Instruments",
      description: "The professional toolkit for the artisan: custom molds and hand-crafted scrapers.",
      image: "/images/accessories/artisanal_baking_tools_1775819542850.png",
      features: ["Silicon Architecture", "High-Carbon Steel", "Designer Liners", "Professional Sizing"],
      hotspots: [
        { top: '60%', left: '50%', label: 'Silicon Mold', desc: 'Heat-resistant, non-stick molecular design.' },
        { top: '25%', left: '40%', label: 'Precision Tongs', desc: 'Hand-positioning for botanical coronation.' }
      ]
    }
  ];

  const fetchAccessories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', { params: { category: 'Accessories' } });
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching accessories artifacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccessories();
    window.scrollTo(0, 0);
  }, [fetchAccessories]);

  return (
    <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-cocoa-deep overflow-x-hidden relative">
      <SEO
        title="Artisanal Accessories & Molecular Hardware | ChocoLux SHOP"
        description="Equip your kitchen with professional-grade chocolate fountains, melting machines, and artisanal baking molds. Stunning collection for the modern chocolatier."
      />
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GoldenScrollPath />

      {/* Hero: Dramatic and Visual */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-soft blur-[150px] rounded-full" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="space-y-12 relative z-10">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="hidden sm:block h-[1px] w-12 bg-gold-soft/30" />
            <span className="font-body text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-gold-soft/60">The Artisan Hardware Registry</span>
            <div className="hidden sm:block h-[1px] w-12 bg-gold-soft/30" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-[10vw] font-display font-black leading-[0.8] tracking-tighter text-white">
            Precision <br /> <span className="italic font-light text-gold-soft/20 uppercase tracking-widest pl-4">Hardware</span>
          </h1>
          <p className="max-w-xl mx-auto font-serif text-lg md:text-xl lg:text-3xl italic text-gold-soft/40 px-4">
            The structural instruments required to master the alchemical properties of cacao.
          </p>
          <div className="pt-20">
            <div className="w-[1px] h-32 bg-gradient-to-b from-gold-soft to-transparent mx-auto" />
            <span className="font-body text-[9px] uppercase font-black tracking-widest text-gold-soft mt-4 block">EXPLORE THE INSTRUMENTS</span>
          </div>
        </motion.div>
      </section>

      {/* Immersive Hardware Sections */}
      {hardware.map((item, index) => (
        <HardwareSection key={item.id} {...item} index={index} />
      ))}

      {/* Collection Highlights Grid */}
      <section className="py-40 px-6 lg:px-20 bg-black/40">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <span className="font-body text-[11px] text-gold-soft/40 uppercase tracking-[0.8em]">Shop Hardware</span>
            <h2 className="text-6xl font-display italic font-black text-white">Our Collection</h2>
          </div>

          <div className="min-h-[400px]">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center animate-pulse">
                <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/20">Establishing Hardware Protocol...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center gap-8 bg-white/[0.02] rounded-[60px] border border-dashed border-gold-soft/10 text-center px-10">
                <Settings size={48} className="text-gold-soft/5 mx-auto" />
                <p className="font-display text-2xl italic text-gold-soft/20">Contact our shop for current available custom instrumentation.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {products.map((p, idx) => (
                  <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
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
        </div>
      </section>

      {/* Packaging Section: Enhanced with stunning imagery focus */}
      <section className="px-6 lg:px-20 py-40 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="font-body text-[11px] text-gold-soft font-black uppercase tracking-[0.5em]">The Final Ritual</span>
              <h2 className="text-6xl md:text-8xl font-display italic font-black text-ivory-warm leading-[0.85]">Custom Shop <br /> Packaging</h2>
            </div>
            <p className="font-serif text-2xl md:text-3xl italic text-gold-soft/40 leading-relaxed max-w-lg">
              Every masterpiece requires a worthy frame. We provide pro-grade boxes and liners to secure your artisanal home creations.
            </p>
            <button className="px-12 py-6 bg-gold-soft text-black font-body text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl">Request Custom Portfolio</button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {[
              { icon: <Package />, label: "GIFT_BOXES", delay: 0 },
              { icon: <Star />, label: "SILK_LINERS", delay: 0.2 },
              { icon: <Settings />, label: "GOLD_SEALS", delay: 0.4 },
              { icon: <Zap />, label: "THERMAL_LID", delay: 0.6 }
            ].map(item => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                className="aspect-square bg-white/[0.02] border border-gold-soft/10 rounded-[40px] flex flex-col items-center justify-center gap-6 group hover:border-gold-soft transition-all"
              >
                <div className="text-gold-soft opacity-30 group-hover:opacity-100 group-hover:scale-125 transition-all">
                  {item.icon}
                </div>
                <span className="font-body text-[9px] font-black uppercase tracking-widest text-gold-soft/40 group-hover:text-gold-soft">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
