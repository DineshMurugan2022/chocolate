import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IngredientStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    const steps = sectionRef.current.querySelectorAll('.story-step');
    
    gsap.fromTo(pathRef.current, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
    }, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    steps.forEach((step) => {
      gsap.fromTo(step, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-f9f9f9 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="text-pistachio font-bold tracking-[0.3em] uppercase mb-4 block">The Process</span>
          <h2 className="text-6xl md:text-8xl font-luxury text-chocolate-rich">Artisanal Journey</h2>
        </div>
        
        <div className="relative">
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-4 hidden md:block opacity-10" viewBox="0 0 10 1000">
            <path
              ref={pathRef}
              d="M5 0 L5 1000"
              stroke="#8FA93E"
              strokeWidth="4"
              fill="none"
              strokeDasharray="20 20"
            />
          </svg>

          <div className="space-y-40">
            <div className="story-step flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 md:text-right">
                <span className="text-4xl font-luxury text-pistachio mb-4 block">01</span>
                <h3 className="text-3xl font-luxury text-chocolate-rich mb-4">The Harvest</h3>
                <p className="text-chocolate-nest/70 text-lg leading-relaxed">
                  Carefully hand-picked cocoa pods from sustainable plantations, selected for their aromatic profile.
                </p>
              </div>
              <div className="w-24 h-24 bg-pistachio flex-shrink-0 rounded-3xl z-10 border-8 border-white shadow-2xl rotate-12" />
              <div className="w-full md:w-1/2" />
            </div>

            <div className="story-step flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="w-full md:w-1/2 md:text-left">
                <span className="text-4xl font-luxury text-pistachio mb-4 block">02</span>
                <h3 className="text-3xl font-luxury text-chocolate-rich mb-4">Roasting</h3>
                <p className="text-chocolate-nest/70 text-lg leading-relaxed">
                  Slow-roasted in small batches at precise temperatures to unlock deep, complex nutty aromas.
                </p>
              </div>
              <div className="w-24 h-24 bg-chocolate-rich flex-shrink-0 rounded-3xl z-10 border-8 border-white shadow-2xl -rotate-12" />
              <div className="w-full md:w-1/2" />
            </div>

            <div className="story-step flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 md:text-right">
                <span className="text-4xl font-luxury text-pistachio mb-4 block">03</span>
                <h3 className="text-3xl font-luxury text-chocolate-rich mb-4">Conching</h3>
                <p className="text-chocolate-nest/70 text-lg leading-relaxed">
                  Continuous mixing for 72 hours with Karupatti and Honey to achieve our signature silky smoothness.
                </p>
              </div>
              <div className="w-24 h-24 bg-gold flex-shrink-0 rounded-3xl z-10 border-8 border-white shadow-2xl rotate-6" />
              <div className="w-full md:w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientStory;
