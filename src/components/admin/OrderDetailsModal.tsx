import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Phone, MapPin, ShieldCheck, History, Package } from 'lucide-react';

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-cocoa-deep/20 backdrop-blur-md" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }} 
          className="relative w-full max-w-4xl bg-ivory-warm border border-white rounded-[60px] shadow-organic overflow-hidden flex flex-col"
        >
          {/* Modal Header */}
          <div className="p-10 border-b border-cocoa-deep/5 bg-white/40 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-6">
               <div className="size-12 rounded-2xl bg-botanical-green flex items-center justify-center text-ivory-warm shadow-xl">
                  <ShieldCheck size={20} />
               </div>
               <div className="space-y-1">
                  <h3 className="text-3xl font-display font-black text-cocoa-deep italic">
                    Registry_Archive <span className="text-[10px] font-mono text-cocoa-deep/30 bg-white border border-cocoa-deep/5 px-4 py-2 rounded-full shadow-sm ml-4 uppercase tracking-tighter">REF_{order._id.slice(-10).toUpperCase()}</span>
                  </h3>
                  <p className="text-[9px] text-cocoa-deep/20 flex items-center gap-3 font-body font-black uppercase tracking-[0.4em] mt-1">
                     <Calendar size={12} className="text-burnt-caramel" /> 
                     Log_Date: {new Date(order.createdAt).toLocaleDateString()} // {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
               </div>
            </div>
            <button 
              onClick={onClose} 
              className="size-14 rounded-2xl bg-white border border-cocoa-deep/5 text-cocoa-deep/20 hover:text-burnt-caramel hover:shadow-lg transition-all flex items-center justify-center active:scale-95"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Column 1: Identities & Logistics (Lg: 7) */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Curator/Patron Identity */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-[2px] w-12 bg-burnt-caramel/20" />
                   <h4 className="font-body text-[9px] font-black text-burnt-caramel uppercase tracking-[0.6em]">Patron Identity</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6 group">
                    <div className="size-14 rounded-[20px] bg-white border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/20 group-hover:bg-ivory-warm group-hover:text-botanical-green transition-all shadow-sm"><User size={20} /></div>
                    <div className="space-y-1">
                      <p className="font-body text-[8px] font-black text-cocoa-deep/20 uppercase tracking-widest">Authorized Name</p>
                      <p className="text-xl font-display italic text-cocoa-deep">{order.user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="size-14 rounded-[20px] bg-white border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/20 group-hover:bg-ivory-warm group-hover:text-burnt-caramel transition-all shadow-sm"><Mail size={20} /></div>
                    <div className="space-y-1">
                      <p className="font-body text-[8px] font-black text-cocoa-deep/20 uppercase tracking-widest">Digital Dispatch</p>
                      <p className="text-xl font-display italic text-cocoa-deep truncate max-w-[180px]">{order.user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logistics Matrix */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-[2px] w-12 bg-botanical-green/20" />
                   <h4 className="font-body text-[9px] font-black text-botanical-green uppercase tracking-[0.6em]">Logistics Matrix</h4>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="size-14 rounded-[20px] bg-white border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/20 group-hover:bg-ivory-warm group-hover:text-botanical-green transition-all shadow-sm"><Phone size={20} /></div>
                    <div className="space-y-1">
                      <p className="font-body text-[8px] font-black text-cocoa-deep/20 uppercase tracking-widest">Comm_Link</p>
                      <p className="text-xl font-display italic text-cocoa-deep">{order.shippingAddress.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="size-14 rounded-[20px] bg-white border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/20 group-hover:bg-ivory-warm group-hover:text-burnt-caramel transition-all shadow-sm"><MapPin size={20} /></div>
                    <div className="space-y-2">
                      <p className="font-body text-[8px] font-black text-cocoa-deep/20 uppercase tracking-widest">Authorized Destination</p>
                      <p className="text-2xl font-display italic text-cocoa-deep/60 leading-relaxed uppercase tracking-tighter">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Selection Archive (Lg: 5) */}
            <div className="lg:col-span-5 space-y-12 bg-white/40 p-10 rounded-[40px] border border-white shadow-inner">
              <div className="flex items-center justify-between font-body text-[9px] font-black text-cocoa-deep/30 uppercase tracking-[0.4em]">
                 <span>Selection Archive</span>
                 <span>Qty: {order.items.length} Units</span>
              </div>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-6 bg-white border border-cocoa-deep/5 rounded-[30px] shadow-sm hover:shadow-organic group transition-all duration-700">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-xl bg-ivory-warm flex items-center justify-center text-burnt-caramel group-hover:bg-burnt-caramel group-hover:text-white transition-all"><Package size={16} /></div>
                       <div>
                         <p className="text-lg font-display italic text-cocoa-deep group-hover:translate-x-2 transition-transform">{item.name}</p>
                         <p className="font-mono text-[8px] text-cocoa-deep/20 uppercase tracking-[0.2em] mt-1">VAL: ₹{item.price} × {item.quantity}</p>
                       </div>
                    </div>
                    <p className="text-xl font-display font-black text-cocoa-deep tracking-tighter">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-cocoa-deep/5 space-y-6">
                 <div className="flex justify-between items-center px-10 h-20 bg-botanical-green rounded-[30px] text-ivory-warm shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="font-body text-[9px] font-black uppercase tracking-[0.6em] relative z-10">Net Registry Value</span>
                    <span className="text-3xl font-display font-black tracking-tighter relative z-10">₹{order.totalPrice.toFixed(0)}</span>
                 </div>

                 <div className="flex items-center gap-4 justify-center opacity-20">
                    <History size={14} />
                    <span className="font-body text-[8px] font-black uppercase tracking-[0.4em]">Transaction Success Protocol Verified</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-10 bg-ivory-warm border-t border-cocoa-deep/5 flex flex-col md:flex-row justify-between items-center gap-8 shrink-0">
            <div className="flex items-center gap-8 px-8 py-4 bg-white border border-cocoa-deep/5 rounded-full shadow-sm">
               <span className="font-body text-[9px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em]">Registry_Status</span>
               <span className="px-6 h-8 flex items-center bg-botanical-green text-ivory-warm rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">{order.status}</span>
            </div>
            <button 
              onClick={onClose}
              className="h-16 px-16 bg-cocoa-deep hover:bg-burnt-caramel text-white rounded-[24px] font-body font-black text-[10px] uppercase tracking-[0.5em] shadow-xl active:scale-95 transition-all flex items-center gap-4 group"
            >
              Archive_Report <X size={16} className="group-hover:rotate-90 transition-transform opacity-30" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
