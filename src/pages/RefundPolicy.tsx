import React, { useEffect } from 'react';
import PolicyLayout from '../components/PolicyLayout';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PolicyLayout title="Refund & Cancellation" subtitle="Artisan Concierge_Support">
      <section className="space-y-16">
        <div className="bg-gold-soft/5 p-8 md:p-12 rounded-[40px] border border-gold-soft/20 backdrop-blur-md">
           <h2 className="text-3xl md:text-4xl text-gold-soft font-display italic mb-8">Customer Support</h2>
           <p className="mb-8 opacity-70">For all requests, please contact our team:</p>
           <ul className="space-y-4">
             <li className="flex items-center gap-6 pb-4 border-b border-gold-soft/10 last:border-0 hover:bg-gold-soft/5 transition-colors p-4 rounded-xl">
               <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-gold-soft w-16">Phone</span>
               <span className="font-bold text-lg">1800 1233110</span>
               <span className="text-xs opacity-50 ml-auto">(9:00 AM – 7:00 PM IST)</span>
             </li>
             <li className="flex items-center gap-6 pb-4 border-b border-gold-soft/10 last:border-0 hover:bg-gold-soft/5 transition-colors p-4 rounded-xl">
               <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-gold-soft w-16">Email</span>
               <span className="font-bold text-lg">care@manamchocolate.com</span>
             </li>
           </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">Cancellations:</h2>
              <ul className="space-y-6">
                <li>
                  <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Window:</span>
                  <p>Requests must be made within 24 hours of placing the order.</p>
                </li>
                <li>
                  <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Shipping Status:</span>
                  <p>Orders already shipped cannot be cancelled.</p>
                </li>
                <li>
                  <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Special Occasions:</span>
                  <p>Cancellations are not available for limited-occasion products (e.g., Holi, Diwali, Valentine’s Day).</p>
                </li>
              </ul>
           </div>

           <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">Refunds & Replacements:</h2>
              <p className="italic opacity-80">If you receive an incorrect or spoiled product, please notify us within 12 hours of delivery.</p>
              <ul className="space-y-6">
                <li>
                  <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Evidence Required:</span>
                  <p>Customers must provide adequate information and photographs for a claim to be reviewed.</p>
                </li>
                <li>
                  <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Damaged Goods:</span>
                  <p>Report damaged shipments within 12 hours so we may address the issue with our courier partners.</p>
                </li>
                <li>
                  <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Exclusions:</span>
                  <p>Refunds are not provided based on personal taste preferences, provided the product is within its expiry date.</p>
                </li>
              </ul>
           </div>
        </div>

        <div className="space-y-12 border-t border-gold-soft/10 pt-16">
           <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">The Process:</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Approval', content: 'If a replacement is approved, a new packet of the same (or equivalent) product will be shipped.' },
                { step: '02', title: 'Internal Processing', content: 'We process approved refunds within 1–2 business days.' },
                { step: '03', title: 'Bank Processing', content: 'Once passed to our payment gateway, it typically takes 7–10 business days for the funds to appear in your account.' }
              ].map((item) => (
                <div key={item.step} className="space-y-4">
                   <span className="font-display text-4xl text-gold-soft/20 italic">{item.step}</span>
                   <h3 className="text-xl font-bold italic">{item.title}</h3>
                   <p className="text-sm opacity-60 leading-relaxed">{item.content}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </PolicyLayout>
  );
}
