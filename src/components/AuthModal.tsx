import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { setCredentials, closeAuthModal } from '../store/authSlice';
import api from '@/utils/api';
import Logo from './Logo';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email: data.email, password: data.password } : data;
      const res = await api.post(endpoint, payload);
      return res.data;
    },
    onSuccess: (data) => {
      const user = data as { _id: string; name: string; email: string; role?: 'user' | 'admin' };
      dispatch(setCredentials({ user }));
      toast.success(isLogin ? 'Welcome back to the Vault.' : 'Your registry is confirmed.');
      onClose();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.name.length < 2) {
      toast.error('Name must be at least 2 characters');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    mutation.mutate(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Soft Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[440px] bg-parchment-base border border-gold-soft/20 rounded-[32px] shadow-[0_20px_60px_rgba(26,15,13,0.3)] flex flex-col overflow-hidden"
          data-lenis-prevent
        >
          {/* Subtle Golden Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <div className="absolute -top-[20%] -right-[20%] w-[70%] h-[50%] bg-gold-soft/20 blur-[80px] rounded-full" />
            <div className="absolute top-[60%] -left-[20%] w-[60%] h-[40%] bg-burnt-caramel/10 blur-[80px] rounded-full" />
          </div>

          <div className="p-8 sm:p-10 relative z-10">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-cocoa-deep/5 text-cocoa-deep/40 hover:text-cocoa-deep transition-all"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-3xl bg-white/40 border border-gold-soft/10 relative group">
                  <Logo 
                    variant="dark" 
                    showText={false}
                    className="scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-display italic font-black tracking-tight text-cocoa-deep mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Registry'}
              </h2>
              <p className="text-[9px] font-body uppercase tracking-[0.3em] text-burnt-caramel/60">
                {isLogin ? 'Access your artisanal collections' : 'Begin your journey into fine chocolate'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-body font-bold text-cocoa-deep/60 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} className="text-burnt-caramel/60" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-12 bg-white/50 border border-gold-soft/20 rounded-2xl px-5 text-sm text-cocoa-deep focus:border-burnt-caramel focus:bg-white focus:outline-none transition-all placeholder:text-cocoa-deep/20 font-body"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-body font-bold text-cocoa-deep/60 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} className="text-burnt-caramel/60" /> Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 bg-white/50 border border-gold-soft/20 rounded-2xl px-5 text-sm text-cocoa-deep focus:border-burnt-caramel focus:bg-white focus:outline-none transition-all placeholder:text-cocoa-deep/20 font-body"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-body font-bold text-cocoa-deep/60 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={12} className="text-burnt-caramel/60" /> Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full h-12 bg-white/50 border border-gold-soft/20 rounded-2xl pl-5 pr-12 text-sm text-cocoa-deep focus:border-burnt-caramel focus:bg-white focus:outline-none transition-all placeholder:text-cocoa-deep/20 font-body"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cocoa-deep/40 hover:text-burnt-caramel transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                disabled={mutation.isPending}
                className="group relative w-full h-12 bg-cocoa-deep text-white rounded-xl font-body font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-[0.98] disabled:opacity-70 overflow-hidden mt-4 shadow-lg"
              >
                <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {mutation.isPending ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                  {!mutation.isPending && <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] font-body font-bold text-cocoa-deep/50 hover:text-burnt-caramel uppercase tracking-widest transition-colors"
              >
                {isLogin ? "New to the registry? Create Account" : "Already a member? Sign In"}
              </button>
            </div>
          </div>

          <div className="bg-white/40 p-5 flex items-center justify-center gap-6 border-t border-gold-soft/10 relative">
            <div className="flex items-center gap-2 opacity-40">
              <ShieldCheck size={12} className="text-burnt-caramel" />
              <span className="text-[7px] font-body font-black uppercase tracking-[0.3em] text-cocoa-deep">Secure Identity</span>
            </div>
            <div className="h-3 w-[1px] bg-cocoa-deep/10" />
            <div className="flex items-center gap-2 opacity-40">
              <Lock size={12} className="text-burnt-caramel" />
              <span className="text-[7px] font-body font-black uppercase tracking-[0.3em] text-cocoa-deep">Encrypted</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
