import { ArrowUpRight, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChocolateWave from './ChocolateWave';
import Logo from './Logo';

export default function Footer() {
   const navigate = useNavigate();
   const location = useLocation();
   const year = new Date().getFullYear();

   const isCelestialTheme = location.pathname === '/profile';

   return (
      <footer className={`relative ${isCelestialTheme ? 'bg-celestial-bg border-t border-white/5' : 'bg-cocoa-deep mt-8'} text-ivory-warm pt-10 pb-6 px-6 md:px-20 overflow-visible`}>

         {/* Stochastic Chocolate Wave Animation - Hidden on Celestial Profile */}
         {!isCelestialTheme && <ChocolateWave />}

         <div className="w-full max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

               {/* Brand Identity */}
               <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                  <div className="mb-12">
                     <Logo
                        variant={isCelestialTheme ? 'celestial' : 'light'}
                        className="origin-left"
                     />
                  </div>

                  <p className={`font-serif italic text-lg ${isCelestialTheme ? 'text-white/40' : 'text-ivory-warm/50'} leading-relaxed md:pr-6 md:border-l ${isCelestialTheme ? 'border-aurora-cyan/20' : 'border-burnt-caramel/20'} md:pl-6 max-w-sm`}>
                     "Respectfully harvesting from the deepest botanical estates. A narrative of pure British craft."
                  </p>

                  <div className="flex gap-6 justify-center md:justify-start">
                     {[
                        { icon: Instagram, label: 'IG' },
                        { icon: Facebook, label: 'FB' },
                        { icon: Twitter, label: 'TW' }
                     ].map(({ icon: Icon, label }) => (
                        <button key={label} className={`group relative size-10 rounded-full border ${isCelestialTheme ? 'border-white/10' : 'border-ivory-warm/10'} flex items-center justify-center overflow-hidden transition-all ${isCelestialTheme ? 'hover:border-aurora-cyan' : 'hover:border-burnt-caramel'}`}>
                           <div className={`absolute inset-x-0 bottom-0 h-0 ${isCelestialTheme ? 'bg-aurora-cyan' : 'bg-burnt-caramel'} group-hover:h-full transition-all duration-500`} />
                           <Icon size={16} className={`relative z-10 ${isCelestialTheme ? 'text-white' : 'text-ivory-warm'} group-hover:text-black transition-colors`} />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Navigation Matrix */}
               <div className="flex flex-col items-center md:items-start space-y-10">
                  <div className="flex items-center gap-4">
                     <div className={`h-[1px] w-8 ${isCelestialTheme ? 'bg-aurora-cyan/40' : 'bg-burnt-caramel/40'}`} />
                     <span className={`font-body text-[10px] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'} font-black uppercase tracking-[0.5em]`}>Inventory</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start gap-6">
                     {['Heritage Matrix', 'Artisan Atelier', 'Seasonal Harvests', 'Society Membership', 'Curatorial Manifest'].map((item) => (
                        <button
                           key={item}
                           onClick={() => navigate(item === 'Society Membership' ? '/subscription' : '/shop')}
                           className={`w-fit font-display text-2xl ${isCelestialTheme ? 'text-white/40 hover:text-aurora-cyan' : 'text-ivory-warm/40 hover:text-burnt-caramel'} transition-all italic hover:pl-4 flex items-center gap-4 group`}
                        >
                           {item}
                           <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Contact Node */}
               <div className="flex flex-col items-center md:items-start space-y-10">
                  <div className="flex items-center gap-4">
                     <div className={`h-[1px] w-8 ${isCelestialTheme ? 'bg-aurora-cyan/40' : 'bg-burnt-caramel/40'}`} />
                     <span className={`font-body text-[10px] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'} font-black uppercase tracking-[0.5em]`}>Connection</span>
                  </div>
                  <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                     <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center md:items-start">
                        <div className={`flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'}`}>
                           <MapPin size={12} /> Estate HQ
                        </div>
                        <p className="font-serif text-lg italic text-ivory-warm leading-relaxed">
                           CIT Nagar, Chennai - 600035
                        </p>
                     </div>
                     <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center md:items-start">
                        <div className={`flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'}`}>
                           <Mail size={12} /> Digital Link
                        </div>
                        <p className="font-serif text-lg italic text-ivory-warm">dnfoodcraft@gmail.com</p>
                     </div>
                     <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center md:items-start">
                        <div className={`flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'}`}>
                           <Phone size={12} /> Voice Path
                        </div>
                        <p className="font-serif text-lg italic text-ivory-warm">+91 88381 34161</p>
                     </div>
                  </div>
               </div>

               {/* Policy Registry & Transmission */}
               <div className="flex flex-col items-center md:items-start space-y-16">
                  <div className="space-y-10 w-full">
                     <div className="flex items-center gap-4">
                        <div className={`h-[1px] w-8 ${isCelestialTheme ? 'bg-aurora-cyan/40' : 'bg-burnt-caramel/40'}`} />
                        <span className={`font-body text-[10px] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'} font-black uppercase tracking-[0.5em]`}>Protocol</span>
                     </div>
                     <div className="flex flex-col items-center md:items-start gap-4">
                        {[
                           { name: 'Shipping_Ops', path: '/shipping-policy' },
                           { name: 'Refund_Logic', path: '/refund-policy' }
                        ].map((item) => (
                           <button
                              key={item.name}
                              onClick={() => navigate(item.path)}
                              className={`w-fit font-serif text-lg ${isCelestialTheme ? 'text-white/40 hover:text-aurora-cyan' : 'text-ivory-warm/40 hover:text-burnt-caramel'} transition-all italic flex items-center gap-2 group`}
                           >
                              {item.name}
                              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-10 w-full">
                     <div className="flex items-center gap-4">
                        <div className={`h-[1px] w-8 ${isCelestialTheme ? 'bg-aurora-cyan/40' : 'bg-burnt-caramel/40'}`} />
                        <span className={`font-body text-[10px] ${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'} font-black uppercase tracking-[0.5em]`}>Transmission</span>
                     </div>
                     <div className={`relative group p-6 rounded-[30px] border ${isCelestialTheme ? 'bg-white/5 border-white/10' : 'bg-white/[0.03] border-ivory-warm/[0.05]'} overflow-hidden w-full`}>
                        <div className={`absolute top-0 right-0 size-24 ${isCelestialTheme ? 'bg-aurora-cyan/10' : 'bg-burnt-caramel/10'} blur-[40px] rounded-full`} />
                        <div className={`relative border-b ${isCelestialTheme ? 'border-white/10 group-hover:border-aurora-cyan' : 'border-ivory-warm/10 group-hover:border-burnt-caramel'} pb-4 flex items-center transition-colors`}>
                           <input
                              type="email"
                              placeholder="E-mail_Registry"
                              className="w-full bg-transparent focus:outline-none font-body font-bold text-[10px] uppercase tracking-[0.4em] text-ivory-warm placeholder:text-ivory-warm/20"
                           />
                           <button className={`${isCelestialTheme ? 'text-aurora-cyan' : 'text-burnt-caramel'} hover:scale-125 transition-transform`}>
                              <ArrowUpRight size={24} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Unified Legal Base */}
            <div className={`flex flex-col md:flex-row items-center justify-between gap-10 border-t ${isCelestialTheme ? 'border-white/5' : 'border-ivory-warm/5'} pt-10`}>
               <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  <span className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] text-center md:text-left">© {year} BRITISH CHOCOLATE STORES INNOVATIVE</span>
                  <div className="flex flex-wrap justify-center gap-6">
                     <button onClick={() => navigate('/terms-of-service')} className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Terms_of_Service</button>
                     <button onClick={() => navigate('/shipping-policy')} className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Shipping_Protocol</button>
                     <button onClick={() => navigate('/refund-policy')} className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Return_Registry</button>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 filter grayscale contrast-125 opacity-20 hover:opacity-50 transition-all text-white/50">
                  <div className="flex flex-col items-center md:items-end">
                     <span className="font-body text-[8px] font-black tracking-widest leading-none">LICENSE_FSSAI</span>
                     <span className="font-mono text-[10px] mt-1 tracking-tighter">22425547000400</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                     <span className="font-body text-[8px] font-black tracking-widest leading-none">MATRIX_GSTIN</span>
                     <span className="font-mono text-[10px] mt-1 tracking-tighter">33AAFPM2706A2ZF</span>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
