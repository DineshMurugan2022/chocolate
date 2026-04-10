import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import api from '@/utils/api';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { addToCart } from '@/store/cartSlice';
import BoutiqueProductCard from '@/components/BoutiqueProductCard';
import CustomerReviews from '@/components/CustomerReviews';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Skeleton from '@/components/Skeleton';
import { fadeIn, fadeUp, slideLeft, slideRight, stagger } from '@/utils/motion';

const ProductDetailsSkeleton = () => (
   <div className="min-h-screen bg-cocoa-deep pt-32 px-6 md:px-12 lg:px-16 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         <div className="space-y-12">
            <div className="space-y-4">
               <Skeleton className="w-24 h-6 bg-cocoa-deep/5" />
               <Skeleton className="w-full h-24 bg-cocoa-deep/5" />
               <Skeleton className="w-3/4 h-8 bg-cocoa-deep/5" />
            </div>
            <Skeleton className="w-full h-40 bg-cocoa-deep/5" />
         </div>
         <div className="relative h-[600px] lg:h-[800px] bg-cocoa-deep/5 rounded-[40px] flex items-center justify-center overflow-hidden">
            <Skeleton className="w-[80%] h-[80%] rounded-full bg-cocoa-deep/5" variant="circular" />
         </div>
      </div>
   </div>
);

import SEO from '@/components/SEO';

const ProductDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const reduceMotion = useReducedMotion();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [activeImage, setActiveImage] = useState<string | null>(null);
   const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
            const relatedRes = await api.get(`/products/${id}/related`);
            setRelatedProducts(relatedRes.data);
         } catch (err) {
            console.error("Error fetching product details:", err);
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
      window.scrollTo(0, 0);
   }, [id]);

   if (loading) return <ProductDetailsSkeleton />;

   if (!product) return (
      <div className="min-h-screen bg-ivory-warm flex flex-col items-center justify-center text-cocoa-deep space-y-6">
         <h1 className="text-5xl font-display italic text-burnt-caramel">Harvest missing</h1>
         <button onClick={() => navigate('/')} className="font-body text-[10px] uppercase font-black text-cocoa-deep/20 hover:text-cocoa-deep transition-all">Go Back to Shop</button>
      </div>
   );

   return (
      <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-black relative overflow-hidden">
         <SEO 
            title={`${product.name} | Artisanal Chocolate`}
            description={product.description}
            image={product.image}
         />
         {/* Background Organic Textures & Glows */}
         <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] aspect-square bg-burnt-caramel/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square bg-gold-soft/5 blur-[120px] rounded-full" />
         </div>

         <Header setIsCartOpen={setIsCartOpen} />
         <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

         <motion.main
            className="w-full px-6 lg:px-20 pt-20 pb-20 relative z-10 max-w-[1400px] mx-auto"
            variants={stagger(0.18)}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
         >
            <button
               onClick={() => navigate(-1)}
               className="flex items-center gap-4 text-gold-soft/30 hover:text-gold-soft transition-all mb-8 text-[10px] font-black uppercase tracking-[0.5em] group"
            >
               <div className="size-8 rounded-full border border-gold-soft/10 flex items-center justify-center group-hover:border-gold-soft transition-colors">
                  <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
               </div>
               Back to Registry_Inventory
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
               {/* Left: Visual Showcase - Cinematic Aura */}
               <motion.div
                  variants={slideLeft}
                  className="space-y-8 relative"
               >
                  <div className="relative aspect-square bg-black/20 backdrop-blur-3xl rounded-[60px] border border-gold-soft/10 flex items-center justify-center overflow-hidden group shadow-2xl">
                     {/* Product Aura Glow */}
                     <div className="absolute inset-0 bg-gold-soft/5 group-hover:bg-gold-soft/10 blur-3xl transition-all duration-700 pointer-events-none" />
                     
                     <AnimatePresence mode="wait">
                        <motion.img
                           key={activeImage || product.image}
                           initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                           animate={{ opacity: 1, scale: 1, rotate: 0 }}
                           exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                           src={activeImage || product.image}
                           className="w-[85%] h-[85%] object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-1000 mix-blend-screen"
                           alt={product.name}
                        />
                     </AnimatePresence>
                  </div>

                  {((product.images && product.images.length > 0) || product.image) && (
                     <div className="flex flex-wrap gap-6 justify-center">
                        {[product.image, ...(product.images || [])].map((img, i) => (
                           <button
                              key={i}
                              onClick={() => setActiveImage(img)}
                              className={`w-24 h-24 rounded-2xl overflow-hidden border transition-all p-4 bg-black/40 backdrop-blur-md ${
                                 (activeImage === img || (!activeImage && img === product.image))
                                    ? 'border-gold-soft shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-110'
                                    : 'border-gold-soft/10 hover:border-gold-soft/30'
                              }`}
                           >
                              <img src={img} className="w-full h-full object-contain mix-blend-screen" alt={`Matrix ${i + 1}`} />
                           </button>
                        ))}
                     </div>
                  )}
               </motion.div>

               {/* Right: Product Details - Molecular Registry */}
               <motion.div
                  variants={slideRight}
                  className="flex flex-col space-y-8"
               >
                   <div className="space-y-8">
                      <div className="flex items-center gap-4">
                         <div className="h-px w-12 bg-gold-soft/40" />
                         <span className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.8em]">
                            {product.category || 'Limited Edition Artifact'}
                         </span>
                      </div>
                      
                      <h1 className="text-5xl md:text-8xl font-display font-black text-gold-soft leading-[0.9] tracking-tighter italic capitalize">
                         {product.name}
                      </h1>
                      
                      <div className="flex items-baseline gap-4">
                         <span className="font-body text-[12px] font-black uppercase tracking-[0.3em] text-gold-soft/30">Valuation:</span>
                         <span className="text-4xl font-display font-black text-gold-soft">₹{product.price}</span>
                      </div>
                      
                      <p className="text-xl font-serif italic text-gold-soft/60 leading-relaxed max-w-xl border-l-[3px] border-gold-soft/10 pl-8">
                         {product.description}
                      </p>
                   </div>

                  {/* Molecular Attributes Grid */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-12 py-8 border-y border-gold-soft/10">
                     <div className="space-y-4">
                        <span className="block text-[9px] font-black text-gold-soft/30 uppercase tracking-[0.4em]">Genetic_Cacao Content</span>
                        <div className="flex items-center gap-4">
                           <div className="size-2 rounded-full bg-gold-soft/40" />
                           <p className="text-xl font-display italic text-gold-soft">{product.cacaoContent || 'Heirloom Forastero'}</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <span className="block text-[9px] font-black text-gold-soft/30 uppercase tracking-[0.4em]">Flavor_Spectrum Notes</span>
                        <div className="flex items-center gap-4">
                           <div className="size-2 rounded-full bg-gold-soft/40" />
                           <p className="text-xl font-display italic text-gold-soft">{product.notes || 'Caramel & Moss'}</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <span className="block text-[9px] font-black text-gold-soft/30 uppercase tracking-[0.4em]">Registry_Weight</span>
                        <div className="flex items-center gap-4">
                           <div className="size-2 rounded-full bg-gold-soft/40" />
                           <p className="text-xl font-display italic text-gold-soft">{product.weight || '100g Artifact'}</p>
                        </div>
                     </div>
                  </div>

                   <button
                      onClick={() => {
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
                      className="group w-full max-w-md h-20 bg-gold-soft hover:bg-gold-soft/80 text-black rounded-3xl font-body font-black text-[11px] uppercase tracking-[0.6em] transition-all flex items-center justify-center gap-6 active:scale-[0.98] shadow-2xl shadow-gold-soft/20 relative overflow-hidden italic"
                   >
                      <span className="relative z-10 flex items-center gap-4">
                         Finalize Acquisition <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                   </button>
               </motion.div>
            </div>

            {/* Narrative & Impressions - Glassmorphic Dark Section */}
            <motion.div
               className="mt-16 pt-12 border-t border-gold-soft/10 bg-black/20 -mx-6 lg:-mx-20 px-6 lg:px-20 backdrop-blur-3xl rounded-t-[80px] shadow-[0_-40px_80px_rgba(0,0,0,0.4)]"
               variants={fadeUp}
               viewport={sectionViewport}
               initial={reduceMotion ? false : 'hidden'}
               whileInView="show"
            >
               <CustomerReviews productId={product._id} />
            </motion.div>

            {/* Companion Registry - Cinematic Dark Flow */}
            {relatedProducts.length > 0 && (
               <motion.div
                  className="mt-20 space-y-12"
                  variants={fadeIn}
                  viewport={sectionViewport}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="show"
               >
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gold-soft/10 pb-8">
                     <div className="space-y-4">
                        <span className="text-[10px] font-black text-gold-soft/30 uppercase tracking-[0.6em]">Matrix_Discovery</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-gold-soft italic">Related Collectibles</h2>
                     </div>
                     <button
                        onClick={() => navigate('/shop')}
                        className="mt-10 md:mt-0 px-12 h-16 rounded-2xl border border-gold-soft/10 text-gold-soft/40 font-body font-black text-[9px] uppercase tracking-[0.6em] flex items-center gap-6 group hover:bg-gold-soft hover:text-black hover:border-transparent transition-all italic"
                     >
                        Entire Collection <ArrowRight size={16} className="group-hover:translate-x-4 transition-transform" />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                     {relatedProducts.map((p) => (
                        <BoutiqueProductCard
                           key={p._id}
                           id={p._id}
                           name={p.name}
                           description={p.description}
                           price={p.price}
                           image={p.image}
                           onAdd={(item) => {
                              dispatch(addToCart({ ...item, quantity: 1 }));
                              setIsCartOpen(true);
                           }}
                        />
                     ))}
                  </div>
               </motion.div>
            )}
         </motion.main>
         <Footer />
      </div>
   );
};

export default ProductDetails;

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  category?: string;
  weight?: string;
  cacaoContent?: string;
  notes?: string;
}
