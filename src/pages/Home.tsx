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
import { motion } from 'framer-motion';
import axios from 'axios';

import prod1 from '../assets/product/bgremove_5dff1f0908_bgremoved_1774415915012.png';
import prod2 from '../assets/product/choco6.png';
import prod3 from '../assets/product/choco1.jpeg';
import prod4 from '../assets/product/bgremove_af9dbc3bd9_bgremoved_1774415903328.png';
import prod5 from '../assets/product/bgremove_540e951e68_bgremoved_1774415905503.png';
import prod6 from '../assets/product/bgremove_501f18b4f6_bgremoved_1774415893848.png';
import prod7 from '../assets/product/WhatsApp Image 2026-03-23 at 5.27.56 PM.jpeg';
import prod8 from '../assets/product/WhatsApp Image 2026-03-23 at 5.26.05 PM.jpeg';
import prod9 from '../assets/product/WhatsApp Image 2026-03-23 at 5.24.38 PM.jpeg';
import prod10 from '../assets/product/WhatsApp Image 2026-03-23 at 4.57.22 PM.jpeg';
import prod11 from '../assets/product/WhatsApp Image 2026-03-23 at 4.53.41 PM(1).jpeg';

const exhibitionProducts = [
   { _id: 'ex1', name: "Mandala Mix 200g", price: 1250, weight: "200G", image: prod1, category: "Cylindrical Collection" },
   { _id: 'ex2', name: "Lyra Maximum", price: 1450, weight: "200G", image: prod2, category: "Heritage Registry" },
   { _id: 'ex3', name: "Colombia Origin 70%", price: 850, weight: "90G", image: prod3, category: "Single Estate" },
   { _id: 'ex4', name: "Botanical Essence", price: 1100, weight: "150G", image: prod4, category: "Aromatic Blend" },
   { _id: 'ex5', name: "Dark Alchemy", price: 1350, weight: "180G", image: prod5, category: "Noir Series" },
   { _id: 'ex6', name: "Silk Road Nibs", price: 950, weight: "120G", image: prod6, category: "Crunch Matrix" },
   { _id: 'ex7', name: "Golden Leaf Ganache", price: 2100, weight: "250G", image: prod7, category: "Royal Edition" },
   { _id: 'ex8', name: "Midnight Truffle", price: 1800, weight: "200G", image: prod8, category: "Twilight Selection" },
   { _id: 'ex9', name: "Floral Infusion", price: 1050, weight: "100G", image: prod9, category: "Botanical Series" },
   { _id: 'ex10', name: "Zest & Spice", price: 1150, weight: "110G", image: prod10, category: "Spice Registry" },
   { _id: 'ex11', name: "Velvet Cacao", price: 1600, weight: "160G", image: prod11, category: "Smooth Synthesis" }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [products, setProducts] = useState<any[]>([]);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data.products || response.data);
         } catch (error) {
            console.error("Error fetching botanical artifacts:", error);
         }
      };
      fetchProducts();
   }, []);

   // Background logic removed as it was unused and causing lint errors

   return (
      <motion.div
         ref={containerRef}
         className="relative w-full transition-all duration-1000 bg-transparent"
      >

         <Header setIsCartOpen={setIsCartOpen} />

         <GoldenScrollPath />
         <FloatingIngredients />

         <main className="w-full relative z-10">

            {/* Step 1: The Melt (Hero) */}
            <MeltHero />

            {/* Step 2: The Exhibition (Hyper-Minimalist Lyra Grid) */}
            <section className="relative py-24 md:py-60 px-6 lg:px-20 overflow-hidden bg-[#F5F2ED]/20">
               {/* Subtle Grid Pattern Overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }} />

               <div className="max-w-[1400px] mx-auto relative z-10">
                  <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-10">
                     <div className="flex flex-col gap-6 max-w-2xl">
                        <span className="font-body text-[10px] md:text-[14px] font-black uppercase text-burnt-caramel tracking-[0.5em] md:tracking-[1em] mb-4 opacity-100">The Exhibition Registry</span>
                        <h2 className="text-4xl md:text-9xl font-display font-black leading-[0.85] tracking-tight text-[#1A0F0D] opacity-100">
                           Reveal the <br /> <span className="not-italic font-black text-botanical-green">Soul</span>
                        </h2>
                     </div>
                     <div className="max-w-xs text-right">
                        <p className="font-serif italic text-xl md:text-4xl leading-relaxed text-[#1A0F0D] font-bold">
                           Experience the molecular architecture of our heritage artifacts.
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                     {exhibitionProducts.map((product: any) => (
                        <HoverRevealProductCard
                           key={product._id}
                           product={product}
                           onAddToCart={() => setIsCartOpen(true)}
                        />
                     ))}
                     {products && products.length > 0 && products.filter(p => !exhibitionProducts.find(ex => ex.name === p.name)).map((product: any) => (
                        <HoverRevealProductCard
                           key={product._id}
                           product={product}
                           onAddToCart={() => setIsCartOpen(true)}
                        />
                     ))}
                  </div>
               </div>
            </section>

            {/* Step 3: The Lab (Build Your Box) */}
            <section className="relative py-40 px-6 lg:px-20 bg-transparent">
               <div className="max-w-[1400px] mx-auto">
                  <div className="mb-32 text-center">
                     <h2 className="text-4xl md:text-[8vw] font-display italic font-black text-[#1A0F0D] leading-none mb-10 block opacity-100 drop-shadow-sm">The_Crate_Architect</h2>
                     <p className="font-body text-[14px] font-black uppercase tracking-[1em] text-[#B3530F] opacity-100 italic">Configure Your Personal Legacy Collection</p>
                  </div>
                  <BuildYourBox />
               </div>
            </section>

            {/* Step 4: Storytelling */}
            <StorytellingScroll />

            {/* Final Base */}
            <section className="relative py-60 px-6 lg:px-20 border-t border-cocoa-deep/10 mt-40">
               <div className="max-w-4xl mx-auto text-center space-y-16">
                  <h3 className="text-4xl md:text-7xl font-display italic font-black text-cocoa-deep leading-tight">
                     "The most beautiful chocolate journey <br /> is the one that never ends."
                  </h3>
                  <div className="flex items-center justify-center gap-10">
                     <div className="h-[2px] w-24 bg-burnt-caramel" />
                     <span className="font-body text-[12px] font-black uppercase tracking-[1em] text-cocoa-deep">END_REGISTRY</span>
                     <div className="h-[2px] w-24 bg-burnt-caramel" />
                  </div>
               </div>
            </section>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
         </main>

         <Footer />
      </motion.div>
   );
}
