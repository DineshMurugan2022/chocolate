import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Calendar, Trophy, Check, ArrowRight, Star, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CartDrawer from '@/components/CartDrawer';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import toast from 'react-hot-toast';

const FloatIcon = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none"
  >
    {children}
  </motion.div>
);

export default function Subscription() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  const tiers = [
    {
      name: "Bronze Box",
      price: 3000,
      extra: "+1 Special Gift",
      description: "A monthly initiation into the world of fine cacao.",
      features: ["4 Signature Bars", "1 Experimental Artifact", "Monthly Catalog", "Society Member Card"],
      color: "from-amber-700/20 to-amber-900/40",
      border: "border-amber-700/20",
      icon: <Sparkles className="text-amber-600" size={32} />
    },
    {
      name: "Silver Box",
      price: 5000,
      extra: "+1 Premium Gift",
      description: "For the enthusiast seeking deeper alchemical truths.",
      features: ["8 Signature Bars", "2 Experimental Artifacts", "Digital Masterclass Access", "Priority Support", "Society Member Card"],
      color: "from-slate-400/20 to-slate-600/40",
      border: "border-slate-400/20",
      icon: <Trophy className="text-slate-400" size={32} />,
      popular: true
    },
    {
      name: "Gold Box",
      price: 10000,
      extra: "+1 Luxury Gift",
      description: "The ultimate peak of artisanal chocolate devotion.",
      features: ["16 Signature Bars", "Full Artistry Collection", "Private Workshop Access", "Custom Monogramming", "Founding Member Status"],
      color: "from-gold-soft/20 to-gold-accent/40",
      border: "border-gold-soft/30",
      icon: <Star className="text-gold-soft" size={32} />
    }
  ];

  const handleSubscribe = (tier: any) => {
    dispatch(addToCart({
      id: `sub-${tier.name.toLowerCase()}`,
      name: `${tier.name} (Monthly)`,
      price: tier.price,
      image: '/images/subscription-box.png', // Placeholder
      quantity: 1,
      category: 'Subscription'
    }));
    toast.success(`Welcome to the Society! ${tier.name} added.`);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#120807] text-white selection:bg-gold-soft selection:text-black overflow-x-hidden pt-32">
      <SEO 
        title="The ChocoLux Society | Premium Chocolate Subscriptions"
        description="Join an exclusive monthly journey through the world's finest cocoa. Tiered subscriptions curated for the true chocolate enthusiast."
      />
      
      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center space-y-12">
        <FloatIcon delay={0}><div className="top-20 left-[15%]"><Sparkles size={40} className="text-gold-soft/20" /></div></FloatIcon>
        <FloatIcon delay={1}><div className="bottom-40 right-[10%]"><Heart size={30} className="text-gold-soft/10" /></div></FloatIcon>
        <FloatIcon delay={2}><div className="top-60 right-[25%]"><Gift size={35} className="text-gold-soft/20" /></div></FloatIcon>

        <div className="space-y-6 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-[11px] font-black uppercase tracking-[0.8em] text-gold-soft"
          >
            The Society Entry
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-[8vw] font-display font-black leading-[0.85] tracking-tighter"
          >
            Monthly <br /> <span className="italic font-light text-gold-soft/30 uppercase tracking-[0.2em]">Subscription</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-xl md:text-3xl italic text-gold-soft/40 max-w-2xl mx-auto"
          >
            Join our inner circle and receive a curated registry of artisanal artifacts delivered to your vault every month.
          </motion.p>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="px-6 py-20 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative group bg-gradient-to-br ${tier.color} border ${tier.border} rounded-[60px] p-12 flex flex-col items-center text-center space-y-10 hover:border-gold-soft transition-all duration-700`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-gold-soft text-black font-body text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Coveted
                </div>
              )}

              <div className="size-24 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-center p-6 shadow-2xl">
                {tier.icon}
              </div>

              <div className="space-y-4">
                <h3 className="text-4xl font-display font-black italic">{tier.name}</h3>
                <div className="space-y-1">
                  <p className="text-5xl font-display font-black text-white">₹{tier.price.toLocaleString()}</p>
                  <p className="font-body text-[10px] font-black uppercase tracking-widest text-gold-soft">{tier.extra}</p>
                </div>
                <p className="font-serif italic text-white/30 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <ul className="w-full space-y-4 py-8 border-t border-white/5">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-xs font-body uppercase tracking-[0.2em] text-white/60">
                    <Check size={14} className="text-gold-soft shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSubscribe(tier)}
                className="w-full py-6 bg-white text-black font-body text-[11px] font-black uppercase tracking-widest rounded-2xl group-hover:bg-gold-soft transition-all duration-500 flex items-center justify-center gap-4"
              >
                Enter the Society <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gifting Section */}
      <section className="px-6 py-40 lg:px-20 bg-white/[0.02] border-y border-white/5 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="inline-block p-4 rounded-3xl bg-gold-soft/5 mb-6">
            <Gift className="text-gold-soft" size={40} />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black italic text-ivory-warm">Subscription & <span className="text-gold-soft">Gift</span></h2>
          <p className="font-serif text-2xl italic text-gold-soft/40 leading-relaxed">
            Bestow the gift of monthly chocolate rituals upon a worthy peer. Our "Plus One" subscription allows you to send a premium box as a recurring gesture of refinement.
          </p>
          <div className="flex justify-center gap-8 pt-10">
            <button className="px-12 py-6 border border-gold-soft text-gold-soft font-body text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gold-soft hover:text-black transition-all">Send A Society Box</button>
            <button className="px-12 py-6 bg-gold-soft text-black font-body text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all">Gift Card Registry</button>
          </div>
        </div>
      </section>

      {/* Society Perks */}
      <section className="px-6 py-40 lg:px-20 overflow-hidden">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                  <span className="font-body text-[12px] font-black uppercase tracking-[0.8em] text-gold-soft/40">The Member Protocol</span>
                  <h2 className="text-6xl md:text-8xl font-display italic font-black text-white leading-[0.85]">Society <br /> Privileges</h2>
               </div>
               <div className="grid grid-cols-1 gap-10">
                  {[
                    { title: 'The Plus One Benefit', desc: 'Every box includes a hidden +1 gift artifact, rotating monthly between rare bars, tools, or event passes.' },
                    { title: 'First Melt Access', desc: 'Acquire new limited-run collections 48 hours before the public shop opens.' },
                    { title: 'Alchemist Community', desc: 'Direct digital access to our master apprentice for pairing advice and craft questions.' }
                  ].map(p => (
                    <div key={p.title} className="space-y-3 group border-l border-gold-soft/20 pl-8 hover:border-gold-soft transition-all">
                      <h4 className="font-body text-[10px] font-black uppercase tracking-widest text-gold-soft">{p.title}</h4>
                      <p className="font-serif italic text-lg text-white/30 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="relative aspect-square rounded-[60px] border border-gold-soft/10 bg-black/40 flex items-center justify-center p-12 overflow-hidden overflow-hidden">
               <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-gold-soft blur-[100px] rounded-full" />
               </div>
               <Calendar className="text-gold-soft relative z-10 opacity-20" size={300} strokeWidth={0.5} />
               <div className="absolute bottom-16 left-16 right-16 p-8 bg-black/60 backdrop-blur-2xl rounded-3xl border border-gold-soft/10 text-center">
                  <p className="font-display italic text-2xl text-ivory-warm">Next Dispatch: April 25th</p>
                  <p className="font-body text-[9px] uppercase font-black tracking-widest text-gold-soft/40 mt-2">Cycle of the Midnight Cocoa</p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
