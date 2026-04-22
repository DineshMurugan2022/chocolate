import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Heart, ShoppingBag, Search, Menu, X, ChevronDown, BookOpen, Store, Sprout, Calendar, RefreshCw, Gift, Sparkles, Hammer } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import WishlistDrawer from '@/components/WishlistDrawer';
import HeaderOoze from './HeaderOoze';
import Logo from './Logo';
import LiveViewerCount from './LiveViewerCount';
import Magnetic from './Magnetic';

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  dropdown?: { name: string; path: string; }[];
}

const MobileNavItem = ({ 
  link, 
  isCelestialTheme, 
  navigate, 
  setIsMobileMenuOpen 
}: { 
  link: NavItem, 
  isCelestialTheme: boolean, 
  navigate: (path: string) => void, 
  setIsMobileMenuOpen: (open: boolean) => void 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-black/5 last:border-0 pb-2 mb-2">
      <button
        onClick={() => {
          if (link.dropdown) {
            setIsDropdownOpen(!isDropdownOpen);
          } else {
            navigate(link.path);
            setIsMobileMenuOpen(false);
          }
        }}
        className={`flex items-center justify-between py-3 font-display font-bold text-lg transition-colors
          ${isCelestialTheme ? 'text-white hover:text-aurora-cyan' : 'text-cocoa-deep hover:text-gold-accent'}`}
      >
        <div className="flex items-center gap-3">
          {link.icon && <span className={isCelestialTheme ? 'text-aurora-cyan' : 'text-gold-accent'}>{link.icon}</span>}
          <span className="capitalize">{link.name.toLowerCase()}</span>
        </div>
        {link.dropdown && (
          <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        )}
      </button>
      {link.dropdown && (
        <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 pl-11
          ${isDropdownOpen ? 'max-h-96 opacity-100 pb-2' : 'max-h-0 opacity-0'}`}
        >
          {link.dropdown.map(subItem => (
            <button
              key={subItem.name}
              onClick={() => {
                navigate(subItem.path);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left font-body font-medium text-base transition-colors py-1 ${isCelestialTheme ? 'text-white/70 hover:text-aurora-cyan' : 'text-cocoa-medium hover:text-gold-accent'}`}
            >
              {subItem.name.charAt(0) + subItem.name.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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

  const leftLinks: NavItem[] = [
    { name: 'STORY', path: '/about', icon: <BookOpen size={18} /> },
    { name: 'SHOP', path: '/shop', icon: <Store size={18} /> },
    { name: 'DIET', path: '/diet', icon: <Sprout size={18} /> },
    { 
      name: 'OCCASION', 
      path: '#',
      icon: <Calendar size={18} />,
      dropdown: [
        { name: 'EVENTS', path: '/events' },
        { name: 'WEDDING', path: '/events/wedding' },
        { name: 'BIRTHDAY', path: '/events/birthday' },
        { name: 'FAMILY', path: '/events/family' }
      ]
    },
    { name: 'SUBSCRIPTION', path: '/subscription', icon: <RefreshCw size={18} /> }
  ];

  const rightLinks: NavItem[] = [
    { name: 'GIFTING', path: '/events/gifts', icon: <Gift size={18} /> },
    { name: 'ACCESSORIES', path: '/accessories', icon: <Sparkles size={18} /> },
    { name: 'WORKSHOP', path: '/workshop', icon: <Hammer size={18} /> }
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
      {!isCelestialTheme && <HeaderOoze />}

      <div className={`max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 xl:px-14 h-16 md:h-24 lg:h-28 grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-700 relative z-20 pointer-events-auto ${isCelestialTheme ? 'bg-[#030308]/40 backdrop-blur-3xl border-b border-white/5' : ''}`}>
        
        {/* Left Section */}
        <div className="flex items-center justify-start h-full overflow-hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${themeColors.text} p-2 hover:bg-white/5 rounded-full transition-colors mr-2`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8 pr-4">
            {leftLinks.map((link) => (
              <div key={link.name} className={`relative group/dropdown ${
                (link.name === 'STORY' || link.name === 'SUBSCRIPTION' || link.name === 'OCCASION') ? 'hidden 2xl:block' : ''
              } ${
                (link.name === 'OCCASION' || link.name === 'STORY') ? 'hidden xl:block' : ''
              }`}>
                <Magnetic>
                  <button
                    onClick={() => link.path !== '#' && navigate(link.path)}
                    className={`font-body text-[8px] xl:text-[9px] 2xl:text-[10px] font-black tracking-[0.2em] xl:tracking-[0.3em] 2xl:tracking-[0.4em] ${themeColors.text} ${themeColors.hover} transition-all uppercase drop-shadow-md italic whitespace-nowrap`}
                  >
                    {link.name}
                  </button>
                </Magnetic>

                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50">
                    <div className={`min-w-[160px] ${isCelestialTheme ? 'bg-[#030308]/90 border-white/10' : 'bg-[#1a0f0d]/95 border-gold-soft/20'} backdrop-blur-xl border rounded-2xl p-4 shadow-2xl flex flex-col gap-3`}>
                      {link.dropdown.map(subItem => (
                        <button
                          key={subItem.name}
                          onClick={() => navigate(subItem.path)}
                          className={`text-left font-body text-[9px] font-black tracking-widest uppercase ${themeColors.text} hover:text-white transition-colors`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Center Section: Logo */}
        <div className="flex items-center justify-center px-2 md:px-4 lg:px-6">
          <Magnetic>
            <div 
              onClick={() => navigate('/')}
              className="flex items-center justify-center cursor-pointer group z-30"
            >
              <Logo className={`w-24 md:w-32 lg:w-40 xl:w-48 2xl:w-56 h-auto transition-transform group-hover:scale-105 duration-700 ${isCelestialTheme ? 'brightness-150 contrast-125' : ''}`} variant="light" />
            </div>
          </Magnetic>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end h-full overflow-hidden">
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8 pl-4 mr-4 xl:mr-8">
            {rightLinks.map((link) => (
              <div key={link.name} className={`relative group/dropdown ${
                (link.name === 'ACCESSORIES' || link.name === 'WORKSHOP') ? 'hidden xl:block' : ''
              }`}>
                <Magnetic>
                  <button
                    onClick={() => link.path !== '#' && navigate(link.path)}
                    className={`font-body text-[8px] xl:text-[9px] 2xl:text-[10px] font-black tracking-[0.2em] xl:tracking-[0.3em] 2xl:tracking-[0.4em] ${themeColors.text} ${themeColors.hover} transition-all uppercase drop-shadow-md italic whitespace-nowrap`}
                  >
                    {link.name}
                  </button>
                </Magnetic>
                
                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50">
                    <div className={`min-w-[160px] ${isCelestialTheme ? 'bg-[#030308]/90 border-white/10' : 'bg-[#1a0f0d]/95 border-gold-soft/20'} backdrop-blur-xl border rounded-2xl p-4 shadow-2xl flex flex-col gap-3`}>
                      {link.dropdown.map(subItem => (
                        <button
                          key={subItem.name}
                          onClick={() => navigate(subItem.path)}
                          className={`text-left font-body text-[9px] font-black tracking-widest uppercase ${themeColors.text} hover:text-white transition-colors`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4 xl:gap-6">
            <div className="hidden 3xl:block">
              <LiveViewerCount />
            </div>
            
            <div className={`hidden md:flex items-center gap-3 xl:gap-4 pr-4 xl:pr-6 border-r ${themeColors.border}`}>
              <Magnetic>
                <button className={`${themeColors.text} hover:scale-110 transition-transform`}>
                  <Search size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <button onClick={() => setIsWishlistOpen(true)} className={`${themeColors.text} hover:scale-110 transition-transform`}>
                  <Heart size={16} />
                </button>
              </Magnetic>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {!user ? (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className={`hidden sm:block font-body text-[8px] xl:text-[9px] font-black uppercase tracking-[0.2em] ${themeColors.text} ${themeColors.hover} transition-colors italic`}
                  >
                    LOG_IN
                  </button>
               ) : (
                  <button 
                    onClick={() => navigate('/profile')} 
                    className={`${themeColors.text} ${themeColors.hover} transition-colors`}
                  >
                    <User size={18} />
                  </button>
               )}

              <Magnetic>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative group flex items-center justify-center"
                >
                  <div className={`size-8 md:size-10 lg:size-11 ${themeColors.bg} backdrop-blur-md border ${themeColors.border} rounded-full flex items-center justify-center transition-all hover:bg-white hover:border-white group-hover:bg-white group-hover:scale-105 shadow-xl`}>
                      <ShoppingBag size={16} className={`${themeColors.text} group-hover:text-black transition-colors`} />
                  </div>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-4 bg-[#FF1D8E] text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1050] lg:hidden transition-opacity duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-sm z-[1100] flex flex-col pointer-events-auto lg:hidden transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCelestialTheme ? 'bg-[#030308] border-r border-white/10 text-white' : 'bg-ivory-warm shadow-2xl text-cocoa-deep rounded-r-3xl'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-black/5">
          <Logo className="w-28" variant={isCelestialTheme ? "light" : "dark"} />
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className={`p-2 rounded-full transition-colors ${isCelestialTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-cocoa-deep/5 hover:bg-cocoa-deep/10'}`}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex flex-col flex-1 overflow-y-auto py-6 px-6 gap-2">
          {[...leftLinks, ...rightLinks].map((link) => (
            <MobileNavItem 
              key={link.name} 
              link={link} 
              isCelestialTheme={isCelestialTheme} 
              navigate={navigate} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
          ))}
        </nav>

        <div className={`mt-auto p-6 bg-black/5 flex flex-col gap-4 rounded-br-3xl`}>
          <button onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 text-sm font-body font-bold transition-colors ${isCelestialTheme ? 'text-white hover:text-aurora-cyan' : 'text-cocoa-deep hover:text-gold-accent'}`}>
            <Heart size={18} className={isCelestialTheme ? 'text-aurora-cyan' : 'text-gold-accent'} /> Wishlist
          </button>
          <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 text-sm font-body font-bold transition-colors ${isCelestialTheme ? 'text-white hover:text-aurora-cyan' : 'text-cocoa-deep hover:text-gold-accent'}`}>
            <User size={18} className={isCelestialTheme ? 'text-aurora-cyan' : 'text-gold-accent'} /> {user ? 'Profile' : 'Log In'}
          </button>
        </div>
      </div>
    </header>
  );
}
