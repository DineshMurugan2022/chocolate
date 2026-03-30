import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { createRandom } from '../utils/random';

interface Notification {
  id: number;
  message: string;
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulator for real-time sales feed
    const random = createRandom(Date.now());
    const items = [
      "Midnight Cocoa Truffle",
      "Golden Caramel Orb",
      "Ruby Berry Bliss",
      "The Connoisseur's Chest"
    ];
    
    const locations = ["Paris", "London", "New York", "Tokyo", "Dubai"];

    const intervalId = setInterval(() => {
      // 10% chance every 5 seconds to trigger a sale
      if (random() > 0.9) {
        const item = items[Math.floor(random() * items.length)];
        const location = locations[Math.floor(random() * locations.length)];
        
        const newNotif = {
          id: Date.now(),
          message: `A connoisseur in ${location} just purchased the ${item}.`
        };

        setNotifications(prev => [...prev, newNotif]);

        // Auto remove after 5 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
        }, 5000);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map(notif => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-black/5 pr-6 pl-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg max-w-sm"
          >
            <div className="size-8 rounded-full bg-gold-accent/10 border border-gold-accent/30 flex items-center justify-center shrink-0">
              <Bell size={14} className="text-gold-accent" />
            </div>
            <p className="font-poppins text-[11px] text-umber-text leading-tight">
              {notif.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
