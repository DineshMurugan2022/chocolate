import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';

interface SaleData {
  productName: string;
  customerName?: string;
  location?: string;
}

export default function SocialProofToast() {
  const { socket } = useSocket();
  const [sale, setSale] = useState<SaleData | null>(null);

  useEffect(() => {
    if (!socket) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const handler = (data: SaleData) => {
      setSale(data);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setSale(null), 5000);
    };

    socket.on('newSale', handler);

    return () => {
      if (timer) clearTimeout(timer);
      socket.off('newSale', handler);
    };
  }, [socket]);

  return (
    <AnimatePresence>
      {sale && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          className="fixed bottom-8 left-8 z-[200] max-w-xs w-full bg-white/90 backdrop-blur-2xl border border-gold-accent/20 rounded-2xl shadow-[0_20px_50px_rgba(107,94,85,0.15)] p-4 flex items-center gap-4 overflow-hidden group"
        >
          {/* Progress bar timer */}
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-[2px] bg-gold-accent/40"
          />

          <div className="relative shrink-0 w-12 h-12 rounded-xl bg-gold-accent/10 flex items-center justify-center text-gold-accent group-hover:scale-110 transition-transform duration-500">
            <ShoppingBag size={24} />
            <Sparkles size={12} className="absolute -top-1 -right-1 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-taupe-muted uppercase tracking-widest mb-0.5">Live from Boutique</p>
            <p className="text-xs text-umber-text leading-tight">
              <span className="font-bold">{sale.customerName || 'Someone'}</span> recently curated the <span className="font-display italic text-gold-accent">"{sale.productName}"</span>
            </p>
          </div>

          <button 
            onClick={() => setSale(null)}
            className="text-taupe-muted hover:text-umber-text transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function X({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
