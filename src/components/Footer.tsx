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
      <footer className="relative bg-onyx-black text-white pt-20 pb-12 px-6 md:px-20 overflow-visible border-t-4 border-heritage-red">

         <div className="w-full max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

               {/* Brand Identity */}
               <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10">
                  <div className="mb-6">
                     <Logo
                        variant="white"
                        className="scale-125 origin-center md:origin-left"
                     />
                  </div>

                  <p className="font-display uppercase text-xs tracking-[0.2em] text-white/40 leading-relaxed md:pr-10 border-l-2 border-heritage-red pl-6 max-w-sm font-bold">
                    Pure British craft, harvested from the deepest estates. A narrative of architectural excellence.
                  </p>

                  <div className="flex gap-4 justify-center md:justify-start">
                     {[
                        { icon: Instagram, label: 'IG' },
                        { icon: Facebook, label: 'FB' },
                        { icon: Twitter, label: 'TW' }
                     ].map(({ icon: Icon, label }) => (
                        <button key={label} className="group relative size-12 border-2 border-white/10 flex items-center justify-center overflow-hidden transition-all hover:border-heritage-red">
                           <div className="absolute inset-0 bg-heritage-red translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                           <Icon size={18} className="relative z-10 text-white group-hover:text-white transition-colors" />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Navigation Matrix */}
               <div className="flex flex-col items-center md:items-start space-y-12">
                  <div className="flex items-center gap-4">
                     <div className="h-[2px] w-10 bg-heritage-red" />
                     <span className="font-body text-[10px] text-heritage-red font-black uppercase tracking-[0.5em]">INVENTORY</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start gap-6">
                     {['COLLECTIONS', 'THE ATELIER', 'SEASONAL', 'SOCIETY', 'MANIFESTO'].map((item) => (
                        <button
                           key={item}
                           onClick={() => navigate('/shop')}
                           className="w-fit font-display text-2xl text-white/40 hover:text-white transition-all uppercase tracking-tighter font-black hover:translate-x-4 flex items-center gap-4 group"
                        >
                           {item}
                           <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all text-heritage-red" />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Contact Node */}
               <div className="flex flex-col items-center md:items-start space-y-12">
                  <div className="flex items-center gap-4">
                     <div className="h-[2px] w-10 bg-heritage-red" />
                     <span className="font-body text-[10px] text-heritage-red font-black uppercase tracking-[0.5em]">CONTACT</span>
                  </div>
                  <div className="space-y-10 flex flex-col items-center md:items-start text-center md:text-left">
                     <div className="space-y-2 group flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em] text-heritage-red">
                           <MapPin size={14} /> ESTATE HQ
                        </div>
                        <p className="font-display text-xl font-black text-white uppercase tracking-tighter">
                           CIT Nagar, Chennai - 600035
                        </p>
                     </div>
                     <div className="space-y-2 group flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em] text-heritage-red">
                           <Mail size={14} /> TERMINAL
                        </div>
                        <p className="font-display text-xl font-black text-white uppercase tracking-tighter">sales@british-chocolate.com</p>
                     </div>
                     <div className="space-y-2 group flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em] text-heritage-red">
                           <Phone size={14} /> VOICE_LINK
                        </div>
                        <p className="font-display text-xl font-black text-white uppercase tracking-tighter">+91 88381 34161</p>
                     </div>
                  </div>
               </div>

               {/* Transmission */}
               <div className="flex flex-col items-center md:items-start space-y-16">
                  <div className="space-y-12 w-full">
                     <div className="flex items-center gap-4">
                        <div className="h-[2px] w-10 bg-heritage-red" />
                        <span className="font-body text-[10px] text-heritage-red font-black uppercase tracking-[0.5em]">TRANSMISSION</span>
                     </div>
                     <div className="relative group p-10 bg-white/5 border-2 border-white/10 overflow-hidden w-full">
                        <div className="absolute top-0 right-0 size-32 bg-heritage-red/5 -rotate-45 translate-x-12 -translate-y-12" />
                        <div className="relative border-b-2 border-white/10 group-hover:border-heritage-red pb-4 flex items-center transition-colors">
                           <input
                              type="email"
                              placeholder="EMAIL_ENTRY"
                              className="w-full bg-transparent focus:outline-none font-body font-bold text-[10px] uppercase tracking-[0.4em] text-white placeholder:text-white/20"
                           />
                           <button className="text-heritage-red hover:scale-125 transition-transform">
                              <ArrowUpRight size={32} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Legal Base */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t-2 border-white/5 pt-12">
               <div className="flex flex-col md:flex-row items-center gap-10">
                  <span className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] text-center md:text-left">© {year} BRITISH CHOCOLATE STORE</span>
                  <div className="flex flex-wrap justify-center gap-8">
                     <button onClick={() => navigate('/terms-of-service')} className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-heritage-red transition-colors">TERMS</button>
                     <button onClick={() => navigate('/shipping-policy')} className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-heritage-red transition-colors">SHIPPING</button>
                     <button onClick={() => navigate('/refund-policy')} className="font-body text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-heritage-red transition-colors">RETURNS</button>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-12 opacity-20 hover:opacity-50 transition-all text-white/50">
                  <div className="flex flex-col items-center md:items-end">
                     <span className="font-body text-[9px] font-black tracking-widest leading-none">REG_FSSAI</span>
                     <span className="font-body text-[11px] mt-1 tracking-tighter font-black">22425547000400</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                     <span className="font-body text-[9px] font-black tracking-widest leading-none">TAX_GSTIN</span>
                     <span className="font-body text-[11px] mt-1 tracking-tighter font-black">33AAFPM2706A2ZF</span>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
