import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Phone, MapPin, History, Package } from 'lucide-react';

import { type Order, type User as SharedUser } from '@shared/types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.98, y: 20 }} 
          className="relative w-full max-w-5xl bg-[#0F0A09] border border-gold-soft/20 rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-10 py-8 border-b border-gold-soft/10 bg-black/40 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-5">
               <div className="size-12 rounded-2xl bg-gold-soft/10 border border-gold-soft/20 flex items-center justify-center text-gold-soft shadow-inner">
                  <Package size={24} />
               </div>
               <div>
                  <h3 className="text-2xl font-display font-black text-gold-soft italic uppercase tracking-tighter flex items-center gap-4">
                    Order_Specification
                    <span className="text-[10px] font-mono text-gold-soft/40 bg-white/5 border border-gold-soft/10 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">#{order._id.slice(-10).toUpperCase()}</span>
                  </h3>
                  <p className="text-[10px] font-black text-gold-soft/30 flex items-center gap-2 mt-1.5 uppercase tracking-widest">
                     <Calendar size={12} className="text-gold-soft/20" /> 
                     Logged: {new Date(order.createdAt).toLocaleDateString()} // {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
               </div>
            </div>
            <button 
              onClick={onClose} 
              className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-soft/40 hover:text-gold-soft hover:bg-gold-soft/20 transition-all active:scale-90"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Customer & Shipping */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Customer Info */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.3em] px-2">Customer_Profile_Data</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-5 p-6 bg-black/40 border border-gold-soft/10 rounded-2xl shadow-xl">
                    <div className="size-12 rounded-xl bg-gold-soft/5 border border-gold-soft/10 flex items-center justify-center text-gold-soft/30"><User size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black text-gold-soft/20 uppercase tracking-tight mb-1">Authenticated_Name</p>
                      <p className="text-base font-display font-black text-gold-soft italic uppercase">{(order.user as SharedUser).name || 'ANONYMOUS_USER'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 bg-black/40 border border-gold-soft/10 rounded-2xl shadow-xl">
                    <div className="size-12 rounded-xl bg-gold-soft/5 border border-gold-soft/10 flex items-center justify-center text-gold-soft/30"><Mail size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black text-gold-soft/20 uppercase tracking-tight mb-1">Contact_Registry</p>
                      <p className="text-base font-display font-black text-gold-soft italic uppercase truncate max-w-[200px]">{(order.user as SharedUser).email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.3em] px-2">Logistics_Terminal_Address</h4>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 p-6 bg-black/40 border border-gold-soft/10 rounded-2xl shadow-xl w-full">
                    <div className="size-12 rounded-xl bg-gold-soft/5 border border-gold-soft/10 flex items-center justify-center text-gold-soft/30 shrink-0"><Phone size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black text-gold-soft/20 uppercase tracking-tight mb-1">Signal_Contact</p>
                      <p className="text-base font-display font-black text-gold-soft italic uppercase tracking-widest">{order.shippingAddress.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 p-6 bg-black/40 border border-gold-soft/10 rounded-2xl shadow-xl w-full">
                    <div className="size-12 rounded-xl bg-gold-soft/5 border border-gold-soft/10 flex items-center justify-center text-gold-soft/30 shrink-0"><MapPin size={20} /></div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gold-soft/20 uppercase tracking-tight mb-1">Physical_Coordinates</p>
                      <p className="text-base font-display font-black text-gold-soft italic uppercase leading-relaxed tracking-tight">
                        {order.shippingAddress.address}<br />
                        <span className="text-gold-soft/60">{order.shippingAddress.city} — {order.shippingAddress.postalCode}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Order Summary */}
            <div className="lg:col-span-5 space-y-8 bg-black/40 p-8 rounded-[32px] border border-gold-soft/10 shadow-inner">
              <div className="flex items-center justify-between text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.3em]">
                 <span>Registry_Manifest</span>
                 <span className="text-gold-soft">{order.items.length} Artifacts</span>
              </div>
              
              <div className="space-y-5 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-5 bg-black/40 border border-gold-soft/10 rounded-2xl shadow-2xl group hover:border-gold-soft/30 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="size-12 rounded-xl bg-gold-soft/5 flex items-center justify-center text-gold-soft/20 group-hover:text-gold-soft/50 transition-colors"><Package size={20} /></div>
                       <div>
                         <p className="text-sm font-display font-black text-gold-soft uppercase tracking-tight italic">{item.name}</p>
                         <p className="text-[10px] font-black text-gold-soft/20 mt-1 uppercase tracking-widest">₹{item.price} × {item.quantity}</p>
                       </div>
                    </div>
                    <p className="text-base font-display font-black text-gold-soft italic">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gold-soft/10 space-y-6">
                 <div className="flex justify-between items-center px-8 h-20 bg-gold-soft rounded-2xl text-black shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Total_Valuation</span>
                    <span className="text-3xl font-display font-black italic">₹{order.totalPrice.toFixed(0)}</span>
                 </div>

                 <div className="flex items-center gap-3 justify-center opacity-20">
                    <History size={14} className="text-gold-soft" />
                    <span className="text-[8px] font-black text-gold-soft uppercase tracking-[0.5em]">Transaction_Integrity_Verified</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 py-8 bg-black/60 border-t border-gold-soft/10 flex flex-col md:flex-row justify-between items-center gap-6 shrink-0">
            <div className="flex items-center gap-5 px-6 py-3 bg-black/40 border border-gold-soft/10 rounded-2xl shadow-xl">
               <span className="text-[10px] font-black text-gold-soft/20 uppercase tracking-[0.2em]">Current_Protocol:</span>
               <span className={`px-5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl ${
                 order.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                 order.status === 'processing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                 order.status === 'completed' ? 'bg-gold-soft/10 text-gold-soft/40 border border-gold-soft/10' :
                 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
               }`}>{order.status}</span>
            </div>
            <button 
              onClick={onClose}
              className="h-14 px-12 bg-black border border-gold-soft/10 hover:border-gold-soft text-gold-soft text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl transition-all active:scale-95"
            >
              Terminate_View
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
