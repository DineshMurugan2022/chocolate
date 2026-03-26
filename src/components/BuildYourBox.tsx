import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Box, Trash2, ShieldCheck, PenLine, Sparkles, Zap } from 'lucide-react';

interface ChocolateItem {
  id: string;
  name: string;
  intensity: 'light' | 'medium' | 'dark';
  color: string;
  image: string;
}

const CHOCOLATE_ATELIER: ChocolateItem[] = [
  { id: '1', name: 'Almond Honey', intensity: 'light', color: '#B3530F', image: 'https://images.unsplash.com/photo-1548365328-8c6dc3b2b5da?q=80&w=400' },
  { id: '2', name: 'Karupatti Silk', intensity: 'medium', color: '#1A0F0B', image: 'https://images.unsplash.com/photo-1542859953-d98cb0bb5fec?q=80&w=400' },
  { id: '3', name: 'Dark Monolith', intensity: 'dark', color: '#0C0706', image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=400' }
];

export default function BuildYourBox() {
  const [boxItems, setBoxItems] = useState<ChocolateItem[]>([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [initials, setInitials] = useState('');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const richnessValue = boxItems.reduce((acc, item) => {
     if (item.intensity === 'dark') return acc + 30;
     if (item.intensity === 'medium') return acc + 20;
     return acc + 10;
  }, 0);

  const waveColor = richnessValue > 100 ? '#1A0F0B' : richnessValue > 50 ? '#B3530F' : '#D4AF37';

  const addItem = (item: ChocolateItem) => {
    if (boxItems.length < 9) {
      setBoxItems([...boxItems, { ...item, id: Date.now().toString() }]);
    }
  };

  const finalizeBox = () => {
     setIsFinalizing(true);
     setTimeout(() => setIsFinalizing(false), 7000); 
  };

  return (
    <div className="relative w-full min-h-[900px] bg-[#FAF9F6] rounded-[80px] overflow-visible shadow-[0_40px_100px_rgba(26,15,13,0.1)] flex flex-col md:flex-row p-8 lg:p-14 gap-12 border border-cocoa-deep/5 transition-all duration-1000">
      
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none rounded-[80px]" />
      
      {/* Chocolate Lava Drips (Bottom Leak) */}
      <div className="absolute -bottom-4 left-0 w-full flex justify-around pointer-events-none z-0">
         {[...Array(6)].map((_, i) => (
            <motion.div 
               key={i}
               animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
               transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
               className="w-4 bg-[#1A0F0D] rounded-full blur-[2px]"
            />
         ))}
      </div>

      {/* Sidebar: The Atelier Supply */}
      <div className="md:w-[400px] flex flex-col gap-8 relative z-10">
         <div className="space-y-6 mb-10 p-4 border-l-4 border-burnt-caramel bg-white/40 rounded-r-3xl">
            <span className="font-body text-[12px] font-black uppercase text-burnt-caramel tracking-[1em] block mb-2">Heritage Supply</span>
            <h3 className="text-4xl md:text-5xl font-display font-black text-[#1A0F0D] leading-tight">Select Mastery</h3>
            <p className="font-serif italic text-lg text-cocoa-deep/60">Tap to induct an artifact.</p>
         </div>

         <div className="flex flex-col gap-6">
            {CHOCOLATE_ATELIER.map((item) => (
               <motion.button 
                 key={item.id}
                 whileHover={{ scale: 1.02, x: 10 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => addItem(item)}
                 onMouseEnter={() => setIsHovered(item.id)}
                 onMouseLeave={() => setIsHovered(null)}
                 className="group relative flex items-center gap-6 p-6 bg-white rounded-[32px] border-2 border-transparent hover:border-burnt-caramel hover:shadow-2xl transition-all text-left overflow-hidden shadow-sm"
               >
                  <div className="relative">
                    <img src={item.image} className="size-20 object-cover rounded-2xl shadow-md group-hover:rotate-6 transition-transform duration-500" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col">
                     <span className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-burnt-caramel mb-1">{item.intensity} Intensity</span>
                     <span className="font-display text-2xl text-cocoa-deep font-black italic mb-1">{item.name}</span>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-full bg-burnt-caramel/5 flex items-center justify-center translate-x-16 group-hover:translate-x-0 transition-transform">
                     <Zap size={20} className="text-burnt-caramel" />
                  </div>
               </motion.button>
            ))}
         </div>

         {/* Richness Meter */}
         <div className="mt-auto p-10 bg-white rounded-[48px] relative overflow-hidden h-[300px] flex flex-col justify-end shadow-inner border border-cocoa-deep/5">
            <div className="relative z-20 space-y-4">
               <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-cocoa-deep/30">Registry Integrity</span>
               <div className="text-6xl font-display font-black text-cocoa-deep flex items-baseline gap-2">
                  {richnessValue}% 
                  <span className="text-xs uppercase tracking-widest font-body opacity-40">Richness</span>
               </div>
            </div>
            <motion.div 
               animate={{ y: 300 - (richnessValue * 2.5) }}
               className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-1000 z-10"
            >
               <svg viewBox="0 0 400 200" className="w-[200%] h-full animate-wave scale-x-150" style={{ fill: waveColor, opacity: 0.15 }}>
                  <path d="M0,80 C150,180 250,20 400,80 L400,200 L0,200 Z" />
               </svg>
               <div className="h-[500px] w-full" style={{ background: `linear-gradient(to bottom, ${waveColor}22, ${waveColor}44)` }} />
            </motion.div>
         </div>
      </div>

      {/* Main Board: The Animated Chocolate Crate */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-4">
         
         <div className="relative w-full max-w-[600px] aspect-square group">
            
            {/* Liquid Border Animation - The Melting Frame Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-burnt-caramel via-cocoa-deep to-burnt-caramel rounded-[80px] blur-[2px] opacity-20 animate-pulse group-hover:opacity-40 transition-opacity" />
            
            {/* Dark Chocolate Base Drip (Top) */}
            <motion.div 
               animate={{ scaleY: [1, 1.2, 1], y: [0, 5, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-4 inset-x-0 h-8 bg-cocoa-deep rounded-[80px] z-[5] blur-[1px] opacity-10 origin-top"
            />

            {/* The Main Registry Frame */}
            <div className="absolute inset-0 bg-[#E8E4DF] border-[12px] border-[#D4CEC7] rounded-[80px] shadow-[inset_0_20px_50px_rgba(0,0,0,0.1),0_30px_100px_rgba(26,15,13,0.15)] p-12 overflow-hidden z-10 border-t-cocoa-deep/10">
               
               {/* Chocolate Lava Streaming Background (Very Subtle) */}
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                  <motion.div 
                    animate={{ y: [0, 600] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full bg-repeat-y"
                    style={{ backgroundImage: 'radial-gradient(#1A0F0B 1px, transparent 0)', backgroundSize: '40px 40px' }}
                  />
               </div>

               {/* Grid Layout */}
               <div className="h-full grid grid-cols-3 gap-8 relative z-20">
                  <AnimatePresence>
                    {boxItems.map((item, idx) => (
                       <motion.div
                         key={item.id}
                         layoutId={item.id}
                         initial={{ scale: 2, rotateY: 180, opacity: 0, z: 100 }}
                         animate={{ scale: 1, rotateY: 0, opacity: 1, z: 0 }}
                         exit={{ scale: 0, rotateZ: 90 }}
                         transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                         className="relative aspect-square bg-[#FAF9F6] rounded-[32px] shadow-2xl border-4 border-white overflow-hidden group/item cursor-pointer hover:scale-105 transition-transform"
                         onClick={() => setBoxItems(boxItems.filter(i => i.id !== item.id))}
                       >
                          <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-burnt-caramel/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                             <Trash2 size={24} className="text-white" />
                          </div>
                       </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {[...Array(9 - boxItems.length)].map((_, i) => (
                    <div key={i} className="aspect-square bg-black/5 rounded-[32px] border-4 border-dashed border-black/10 flex items-center justify-center text-black/5 group-hover:border-burnt-caramel/20 transition-colors">
                        <Box size={32} strokeWidth={1} />
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Action Bar */}
         <div className="mt-16 w-full max-w-[500px] flex items-center gap-8 bg-white p-6 rounded-[40px] shadow-xl border border-cocoa-deep/5 z-20">
            <div className="flex-1 flex items-center gap-6 px-4">
               <input 
                 type="text" 
                 maxLength={3} 
                 placeholder="XYZ" 
                 value={initials}
                 onChange={(e) => setInitials(e.target.value.toUpperCase())}
                 className="bg-transparent font-display text-2xl font-black italic focus:outline-none w-full text-cocoa-deep" 
               />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={finalizeBox}
              disabled={boxItems.length === 0}
              className="h-[72px] px-12 bg-botanical-green hover:bg-burnt-caramel text-ivory-warm rounded-[28px] font-body font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all"
            >
               Induct Box <ShoppingBag size={18} />
            </motion.button>
         </div>

         {/* Cinematic Sequence */}
         <AnimatePresence>
            {isFinalizing && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 z-[100] bg-[#1A0F0D]/95 backdrop-blur-[100px] flex flex-col items-center justify-center rounded-[80px]"
               >
                  <div className="relative flex flex-col items-center gap-20">
                     <motion.div 
                       initial={{ scale: 0, rotate: -180 }}
                       animate={{ scale: 1, rotate: 0 }}
                       transition={{ delay: 2, type: 'spring' }}
                       className="size-48 bg-[#6B0000] rounded-full border-8 border-burnt-caramel/30 flex items-center justify-center shadow-2xl"
                     >
                        <span className="text-7xl font-display font-black text-white italic">{initials || 'DB'}</span>
                     </motion.div>
                     <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="font-body text-[14px] font-black uppercase tracking-[1em] text-ivory-warm">Sealing_Registry</motion.span>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
