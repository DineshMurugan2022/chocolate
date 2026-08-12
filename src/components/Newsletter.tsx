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
        className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center bg-gradient-to-br from-burnt-caramel via-orange-400 to-gold-soft backdrop-blur-3xl rounded-[80px] p-12 md:p-24 border border-white/40 shadow-2xl overflow-hidden"
      >
        {/* Left: Botanical Invitation */}
        <div className="space-y-12">
           <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6"
              >
                 <Sparkles className="size-5 text-white" />
                 <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-white">Our Newsletter</span>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tight text-white">
                 Join Our <br /> 
                 <span className="italic font-light text-white/80 pr-4">Mailing</span> 
                 <span className="text-cocoa-deep">List</span>
              </h2>
           </div>

           <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed max-w-md">
             Get updates on seasonal offers, new chocolate collections, and exclusive events.
           </p>

           <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="size-12 rounded-full border-4 border-white overflow-hidden shadow-lg bg-ivory-warm">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                 ))}
              </div>
              <span className="font-body text-[9px] font-bold uppercase tracking-widest text-white/80">Joined by 4.2k+ Customers</span>
           </div>
        </div>

        {/* Right: The Minimalist Entry Form */}
        <div className="space-y-10 relative">
           <div className="absolute top-[-100px] right-[-50px] text-[15vw] font-display font-black text-white/[0.1] select-none pointer-events-none italic">
              Join
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
                   placeholder="YOUR NAME"
                   required
                   disabled={loading}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-black text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-black/60"
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
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-black text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-black/60"
                 />
              </div>

              <div>
                 <input 
                   type="email" 
                   value={formData.email}
                   onChange={e => setFormData({ ...formData, email: e.target.value })}
                   placeholder="EMAIL ADDRESS"
                   required
                   disabled={loading}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-black text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-black/60"
                 />
              </div>

              <div>
                 <textarea 
                   value={formData.reason}
                   onChange={e => setFormData({ ...formData, reason: e.target.value })}
                   placeholder="YOUR MESSAGE"
                   required
                   disabled={loading}
                   rows={3}
                   className="w-full bg-white border border-cocoa-deep/5 rounded-[32px] px-8 py-5 text-black text-xs font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel transition-all shadow-inner placeholder:text-black/60 resize-none min-h-[100px]"
                 />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-20 bg-cocoa-deep text-ivory-warm rounded-[32px] font-body font-black uppercase text-[10px] tracking-[0.5em] shadow-2xl hover:bg-black transition-all transform hover:translate-y-[-5px] active:scale-95 flex items-center justify-center gap-6 group disabled:opacity-75 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    Processing
                    <Loader2 className="animate-spin size-4" />
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <div className="size-1 w-8 bg-ivory-warm/30 rounded-full group-hover:w-12 transition-all" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-4 pt-2 opacity-50">
                 <div className="w-10 h-[1.5px] bg-white" />
                 <p className="text-[8px] font-body font-black uppercase tracking-[0.2em] max-w-[200px] text-white">
                    We only send important updates. No spam.
                 </p>
              </div>
           </form>
        </div>
      </motion.div>
    </section>
  );
}
