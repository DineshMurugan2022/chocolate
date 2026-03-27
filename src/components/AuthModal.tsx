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
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
           initial={{ scale: 0.95, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.95, opacity: 0 }}
           className="relative w-full max-w-[400px] bg-black/40 backdrop-blur-3xl border border-gold-soft/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
         >
          <div className="p-8 sm:p-10">
            <button
               onClick={onClose}
               className="absolute top-6 right-6 p-2 rounded-full hover:bg-gold-soft/10 text-gold-soft/40 transition-colors"
            >
               <X size={20} />
            </button>

            <div className="text-center mb-10">
               <div className="flex justify-center mb-8">
                 <Logo className="w-24 h-auto" variant="light" />
               </div>
               <h2 className="text-3xl font-display italic text-gold-soft mb-3">
                 {isLogin ? 'Curatorial Access' : 'Induct New Curator'}
               </h2>
               <p className="text-[10px] font-body font-black uppercase tracking-[0.4em] text-gold-soft/30 italic">
                 {isLogin ? 'Authenticate to manage your heritage collection' : 'Join the elite Asian Chocolate Store registry'}
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
               {!isLogin && (
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gold-soft/40 uppercase tracking-[0.4em] px-1 italic">Authorized Name</label>
                   <div className="relative">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft/20" size={18} />
                     <input
                       required
                       type="text"
                       placeholder="HARVEST_NAME"
                       className="w-full h-12 bg-black/40 border border-gold-soft/10 rounded-xl pl-12 pr-4 text-sm text-gold-soft focus:border-gold-soft focus:bg-black/60 focus:outline-none transition-all placeholder:text-gold-soft/10"
                       value={formData.name}
                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     />
                   </div>
                 </div>
               )}

               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gold-soft/40 uppercase tracking-[0.4em] px-1 italic">Digital Frequency</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft/20" size={18} />
                   <input
                     required
                     type="email"
                     placeholder="EMAIL_STATION"
                     className="w-full h-12 bg-black/40 border border-gold-soft/10 rounded-xl pl-12 pr-4 text-sm text-gold-soft focus:border-gold-soft focus:bg-black/60 focus:outline-none transition-all placeholder:text-gold-soft/10"
                     value={formData.email}
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   />
                 </div>
               </div>

               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gold-soft/40 uppercase tracking-[0.4em] px-1 italic">Security Sequence</label>
                 <div className="relative">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft/20" size={18} />
                   <input
                     required
                     type="password"
                     placeholder="••••••••"
                     className="w-full h-12 bg-black/40 border border-gold-soft/10 rounded-xl pl-12 pr-4 text-sm text-gold-soft focus:border-gold-soft focus:bg-black/60 focus:outline-none transition-all placeholder:text-gold-soft/10"
                     value={formData.password}
                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                   />
                 </div>
               </div>

               {error && (
                 <div className="p-3 bg-red-400/10 border border-red-400/20 rounded-xl">
                   <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center italic">{error}</p>
                 </div>
               )}

               <button
                 disabled={loading}
                 className="w-full h-12 bg-gold-soft hover:bg-gold-soft/80 text-black rounded-xl font-bold font-body text-[10px] uppercase tracking-[0.6em] shadow-2xl transition-all flex items-center justify-center gap-4 mt-6 active:scale-[0.98] disabled:opacity-50"
               >
                 {loading ? 'AUTHENTICATING...' : (isLogin ? 'INITIALIZE_ACCESS' : 'INDIVIDUAL_REG_v04')}
                 {!loading && <ArrowRight size={18} />}
               </button>
            </form>

             <div className="mt-8 text-center">
               <button
                 onClick={() => setIsLogin(!isLogin)}
                 className="text-[9px] font-black font-body text-gold-soft/30 hover:text-gold-soft uppercase tracking-[0.4em] transition-colors italic"
               >
                 {isLogin ? "Lacking Induction Credentials? Induct Here" : "Existing Curator? Access Induction Terminal"}
               </button>
            </div>
          </div>
                    <div className="bg-black/40 p-6 flex flex-col items-center gap-3 border-t border-gold-soft/10">
              <div className="flex items-center gap-4 text-gold-soft/20">
                 <ShieldCheck size={14} />
                 <span className="text-[10px] font-black font-body uppercase tracking-[0.8em] text-gold-soft/20">Protocol_RSA_v09_Secured</span>
              </div>
           </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
