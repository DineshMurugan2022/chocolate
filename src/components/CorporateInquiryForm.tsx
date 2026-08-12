import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import toast from 'react-hot-toast';
export default function CorporateInquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    giftingType: 'Festive',
    location: '',
    budget: '',
    address: '',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error('Please complete all required fields.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/inquiry', formData);
      setIsSubmitted(true);
      toast.success('Your inquiry has been received.');
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Failed to submit inquiry.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto py-20 text-center space-y-8 bg-gold-soft/5 rounded-[60px] border border-gold-soft/20 backdrop-blur-3xl"
      >
        <div className="size-24 rounded-full bg-gold-soft/10 flex items-center justify-center mx-auto border border-gold-soft/20">
           <CheckCircle2 className="text-gold-soft size-12" />
        </div>
        <div className="space-y-4">
           <h2 className="text-4xl font-display italic font-black text-ivory-warm">Transmission Received</h2>
           <p className="font-serif text-lg text-ivory-warm/40 italic">A specialist from the Artisan Concierge team will reach out to you shortly.</p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-gold-soft border-b border-gold-soft pb-2 hover:text-white transition-colors"
        >
          Send Another Dispatch
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative group">
       <div className="absolute inset-0 bg-gold-soft/5 blur-[100px] rounded-[100px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
       
       {/* Boutique Catalogue Section - Prominent & Differentiated */}
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="mb-12 p-1 bg-gradient-to-r from-gold-soft/20 via-gold-soft to-gold-soft/20 rounded-[40px] shadow-[0_20px_50px_rgba(212,175,55,0.1)] group transition-all duration-700 hover:shadow-[0_30px_70px_rgba(212,175,55,0.2)]"
       >
          <div className="bg-cocoa-deep/90 backdrop-blur-3xl rounded-[38px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-8">
                <div className="size-20 rounded-2xl bg-gold-soft/10 border border-gold-soft/20 flex items-center justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                   <FileText className="text-gold-soft size-10" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                   <span className="font-body text-[10px] text-gold-soft font-black uppercase tracking-[0.5em]">Inventory of Excellence</span>
                   <h3 className="text-3xl font-display italic font-black text-ivory-warm">Full Event Catalogue <span className="text-gold-soft">2026</span></h3>
                </div>
             </div>
             <button 
               type="button"
               className="px-10 py-5 bg-gold-soft text-black font-body font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl flex items-center gap-4 group"
             >
                Download Masterfile <div className="size-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">→</div>
             </button>
          </div>
       </motion.div>

       <form 
         onSubmit={handleSubmit}
         className="relative bg-gradient-to-br from-[#3E2723]/90 via-[#2a1b15]/95 to-black/90 backdrop-blur-3xl rounded-[60px] border border-gold-soft/30 p-10 md:p-16 space-y-12 shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
       >
          <div className="text-center md:text-left space-y-4 mb-12">
             <span className="font-body text-[10px] text-gold-soft font-black uppercase tracking-[0.5em]">Inquiry Form</span>
             <h2 className="text-4xl md:text-6xl font-display italic font-black text-ivory-warm leading-tight">Secure Your Date</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
             {/* Full Name */}
             <div className="space-y-4">
                <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Full Name</label>
                <input 
                  required
                  name="fullName"
                  onChange={handleChange}
                  type="text" 
                  placeholder="Your Full Name" 
                  className="w-full bg-transparent border-b border-gold-soft/20 py-4 focus:border-gold-soft outline-none font-body text-base font-semibold normal-case tracking-wide text-ivory-warm transition-all placeholder:text-ivory-warm/30 placeholder:normal-case"
                />
             </div>

             {/* Phone */}
             <div className="space-y-4">
                <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Phone Number</label>
                <input 
                  required
                  name="phone"
                  onChange={handleChange}
                  type="tel" 
                  placeholder="+91 98432 40703" 
                  className="w-full bg-transparent border-b border-gold-soft/20 py-4 focus:border-gold-soft outline-none font-body text-base font-semibold normal-case tracking-wide text-ivory-warm transition-all placeholder:text-ivory-warm/30 placeholder:normal-case"
                />
             </div>

             {/* Email */}
             <div className="space-y-4">
                <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Email Address</label>
                <input 
                  required
                  name="email"
                  onChange={handleChange}
                  type="email" 
                  placeholder="your.email@example.com" 
                  className="w-full bg-transparent border-b border-gold-soft/20 py-4 focus:border-gold-soft outline-none font-body text-base font-semibold normal-case tracking-wide text-ivory-warm transition-all placeholder:text-ivory-warm/30 placeholder:normal-case"
                />
             </div>

             {/* Types of Gifting */}
             <div className="space-y-4">
                <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Gifting Method</label>
                <select 
                  name="giftingType"
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gold-soft/20 py-4 focus:border-gold-soft outline-none font-body text-base font-semibold normal-case tracking-wide text-ivory-warm transition-all appearance-none cursor-pointer"
                >
                   <option value="Festive" className="bg-cocoa-deep text-ivory-warm">Festive Gifting</option>
                   <option value="Employee Reward" className="bg-cocoa-deep text-ivory-warm">Employee Reward</option>
                   <option value="Client Appreciation" className="bg-cocoa-deep text-ivory-warm">Client Appreciation</option>
                   <option value="Fountain Hire" className="bg-cocoa-deep text-ivory-warm">Fountain Hire</option>
                </select>
             </div>

             {/* Location & Budget */}
             <div className="space-y-4">
                <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Location</label>
                <input 
                  name="location"
                  onChange={handleChange}
                  type="text" 
                  placeholder="City / Venue (e.g. Chennai)" 
                  className="w-full bg-transparent border-b border-gold-soft/20 py-4 focus:border-gold-soft outline-none font-body text-base font-semibold normal-case tracking-wide text-ivory-warm transition-all placeholder:text-ivory-warm/30 placeholder:normal-case"
                />
             </div>

             <div className="space-y-4">
                <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Budget</label>
                <input 
                   name="budget"
                   onChange={handleChange}
                   type="text" 
                   placeholder="₹ / INR (e.g. 10,000)" 
                   className="w-full bg-transparent border-b border-gold-soft/20 py-4 focus:border-gold-soft outline-none font-body text-base font-semibold normal-case tracking-wide text-ivory-warm transition-all placeholder:text-ivory-warm/30 placeholder:normal-case"
                />
             </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4 pt-10">
             <label className="font-display text-[10px] text-gold-soft font-black uppercase tracking-[0.4em]">Story or Background</label>
             <textarea 
                name="details"
                onChange={handleChange}
                rows={4}
                placeholder="Share specific requirements or background details..." 
                className="w-full bg-transparent border border-gold-soft/20 p-6 rounded-3xl focus:border-gold-soft focus:bg-white/[0.02] outline-none font-serif text-lg italic normal-case text-ivory-warm transition-all placeholder:text-ivory-warm/30 placeholder:normal-case"
             />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-8 bg-gold-soft text-black font-body font-black text-[11px] uppercase tracking-[0.6em] rounded-full sm:rounded-[100px] hover:bg-white transition-all shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col sm:flex-row items-center justify-center gap-4 group disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <>Processing Inquiry <Loader2 size={18} className="animate-spin" /></>
            ) : (
              <>Dispatch Inquiry <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>
            )}
          </button>
       </form>
    </div>
  );
}
