import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Dark Chocolate', image: 'https://images.unsplash.com/photo-1614088517255-08e1a1796191?q=80&w=600&auto=format&fit=crop' },
  { name: 'Milk Chocolate', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop' },
  { name: 'Nut Chocolate', image: 'https://images.unsplash.com/photo-1579728205562-1d54f3ffccda?q=80&w=600&auto=format&fit=crop' },
  { name: 'Fruit Chocolate', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=600&auto=format&fit=crop' }
];

export default function ChocolateCategories() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.category-card', 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-16 lg:px-40 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <span className="text-gold-accent font-poppins font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">
          Taste Profiles
        </span>
        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-umber-text">
          Chocolate Collection
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-card flex flex-col items-center group cursor-pointer opacity-0 translate-y-8">
            <div className="relative w-full aspect-square mb-6">
              {/* Drip Border Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gold-accent/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-gold-accent/40 group-hover:border-gold-accent transition-colors duration-500">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
            <h3 className="font-playfair text-xl md:text-2xl text-umber-text group-hover:text-gold-accent transition-colors">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
