import React, { useEffect } from 'react';
import PolicyLayout from '../components/PolicyLayout';

export default function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PolicyLayout title="Shipping Policy" subtitle="Botanical Dispatches">
      <section className="space-y-16">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">Order Processing & Dispatch:</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-gold-soft font-bold">Orders placed before 7:00 PM:</span>
              <span>Dispatched within 24 hours.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-gold-soft font-bold">Orders placed after 7:00 PM:</span>
              <span>Dispatched within 48 hours.</span>
            </li>
            <li className="flex flex-col gap-2 pt-4">
               <span className="text-gold-soft font-bold uppercase tracking-widest text-xs">Weekend Orders:</span>
               <p>Orders received after 7:00 PM on Saturday will be dispatched on the following Monday.</p>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">Delivery Timelines:</h2>
          <ul className="space-y-6">
            <li>
              <span className="text-gold-soft font-bold">Local Delivery:</span> Usually delivered within 24–48 hours from dispatch. Please note that delivery times are not guaranteed during festival periods.
            </li>
            <li>
              <span className="text-gold-soft font-bold">Outstation Delivery:</span> We utilize professional courier services and provide guaranteed delivery windows for all outstation orders.
            </li>
          </ul>
        </div>

        <div className="space-y-8 bg-white/[0.03] p-8 rounded-[30px] border border-ivory-warm/10">
          <h2 className="text-xl font-bold text-gold-soft uppercase tracking-[0.2em] mb-6">Factors Affecting Delivery</h2>
          <p className="mb-4 text-sm opacity-60 uppercase tracking-widest font-black">Please note that timing depends on several external factors:</p>
          <ul className="space-y-3">
            <li>• Weather and traffic conditions.</li>
            <li>• Unforeseen events or courier company delays.</li>
            <li>• Product unavailability, public holidays, or natural disasters.</li>
            <li>• Customer unavailability at the time of delivery.</li>
          </ul>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">Address & Order Changes:</h2>
          <ul className="space-y-6">
            <li>
              <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Accuracy:</span>
              <p>Products are delivered to the address provided at checkout. Distinct Origins Pvt Ltd is not responsible for delays caused by incorrect or incomplete addresses.</p>
            </li>
            <li>
              <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Restrictions:</span>
              <p>We do not deliver to Post Box-only addresses.</p>
            </li>
            <li>
              <span className="text-gold-soft font-bold uppercase tracking-widest text-xs block mb-2">Modifications:</span>
              <p>To request changes, please contact us via phone or email immediately. We will attempt to accommodate changes depending on the order status; however, no changes can be accepted once an order has shipped.</p>
            </li>
          </ul>
        </div>

        <div className="space-y-8 border-t border-gold-soft/10 pt-16">
          <h2 className="text-3xl md:text-4xl text-gold-soft border-l-2 border-gold-soft pl-6">Shipment Tracking:</h2>
          <p>Once your order has been dispatched, you will receive an automated email containing your tracking details to monitor your delivery in real-time.</p>
          
          <div className="mt-10 space-y-4">
             <h3 className="text-xl font-bold text-gold-soft uppercase tracking-widest">Taxes & Duties</h3>
             <p className="opacity-80 italic">Any additional charges—including GST, Customs Tax, Excise Duty, or Service Tax (National or International)—incurred after shipment are the sole responsibility of the customer/consignee.</p>
          </div>
        </div>
      </section>
    </PolicyLayout>
  );
}
