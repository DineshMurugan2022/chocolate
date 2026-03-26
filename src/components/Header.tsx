import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { User, Heart, ShoppingBag, Search, Menu, X } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import WishlistDrawer from '@/components/WishlistDrawer';
import HeaderOoze from './HeaderOoze';
import Logo from './Logo';

export default function Header({ setIsCartOpen }: { setIsCartOpen: (open: boolean) => void }) {
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'STORY', path: '/about' },
    { name: 'BOUTIQUE', path: '/shop' },
    { name: 'HARVESTS', path: '/shop' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-700 pointer-events-none">
      
      {/* COMPACT SOLID CHOCOLATE WAVE BACKGROUND */}
      <HeaderOoze />

      {/* NAVBAR CONTENTS - Compact and integrated */}
      <div className={`max-w-[1400px] mx-auto px-4 md:px-20 flex items-center justify-between transition-all duration-700 relative z-20 pointer-events-auto h-16 md:h-20 lg:h-24`}>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-ivory-warm p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Navigation - Centered vertically on the compact wave */}
        <nav className="hidden lg:flex items-center gap-12 mt-[-5px]">
          {navLinks.slice(0, 2).map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="font-body text-[10px] md:text-[11px] font-black tracking-[0.4em] text-ivory-warm hover:text-burnt-caramel transition-all uppercase drop-shadow-lg"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Center: Branding Layer - Perfectly Integrated */}
        <div 
          onClick={() => navigate('/')}
          className="flex flex-col items-center cursor-pointer group mt-[-5px]"
        >
           <Logo className="w-32 md:w-56 h-auto transition-transform group-hover:scale-105" variant="light" />
        </div>

        {/* Action Layer */}
        <div className="flex items-center gap-6 md:gap-8 mt-[-5px]">
          <div className="hidden md:flex items-center gap-6 pr-8 border-r border-ivory-warm/10">
            <button className="text-ivory-warm hover:scale-110 transition-transform">
              <Search size={20} />
            </button>
            <button onClick={() => setIsWishlistOpen(true)} className="text-ivory-warm hover:scale-110 transition-transform">
              <Heart size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {!user ? (
               <button 
                 onClick={() => setIsAuthModalOpen(true)}
                 className="hidden sm:block font-body text-[9px] font-black uppercase tracking-[0.4em] text-ivory-warm hover:text-burnt-caramel transition-colors"
               >
                 LOG_IN
               </button>
            ) : (
               <button onClick={() => navigate('/profile')} className="text-ivory-warm hover:text-ivory-warm transition-colors">
                 <User size={20} />
               </button>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group flex items-center justify-center scale-75 md:scale-90"
            >
              <div className="size-12 bg-ivory-warm/10 backdrop-blur-md border border-ivory-warm/20 rounded-full flex items-center justify-center transition-all hover:bg-burnt-caramel hover:border-burnt-caramel">
                 <ShoppingBag size={20} className="text-ivory-warm" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 size-5 bg-[#FF1D8E] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-cocoa-deep text-ivory-warm p-10 flex flex-col pointer-events-auto lg:hidden">
          <div className="flex justify-between items-center mb-20">
            <Logo className="w-40" variant="light" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className="text-4xl font-display italic font-black text-left hover:text-gold-accent transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-6">
            <button onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 text-xl font-body font-bold tracking-widest">
              <Heart size={20} /> WISHLIST
            </button>
            <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 text-xl font-body font-bold tracking-widest">
              <User size={20} /> {user ? 'PROFILE' : 'LOG_IN'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
