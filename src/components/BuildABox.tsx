import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Sparkles, Star, Package, Trash2, CheckCircle2 } from 'lucide-react';
import api from '@/utils/api';
import { createRandom } from '@/utils/random';

interface Chocolate {
  _id: string;
  name: string;
  image: string;
  price: number;
}

// Particle effect for successful placement
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
    className="absolute pointer-events-none z-50"
  >
    <Star className="text-gold-accent fill-gold-accent w-4 h-4" />
  </motion.div>
);

export default function BuildABox() {
  const [boxSlots, setBoxSlots] = useState<(Chocolate | null)[]>([null, null, null, null, null, null]);
  const [availableChocolates, setAvailableChocolates] = useState<Chocolate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; dx: number; dy: number; scale: number; rotate: number }[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChocolates = async () => {
      try {
        const { data } = await api.get('/products');
        setAvailableChocolates(data.slice(0, 8)); // Show more options
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chocolates:', error);
        setLoading(false);
      }
    };
    fetchChocolates();
  }, []);

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

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const chocoId = e.dataTransfer.getData('chocoId');
    const chocolate = availableChocolates.find(c => c._id === chocoId);
    if (!chocolate) return;

    setBoxSlots(prev => {
      const newSlots = [...prev];
      newSlots[slotIndex] = chocolate;
      return newSlots;
    });
    triggerSparkle(e.clientX, e.clientY);
  };

  const handleSelect = (chocolate: Chocolate, e: React.MouseEvent) => {
    const nextEmptyIndex = boxSlots.findIndex(s => s === null);
    if (nextEmptyIndex === -1) return;

    setBoxSlots(prev => {
      const newSlots = [...prev];
      newSlots[nextEmptyIndex] = chocolate;
      return newSlots;
    });
    triggerSparkle(e.clientX, e.clientY);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeChocolate = (slotIndex: number) => {
    setBoxSlots(prev => {
      const newSlots = [...prev];
      newSlots[slotIndex] = null;
      return newSlots;
    });
  };

  const handleAddToCart = () => {
    const filledItems = boxSlots.filter((s): s is Chocolate => s !== null);
    if (filledItems.length < 6) return;

    dispatch(addToCart({
      id: 'custom-box-' + Date.now(),
      name: 'Bespoke 6-Piece Box',
      price: 1499, // Adjusted price for better value
      image: filledItems[0].image,
      quantity: 1,
      subItems: filledItems.map(item => item.name)
    }));
    
    // Clear box after adding
    setBoxSlots([null, null, null, null, null, null]);
  };

  return (
    <section className="py-24 px-6 md:px-16 lg:px-40 bg-white relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-16 relative z-10">
        <span className="text-gold-accent font-poppins font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
          Bespoke Experience
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-umber-text mb-6">
          Build Your Box
        </h2>
        <p className="text-taupe-muted font-poppins text-sm max-w-lg mx-auto">
          Drag and drop your favorite masterworks into the premium 6-piece custom assortment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 w-full max-w-6xl items-center lg:items-start justify-center">
        
        {/* Selection Pool */}
        <div className="flex-1 w-full bg-ivory-bg border border-black/5 rounded-[40px] p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-full bg-white/40 backdrop-blur-3xl rounded-[40px] -z-10" />
          <h3 className="text-xl font-playfair text-umber-text mb-8 text-center flex items-center justify-center gap-2">
            <Package size={20} className="text-gold-accent" />
            Available Masterworks
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full py-20 text-center text-taupe-muted animate-pulse font-display italic">
                Gathering artisanal soul...
              </div>
            ) : availableChocolates.map((choco, idx) => (
              <div 
                key={choco._id}
                draggable
                onDragStart={(e: React.DragEvent) => {
                  e.dataTransfer.setData('chocoId', choco._id);
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                onClick={(e) => handleSelect(choco, e)}
                className="cursor-grab active:cursor-grabbing group"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 },
                    opacity: { duration: 0.5, delay: idx * 0.1 }
                  }}
                  className="flex flex-col items-center gap-3 p-4 rounded-[32px] bg-white border border-black/5 hover:border-gold-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl group-hover:bg-ivory-bg/30"
                >
                  <div className="relative size-20 rounded-full overflow-hidden border-2 border-ivory-bg shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <img src={choco.image} alt={choco.name} className="w-full h-full object-cover pointer-events-none" />
                    <div className="absolute inset-0 bg-gold-accent/0 group-hover:bg-gold-accent/10 transition-colors" />
                  </div>
                  <span className="font-poppins text-[9px] text-taupe-muted text-center font-bold uppercase tracking-[0.2em] group-hover:text-gold-accent transition-colors truncate w-full px-2">{choco.name}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* The 3D Box Representation */}
        <div className="flex-[1.5] w-full relative perspective-[2000px]">
          {/* Surround Glows */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-gold-accent blur-[120px] rounded-full pointer-events-none" 
          />
          
          <motion.div 
            initial={{ rotateX: 20, rotateY: -10, opacity: 0 }}
            whileInView={{ rotateX: 8, rotateY: -5, opacity: 1 }}
            className="relative w-full aspect-[4/3] bg-gradient-to-br from-white via-ivory-bg to-white/80 rounded-[48px] border-8 border-white shadow-[0_50px_120px_-20px_rgba(0,0,0,0.15)] p-10 md:p-16 flex items-center justify-center transform transition-transform duration-1000"
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.2), inset 0 2px 20px rgba(255,255,255,0.8)'
            }}>
            
            {/* Box Lid/Frame effects */}
            <div className="absolute inset-0 border border-gold-accent/10 rounded-[40px] pointer-events-none" />
            <div className="absolute -inset-4 border border-white/40 rounded-[52px] pointer-events-none" />
            
            <div className="grid grid-cols-3 gap-6 md:gap-10 h-full w-full relative z-10" style={{ transform: 'translateZ(50px)' }}>
              {boxSlots.map((slot, idx) => (
                <div 
                  key={idx}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragOver={handleDragOver}
                  className={`relative flex items-center justify-center w-full h-full rounded-full transition-all duration-500 shadow-[inset_0_4px_12px_rgba(0,0,0,0.08)] group/slot overflow-hidden group
                    ${slot ? 'bg-white' : 'bg-black/5 hover:bg-gold-accent/5 hover:scale-105 border-2 border-dashed border-black/5 hover:border-gold-accent/20'}`}
                >
                  <AnimatePresence mode="wait">
                    {slot ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -45, y: -20, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
                        exit={{ scale: 0, y: 20, opacity: 0 }}
                        onClick={() => removeChocolate(idx)}
                        className="absolute inset-0 p-2 flex items-center justify-center cursor-pointer"
                      >
                         {/* Shadow beneath chocolate */}
                        <div className="absolute inset-2 bg-black/20 rounded-full blur-md translate-y-2" />
                        
                        <div className="absolute inset-0 bg-umber-text/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 backdrop-blur-[4px]">
                          <Trash2 size={16} className="text-white mb-1" />
                          <span className="text-[8px] text-white font-bold tracking-widest uppercase">Remove</span>
                        </div>
                        <img 
                          src={slot.image} 
                          alt={slot.name} 
                          className="w-full h-full rounded-full object-cover shadow-2xl relative z-10 border-2 border-white"
                        />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-1 opacity-20 group-hover/slot:opacity-100 transition-opacity"
                      >
                        <div className="size-2 rounded-full bg-gold-accent" />
                        <span className="text-[6px] font-bold text-taupe-muted uppercase tracking-[0.3em]">Slot {idx + 1}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      <div className="mt-20 relative z-20 flex flex-col items-center gap-6">
        <AnimatePresence>
          {!boxSlots.includes(null) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 text-gold-accent font-poppins text-xs font-bold uppercase tracking-widest bg-gold-accent/10 px-6 py-2 rounded-full"
            >
              <CheckCircle2 size={16} />
              Box Perfection Attained
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={handleAddToCart}
          disabled={boxSlots.includes(null)}
          className={`px-16 py-5 rounded-full font-poppins font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 relative group overflow-hidden
            ${boxSlots.includes(null) 
              ? 'bg-ivory-bg text-taupe-muted/40 cursor-not-allowed border border-black/5' 
              : 'bg-umber-text text-white hover:bg-gold-accent hover:scale-105 shadow-[0_20px_40px_-10px_rgba(107,94,85,0.4)] hover:shadow-gold-accent/30'
            }`}
        >
          <span className="relative z-10 flex items-center gap-3">
            {boxSlots.includes(null) ? (
              <>
                Hold to Fill Artisanal Box
                <Package size={14} className="opacity-40" />
              </>
            ) : (
              <>
                Add Masterpiece to Cart (₹1499)
                <Sparkles size={14} className="animate-pulse" />
              </>
            )}
          </span>
          {!boxSlots.includes(null) && (
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          )}
        </button>
      </div>

      {/* Particle Overlay */}
      <AnimatePresence>
        {sparkles.map(s => (
          <SparkleParticle key={s.id} x={s.x} y={s.y} dx={s.dx} dy={s.dy} scale={s.scale} rotate={s.rotate} />
        ))}
      </AnimatePresence>

    </section>
  );
}
