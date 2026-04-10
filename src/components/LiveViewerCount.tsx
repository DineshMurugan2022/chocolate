import React from 'react';
import { useSocket } from '@/context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';

const LiveViewerCount: React.FC = () => {
  const { viewerCount } = useSocket();

  return (
    <AnimatePresence>
      {viewerCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-gold-soft/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:border-gold-soft/40 group"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute size-2 bg-[#00FF94] rounded-full animate-ping opacity-75" />
            <span className="relative size-2 bg-[#00FF94] rounded-full shadow-[0_0_12px_rgba(0,255,148,0.8)]" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-gold-soft">
              {viewerCount} <span className="opacity-60">Viewers</span>
            </span>
            <Users size={12} className="text-gold-soft/40 group-hover:text-gold-soft transition-colors" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveViewerCount;
