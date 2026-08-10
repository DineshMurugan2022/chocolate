import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.reason.trim()) {
      toast.error('Please fill in all the fields.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/contact', formData);
      toast.success('Your application has been received. Our team will connect with you soon.');
      setFormData({ name: '', phone: '', email: '', reason: '' });
    } catch (err: any) {
      // Errors handled by axios response interceptor or fall back here
      const errMsg = err.response?.data?.message || 'Failed to submit application.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-40 px-6 lg:px-20 relative overflow-hidden flex items-center justify-center">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-burnt-caramel/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center bg-white/40 backdrop-blur-3xl rounded-[80px] p-12 md:p-24 border border-white shadow-organic overflow-hidden"
      >
        {/* Left: Botanical Invitation */}
        <div className="space-y-12">
           <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                 <Sparkles className="size-5 text-burnt-caramel" />
                 <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-burnt-caramel">The Inheritance List</span>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tight text-cocoa-deep">
                 Join the <br /> 
                 <span className="italic font-light text-cocoa-deep/30 pr-4">Artisan</span> 
                 <span className="text-botanical-green">Registry</span>
              </h2>
           </div>

           <p className="font-serif italic text-xl md:text-2xl text-cocoa-deep/50 leading-relaxed max-w-md">
             Receive limited seasonal alerts, heritage collection drops, and invitations to clandestine harvest tastings.
           </p>

           <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="size-12 rounded-full border-4 border-white overflow-hidden shadow-lg bg-ivory-warm">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                 ))}
              </div>
              <span className="font-body text-[9px] font-bold uppercase tracking-widest text-cocoa-deep/30">Inherited by 4.2k+ Connoisseurs</span>
           </div>
        </div>

        {/* Right: The Minimalist Entry Form */}
        <div className="space-y-10 relative">
           <div className="absolute top-[-100px] right-[-50px] text-[15vw] font-display font-black text-cocoa-deep/[0.03] select-none pointer-events-none italic">
              Entry
           </div>
           
           <form 
             onSubmit={handleSubmit}
             className="relative z-10 space-y-5 px-4"
           >
              <div>
                 <input 
                   type="text" 
                   value={formData.name}
                   onChange={e => setFormData({ ...formData, name: e.target.value })}
                   placeholder="CURATOR NAME"
                   required
                   disabled={loading}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-cocoa-deep text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-cocoa-deep/10"
                 />
              </div>

              <div>
                 <input 
                   type="tel" 
                   value={formData.phone}
                   onChange={e => setFormData({ ...formData, phone: e.target.value })}
                   placeholder="PHONE NUMBER"
                   required
                   disabled={loading}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-cocoa-deep text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-cocoa-deep/10"
                 />
              </div>

              <div>
                 <input 
                   type="email" 
                   value={formData.email}
                   onChange={e => setFormData({ ...formData, email: e.target.value })}
                   placeholder="CURATOR_IDENTITY@DOMAIN"
                   required
                   disabled={loading}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-cocoa-deep text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-cocoa-deep/10"
                 />
              </div>

              <div>
                 <textarea 
                   value={formData.reason}
                   onChange={e => setFormData({ ...formData, reason: e.target.value })}
                   placeholder="REASON FOR INDUCTION"
                   required
                   disabled={loading}
                   rows={3}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-cocoa-deep text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-cocoa-deep/10 resize-none min-h-[100px]"
                 />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-20 bg-botanical-green text-ivory-warm rounded-[32px] font-body font-black uppercase text-[10px] tracking-[0.5em] shadow-2xl hover:bg-burnt-caramel transition-all transform hover:translate-y-[-5px] active:scale-95 flex items-center justify-center gap-6 group disabled:opacity-75 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    Processing
                    <Loader2 className="animate-spin size-4" />
                  </>
                ) : (
                  <>
                    Apply for Induction
                    <div className="size-1 w-8 bg-ivory-warm/30 rounded-full group-hover:w-12 transition-all" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-4 pt-2 opacity-30">
                 <div className="w-10 h-[1.5px] bg-cocoa-deep" />
                 <p className="text-[8px] font-body font-black uppercase tracking-[0.2em] max-w-[200px]">
                    Authorized Digital Communiqués of Luxury ONLY.
                 </p>
              </div>
           </form>
        </div>
      </motion.div>
    </section>
  );
}
