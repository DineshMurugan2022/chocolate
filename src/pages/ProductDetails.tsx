import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ShoppingBag, ChevronLeft, ArrowRight } from 'lucide-react';
import { addToCart } from '../store/cartSlice';
import BoutiqueProductCard from '../components/BoutiqueProductCard';
import CustomerReviews from '../components/CustomerReviews';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Skeleton from '../components/Skeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProductDetailsSkeleton = () => (
   <div className="min-h-screen bg-ivory-warm pt-32 px-6 md:px-12 lg:px-16 space-y-12">
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

const ProductDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [product, setProduct] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [activeImage, setActiveImage] = useState<string | null>(null);

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const res = await axios.get(`${API_URL}/products/${id}`);
            setProduct(res.data);
            const relatedRes = await axios.get(`${API_URL}/products/${id}/related`);
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
         <button onClick={() => navigate('/')} className="font-body text-[10px] uppercase font-black text-cocoa-deep/20 hover:text-cocoa-deep transition-all">Go Back to Boutique</button>
      </div>
   );

   return (
      <div className="min-h-screen bg-ivory-warm text-cocoa-deep font-body selection:bg-burnt-caramel selection:text-white overflow-x-hidden relative">

         {/* Background Subtle Organic Texture */}
         <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

         <Header setIsCartOpen={setIsCartOpen} />

         <main className="w-full px-6 lg:px-20 pt-48 pb-40 relative z-10 max-w-[1400px] mx-auto">
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <button
               onClick={() => navigate(-1)}
               className="flex items-center gap-4 text-cocoa-deep/40 hover:text-burnt-caramel transition-all mb-16 uppercase text-[10px] tracking-[0.6em] font-black group font-body"
            >
               <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Return_to_Selection
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-24 items-start">
               {/* Left: Botanical Heritage Details */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="space-y-16"
               >
                  <div className="space-y-10">
                     <div className="flex items-center gap-10">
                        <span className="font-body text-[10px] font-black text-botanical-green uppercase tracking-[0.4em] px-5 py-2 bg-botanical-green/5 rounded-full border border-botanical-green/10">
                           {product.category} HARVEST
                        </span>
                        <span className="text-cocoa-deep/20 text-[10px] font-body font-black tracking-[0.4em] uppercase">
                           Batch NO: 2024_039_C
                        </span>
                     </div>

                     <h1 className="text-7xl md:text-8xl lg:text-[110px] font-display font-black leading-[0.85] tracking-tighter group transition-all">
                        {product.name.split(' ').length > 1 ? (
                           <>
                              <span className="text-cocoa-deep block lg:inline">{product.name.split(' ').slice(0, -1).join(' ').toLowerCase()}</span><br className="hidden lg:block" />
                              <span className="text-burnt-caramel italic relative lg:left-24 -top-2 lowercase">{product.name.split(' ').pop()}</span>
                           </>
                        ) : (
                           <span className="italic text-burnt-caramel lowercase">{product.name}</span>
                        )}
                     </h1>
                  </div>

                  <p className="text-xl md:text-3xl text-cocoa-deep/60 leading-relaxed max-w-lg font-display italic border-l-4 border-burnt-caramel/20 pl-12 py-6">
                     {product.description}
                  </p>

                  {/* Tactile Grid */}
                  <div className="grid grid-cols-2 gap-12 py-12 border-y border-cocoa-deep/10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-burnt-caramel/60 uppercase font-black text-[8px] tracking-[0.6em] font-body">Cacao Genetic Type</div>
                        <span className="text-3xl font-display font-black italic text-cocoa-deep">{product.cacaoContent || 'Heirloom Forastero'}</span>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-burnt-caramel/60 uppercase font-black text-[8px] tracking-[0.6em] font-body">Orbital Flavor Depth</div>
                        <span className="text-3xl font-display font-black italic text-cocoa-deep">{product.notes || 'Caramel & Moss'}</span>
                     </div>
                  </div>

                  {/* Action Matrix */}
                  <div className="flex flex-col sm:flex-row items-center gap-12 pt-10">
                     <div className="flex flex-col">
                        <span className="font-body text-[10px] font-black text-cocoa-deep/30 uppercase tracking-[0.4em] mb-3">Unit Valuation</span>
                        <p className="text-6xl font-display font-black text-cocoa-deep tracking-tighter">₹{product.price}</p>
                     </div>

                     <motion.button
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => dispatch(addToCart(product))}
                        className="group relative h-[88px] px-20 bg-botanical-green text-ivory-warm rounded-[32px] font-body font-black uppercase text-sm leading-none flex items-center justify-center overflow-hidden w-full sm:w-auto shadow-2xl hover:shadow-botanical-green/30"
                     >
                        <span className="relative z-10 flex items-center gap-6">
                           Harvest this Piece <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-20" />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Right: The Visual Showcase (High-Fidelity Photography) */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="sticky top-40 space-y-12"
               >
                  {/* Main Showcase Panel */}
                  <div className="aspect-[4/5] lg:aspect-square bg-white shadow-organic-soft rounded-[60px] border-8 border-white p-2 overflow-hidden relative group">
                     <AnimatePresence mode="wait">
                        <motion.img
                           key={activeImage || product.image}
                           initial={{ opacity: 0, scale: 1.1 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.8, ease: "circOut" }}
                           src={activeImage || product.image}
                           className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-[3s]"
                           alt={product.name}
                        />
                     </AnimatePresence>

                     {/* Visual Depth Accents */}
                     <div className="absolute inset-x-10 inset-y-10 z-0 bg-gradient-to-br from-burnt-caramel/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
                  </div>

                  {/* Exhibit Gallery Extension (Multi-angle assets) */}
                  {(product.images?.length > 0 || product.image) && (
                     <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start px-4">
                        {[product.image, ...(product.images || [])].map((img, i) => (
                           <motion.button
                              key={i}
                              whileHover={{ y: -4, scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveImage(img)}
                              className={`size-24 lg:size-28 rounded-3xl overflow-hidden border-2 transition-all p-1 bg-white shadow-sm ${(activeImage === img || (!activeImage && img === product.image))
                                    ? 'border-burnt-caramel shadow-xl ring-4 ring-burnt-caramel/5'
                                    : 'border-white hover:border-burnt-caramel/20'
                                 }`}
                           >
                              <img src={img} className="size-full object-contain rounded-2xl" alt={`Angle ${i + 1}`} />
                           </motion.button>
                        ))}

                        {/* Visual Metadata Pill */}
                        <div className="hidden xl:flex flex-col ml-auto pl-10 border-l border-cocoa-deep/5 space-y-2">
                           <span className="font-body text-[8px] font-black uppercase tracking-[0.6em] text-burnt-caramel">Visual Portfolio</span>
                           <span className="font-display italic text-xl text-cocoa-deep">{[product.image, ...(product.images || [])].length} High-Res Assets</span>
                        </div>
                     </div>
                  )}
               </motion.div>
            </div>

            {/* Narrative & Impressions */}
            <div className="mt-80 pt-40 border-t border-cocoa-deep/5 bg-white/30 -mx-6 lg:-mx-20 px-6 lg:px-20 backdrop-blur-3xl rounded-t-[100px] shadow-2xl">
               <CustomerReviews productId={product._id} />
            </div>

            {/* Companion Registry */}
            {relatedProducts.length > 0 && (
               <div className="mt-40">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
                     <div className="space-y-6">
                        <span className="font-body text-[10px] font-black text-burnt-caramel uppercase tracking-[0.6em] mb-4 block">Recommended Registry</span>
                        <h2 className="text-6xl font-display font-medium text-cocoa-deep tracking-tight">Accompanying <br /><span className="text-cocoa-deep/30 italic font-light">Heritage</span></h2>
                     </div>
                     <button
                        onClick={() => navigate('/shop')}
                        className="mt-10 md:mt-0 px-10 h-16 rounded-2xl border border-cocoa-deep/10 font-body font-black text-[10px] uppercase tracking-[0.8em] flex items-center gap-6 group hover:bg-cocoa-deep hover:text-white transition-all"
                     >
                        Entire Collection <ArrowRight size={16} className="group-hover:translate-x-4 transition-transform" />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
                           }}
                        />
                     ))}
                  </div>
               </div>
            )}
         </main>
         <Footer />
      </div>
   );
};

export default ProductDetails;
