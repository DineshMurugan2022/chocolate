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
      <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-black relative">
         <Header setIsCartOpen={setIsCartOpen} />

         <main className="w-full px-6 lg:px-20 pt-32 pb-40 relative z-10 max-w-7xl mx-auto">
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <button
               onClick={() => navigate(-1)}
               className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-12 text-sm font-medium group"
            >
               <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
               Back to Shop
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
               {/* Left: Visual Showcase */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
               >
                  <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative">
                     <AnimatePresence mode="wait">
                        <motion.img
                           key={activeImage || product.image}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.4 }}
                           src={activeImage || product.image}
                           className="w-full h-full object-contain p-12 mix-blend-screen"
                           alt={product.name}
                        />
                     </AnimatePresence>
                  </div>

                  {(product.images?.length > 0 || product.image) && (
                     <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        {[product.image, ...(product.images || [])].map((img, i) => (
                           <button
                              key={i}
                              onClick={() => setActiveImage(img)}
                              className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white ${
                                 (activeImage === img || (!activeImage && img === product.image))
                                    ? 'border-blue-600 shadow-sm'
                                    : 'border-transparent hover:border-gray-200'
                              }`}
                           >
                              <img src={img} className="w-full h-full object-contain" alt={`Thumbnail ${i + 1}`} />
                           </button>
                        ))}
                     </div>
                  )}
               </motion.div>

               {/* Right: Product Details */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col h-full"
               >
                   <div className="mb-12">
                      <span className="text-xs font-bold text-gold-soft uppercase tracking-widest mb-4 block">
                         {product.category}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-bold text-gold-soft mb-6 leading-tight">
                         {product.name}
                      </h1>
                      <div className="flex items-center gap-4 mb-8 text-2xl font-semibold text-gold-soft">
                         ₹{product.price}
                      </div>
                      <p className="text-lg text-gold-soft/70 leading-relaxed max-w-lg mb-10">
                         {product.description}
                      </p>
                   </div>

                  {/* Product Attributes */}
                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-cocoa-light/20 mb-10">
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gold-soft/50 uppercase tracking-wider">Cacao Content</span>
                        <p className="text-base font-medium text-gold-soft">{product.cacaoContent || 'Heirloom Forastero'}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gold-soft/50 uppercase tracking-wider">Flavor Notes</span>
                        <p className="text-base font-medium text-gold-soft">{product.notes || 'Caramel & Moss'}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gold-soft/50 uppercase tracking-wider">Weight</span>
                        <p className="text-base font-medium text-gold-soft">{product.weight || '100g'}</p>
                     </div>
                  </div>

                   <div className="mt-auto">
                      <button
                         onClick={() => {
                            dispatch(addToCart(product));
                            setIsCartOpen(true);
                         }}
                         className="w-full lg:w-max px-12 h-14 bg-gold-soft hover:bg-gold-soft/80 text-black rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-gold-soft/10"
                      >
                         Add to Cart <ArrowRight size={18} />
                      </button>
                   </div>
               </motion.div>
            </div>

            {/* Narrative & Impressions */}
            <div className="mt-80 pt-40 border-t border-cocoa-deep/5 bg-cocoa-deep/30 -mx-6 lg:-mx-20 px-6 lg:px-20 backdrop-blur-3xl rounded-t-[100px] shadow-2xl">
               <CustomerReviews productId={product._id} />
            </div>

            {/* Companion Registry */}
            {relatedProducts.length > 0 && (
               <div className="mt-40">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
                     <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Related Products</h2>
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
