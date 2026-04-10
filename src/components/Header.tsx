import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Heart, ShoppingBag, Search, Menu, X } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import WishlistDrawer from '@/components/WishlistDrawer';
import HeaderOoze from './HeaderOoze';
import Logo from './Logo';
import LiveViewerCount from './LiveViewerCount';

export default function Header({ setIsCartOpen }: { setIsCartOpen: (open: boolean) => void }) {
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const isCelestialTheme = location.pathname === '/profile';

  const leftLinks = [
    { name: 'STORY', path: '/about' },
    { name: 'SHOP', path: '/shop' },
    { name: 'DIET', path: '/diet' },
    { name: 'SUBSCRIPTION', path: '/subscription' }
  ];

  const rightLinks = [
    { name: 'EVENTS', path: '/events' },
    { name: 'ACCESSORIES', path: '/accessories' },
    { name: 'WORKSHOP', path: '/workshop' }
  ];

  const themeColors = isCelestialTheme 
    ? {
        text: 'text-aurora-cyan',
        bg: 'bg-white/5',
        border: 'border-white/10',
        hover: 'hover:text-white',
        accent: 'text-aurora-cyan'
      }
    : {
        text: 'text-gold-soft',
        bg: 'bg-gold-soft/5',
        border: 'border-gold-soft/10',
        hover: 'hover:text-white',
        accent: 'text-gold-soft'
      };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-700 pointer-events-none">
      
      {/* COMPACT SOLID CHOCOLATE WAVE BACKGROUND - Hidden on Celestial Profile */}
      {!isCelestialTheme && <HeaderOoze />}

      {/* NAVBAR CONTENTS - Perfectly Aligned and Balanced */}
      <div className={`max-w-[1700px] mx-auto px-6 md:px-10 lg:px-14 h-20 md:h-24 lg:h-32 flex items-center justify-between transition-all duration-700 relative z-20 pointer-events-auto ${isCelestialTheme ? 'bg-[#030308]/40 backdrop-blur-3xl border-b border-white/5' : ''}`}>
        
        {/* Left Section: Nav Group 1 */}
        <div className="flex-1 flex items-center justify-start h-full">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${themeColors.text} p-2 hover:bg-white/5 rounded-full transition-colors mr-2`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 pr-8 xl:pr-12">
            {leftLinks.map((link) => (
              <button
                 key={link.name}
                 onClick={() => navigate(link.path)}
                 className={`font-body text-[9px] xl:text-[10px] font-black tracking-[0.3em] xl:tracking-[0.5em] ${themeColors.text} ${themeColors.hover} transition-all uppercase drop-shadow-md italic whitespace-nowrap 
                 ${(link.name === 'STORY' || link.name === 'SUBSCRIPTION') ? 'hidden 2xl:block' : ''}
                 ${(link.name === 'SUBSCRIPTION') ? 'hidden xl:block' : ''}`}
              >
                 {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Center Section: Absolute Logo (Mathematical perfection) */}
        <div 
          onClick={() => navigate('/')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] flex items-center justify-center cursor-pointer group z-30"
        >
           <Logo className={`w-32 md:w-44 lg:w-52 xl:w-60 2xl:w-72 h-auto transition-transform group-hover:scale-105 duration-700 ${isCelestialTheme ? 'brightness-150 contrast-125' : ''}`} variant="light" />
        </div>

        {/* Right Section: Nav Group 2 + Actions */}
        <div className="flex-1 flex items-center justify-end h-full">
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 pl-8 xl:pl-12 mr-6 xl:mr-14">
            {rightLinks.map((link) => (
              <button
                 key={link.name}
                 onClick={() => navigate(link.path)}
                 className={`font-body text-[9px] xl:text-[10px] font-black tracking-[0.3em] xl:tracking-[0.5em] ${themeColors.text} ${themeColors.hover} transition-all uppercase drop-shadow-md italic whitespace-nowrap
                 ${(link.name === 'ACCESSORIES' || link.name === 'WORKSHOP') ? 'hidden 2xl:block' : ''}
                 ${(link.name === 'WORKSHOP') ? 'hidden xl:block' : ''}`}
              >
                 {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
            <div className="hidden 2xl:block">
              <LiveViewerCount />
            </div>
            
            <div className={`hidden md:flex items-center gap-4 xl:gap-6 pr-6 xl:pr-8 border-r ${themeColors.border}`}>
              <button className={`${themeColors.text} hover:scale-110 transition-transform`}>
                <Search size={18} />
              </button>
              <button onClick={() => setIsWishlistOpen(true)} className={`${themeColors.text} hover:scale-110 transition-transform`}>
                <Heart size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              {!user ? (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className={`hidden sm:block font-body text-[9px] font-black uppercase tracking-[0.4em] ${themeColors.text} ${themeColors.hover} transition-colors italic`}
                  >
                    LOG_IN
                  </button>
               ) : (
                  <button 
                    onClick={() => navigate('/profile')} 
                    className={`${themeColors.text} ${themeColors.hover} transition-colors`}
                  >
                    <User size={20} />
                  </button>
               )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative group flex items-center justify-center"
              >
                 <div className={`size-9 md:size-11 lg:size-12 ${themeColors.bg} backdrop-blur-md border ${themeColors.border} rounded-full flex items-center justify-center transition-all hover:bg-white hover:border-white group-hover:bg-white group-hover:scale-105 shadow-xl`}>
                    <ShoppingBag size={18} className={`${themeColors.text} group-hover:text-black transition-colors`} />
                 </div>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 bg-[#FF1D8E] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-[110] p-10 flex flex-col pointer-events-auto lg:hidden ${isCelestialTheme ? 'bg-[#030308] text-white' : 'bg-cocoa-deep text-ivory-warm'}`}>
          <div className="flex justify-between items-center mb-20">
            <Logo className="w-40" variant="light" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-8">
            {[...leftLinks, ...rightLinks].map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-4xl font-display italic font-black text-left transition-colors ${isCelestialTheme ? 'hover:text-aurora-cyan' : 'hover:text-gold-accent'}`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className={`mt-auto pt-10 border-t ${isCelestialTheme ? 'border-white/5' : 'border-white/10'} flex flex-col gap-6`}>
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
