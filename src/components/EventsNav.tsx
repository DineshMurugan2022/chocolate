import { Link, useLocation } from 'react-router-dom';
import { Heart, Star, Users, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
  { label: 'Wedding', path: '/events/wedding', icon: <Heart size={16} />, desc: 'Bridal Atelier' },
  { label: 'Birthday', path: '/events/birthday', icon: <Star size={16} />, desc: 'Celebration Registry' },
  { label: 'Family', path: '/events/family', icon: <Users size={16} />, desc: 'Heritage Curation' },
  { label: 'Gifts', path: '/events/gifts', icon: <Gift size={16} />, desc: 'Gifting Protocol' },
];

export default function EventsNav() {
  const { pathname } = useLocation();

  return (
    <motion.section
      className="px-6 lg:px-20 py-16 bg-white/20 border-y border-gold-soft/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="font-body text-[10px] text-cocoa-deep/40 uppercase tracking-[0.8em]">Explore More</span>
          <p className="font-display italic font-black text-2xl text-cocoa-deep/70">Other Event Collections</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {events.map((e) => {
            const isActive = pathname === e.path;
            return (
              <Link
                key={e.path}
                to={e.path}
                className={`
                  group flex flex-col items-center gap-3 p-6 rounded-2xl border text-center transition-all duration-300
                  ${isActive
                    ? 'border-burnt-caramel/50 bg-burnt-caramel/10 cursor-default pointer-events-none'
                    : 'border-gold-soft/20 bg-white/40 hover:border-burnt-caramel/40 hover:bg-burnt-caramel/5 hover:-translate-y-1'
                  }
                `}
              >
                <span className={`transition-colors ${isActive ? 'text-burnt-caramel' : 'text-cocoa-deep/40 group-hover:text-burnt-caramel'}`}>
                  {e.icon}
                </span>
                <div>
                  <p className={`font-display italic font-black text-lg leading-none ${isActive ? 'text-burnt-caramel' : 'text-cocoa-deep/70'}`}>
                    {e.label}
                  </p>
                  <p className="font-body text-[9px] uppercase tracking-widest text-cocoa-deep/30 mt-1">{e.desc}</p>
                </div>
                {isActive && (
                  <span className="text-[8px] font-body uppercase tracking-widest text-burnt-caramel/50 border border-burnt-caramel/30 px-2 py-0.5 rounded-full">
                    Current Page
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
