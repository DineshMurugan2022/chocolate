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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.98 }} 
          className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
               <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Package size={18} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Order Details <span className="text-[10px] font-mono text-gray-400 bg-white border border-gray-200 px-3 py-1 rounded-md ml-4 uppercase">#{order._id.slice(-10).toUpperCase()}</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 flex items-center gap-2 mt-0.5">
                     <Calendar size={12} /> 
                     Date: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
               </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all font-bold"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Customer & Shipping */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Customer Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"><User size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Full Name</p>
                      <p className="text-sm font-semibold text-gray-900">{(order.user as SharedUser).name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"><Mail size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Email Address</p>
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">{(order.user as SharedUser).email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Details</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"><Phone size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Phone Number</p>
                      <p className="text-sm font-semibold text-gray-900">{order.shippingAddress.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"><MapPin size={18} /></div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Shipping Address</p>
                      <p className="text-sm font-semibold text-gray-900 leading-relaxed uppercase">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Order Summary */}
            <div className="lg:col-span-5 space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                 <span>Items</span>
                 <span>{order.items.length} Units</span>
              </div>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="size-8 rounded bg-gray-50 flex items-center justify-center text-blue-600"><Package size={14} /></div>
                       <div>
                         <p className="text-sm font-semibold text-gray-900 uppercase tracking-tight">{item.name}</p>
                         <p className="text-[10px] text-gray-400 mt-0.5">₹{item.price} × {item.quantity}</p>
                       </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                 <div className="flex justify-between items-center px-6 h-16 bg-blue-600 rounded-lg text-white shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Total Amount</span>
                    <span className="text-2xl font-bold">₹{order.totalPrice.toFixed(0)}</span>
                 </div>

                 <div className="flex items-center gap-2 justify-center opacity-40">
                    <History size={12} />
                    <span className="text-[8px] font-bold uppercase tracking-wider">Transaction Verified</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
            <div className="flex items-center gap-4 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status:</span>
               <span className={`px-4 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                 order.status === 'paid' ? 'bg-emerald-500 text-white' : 
                 order.status === 'processing' ? 'bg-blue-500 text-white' :
                 order.status === 'completed' ? 'bg-gray-500 text-white' :
                 'bg-orange-500 text-white'
               }`}>{order.status}</span>
            </div>
            <button 
              onClick={onClose}
              className="h-10 px-8 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-bold uppercase shadow-md transition-all flex items-center gap-2"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
