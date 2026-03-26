import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import axios from 'axios';
import Logo from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await axios.post(`${apiUrl}${endpoint}`, formData);
      
      dispatch(setCredentials({ user: res.data, token: res.data.token }));
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 pointer-events-none">
        {/* Backdrop: Cinematic Silk */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-cocoa-deep/30 backdrop-blur-xl pointer-events-auto"
        />

        {/* Modal: The Curator Portal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="relative w-full max-w-[520px] bg-white rounded-[80px] shadow-4xl flex flex-col pointer-events-auto my-auto overflow-hidden border-8 border-white/20"
        >
          {/* Internal Grid Motif */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

          <div className="overflow-y-auto custom-scrollbar p-14 sm:p-20 max-h-[90vh] relative z-10">
            
            {/* Logo/Branding Anchor */}
            <div className="flex justify-center mb-12">
               <div className="p-6 bg-[#FAF9F6] rounded-[40px] shadow-sm border border-cocoa-deep/[0.03] hover:rotate-6 transition-transform group">
                  <Logo className="w-32 h-auto opacity-100 filter brightness-90 group-hover:brightness-100 transition-all" variant="dark" />
               </div>
            </div>

            {/* Artistic Direction */}
            <div className="text-center mb-16 space-y-6">
              <div className="flex items-center justify-center gap-6 text-burnt-caramel/30">
                 <div className="h-[1px] w-12 bg-burnt-caramel/10" />
                 <span className="font-body text-[10px] font-black uppercase tracking-[0.8em]">Curatorial_Registry</span>
                 <div className="h-[1px] w-12 bg-burnt-caramel/10" />
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black text-cocoa-deep leading-[0.85] tracking-tighter uppercase tabular-nums">
                {isLogin ? 'Bonjour, Curator.' : 'Heritage Induction.'}
              </h2>
              <p className="font-serif italic text-xl text-cocoa-deep/40 leading-relaxed max-w-[320px] mx-auto">
                {isLogin ? 'Identify yourself to access the inheritance matrix.' : 'Enter the private registry of botanical connoisseurs.'}
              </p>
            </div>

            {/* Close Pulse */}
            <button
              onClick={onClose}
              className="absolute top-12 right-12 size-12 rounded-full bg-[#FAF9F6] border border-cocoa-deep/5 text-cocoa-deep/10 hover:text-burnt-caramel hover:shadow-xl transition-all flex items-center justify-center active:scale-95 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-10">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em] ml-4">Curated Name</span>
                    <div className="relative group">
                      <User className="absolute left-8 top-1/2 -translate-y-1/2 text-cocoa-deep/5 group-focus-within:text-botanical-green transition-colors" size={20} />
                      <input
                        required
                        type="text"
                        placeholder="ENTER_IDENTITY"
                        className="w-full h-20 bg-[#FAF9F6] border border-cocoa-deep/[0.03] rounded-[32px] pl-20 pr-10 text-[12px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep focus:border-botanical-green focus:outline-none transition-all placeholder:text-cocoa-deep/5 shadow-inner"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em] ml-4">Digital Link</span>
                <div className="relative group">
                  <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-cocoa-deep/5 group-focus-within:text-botanical-green transition-colors" size={20} />
                  <input
                    required
                    type="email"
                    placeholder="ENTER_COMMUNIQUE"
                    className="w-full h-20 bg-[#FAF9F6] border border-cocoa-deep/[0.03] rounded-[32px] pl-20 pr-10 text-[12px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep focus:border-botanical-green focus:outline-none transition-all placeholder:text-cocoa-deep/5 shadow-inner"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em] ml-4">Security Protocol</span>
                <div className="relative group">
                  <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-cocoa-deep/5 group-focus-within:text-botanical-green transition-colors" size={20} />
                  <input
                    required
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full h-20 bg-[#FAF9F6] border border-cocoa-deep/[0.03] rounded-[32px] pl-20 pr-10 text-[12px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep focus:border-botanical-green focus:outline-none transition-all placeholder:text-cocoa-deep/5 shadow-inner"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
                  className="bg-rose-50 border border-rose-100 p-6 rounded-[24px]"
                >
                  <p className="text-rose-500 text-[9px] font-black uppercase tracking-[0.4em] text-center leading-loose">{error}</p>
                </motion.div>
              )}

              <button
                disabled={loading}
                className="w-full h-24 bg-cocoa-deep hover:bg-burnt-caramel text-[#FAF9F6] rounded-[40px] font-body font-black text-[12px] uppercase tracking-[0.6em] shadow-4xl transition-all flex items-center justify-center gap-10 group disabled:opacity-50 relative overflow-hidden active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-6">
                   {loading ? 'Inducting...' : (isLogin ? 'Finalize_Login' : 'Begin_Induction')}
                   {!loading && <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform shadow-sm" />}
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
              </button>
            </form>

            <div className="mt-20 text-center space-y-12">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-body text-[10px] font-black text-cocoa-deep/20 hover:text-burnt-caramel uppercase tracking-[0.6em] transition-all hover:pl-4"
              >
                {isLogin ? "Status: Non-Member? Register_Archive" : "Status: Active_Curator? Login_Identity"}
              </button>

              <div className="flex flex-col items-center gap-6 pb-4">
                 <div className="flex items-center gap-6 opacity-10">
                   <div className="h-[1px] w-20 bg-cocoa-deep" />
                   <Zap size={18} className="text-burnt-caramel" />
                   <div className="h-[1px] w-20 bg-cocoa-deep" />
                 </div>
                 <div className="flex items-center gap-6 opacity-20 filter grayscale">
                    <ShieldCheck size={24} />
                    <span className="font-body text-[9px] font-black tracking-[0.8em] uppercase italic">Secure_Inheritance_Protocol_V09</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
