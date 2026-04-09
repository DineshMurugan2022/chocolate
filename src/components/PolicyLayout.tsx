import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useState } from 'react';

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, subtitle, children }: PolicyLayoutProps) {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cocoa-deep text-ivory-warm selection:bg-gold-soft selection:text-cocoa-deep">
      <Header setIsCartOpen={setIsCartOpen} />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gold-soft/60 hover:text-gold-soft transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-body text-[10px] font-black uppercase tracking-[0.3em]">Back to Selection</span>
        </motion.button>

        <header className="mb-16">
          {subtitle && (
             <motion.span 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="font-body text-[10px] text-gold-soft font-black uppercase tracking-[0.5em] mb-4 block"
             >
               {subtitle}
             </motion.span>
          )}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl italic leading-tight"
          >
            {title}
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="h-[1px] w-full bg-gold-soft/20 mt-8 origin-left"
          />
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-gold max-w-none 
            font-serif text-lg leading-relaxed text-ivory-warm/70
            prose-headings:font-display prose-headings:italic prose-headings:text-ivory-warm
            prose-strong:text-gold-soft prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6
            prose-li:marker:text-gold-soft prose-li:mb-4"
        >
          {children}
        </motion.div>
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
