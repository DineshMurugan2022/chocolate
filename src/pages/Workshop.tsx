import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Sparkles, Zap, Flame, Droplets, Wind, Star, X, Send, BookOpen, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

export default function Workshop() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      id: "step-1",
      title: "The Perfect Melt",
      icon: <Flame className="text-burnt-caramel" size={40} />,
      subtitle: "Finding the Shine",
      description: "We carefully melt our chocolate to reach the exact temperature that gives it a beautiful shine and a clean snap. This is the foundation of every piece we create in our studio.",
      fact: "Optimal Temperature: 31.5°C — The secret to a perfect snap.",
      image: "/images/workshop/tempering.png",
      insight: "A cold marble surface is used to cool the chocolate quickly and evenly."
    },
    {
      id: "step-2",
      title: "Shaping the Chocolate",
      icon: <Droplets className="text-burnt-caramel" size={40} />,
      subtitle: "Removing Air Bubbles",
      description: "We pour the liquid chocolate into our custom molds and gently tap them to remove any tiny air bubbles. This ensures every piece is dense, smooth, and perfectly shaped.",
      fact: "1,200 gentle taps per minute create the smoothest texture.",
      image: "/images/workshop/molding.png",
      insight: "Tapping helps the chocolate settle deeply into every detail of the mold."
    },
    {
      id: "step-3",
      title: "The Final Flourish",
      icon: <Sparkles className="text-burnt-caramel" size={40} />,
      subtitle: "Artisanal Garnishing",
      description: "Finally, we decorate each piece by hand. We use traditional Karupatti (Palm Jaggery), Himalayan sea salt, or a brush of edible gold to make each chocolate a small work of art.",
      fact: "Each piece is hand-checked to ensure a mirror-like finish.",
      image: "/images/workshop/finishing.png",
      insight: "Karupatti adds a natural, earthy sweetness that balances the rich cocoa."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background color transition
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: `#${step.id}`,
          start: "top center",
          onEnter: () => {
            gsap.to(containerRef.current, { backgroundColor: step.id === 'step-1' ? '#F5F2ED' : step.id === 'step-2' ? '#FDFBF7' : '#F5F2ED', duration: 1.5 });
          },
          onEnterBack: () => {
            gsap.to(containerRef.current, { backgroundColor: step.id === 'step-1' ? '#F5F2ED' : step.id === 'step-2' ? '#FDFBF7' : '#F5F2ED', duration: 1.5 });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! We've received your workshop application.");
      setIsSubmitting(false);
      setIsApplyModalOpen(false);
      setEmail('');
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-1000 overflow-x-hidden relative bg-transparent">
      <SEO 
        title="The Art of Chocolate | Workshop | British Chocolate Store"
        description="Learn the art of artisanal chocolate making in our Chennai studio. From perfect melting to hand-finishing, explore our craft."
      />
      
      {/* Visual Grain Overlay - Subtler for Simple Design */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] contrast-100 grayscale z-[90] bg-[url('https://grain-y.com/images/grain.png')]" />

      <Header setIsCartOpen={setIsCartOpen} />
      
      {/* Progress Bar & Simple Progress Line */}
      <div className="fixed left-6 md:left-20 top-0 bottom-0 w-[1px] bg-burnt-caramel/5 z-[100] hidden lg:block">
         <motion.div 
            className="w-[2px] -ml-[0.5px] bg-burnt-caramel" 
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} 
         />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-burnt-caramel z-[110] origin-left" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-start pt-48 md:pt-64 text-center p-6 relative">
         <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-soft blur-[120px] rounded-full" />
         </div>
         
         <div className="space-y-8 relative z-10">
            <motion.span 
               initial={{ opacity: 0, letterSpacing: '0.2em' }}
               whileInView={{ opacity: 0.5, letterSpacing: '0.8em' }}
               transition={{ duration: 1.5 }}
               className="font-body text-[10px] md:text-[12px] font-black uppercase text-burnt-caramel block"
            >
               CRAFT_EXPERIENCE
            </motion.span>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.3 }}
               className="text-6xl md:text-[10vw] font-display font-black leading-[0.9] tracking-tighter text-cocoa-deep"
            >
               The Art of <br /> <span className="italic font-light text-burnt-caramel/40 uppercase tracking-widest pl-4">Chocolate</span>
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="max-w-xl mx-auto font-serif text-xl md:text-2xl italic text-cocoa-deep/50"
            >
               A simple and elegant journey through our artisanal chocolate making process.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1, delay: 1.2 }}
               className="pt-20"
            >
               <div className="w-[1px] h-24 bg-gradient-to-b from-burnt-caramel/40 to-transparent mx-auto" />
               <span className="font-body text-[9px] uppercase font-black tracking-widest text-cocoa-deep/60 mt-4 block">SCROLL TO DISCOVER</span>
            </motion.div>
         </div>
      </section>

      {/* Discovery Steps */}
      <div className="relative">
         {steps.map((step, index) => (
            <section 
               key={step.id} 
               id={step.id}
               className="min-h-[80vh] py-20 px-6 md:px-20 lg:px-40 flex flex-col items-center justify-center relative overflow-hidden"
            >
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                  {/* Visual Element - Plain & Premium */}
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className={`relative aspect-square rounded-[40px] border border-burnt-caramel/10 bg-white/40 p-4 overflow-hidden group shadow-xl ${index % 2 === 1 ? 'lg:order-last' : ''}`}
                  >
                     <img 
                        src={step.image} 
                        className="w-full h-full object-cover rounded-[30px] opacity-80 group-hover:opacity-100 transition-all duration-1000" 
                        alt={step.title}
                     />
                     <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-burnt-caramel/20 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex items-start gap-4">
                           <Info className="text-burnt-caramel shrink-0 mt-1" size={18} />
                           <p className="font-serif text-sm text-cocoa-deep leading-relaxed">
                              <span className="font-bold block mb-1">Expert Insight:</span>
                              {step.insight}
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Text Description - Simple & Direct */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     viewport={{ once: true }}
                     className="space-y-10"
                  >
                     <div className="space-y-4">
                        <span className="font-body text-[11px] font-black uppercase tracking-[0.6em] text-burnt-caramel/60">STEP_0{index + 1}</span>
                        <h2 className="text-5xl md:text-7xl font-display font-black leading-tight text-cocoa-deep">{step.title}</h2>
                     </div>
                     <p className="font-serif text-xl md:text-2xl italic text-cocoa-deep/60 leading-relaxed max-w-lg">
                        {step.description}
                     </p>
                     <div className="p-6 bg-burnt-caramel/5 rounded-2xl border border-burnt-caramel/10 inline-block">
                        <p className="font-body text-[10px] uppercase font-black tracking-widest text-burnt-caramel">
                           {step.fact}
                        </p>
                     </div>
                  </motion.div>
               </div>
            </section>
         ))}
      </div>

      {/* Call to Action - Join the Workshop */}
      <section className="py-40 px-6 text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
               <h2 className="text-5xl md:text-7xl font-display font-black italic text-cocoa-deep">Start Your <br /> <span className="text-burnt-caramel not-italic">Journey</span></h2>
               <p className="font-serif text-xl md:text-2xl italic text-cocoa-deep/40 max-w-2xl mx-auto leading-relaxed">
                  Apply for our weekend workshops. Our sessions are small, personal, and premium.
               </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
               <button 
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-14 py-6 bg-burnt-caramel text-white font-body text-[11px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-cocoa-deep hover:scale-105 transition-all duration-300 shadow-xl"
               >
                  Apply Now
               </button>
               <button className="px-14 py-6 border border-burnt-caramel/20 text-burnt-caramel font-body text-[11px] font-black uppercase tracking-[0.4em] rounded-xl hover:border-burnt-caramel hover:bg-burnt-caramel/5 transition-all">View Dates</button>
            </div>
         </div>
      </section>

      {/* Plain & Premium Modal */}
      <AnimatePresence>
         {isApplyModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsApplyModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               />
               
               <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  className="relative w-full max-w-md bg-[#FAF9F6] rounded-3xl p-10 md:p-14 overflow-hidden shadow-2xl border border-gold-soft/30"
               >
                  <button 
                     onClick={() => setIsApplyModalOpen(false)}
                     className="absolute top-8 right-8 text-cocoa-deep/30 hover:text-cocoa-deep transition-colors"
                  >
                     <X size={20} />
                  </button>
                  
                  <div className="space-y-10">
                     <div className="space-y-4 text-center">
                        <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-burnt-caramel">CHANNELS_OPEN</span>
                        <h2 className="text-4xl font-display font-black text-cocoa-deep leading-tight">Workshop <br /> Application</h2>
                        <p className="font-serif italic text-cocoa-deep/50 text-sm leading-relaxed">
                           Apply for the next available session. We'll contact you shortly.
                        </p>
                     </div>
                     
                     <form onSubmit={handleApply} className="space-y-6">
                        <div className="space-y-3">
                           <label className="font-body text-[9px] font-black uppercase tracking-[0.3em] text-cocoa-deep/60">
                              Email Address
                           </label>
                           <input 
                              type="email" 
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full bg-white border border-gold-soft/20 rounded-xl px-6 py-4 font-serif italic text-base text-cocoa-deep focus:outline-none focus:border-gold-soft transition-all placeholder:opacity-30"
                           />
                        </div>
                        
                        <button 
                           type="submit"
                           disabled={isSubmitting}
                           className="w-full py-6 bg-burnt-caramel text-white font-body text-[10px] font-black uppercase tracking-[0.5em] rounded-xl hover:bg-cocoa-deep hover:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                           {isSubmitting ? (
                              <div className="size-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                           ) : (
                              <>
                                 SUBMIT APPLICATION
                                 <Send size={12} />
                              </>
                           )}
                        </button>
                     </form>
                     
                     <div className="text-center">
                        <p className="font-serif italic text-[10px] text-cocoa-deep/40">
                           By applying, you agree to our workshop terms.
                        </p>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
