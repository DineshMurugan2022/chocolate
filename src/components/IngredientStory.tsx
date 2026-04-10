import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const IngredientStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    const steps = sectionRef.current.querySelectorAll('.story-step');
    
    // Draw the liquid path on scroll
    gsap.fromTo(pathRef.current, {
      strokeDasharray: 2000,
      strokeDashoffset: 2000,
    }, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1.5,
      }
    });

    steps.forEach((step) => {
      const content = step.querySelector('.step-content');
      const box = step.querySelector('.step-box');
      
      gsap.fromTo(content, {
        opacity: 0,
        x: step.classList.contains('md:flex-row') ? -100 : 100,
      }, {
        opacity: 1,
        x: 0,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
        }
      });

      gsap.fromTo(box, {
        scale: 0,
        rotate: 180,
      }, {
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-60 bg-transparent relative overflow-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold-soft/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-burnt-caramel/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-40 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold-soft/40 font-black tracking-[0.8em] uppercase text-[10px] block"
          >
            The Molecular Alchemy
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-display italic font-black text-gold-soft leading-[0.8]"
          >
            Artisanal <br /> Evolution
          </motion.h2>
        </div>
        
        <div className="relative">
          {/* Central Liquid Path Drawing */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] hidden md:block">
            <svg className="h-full w-full opacity-30" preserveAspectRatio="none" viewBox="0 0 2 1000">
              <path
                ref={pathRef}
                d="M1 0 Q 30 250 1 500 Q -30 750 1 1000"
                stroke="url(#liquidGradient)"
                strokeWidth="2"
                fill="none"
              />
              <defs>
                <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#8B4513" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-60 relative">
            {/* Step 01: Karupatti Sourcing */}
            <div className="story-step flex flex-col md:flex-row items-center gap-20">
              <div className="step-content w-full md:w-5/12 md:text-right space-y-6">
                <span className="text-7xl font-display font-black text-gold-soft/10 italic block leading-none">01</span>
                <h3 className="text-4xl font-display italic font-black text-gold-soft">The Karupatti Origin</h3>
                <p className="text-gold-soft/50 text-xl font-serif leading-relaxed italic border-r-2 border-gold-soft/10 pr-10">
                  Pure Palm Jaggery harvested from the sun-drenched groves of Tirunelveli, bringing an earthy depth that cane sugar can never replicate.
                </p>
              </div>
              <div className="step-box w-32 h-32 bg-gold-soft flex-shrink-0 rounded-[40px] z-10 border border-gold-soft/20 shadow-[0_30px_60px_rgba(212,175,55,0.3)] rotate-12 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="https://img.icons8.com/plasticine/100/null/palm-tree.png" alt="Karupatti" className="w-full opacity-60" />
              </div>
              <div className="w-full md:w-5/12" />
            </div>

            {/* Step 02: Wild Honey Fusion */}
            <div className="story-step flex flex-col md:flex-row-reverse items-center gap-20">
              <div className="step-content w-full md:w-5/12 md:text-left space-y-6">
                <span className="text-7xl font-display font-black text-gold-soft/10 italic block leading-none">02</span>
                <h3 className="text-4xl font-display italic font-black text-gold-soft">Himalayan Wild Honey</h3>
                <p className="text-gold-soft/50 text-xl font-serif leading-relaxed italic border-l-2 border-gold-soft/10 pl-10">
                  Infused with liquid gold from Himalayan wild bees, adding floral high notes and a silky, natural viscosity.
                </p>
              </div>
              <div className="step-box w-32 h-32 bg-[#2D1810] flex-shrink-0 rounded-[40px] z-10 border border-burnt-caramel/40 shadow-[0_30px_60px_rgba(139,69,19,0.3)] -rotate-12 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="https://img.icons8.com/plasticine/100/null/honey.png" alt="Wild Honey" className="w-full opacity-60" />
              </div>
              <div className="w-full md:w-5/12" />
            </div>

            {/* Step 03: The Conching Ritual */}
            <div className="story-step flex flex-col md:flex-row items-center gap-20">
              <div className="step-content w-full md:w-5/12 md:text-right space-y-6">
                <span className="text-7xl font-display font-black text-gold-soft/10 italic block leading-none">03</span>
                <h3 className="text-4xl font-display italic font-black text-gold-soft">The 72-Hour Conche</h3>
                <p className="text-gold-soft/50 text-xl font-serif leading-relaxed italic border-r-2 border-gold-soft/10 pr-10">
                  A rhythmic mechanical dance that refines botanical particles until they vanish, leaving only a velvet whisper on the palate.
                </p>
              </div>
              <div className="step-box w-32 h-32 bg-white flex-shrink-0 rounded-[40px] z-10 border border-gold-soft/10 shadow-[0_30px_60px_rgba(255,255,255,0.1)] rotate-6 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="https://img.icons8.com/plasticine/100/null/chocolate-bar.png" alt="Conching" className="w-full opacity-60" />
              </div>
              <div className="w-full md:w-5/12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientStory;
