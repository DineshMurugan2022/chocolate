import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useSocket } from '../context/SocketContext';

interface Notification {
  id: number;
  message: string;
  productName: string;
}

interface SaleData {
  productName: string;
  customerName?: string;
}

const LiveNotification = () => {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('newSale', (data: SaleData) => {
      const id = Date.now();
      const message = `${data.customerName || 'Someone'} purchased ${data.productName}.`;
      setNotifications(prev => [{ id, message, productName: data.productName }, ...prev].slice(0, 3));
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    });

    return () => {
      socket.off('newSale');
    };
  }, [socket]);

  return (
    <div className="fixed bottom-8 left-8 z-[200] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -100, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="glass p-4 rounded-2xl flex items-center gap-4 shadow-2xl pointer-events-auto border-gold-accent/10 min-w-[320px]"
          >
            <div className="bg-gold-accent p-3 rounded-xl text-white shadow-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <p className="text-[9px] font-bold text-gold-accent uppercase tracking-[0.2em] mb-0.5">Live Acquisition</p>
              <p className="text-sm font-medium text-umber-text leading-tight">
                A connoisseur just reserved <br />
                <span className="font-bold text-rose-copper">{n.productName}</span>
              </p>
            </div>
            <button 
              onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-taupe-muted" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LiveNotification;
