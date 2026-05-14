import { ArrowUpRight, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChocolateWave from './ChocolateWave';
import Logo from './Logo';

export default function Footer() {
   const navigate = useNavigate();
   const location = useLocation();
   const year = new Date().getFullYear();

   const isRubyTheme = location.pathname === '/profile';
   const isCelestialTheme = false; // Obsolete

   return (
      <footer className={`relative ${isRubyTheme ? 'bg-onyx-black text-white border-t-4 border-heritage-red pt-20 pb-12' : isCelestialTheme ? 'bg-celestial-bg border-t border-white/5 pt-10 pb-6' : 'bg-cocoa-deep mt-8 pt-10 pb-6'} text-ivory-warm px-6 md:px-20 overflow-visible`}>

         {/* Stochastic Chocolate Wave Animation - Hidden on Profile */}
         {!isRubyTheme && !isCelestialTheme && <ChocolateWave />}

         <div className="w-full max-w-[1400px] mx-auto relative z-10">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${isRubyTheme ? 'gap-12 mb-16' : 'gap-8 mb-8'}`}>

               {/* Brand Identity */}
               <div className={`flex flex-col items-center md:items-start text-center md:text-left ${isRubyTheme ? 'space-y-10' : 'space-y-8'}`}>
                  <div className={isRubyTheme ? 'mb-6' : 'mb-6'}>
                     <Logo
                        variant={isRubyTheme ? 'white' : isCelestialTheme ? 'celestial' : 'gold'}
                        className={`${isRubyTheme ? 'scale-125' : 'scale-110'} origin-center md:origin-left`}
                     />
                  </div>

                  <p className={`${isRubyTheme ? 'font-display uppercase text-xs tracking-[0.2em] text-white/40 border-l-2 border-heritage-red pl-6 font-bold' : 'font-serif italic text-lg text-ivory-warm/50 border-l border-burnt-caramel/20 pl-6'} leading-relaxed md:pr-6 max-w-sm`}>
                     {isRubyTheme ? 'Pure British craft, harvested from the deepest estates. A narrative of architectural excellence.' : '"Respectfully harvesting from the deepest botanical estates. A narrative of pure British craft."'}
                  </p>

                  <div className={`flex ${isRubyTheme ? 'gap-4' : 'gap-6'} justify-center md:justify-start`}>
                     {[
                        { icon: Instagram, label: 'IG' },
                        { icon: Facebook, label: 'FB' },
                        { icon: Twitter, label: 'TW' }
                     ].map(({ icon: Icon, label }) => (
                        <button key={label} className={`group relative ${isRubyTheme ? 'size-12 border-2 border-white/10' : 'size-10 rounded-full border border-ivory-warm/10'} flex items-center justify-center overflow-hidden transition-all hover:border-heritage-red`}>
                           <div className={`absolute inset-0 ${isRubyTheme ? 'bg-heritage-red translate-y-full group-hover:translate-y-0' : 'inset-x-0 bottom-0 h-0 bg-burnt-caramel group-hover:h-full'} transition-all duration-300`} />
                           <Icon size={isRubyTheme ? 18 : 16} className={`relative z-10 ${isRubyTheme ? 'text-white' : 'text-ivory-warm'} group-hover:text-white transition-colors`} />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Navigation Matrix */}
               <div className={`flex flex-col items-center md:items-start ${isRubyTheme ? 'space-y-12' : 'space-y-10'}`}>
                  <div className="flex items-center gap-4">
                     <div className={`${isRubyTheme ? 'h-[2px] w-10' : 'h-[1px] w-8'} bg-heritage-red`} />
                     <span className={`font-body text-[10px] text-heritage-red font-black uppercase tracking-[0.5em]`}>{isRubyTheme ? 'INVENTORY' : 'Inventory'}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start gap-6">
                     {(isRubyTheme ? ['COLLECTIONS', 'THE ATELIER', 'SEASONAL', 'SOCIETY', 'MANIFESTO'] : ['Heritage Matrix', 'Artisan Atelier', 'Seasonal Harvests', 'Society Membership', 'Curatorial Manifest']).map((item) => (
                        <button
                           key={item}
                           onClick={() => navigate('/shop')}
                           className={`w-fit ${isRubyTheme ? 'font-display text-2xl text-white/40 hover:text-white uppercase tracking-tighter font-black hover:translate-x-4' : 'font-display text-2xl text-ivory-warm/40 hover:text-burnt-caramel italic hover:pl-4'} transition-all flex items-center gap-4 group`}
                        >
                           {item}
                           <ArrowUpRight size={isRubyTheme ? 20 : 16} className={`${isRubyTheme ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100 -translate-y-1'} transition-all text-heritage-red`} />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Contact Node */}
               <div className={`flex flex-col items-center md:items-start ${isRubyTheme ? 'space-y-12' : 'space-y-10'}`}>
                  <div className="flex items-center gap-4">
                     <div className={`${isRubyTheme ? 'h-[2px] w-10' : 'h-[1px] w-8'} bg-heritage-red`} />
                     <span className={`font-body text-[10px] text-heritage-red font-black uppercase tracking-[0.5em]`}>{isRubyTheme ? 'CONTACT' : 'Connection'}</span>
                  </div>
                  <div className={`${isRubyTheme ? 'space-y-10' : 'space-y-8'} flex flex-col items-center md:items-start text-center md:text-left`}>
                     <div className="space-y-2 group flex flex-col items-center md:items-start">
                        <div className={`flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em] text-heritage-red`}>
                           <MapPin size={isRubyTheme ? 14 : 12} /> {isRubyTheme ? 'ESTATE HQ' : 'Estate HQ'}
                        </div>
                        <p className={isRubyTheme ? "font-display text-xl font-black text-white uppercase tracking-tighter" : "font-serif text-lg italic text-ivory-warm leading-relaxed"}>
                           CIT Nagar, Chennai - 600035
                        </p>
                     </div>
                     <div className="space-y-2 group flex flex-col items-center md:items-start">
                        <div className={`flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em] text-heritage-red`}>
                           <Mail size={isRubyTheme ? 14 : 12} /> {isRubyTheme ? 'TERMINAL' : 'Digital Link'}
                        </div>
                        <p className={isRubyTheme ? "font-display text-xl font-black text-white uppercase tracking-tighter" : "font-serif text-lg italic text-ivory-warm"}>sales@british-chocolate.com</p>
                     </div>
                     <div className="space-y-2 group flex flex-col items-center md:items-start">
                        <div className={`flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em] text-heritage-red`}>
                           <Phone size={isRubyTheme ? 14 : 12} /> {isRubyTheme ? 'VOICE_LINK' : 'Voice Path'}
                        </div>
                        <p className={isRubyTheme ? "font-display text-xl font-black text-white uppercase tracking-tighter" : "font-serif text-lg italic text-ivory-warm"}>+91 88381 34161</p>
                     </div>
                  </div>
               </div>

               {/* Transmission */}
               <div className={`flex flex-col items-center md:items-start ${isRubyTheme ? 'space-y-16' : 'space-y-16'}`}>
                  <div className={`${isRubyTheme ? 'space-y-12' : 'space-y-10'} w-full`}>
                     <div className="flex items-center gap-4">
                        <div className={`${isRubyTheme ? 'h-[2px] w-10' : 'h-[1px] w-8'} bg-heritage-red`} />
                        <span className={`font-body text-[10px] text-heritage-red font-black uppercase tracking-[0.5em]`}>{isRubyTheme ? 'TRANSMISSION' : 'Transmission'}</span>
                     </div>
                     <div className={`relative group ${isRubyTheme ? 'p-10 bg-white/5 border-2 border-white/10' : 'p-6 rounded-[30px] border bg-white/[0.03] border-ivory-warm/[0.05]'} overflow-hidden w-full`}>
                        {isRubyTheme && <div className="absolute top-0 right-0 size-32 bg-heritage-red/5 -rotate-45 translate-x-12 -translate-y-12" />}
                        <div className={`relative border-b-2 ${isRubyTheme ? 'border-white/10 group-hover:border-heritage-red' : 'border-ivory-warm/10 group-hover:border-burnt-caramel'} pb-4 flex items-center transition-colors`}>
                           <input
                              type="email"
                              placeholder={isRubyTheme ? "EMAIL_ENTRY" : "E-mail_Registry"}
                              className="w-full bg-transparent focus:outline-none font-body font-bold text-[10px] uppercase tracking-[0.4em] text-white placeholder:text-white/20"
                           />
                           <button className={`${isRubyTheme ? 'text-heritage-red' : 'text-burnt-caramel'} hover:scale-125 transition-transform`}>
                              <ArrowUpRight size={isRubyTheme ? 32 : 24} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Legal Base */}
            <div className={`flex flex-col md:flex-row items-center justify-between ${isRubyTheme ? 'gap-12 border-t-2 pt-12' : 'gap-10 border-t pt-10'} border-white/5`}>
               <div className={`flex flex-col md:flex-row items-center ${isRubyTheme ? 'gap-10' : 'gap-6 md:gap-10'}`}>
                  <span className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] text-center md:text-left">© {year} BRITISH CHOCOLATE STORE</span>
                  <div className={`flex flex-wrap justify-center ${isRubyTheme ? 'gap-8' : 'gap-6'}`}>
                     <button onClick={() => navigate('/terms-of-service')} className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-heritage-red transition-colors">{isRubyTheme ? 'TERMS' : 'Terms_of_Service'}</button>
                     <button onClick={() => navigate('/shipping-policy')} className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-heritage-red transition-colors">{isRubyTheme ? 'SHIPPING' : 'Shipping_Protocol'}</button>
                     <button onClick={() => navigate('/refund-policy')} className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-heritage-red transition-colors">{isRubyTheme ? 'RETURNS' : 'Return_Registry'}</button>
                  </div>
               </div>

               <div className={`flex flex-col md:flex-row items-center ${isRubyTheme ? 'gap-12' : 'gap-8 md:gap-10'} opacity-20 hover:opacity-50 transition-all text-white/50`}>
                  <div className="flex flex-col items-center md:items-end">
                     <span className="font-body text-[9px] font-black tracking-widest leading-none">{isRubyTheme ? 'REG_FSSAI' : 'LICENSE_FSSAI'}</span>
                     <span className={`font-body ${isRubyTheme ? 'text-[11px] font-black' : 'text-[10px]'} mt-1 tracking-tighter`}>22425547000400</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                     <span className="font-body text-[9px] font-black tracking-widest leading-none">{isRubyTheme ? 'TAX_GSTIN' : 'MATRIX_GSTIN'}</span>
                     <span className={`font-body ${isRubyTheme ? 'text-[11px] font-black' : 'text-[10px]'} mt-1 tracking-tighter`}>33AAFPM2706A2ZF</span>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
