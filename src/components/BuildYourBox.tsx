import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Box, Trash2, Sparkles, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function BuildYourBox() {
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [boxItems, setBoxItems] = useState<Product[]>([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [initials, setInitials] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setAvailableProducts(response.data.products || response.data);
      } catch (error) {
        console.error("Error fetching available chocolates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addItem = (product: Product) => {
    if (boxItems.length < 9) {
      setBoxItems([...boxItems, { ...product, _id: `${product._id}-${Date.now()}` }]);
      toast.success(`${product.name} added to crate`);
    } else {
      toast.error("Your masterpiece crate is full!");
    }
  };

  const removeItem = (id: string) => {
    setBoxItems(boxItems.filter(item => item._id !== id));
  };

  const finalizeBox = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      setIsFinalizing(false);
      setBoxItems([]);
      setInitials('');
      toast.success("Legacy collection secured and added to vault!");
    }, 4000);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <RefreshCcw className="animate-spin text-burnt-caramel" size={40} />
    </div>
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-12 pb-20">
      
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Selection Area */}
        <div className="flex-1 space-y-8">
          <div className="p-8 bg-white/50 backdrop-blur-md rounded-[40px] border border-cocoa-deep/5">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-burnt-caramel/20"></span>
              <h3 className="text-2xl font-display italic font-black text-cocoa-deep">Choose Your Artifacts</h3>
              <span className="h-px flex-1 bg-burnt-caramel/20"></span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto px-2 custom-scrollbar">
              {availableProducts.map((product) => (
                <motion.div 
                  key={product._id}
                  whileHover={{ y: -5 }}
                  onClick={() => addItem(product)}
                  className="group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-burnt-caramel/30 text-center"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-50">
                    <img 
                      src={product.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name} 
                    />
                  </div>
                  <h4 className="text-sm font-display font-bold text-cocoa-deep truncate">{product.name}</h4>
                  <p className="text-[10px] font-body uppercase tracking-widest text-burnt-caramel mt-1">₹{product.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Crate Area */}
        <div className="lg:w-[450px] space-y-8">
          <div className="bg-[#1A0F0D] p-10 rounded-[50px] shadow-4xl relative overflow-hidden text-ivory-warm">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-10">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-ivory-warm/40">Your Collection</span>
                  <h3 className="text-4xl font-display italic font-black text-white">The Crate</h3>
                </div>
                <div className="size-16 rounded-full border border-white/20 flex items-center justify-center font-display text-2xl italic font-black text-burnt-caramel">
                  {boxItems.length}/9
                </div>
              </div>

              {/* Grid 3x3 */}
              <div className="grid grid-cols-3 gap-4 mb-12 bg-white/5 p-6 rounded-[35px] border border-white/10 aspect-square">
                <AnimatePresence>
                  {boxItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                      onClick={() => removeItem(item._id)}
                    >
                      <img src={item.image} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Trash2 size={16} />
                      </div>
                    </motion.div>
                  ))}
                  {[...Array(9 - boxItems.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-white/5 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-white/10">
                      <Box size={18} strokeWidth={1} />
                    </div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action */}
              <div className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    maxLength={3} 
                    placeholder="INITIALS (e.g. DMG)" 
                    value={initials}
                    onChange={(e) => setInitials(e.target.value.toUpperCase())}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-burnt-caramel transition-colors font-display text-xl italic font-black tracking-widest text-white placeholder:text-white/20"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={finalizeBox}
                  disabled={boxItems.length === 0}
                  className="w-full py-6 bg-ivory-warm text-[#1A0F0D] rounded-2xl font-body font-black text-xs uppercase tracking-[0.5em] disabled:opacity-20 flex items-center justify-center gap-4 hover:bg-burnt-caramel hover:text-white transition-all shadow-2xl shadow-black/50 overflow-hidden group"
                >
                  <span className="relative z-10">Secure Legacy</span>
                  <ShoppingBag size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          </div>
        </div>
      </div>

      {/* Cinematic Finalization Overlay */}
      <AnimatePresence>
        {isFinalizing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#1A0F0D] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="size-48 mx-auto rounded-full border-4 border-burnt-caramel flex items-center justify-center relative overflow-hidden">
                <motion.div 
                   animate={{ y: [-200, 200] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-burnt-caramel/20"
                />
                <span className="text-7xl font-display font-black text-white italic relative z-10">{initials || 'CH'}</span>
              </div>
              <div className="space-y-4">
                <h4 className="text-4xl font-display italic font-black text-white">Sealing the Heritage</h4>
                <p className="font-body text-burnt-caramel uppercase tracking-[0.8em] text-[10px]">Registry_Transmission_Active</p>
              </div>
              <div className="flex justify-center gap-4">
                 <Sparkles className="animate-pulse text-ivory-warm" />
                 <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ x: '-100%' }}
                       animate={{ x: '100%' }}
                       transition={{ duration: 3.5, ease: "easeInOut" }}
                       className="w-full h-full bg-burnt-caramel"
                    />
                 </div>
                 <Sparkles className="animate-pulse text-ivory-warm" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
