import React, { useEffect } from 'react';
import PolicyLayout from '../components/PolicyLayout';

export default function HeavyMetalsInfo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PolicyLayout title="Heavy Metals in Chocolate" subtitle="Botanical_Security">
      <section className="space-y-16">
        <blockquote className="border-l-4 border-gold-soft pl-8 py-4 italic font-serif text-3xl md:text-4xl text-ivory-warm/40 leading-relaxed mb-16">
          "In every ounce of dark cocoa lies a story of the soil—a balance of nature's elements and the maker's mindful craft.”
        </blockquote>

        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic">Why Awareness Matters (Without the Worry)</h2>
           <p>If you’ve been working with chocolate, you’ve likely heard concerns regarding heavy metals—specifically lead and cadmium. In 2023, a Consumer Reports study found elevated levels in 23 out of 28 tested brands. While this sounds alarming, understanding the context is key.</p>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic">What are Heavy Metals?</h2>
           <p>Heavy metals are naturally occurring elements found in soil. Plants absorb them, which is how they enter our food chain. While some are harmless, others like lead, cadmium, mercury, and arsenic can be toxic at high exposure levels.</p>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic">How They Enter Chocolate:</h2>
           <ul className="space-y-6">
              <li>
                 <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Cadmium:</span>
                 <p>Absorbed through the roots from volcanic activity or weathered rocks in the soil. Levels are typically higher in South American cocoa compared to African cocoa.</p>
              </li>
              <li>
                 <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Lead:</span>
                 <p>Primarily a post-harvest by-product. It often comes from dust, dirt, or vehicle exhaust while beans dry near roadsides.</p>
              </li>
           </ul>
        </div>

        <div className="space-y-12 bg-white/[0.03] p-10 rounded-[50px] border border-ivory-warm/10 backdrop-blur-sm">
           <h2 className="text-3xl md:text-4xl text-gold-soft font-display italic mb-8">Is it Safe? (The Legal Standards)</h2>
           <p className="mb-8 opacity-70 italic font-serif">The European Commission (Regulation 2023/915) strictly limits cadmium based on cocoa percentage:</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: '< 30% Cocoa Solids', value: 'Max 0.10 mg/kg' },
                { label: '30–50% Cocoa Solids', value: 'Max 0.30 mg/kg' },
                { label: '> 50% Cocoa Solids', value: 'Max 0.80 mg/kg' },
                { label: 'Cocoa Powder', value: 'Max 0.60 mg/kg' }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center pb-4 border-b border-ivory-warm/10 group">
                   <span className="font-body text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-gold-soft transition-colors">{item.label}</span>
                   <span className="font-serif italic text-lg text-gold-soft">{item.value}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-gold-soft/5 rounded-2xl border border-gold-soft/20 text-sm italic opacity-80 leading-relaxed">
              <span className="text-gold-soft font-black uppercase tracking-widest text-[10px] mr-2">Note:</span>
              Lead levels in cocoa are generally so low that they lack specific maximum limits in many food categories due to "low bioavailability" (minimal absorption by the body).
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6 font-display italic">The Big Picture:</h2>
           <p>Chocolate is a luxury usually eaten in small amounts. According to the EFSA, chocolate only contributes 4.3% of the average person's cadmium intake. Larger contributors include:</p>
           <ul className="space-y-4">
              <li className="flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                 <span className="font-serif italic italic">Grains/Grain Products</span>
                 <span className="text-gold-soft font-bold">26.9%</span>
              </li>
              <li className="flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                 <span className="font-serif italic italic">Vegetables</span>
                 <span className="text-gold-soft font-bold">16%</span>
              </li>
              <li className="flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                 <span className="font-serif italic italic">Starchy Roots/Tubers</span>
                 <span className="text-gold-soft font-bold">13.2%</span>
              </li>
           </ul>
        </div>
      </section>
    </PolicyLayout>
  );
}
