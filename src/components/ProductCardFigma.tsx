import { Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  rating?: number;
  image?: string;
}

export default function ProductCardFigma({ 
  name = "Golden Cocoa Truffle",
  description = "70% Belgian Dark Chocolate • Smooth • Rich",
  price = 349,
  rating = 4.9,
  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuCTJQreqCw02DI7IcswU75einRQ6afaru68Wg6SH2PsA3fyiHNHM9A2mW4_nTEyXzuvzgzhXuvu4SPUX3gZtBQIPmo8LDnyn-QrEHQ-TRrbztZLnhJFX_sjJu7FEedwk0beqxPv0rP_J71SByV4VahyKFERVa-ypkjMphSuqzr7Gd59cP6U_C-Zc1neOs0slOSXCdEGWkwk-ApXJtPqQZcDa19dIqCnOomgOjomLAGkG_wL9wQfGFFa_9xTAo9lxKWH-M60RRJQ1Srr"
}: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group w-[280px] h-[420px] rounded-[26px] overflow-hidden transition-all duration-300 ease-out"
        style={{ 
          background: 'linear-gradient(135deg, #02040A 0%, #0A1128 100%)',
          boxShadow: '0px 25px 60px rgba(0,0,0,0.45)'
        }}
      >
        {/* ✨ Golden Glow Border */}
        <div 
          className="absolute inset-0 rounded-[26px] pointer-events-none z-10"
          style={{
            border: '1px solid rgba(255, 209, 102, 0.4)',
            boxShadow: 'inset 0 0 15px rgba(255, 209, 102, 0.2)'
          }}
        ></div>

        {/* ⭐ Rating Badge */}
        <div className="absolute top-4 right-4 z-30 bg-gold-accent text-[#2B1B17] px-2 py-1 rounded-[13px] flex items-center justify-center gap-1 font-poppins font-medium text-[12px] min-w-[60px] h-[26px] shadow-sm">
          <span>⭐</span> {rating}
        </div>

        {/* ✨ Magic Chocolate Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute w-[8px] h-[8px] bg-gold-accent/20 rounded-full blur-[8px] top-[35%] left-[20%] animate-pulse" />
          <div className="absolute w-[10px] h-[10px] bg-gold-accent/20 rounded-full blur-[8px] top-[25%] right-[25%] animate-pulse delay-75" />
          <div className="absolute w-[6px] h-[6px] bg-gold-accent/20 rounded-full blur-[8px] bottom-[45%] left-[30%] animate-pulse delay-150" />
          <div className="absolute w-[9px] h-[9px] bg-gold-accent/20 rounded-full blur-[8px] top-[45%] right-[15%] animate-[pulse_3s_ease-in-out_infinite]" />
        </div>

        {/* 🍫 Floating Chocolate Image */}
        <div className="relative flex justify-center items-center mt-10 mb-4 z-20 transition-transform duration-500 group-hover:-translate-y-[10px] group-hover:scale-[1.08]">
          <div 
            className="w-[200px] h-[200px] rounded-full overflow-hidden"
            style={{ boxShadow: '0px 20px 30px rgba(0,0,0,0.45)' }}
          >
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 📝 Product Information */}
        <div className="px-6 pb-6 z-20 relative flex flex-col h-full">
          <div className="mb-3 text-center">
            <h3 className="font-playfair text-[20px] text-cream-text leading-tight mb-1 truncate">
              {name}
            </h3>
            <p className="font-poppins text-[12px] text-soft-text leading-tight">
              {description}
            </p>
          </div>

          {/* 💰 Price Section */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-poppins font-bold text-[22px] text-gold-accent tracking-tight">₹{price}</span>
            <span className="font-poppins text-[12px] text-strike-price line-through opacity-50">₹{price + 100}</span>
          </div>

          {/* 🛒 Glass Add-to-Cart Button */}
          <div className="flex justify-center mt-auto">
            <button 
              className="w-[220px] h-[48px] rounded-[24px] flex items-center justify-center font-poppins font-semibold text-cream-text text-sm transition-transform hover:scale-105 active:scale-95 z-40 pointer-events-auto"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* ❤️ Hidden Hover Actions */}
        <div 
          className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center justify-center gap-4 bg-black/20"
        >
          <button 
            className="size-12 translate-y-[10px] group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md border border-white/30 pointer-events-auto shadow-xl"
            title="Wishlist"
          >
            <Heart size={20} />
          </button>
          <button 
            onClick={() => setIsQuickViewOpen(true)}
            className="size-12 translate-y-[10px] group-hover:translate-y-0 transition-all duration-500 delay-150 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md border border-white/30 pointer-events-auto shadow-xl"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      <QuickViewModal 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
        product={{ _id: 'mockup', name, description, price, rating, image }}
      />
    </>
  );
}
