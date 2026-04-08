import React, { useEffect } from 'react';
import PolicyLayout from '../components/PolicyLayout';

export default function ChocolateColouring() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PolicyLayout title="The World of Chocolate Colouring" subtitle="Botanical Aesthetics">
      <section className="space-y-16">
        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic">Natural vs. Vibrant Aesthetics</h2>
           <p className="font-serif text-lg leading-relaxed text-ivory-warm/70 px-4 md:px-0">
             In the professional world of baking and chocolate, preferences generally fall into two categories:
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div className="bg-white/[0.03] p-10 rounded-[50px] border border-ivory-warm/10 group hover:border-gold-soft/40 transition-all">
                 <h3 className="text-2xl font-display italic text-gold-soft mb-6">1. The Naturalists</h3>
                 <p className="opacity-70 leading-relaxed italic">Those who prefer plant-based, clean-label ingredients.</p>
              </div>
              <div className="bg-white/[0.03] p-10 rounded-[50px] border border-ivory-warm/10 group hover:border-gold-soft/40 transition-all">
                 <h3 className="text-2xl font-display italic text-gold-soft mb-6">2. The Artists</h3>
                 <p className="opacity-70 leading-relaxed italic">Those who want the brightest, most "Instagrammable" results possible.</p>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic">The "E-Number" Debate:</h2>
           <p>While E-numbers are often associated with negative health myths, modern trends toward nutrition-led lifestyles have pushed many retailers (like M&S) to lead the charge in using natural colorants.</p>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic uppercase tracking-widest text-[10px] block mb-2">The Power of Visuals:</h2>
           <p>In the age of social media, vibrant and super-shiny chocolates drive the most engagement. To "stop the scroll," many chocolatiers use bold, innovative decorations and high-pigment colours to make their treats stand out.</p>
        </div>

        <div className="space-y-8 border-t border-gold-soft/10 pt-16 mt-20">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] uppercase tracking-widest text-[10px] block mb-2">Choosing Your Path:</h2>
           <p className="font-serif text-2xl italic opacity-80 leading-relaxed">Whether you go natural or high-vibrancy, <span className="text-gold-soft drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">knowledge of local regulations</span> is essential for your business.</p>
        </div>
      </section>
    </PolicyLayout>
  );
}
