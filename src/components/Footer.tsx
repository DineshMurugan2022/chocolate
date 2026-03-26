import { ArrowUpRight, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChocolateWave from './ChocolateWave';
import Logo from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative bg-cocoa-deep text-ivory-warm pt-16 pb-8 px-6 md:px-20 overflow-visible mt-16">
      
      {/* Stochastic Chocolate Wave Animation */}
      <ChocolateWave />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-12">
          
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="flex flex-col items-start gap-4">
               <Logo className="w-64 h-auto -ml-4" variant="light" />
               <p className="max-w-xs font-serif italic text-ivory-warm/40 text-[10px] uppercase tracking-[0.4em] mb-4">
                  Artisan Heritage Registry
               </p>
            </div>
            
            <p className="font-serif italic text-lg text-ivory-warm/50 leading-relaxed pr-6 border-l border-burnt-caramel/20 pl-6">
               "Respectfully harvesting from the deepest botanical estates of Asia. A narrative of pure craft."
            </p>

            <div className="flex gap-6">
              {[
                { icon: Instagram, label: 'IG' },
                { icon: Facebook, label: 'FB' },
                { icon: Twitter, label: 'TW' }
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="group relative size-10 rounded-full border border-ivory-warm/10 flex items-center justify-center overflow-hidden transition-all hover:border-burnt-caramel">
                  <div className="absolute inset-x-0 bottom-0 h-0 bg-burnt-caramel group-hover:h-full transition-all duration-500" />
                  <Icon size={16} className="relative z-10 text-ivory-warm group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="space-y-10">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Inventory</span>
             </div>
             <div className="flex flex-col gap-6">
                {['Heritage Matrix', 'Artisan Atelier', 'Seasonal Harvests', 'Curatorial Manifest'].map((item) => (
                   <button
                     key={item}
                     onClick={() => navigate('/shop')}
                     className="w-fit font-display text-2xl text-ivory-warm/40 hover:text-burnt-caramel transition-all italic hover:pl-4 flex items-center gap-4 group"
                  >
                     {item}
                     <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                   </button>
                ))}
             </div>
          </div>

          {/* Contact Node */}
          <div className="space-y-10">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Connection</span>
             </div>
             <div className="space-y-8">
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">
                      <MapPin size={12} /> Estate HQ
                   </div>
                   <p className="font-serif text-lg italic text-ivory-warm leading-relaxed">
                      CIT Nagar, Chennai - 600035
                   </p>
                </div>
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">
                      <Mail size={12} /> Digital Link
                   </div>
                   <p className="font-serif text-lg italic text-ivory-warm">dnfoodcraft@gmail.com</p>
                </div>
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">
                      <Phone size={12} /> Voice Path
                   </div>
                   <p className="font-serif text-lg italic text-ivory-warm">+91 88381 34161</p>
                </div>
             </div>
          </div>

          {/* Sensory Newsletter */}
          <div className="space-y-10">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Transmission</span>
             </div>
             <div className="relative group p-8 bg-white/[0.03] rounded-[30px] border border-ivory-warm/[0.05] overflow-hidden">
                <div className="absolute top-0 right-0 size-24 bg-burnt-caramel/10 blur-[40px] rounded-full" />
                <p className="font-serif italic text-lg text-ivory-warm/40 mb-6 group-hover:text-ivory-warm/60 transition-colors">Subscribe to our heritage dispatches.</p>
                <div className="relative border-b border-ivory-warm/10 pb-4 flex items-center group-hover:border-burnt-caramel transition-colors">
                  <input 
                    type="email" 
                    placeholder="E-mail_Registry" 
                    className="w-full bg-transparent focus:outline-none font-body font-bold text-[10px] uppercase tracking-[0.4em] text-ivory-warm placeholder:text-ivory-warm/20"
                  />
                  <button className="text-burnt-caramel hover:scale-125 transition-transform">
                     <ArrowUpRight size={24} />
                  </button>
                </div>
             </div>
          </div>
        </div>

        {/* Unified Legal Base */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-t border-ivory-warm/5 pt-12">
           <div className="flex flex-wrap items-center justify-center md:justify-start gap-10">
              <span className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em]">© {year} ASIAN CHOCOLATE STORE INNOVATIVE</span>
              <button className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Privacy_Protocol</button>
              <button className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Terms_of_Harvest</button>
           </div>
           
           <div className="flex items-center gap-10 filter grayscale contrast-125 opacity-20 hover:opacity-50 transition-all">
              <div className="flex flex-col items-end">
                <span className="font-body text-[8px] font-black tracking-widest leading-none">LICENSE_FSSAI</span>
                <span className="font-mono text-[10px] mt-1">22425547000400</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-body text-[8px] font-black tracking-widest leading-none">MATRIX_GSTIN</span>
                <span className="font-mono text-[10px] mt-1">33AAFPM2706A2ZF</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
