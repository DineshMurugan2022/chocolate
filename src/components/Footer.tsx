import { ArrowUpRight, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChocolateWave from './ChocolateWave';
import Logo from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative bg-cocoa-deep text-ivory-warm pt-10 pb-6 px-6 md:px-20 overflow-visible mt-8">
      
      {/* Stochastic Chocolate Wave Animation */}
      <ChocolateWave />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <div className="flex flex-col items-center md:items-start gap-4">
               <Logo className="w-56 md:w-64 h-auto" variant="light" />
               <p className="max-w-xs font-serif italic text-ivory-warm/40 text-[10px] uppercase tracking-[0.4em] mb-4">
                  Artisan Heritage Registry
               </p>
            </div>
            
            <p className="font-serif italic text-lg text-ivory-warm/50 leading-relaxed md:pr-6 md:border-l border-burnt-caramel/20 md:pl-6 max-w-sm">
               "Respectfully harvesting from the deepest botanical estates of Asia. A narrative of pure craft."
            </p>

            <div className="flex gap-6 justify-center md:justify-start">
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
          <div className="flex flex-col items-center md:items-start space-y-10">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Inventory</span>
             </div>
             <div className="flex flex-col items-center md:items-start gap-6">
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
          <div className="flex flex-col items-center md:items-start space-y-10">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Connection</span>
             </div>
             <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center md:items-start">
                   <div className="flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">
                      <MapPin size={12} /> Estate HQ
                   </div>
                   <p className="font-serif text-lg italic text-ivory-warm leading-relaxed">
                      CIT Nagar, Chennai - 600035
                   </p>
                </div>
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center md:items-start">
                   <div className="flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">
                      <Mail size={12} /> Digital Link
                   </div>
                   <p className="font-serif text-lg italic text-ivory-warm">dnfoodcraft@gmail.com</p>
                </div>
                <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity flex flex-col items-center md:items-start">
                   <div className="flex items-center gap-3 text-[9px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel">
                      <Phone size={12} /> Voice Path
                   </div>
                   <p className="font-serif text-lg italic text-ivory-warm">+91 88381 34161</p>
                </div>
             </div>
          </div>

          {/* Policy Registry */}
          <div className="flex flex-col items-center md:items-start space-y-10">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Protocol</span>
             </div>
             <div className="flex flex-col items-center md:items-start gap-4">
                {[
                  { name: 'Shipping_Ops', path: '/shipping-policy' },
                  { name: 'Refund_Logic', path: '/refund-policy' },
                  { name: 'Metal_Safety', path: '/heavy-metals-info' },
                  { name: 'Colour_Code', path: '/chocolate-colouring' }
                ].map((item) => (
                   <button
                     key={item.name}
                     onClick={() => navigate(item.path)}
                     className="w-fit font-serif text-lg text-ivory-warm/40 hover:text-burnt-caramel transition-all italic flex items-center gap-2 group"
                   >
                     {item.name}
                     <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                   </button>
                ))}
             </div>
          </div>

          {/* Sensory Newsletter */}
          <div className="flex flex-col items-center md:items-start space-y-10 lg:col-span-4 xl:col-span-1">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-burnt-caramel/40" />
                <span className="font-body text-[10px] text-burnt-caramel font-black uppercase tracking-[0.5em]">Transmission</span>
             </div>
             <div className="relative group p-8 bg-white/[0.03] rounded-[30px] border border-ivory-warm/[0.05] overflow-hidden w-full max-w-sm md:max-w-none">
                <div className="absolute top-0 right-0 size-24 bg-burnt-caramel/10 blur-[40px] rounded-full" />
                <p className="font-serif italic text-lg text-ivory-warm/40 mb-6 group-hover:text-ivory-warm/60 transition-colors text-center md:text-left">Subscribe to our heritage dispatches.</p>
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-t border-ivory-warm/5 pt-10">
           <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <span className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] text-center md:text-left">© {year} ASIAN CHOCOLATE STORE INNOVATIVE</span>
              <div className="flex flex-wrap justify-center gap-6">
                 <button onClick={() => navigate('/terms-of-service')} className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Terms_of_Service</button>
                 <button onClick={() => navigate('/shipping-policy')} className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Shipping_Protocol</button>
                 <button onClick={() => navigate('/refund-policy')} className="font-body text-[9px] font-black text-ivory-warm/20 uppercase tracking-[0.5em] hover:text-burnt-caramel transition-colors">Return_Registry</button>
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 filter grayscale contrast-125 opacity-20 hover:opacity-50 transition-all">
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
