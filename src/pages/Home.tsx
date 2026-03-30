import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import MeltHero from '@/components/MeltHero';
import HoverRevealProductCard from '@/components/HoverRevealProductCard';
import BuildYourBox from '@/components/BuildYourBox';
import StorytellingScroll from '@/components/StorytellingScroll';
import GoldenScrollPath from '@/components/GoldenScrollPath';
import FloatingIngredients from '@/components/FloatingIngredients';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { motion, useReducedMotion } from 'framer-motion';
import api from '@/utils/api';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { fadeIn, fadeUp, stagger } from '@/utils/motion';

export default function Home() {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [products, setProducts] = useState<Product[]>([]);
   const containerRef = useRef<HTMLDivElement>(null);
   const dispatch = useDispatch<AppDispatch>();
   const reduceMotion = useReducedMotion();
   const sectionViewport = { once: true, margin: '0px 0px -140px 0px' };

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await api.get('/products');
            const data = response.data.products || response.data;
            setProducts(Array.isArray(data) ? data : []);
         } catch (error) {
            console.error("Error fetching botanical artifacts:", error);
            setProducts([]); // Ensure it stays an array even on error
         }
      };
      fetchProducts();
   }, []);

   // Background logic removed as it was unused and causing lint errors

   return (
      <motion.div
         ref={containerRef}
         className="relative w-full transition-all duration-1000 bg-transparent"
         variants={stagger(0.16)}
         initial={reduceMotion ? false : 'hidden'}
         animate="show"
      >

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

            {/* Step 2: The Exhibition (Hyper-Minimalist Lyra Grid) */}
            <motion.section
               className="relative pt-8 pb-24 md:pb-60 px-6 lg:px-20 overflow-hidden bg-transparent"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               {/* Subtle Overlay Removed */}
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

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                     {Array.isArray(products) && products.map((product) => (
                        <HoverRevealProductCard
                           key={product._id}
                           product={product}
                           onAddToCart={(p) => {
                              dispatch(addToCart({
                                 id: p._id,
                                 name: p.name,
                                 price: p.price,
                                 image: p.image,
                                 quantity: 1,
                                 category: p.category
                              }));
                              setIsCartOpen(true);
                           }}
                        />
                     ))}
                  </div>
               </div>
            </motion.section>

            {/* Step 3: The Lab (Build Your Box) */}
            <motion.section
               className="relative py-20 px-6 lg:px-20 bg-transparent"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <div className="max-w-[1400px] mx-auto">
                  <div className="mb-20 text-center space-y-4">
                     <h2 className="text-5xl md:text-8xl font-display italic font-black text-white">The Crate Architect</h2>
                     <p className="font-body text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-gold-soft">Design Your Personal Collection</p>
                  </div>
                  <BuildYourBox />
               </div>
            </motion.section>

            {/* Step 4: Storytelling */}
            <motion.section
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <StorytellingScroll />
            </motion.section>

            {/* Final Base */}
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

interface Product {
   _id: string;
   name: string;
   price: number;
   image: string;
   category?: string;
}
