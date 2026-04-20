import { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Box, Trash2, Sparkles, RefreshCcw, Package, Star, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import type { AppDispatch } from '@/store';
import type { Product } from '@/types';
import { createRandom } from '@/utils/random';
import { useWindowSize } from '@/hooks/useWindowSize';

interface BoxSpecs {
  size: number;
  title: string;
  description: string;
  priceMode: 'fixed' | 'dynamic';
  basePrice?: number;
}

const SparkleParticle = ({ x, y, dx, dy, scale, rotate }: { x: number; y: number; dx: number; dy: number; scale: number; rotate: number }) => (
  <motion.div
    initial={{ scale: 0, x, y, opacity: 1 }}
    animate={{ 
      x: x + dx, 
      y: y + dy, 
      scale,
      opacity: 0,
      rotate
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="absolute pointer-events-none z-[1000]"
  >
    <Star className="text-gold-accent fill-gold-accent w-4 h-4" />
  </motion.div>
);

export default function UnifiedBoxBuilder({ 
  size = 9, 
  title = "The Crate Architect", 
  description = "Design Your Personal Collection",
  priceMode = 'dynamic',
  basePrice = 0
}: Partial<BoxSpecs>) {
  const [boxItems, setBoxItems] = useState<(Product | null)[]>(Array(size).fill(null));
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [initials, setInitials] = useState('');
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; dx: number; dy: number; scale: number; rotate: number }[]>([]);
  
  const dispatch = useDispatch<AppDispatch>();
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;

  const { data: availableProducts = [], isLoading: loading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products');
      return response.data.products || response.data;
    }
  });

  const triggerSparkle = useCallback((x: number, y: number) => {
    const id = Date.now();
    const rand = createRandom(id);
    const dx = (rand() - 0.5) * 200;
    const dy = (rand() - 0.5) * 200;
    const scale = 0.5 + rand() * 1.5;
    const rotate = rand() * 360;
    setSparkles(prev => [...prev, { id, x, y, dx, dy, scale, rotate }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 1000);
  }, []);

  const addItemToFirstAvailableSlot = (product: Product, x?: number, y?: number) => {
    const nextIndex = boxItems.indexOf(null);
    if (nextIndex === -1) {
      toast.error("Your collection is full!");
      return;
    }

    const newItems = [...boxItems];
    newItems[nextIndex] = { ...product, _id: `${product._id}-${Date.now()}` };
    setBoxItems(newItems);
    
    if (x && y) triggerSparkle(x, y);
    toast.success(`${product.name} secured`);
  };

  const removeItem = (index: number) => {
    const newItems = [...boxItems];
    newItems[index] = null;
    setBoxItems(newItems);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const productData = e.dataTransfer.getData('product');
    if (!productData) return;
    
    const product = JSON.parse(productData);
    const newItems = [...boxItems];
    newItems[index] = { ...product, _id: `${product._id}-${Date.now()}` };
    setBoxItems(newItems);
    triggerSparkle(e.clientX, e.clientY);
  };

  const totalPrice = useMemo(() => {
    if (priceMode === 'fixed') return basePrice || 0;
    return boxItems.reduce((sum, item) => sum + (item?.price || 0), 0);
  }, [boxItems, priceMode, basePrice]);

  const finalizeBox = () => {
    const filledItems = boxItems.filter((i): i is Product => i !== null);
    if (filledItems.length === 0) return;

    setIsFinalizing(true);
    
    setTimeout(() => {
      dispatch(addToCart({
        id: `unified-box-${Date.now()}`,
        name: `${title} [${initials || 'CH'}]`,
        price: totalPrice,
        image: filledItems[0]?.image || '',
        quantity: 1,
        category: 'Custom Collection',
        subItems: filledItems.map(item => item.name)
      }));

      setIsFinalizing(false);
      setBoxItems(Array(size).fill(null));
      setInitials('');
      toast.success("Legacy collection secured and added to vault!");
    }, 4000);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <RefreshCcw className="animate-spin text-gold-soft" size={40} />
      <span className="font-display italic text-gold-soft/50">Consulting the Artifact Registry...</span>
    </div>
  );

  return (
    <div className="w-full max-w-[1500px] mx-auto space-y-16 pb-20 relative px-4">
      <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">
        
        {/* Selection Area */}
        <div className="w-full xl:flex-1 space-y-8 order-2 xl:order-1">
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-soft/5 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="size-10 rounded-full bg-gold-soft/20 flex items-center justify-center text-gold-soft">
                  <Package size={20} />
                </div>
                <h3 className="text-2xl font-display italic font-black text-white">Choose Your Artifacts</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-gold-soft/20 to-transparent" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto px-2 custom-scrollbar">
                {availableProducts.map((product) => (
                  <div 
                    key={product._id}
                    draggable={!isMobile}
                    onDragStart={(e: React.DragEvent) => {
                      if (isMobile) return;
                      e.dataTransfer.setData('product', JSON.stringify(product));
                    }}
                    onClick={(e) => addItemToFirstAvailableSlot(product, e.clientX, e.clientY)}
                    className="group cursor-pointer bg-white/5 p-4 rounded-3xl border border-white/5 hover:border-gold-soft/30 transition-all duration-500 text-center"
                  >
                    <motion.div 
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="w-full h-full"
                    >
                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-black/20 relative shadow-2xl">
                      <img 
                        src={product.image} 
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000" 
                        alt={product.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                        <span className="text-[8px] font-black tracking-[0.3em] text-gold-soft uppercase">Secure</span>
                      </div>
                    </div>
                    <h4 className="text-xs font-display font-bold text-white truncate px-2">{product.name}</h4>
                    <p className="text-[10px] font-body uppercase tracking-widest text-gold-soft mt-1 opacity-60">₹{product.price}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Box (Crate) Area */}
        <div className="w-full xl:w-[550px] space-y-8 order-1 xl:order-2 sticky top-32">
          <div className="bg-[#120A09] p-10 rounded-[60px] shadow-4xl relative overflow-hidden border border-white/5">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-gold-soft/40">The Lab_Registry</span>
                  <h3 className="text-4xl font-display italic font-black text-white">Artifact Box</h3>
                </div>
                <div className="size-20 rounded-full border border-gold-soft/20 flex flex-col items-center justify-center font-display leading-tight">
                  <span className="text-2xl italic font-black text-gold-soft">{boxItems.filter(i => i !== null).length}</span>
                  <span className="text-[10px] font-black text-gold-soft/30 uppercase tracking-tighter">/ {size}</span>
                </div>
              </div>

              {/* Grid with 3D-ish Slots */}
              <div 
                className={`grid gap-4 mb-16 p-8 bg-white/5 rounded-[45px] border border-white/10 aspect-square perspective-1000`}
                style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(size))}, minmax(0, 1fr))` }}
              >
                <AnimatePresence>
                  {boxItems.map((item, idx) => (
                    <motion.div
                      key={item?._id || `empty-${idx}`}
                      onDragOver={(e: React.DragEvent) => e.preventDefault()}
                      onDrop={(e: React.DragEvent) => handleDrop(e, idx)}
                      className={`relative aspect-square rounded-[24px] overflow-hidden group/slot transition-all duration-500
                        ${item ? 'bg-white shadow-2xl scale-100' : 'bg-white/5 border border-dashed border-white/10 flex items-center justify-center text-white/5 hover:bg-gold-soft/5 hover:border-gold-soft/30 scale-95 hover:scale-100'}`}
                      style={{ transform: !item ? 'translateZ(-10px)' : 'translateZ(10px)' }}
                    >
                      {item ? (
                        <div className="relative w-full h-full cursor-pointer" onClick={() => removeItem(idx)}>
                          <img src={item.image} className="w-full h-full object-cover transition-transform group-hover/slot:scale-110" alt="" />
                          <div className="absolute inset-0 bg-rose-950/80 opacity-0 group-hover/slot:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                            <Trash2 size={20} strokeWidth={2.5} />
                            <span className="text-[8px] font-black tracking-widest uppercase mt-1">Evict</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 opacity-40 group-hover/slot:opacity-100 transition-all">
                          <Box size={24} strokeWidth={1} />
                          <span className="text-[7px] font-black uppercase tracking-widest">Empty</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action Area */}
              <div className="space-y-6">
                <div className="relative group">
                  <input 
                    type="text" 
                    maxLength={3} 
                    placeholder="INITIALS (e.g. DMG)" 
                    value={initials}
                    onChange={(e) => setInitials(e.target.value.toUpperCase())}
                    className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl focus:outline-none focus:border-gold-soft transition-all font-display text-2xl italic font-black tracking-[0.5rem] text-white placeholder:text-gold-soft/10 text-center"
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 group-focus-within:text-gold-soft transition-all">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                   <div className="flex justify-between items-end px-2">
                       <span className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-gold-soft/40">Estimated Value</span>
                       <span className="font-display text-3xl italic font-black text-white">₹{totalPrice}</span>
                   </div>
                   
                   <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={finalizeBox}
                    disabled={boxItems.every(i => i === null)}
                    className="w-full py-7 bg-gold-soft text-black rounded-3xl font-body font-black text-xs uppercase tracking-[0.6em] disabled:opacity-20 flex items-center justify-center gap-4 hover:bg-white transition-all shadow-3xl shadow-gold-soft/20 overflow-hidden group relative"
                  >
                    <span className="relative z-10">Secure Artifacts</span>
                    <ShoppingBag size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
                    <motion.div 
                        className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Premium Textures */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-soft/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 0)', backgroundSize: '40px 40px' }} />
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
            className="fixed inset-0 z-[9999] bg-[#0A0504] bg-opacity-95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-16"
            >
              <div className="size-64 mx-auto rounded-[80px] border-4 border-gold-soft/30 flex items-center justify-center relative overflow-hidden bg-white/5 rotate-12">
                <motion.div 
                   animate={{ y: [-300, 300] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-x-0 h-2 bg-gold-soft shadow-[0_0_40px_rgba(212,175,55,1)]"
                />
                <span className="text-9xl font-display font-black text-white italic relative z-10 -rotate-12">{initials || 'CH'}</span>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-5xl md:text-7xl font-display italic font-black text-white px-4">Sealing the Heritage</h4>
                <div className="flex items-center justify-center gap-6">
                    <div className="h-px w-20 bg-gold-soft/20" />
                    <p className="font-body text-gold-soft uppercase tracking-[1rem] md:tracking-[1.5rem] text-[10px] md:text-xs">Archive_Transmission</p>
                    <div className="h-px w-20 bg-gold-soft/20" />
                </div>
              </div>

              <div className="flex justify-center gap-8 items-center">
                 <Sparkles className="animate-pulse text-gold-soft size-8" />
                 <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div 
                       initial={{ left: '-100%' }}
                       animate={{ left: '100%' }}
                       transition={{ duration: 3.5, ease: "easeInOut" }}
                       className="absolute inset-0 w-full h-full bg-gold-soft shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                    />
                 </div>
                 <Sparkles className="animate-pulse text-gold-soft size-8" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Particle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1000]">
        <AnimatePresence>
          {sparkles.map(s => (
            <SparkleParticle key={s.id} x={s.x} y={s.y} dx={s.dx} dy={s.dy} scale={s.scale} rotate={s.rotate} />
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
