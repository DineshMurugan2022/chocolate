import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MeltHero from '@/components/MeltHero';
import HoverRevealProductCard from '@/components/HoverRevealProductCard';
import UnifiedBoxBuilder from '@/components/UnifiedBoxBuilder';
import CollectionCard from '@/components/CollectionCard';
import StorytellingScroll from '@/components/StorytellingScroll';
import GoldenScrollPath from '@/components/GoldenScrollPath';
import FloatingIngredients from '@/components/FloatingIngredients';
import BrandMarquee from '@/components/BrandMarquee';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import type { AppDispatch } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { fadeIn, fadeUp, stagger } from '@/utils/motion';
import { BRANDS } from '@/data/brands';
import { type Product } from '@/../../shared/types';
import SEO from '@/components/SEO';

export default function Home() {
   const navigate = useNavigate();
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [activeTab, setActiveTab] = useState<'brands' | 'events'>('brands');
   const [selectedCollection, setSelectedCollection] = useState<string>('');
   const containerRef = useRef<HTMLDivElement>(null);
   const dispatch = useDispatch<AppDispatch>();
   const reduceMotion = useReducedMotion();
   const sectionViewport = { once: true, margin: '0px 0px -140px 0px' };

   const { data: products = [] } = useQuery<Product[]>({
      queryKey: ['products'],
      queryFn: async () => {
         const response = await api.get('/products');
         const data = response.data.products || response.data;
         return Array.isArray(data) ? data : [];
      }
   });

   const handleAddToCart = useCallback((p: Product) => {
      dispatch(addToCart({
         id: p._id,
         name: p.name,
         price: p.price,
         image: p.image,
         quantity: 1,
         category: p.category
      }));
      setIsCartOpen(true);
   }, [dispatch]);

   const handleBrandClick = useCallback((brand: string) => {
      setSelectedCollection(brand);
      document.getElementById('exhibition-registry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, []);

   const handleEventClick = useCallback((eventTitle: string) => {
      const path = `/events/${eventTitle.toLowerCase().replace(' ', '-')}`;
      navigate(path);
   }, [navigate]);

   const brandsData = useMemo(() => BRANDS, []);

   const eventsData = [
      { title: 'Wedding', image: '/images/collections/event_wedding_1775207370802.png', description: 'Atelier Wedding Truffles' },
      { title: 'Family', image: '/images/collections/event_birthday_1775207386610.png', description: 'Artisan Party Packs' },
      { title: 'Birthday', image: '/images/collections/event_corporate_1775207405890.png', description: 'Strategic Gifting Boutique' },
      { title: 'Gifts', image: '/images/collections/event_gifting_1775207422111.png', description: 'Curated Sensory Hampers' }
   ];

   const filteredProducts = useMemo(() => {
      if (!selectedCollection) return products;
      return products.filter(p => {
         if (activeTab === 'brands') return p.brand === selectedCollection;
         if (activeTab === 'events') return p.events && p.events.includes(selectedCollection);
         return true;
      });
   }, [products, selectedCollection, activeTab]);

   return (
      <motion.div
         ref={containerRef}
         className="relative w-full transition-all duration-1000 bg-transparent"
         variants={stagger(0.16)}
         initial={reduceMotion ? false : 'hidden'}
         animate="show"
      >
         <SEO 
            title="ChocoLux | Premium Chocolate Shop in Tamil Nadu"
            description="Experience the finest artisanal chocolates in India. Crafted with heritage ingredients like Karupatti and Himalayan Honey. Your luxury chocolate destination in Chennai and beyond."
         />
         <Header setIsCartOpen={setIsCartOpen} />

         <GoldenScrollPath />
         <FloatingIngredients />

         <motion.main className="w-full relative z-10" variants={stagger(0.2)}>
            {/* Step 1: The Melt (Hero) */}
            <motion.section variants={fadeIn}>
               <MeltHero />
            </motion.section>

            {/* INTERMEDIATE STORYTELLING TEXT */}
            <motion.section
               className="relative pt-10 pb-0 px-6 text-center overflow-hidden"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="max-w-4xl mx-auto space-y-8"
               >
                  <span className="font-body text-[10px] font-black uppercase tracking-[1.2rem] text-gold-soft opacity-60">The Botanical Odyssey</span>
                  <h2 className="text-3xl md:text-6xl font-display italic font-black text-gold-soft leading-tight">
                     A symphony of rare cocoa estates <br /> harvested for the modern connoisseur.
                  </h2>
                  <div className="w-[1px] h-12 bg-gradient-to-b from-gold-soft/40 to-transparent mx-auto" />
               </motion.div>
            </motion.section>

            {/* Step 3: Partner Brands & Event Curations Highlights */}
            <motion.section
               className="relative py-20 px-6 lg:px-20 bg-transparent border-t border-gold-soft/10"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <div className="max-w-[1700px] mx-auto space-y-16">
                  {/* Category Toggle Buttons */}
                  <div className="flex flex-wrap justify-center gap-6">
                     <button
                        onClick={() => { setActiveTab('brands'); setSelectedCollection(''); }}
                        className={`px-8 py-4 rounded-full font-body text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ease-out border ${activeTab === 'brands' ? 'bg-gold-soft text-black border-gold-soft shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-transparent text-gold-soft/60 border-gold-soft/20 hover:border-gold-soft/50 hover:text-gold-soft'}`}
                     >
                        Discover Brands
                     </button>
                     <button
                        onClick={() => { setActiveTab('events'); setSelectedCollection(''); }}
                        className={`px-8 py-4 rounded-full font-body text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ease-out border ${activeTab === 'events' ? 'bg-gold-soft text-black border-gold-soft shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-transparent text-gold-soft/60 border-gold-soft/20 hover:border-gold-soft/50 hover:text-gold-soft'}`}
                     >
                        Shop by Events
                     </button>
                  </div>

                  <AnimatePresence mode="wait">
                     {activeTab === 'brands' ? (
                        <motion.div
                           key="brands"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.6 }}
                        >
                           <BrandMarquee 
                              onBrandClick={handleBrandClick} 
                           />
                        </motion.div>
                     ) : (
                        <motion.div
                           key="events"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.6 }}
                           className="space-y-12 relative"
                        >
                           <div className="text-center space-y-4">
                              <span className="font-body text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-gold-soft opacity-60">The Curator's Calendar</span>
                              <h2 className="text-4xl md:text-7xl font-display italic font-black text-white">Tailored Occasions</h2>
                           </div>

                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 max-w-[1400px] mx-auto">
                              {eventsData.map((eData, i) => (
                                 <motion.div
                                    key={eData.title}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, rotateX: 10 }}
                                    whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                                    transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="perspective-1000"
                                 >
                                    <CollectionCard
                                       title={eData.title}
                                       image={eData.image}
                                       description={eData.description}
                                       shape="landscape"
                                       onClick={() => handleEventClick(eData.title)}
                                    />
                                 </motion.div>
                              ))}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </motion.section>

            {/* Step 2: The Exhibition (Hyper-Minimalist Lyra Grid) */}
            <motion.section
               id="exhibition-registry"
               className="relative pt-8 pb-24 md:pb-60 px-6 lg:px-20 overflow-hidden bg-transparent"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <div className="absolute inset-0 opacity-0 pointer-events-none" />

               <div className="max-w-[1400px] mx-auto relative z-10">
                  <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
                     <div className="flex flex-col gap-6 max-w-2xl">
                        <span className="font-body text-[10px] md:text-[14px] font-black uppercase text-gold-soft tracking-[0.5em] md:tracking-[1em] mb-4 opacity-100">The Exhibition Registry</span>
                        <h2 className="text-4xl md:text-9xl font-display font-black leading-[0.85] tracking-tight text-white opacity-100">
                           Reveal the <br /> <span className="not-italic font-black text-gold-soft">Soul</span>
                        </h2>
                     </div>
                     <div className="max-w-xs text-right">
                        <p className="font-serif italic text-xl md:text-4xl leading-relaxed text-gold-soft font-bold">
                           Experience the molecular architecture of our heritage artifacts.
                        </p>
                     </div>
                  </div>

                  {filteredProducts && filteredProducts.length > 0 ? (
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {filteredProducts.map((product) => (
                           <HoverRevealProductCard
                              key={product._id}
                              product={product}
                              onAddToCart={handleAddToCart}
                           />
                        ))}
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-20 opacity-30">
                        <span className="font-body text-xs uppercase tracking-widest text-gold-soft">No artifacts found for this selection</span>
                     </div>
                  )}
               </div>
            </motion.section>

            {/* Step 4: The Lab (Build Your Box) */}
            <motion.section
               className="relative py-20 px-6 lg:px-20 bg-transparent"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <div className="max-w-[1400px] mx-auto">
                  <div className="mb-20 text-center space-y-4">
                     <h2 className="text-5xl md:text-8xl font-display italic font-black text-white">The Heritage Crate</h2>
                     <p className="font-body text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-gold-soft">Design Your Personal Collection</p>
                  </div>
                  <UnifiedBoxBuilder 
                     size={9} 
                     title="Heritage Crate" 
                     description="Design Your Personal Collection"
                     priceMode="dynamic"
                  />
               </div>
            </motion.section>

            <motion.section
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <StorytellingScroll />
            </motion.section>

            <motion.section
               className="relative py-32 px-6 lg:px-20 border-t border-cocoa-deep/10 mt-20"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <div className="max-w-4xl mx-auto text-center space-y-16">
                  <h3 className="text-4xl md:text-7xl font-display italic font-black text-gold-soft leading-tight">
                     "The most beautiful chocolate journey <br /> is the one that never ends."
                  </h3>
                  <div className="flex items-center justify-center gap-10">
                     <div className="h-[2px] w-24 bg-gold-soft" />
                     <span className="font-body text-[12px] font-black uppercase tracking-[1em] text-gold-soft">END_REGISTRY</span>
                     <div className="h-[2px] w-24 bg-gold-soft" />
                  </div>
               </div>
            </motion.section>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
         </motion.main>

         <Footer />
      </motion.div>
   );
}
