import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Cpu, Fingerprint } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { setCredentials } from '../store/authSlice';
import api from '@/utils/api';
import Logo from './Logo';
import toast from 'react-hot-toast';

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

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await api.post(endpoint, data);
      return res.data;
    },
    onSuccess: (data) => {
      const user = data as { _id: string; name: string; email: string; role?: 'user' | 'admin' };
      dispatch(setCredentials({ user }));
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      onClose();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Deep Space Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030308]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-[440px] bg-deep-space/60 backdrop-blur-3xl border border-aurora-cyan/20 rounded-[32px] shadow-[0_0_50px_rgba(0,245,255,0.1)] flex flex-col overflow-hidden celestial-theme"
          data-lenis-prevent
        >
          {/* Animated Aurora Glow inside card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aurora-cyan to-transparent opacity-50" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                x: ['-50%', '50%', '-50%'],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-aurora-purple/20 blur-[100px] rounded-full"
            />
          </div>

          <div className="p-8 sm:p-12 relative z-10">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-aurora-cyan/10 text-aurora-cyan transition-all"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-3xl bg-aurora-cyan/5 border border-aurora-cyan/10 relative group">
                  <Logo 
                    variant="celestial" 
                    showText={false}
                    className="scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <h2 className="text-4xl font-display font-black tracking-tight text-white mb-2">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-aurora-cyan/60">
                {isLogin ? 'Enter your details to access your account' : 'Join British Chocolate Store to start your journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-bold text-aurora-cyan/40 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:border-aurora-cyan/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/10 font-mono"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-aurora-cyan/40 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:border-aurora-cyan/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/10 font-mono"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-aurora-cyan/40 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={12} /> Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:border-aurora-cyan/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/10 font-mono"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                disabled={mutation.isPending}
                className="group relative w-full h-14 bg-aurora-cyan text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {mutation.isPending ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
                  {!mutation.isPending && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] font-mono font-bold text-white/30 hover:text-aurora-cyan uppercase tracking-widest transition-colors"
              >
                {isLogin ? "New user? Register here" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>

          <div className="bg-white/5 p-6 flex items-center justify-center gap-12 border-t border-white/5 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan/30 to-transparent" />
            <div className="flex items-center gap-3 opacity-20">
              <Fingerprint size={12} className="text-aurora-cyan" />
              <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white">SECURE LOGIN</span>
            </div>
            <div className="flex items-center gap-3 opacity-20">
              <Cpu size={12} className="text-aurora-purple" />
              <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white">ENCRYPTED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
