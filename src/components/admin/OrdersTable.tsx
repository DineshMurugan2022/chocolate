import { ShoppingBag, ChevronRight } from 'lucide-react';

import { type Order } from '@shared/types';

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  handleUpdateOrderStatus: (id: string, status: string) => void;
  setSelectedOrder: (order: Order) => void;
}

const OrdersTable = ({ orders, loading, handleUpdateOrderStatus, setSelectedOrder }: OrdersTableProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-3xl rounded-[20px] border border-gold-soft/10 overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-gold-soft/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gold-soft/[0.02]">
        <div className="flex items-center gap-4">
           <div className="size-10 rounded-xl bg-gold-soft/10 flex items-center justify-center text-gold-soft">
              <ShoppingBag size={20} />
           </div>
           <div className="flex flex-col">
              <h3 className="text-xl font-display font-black text-gold-soft italic uppercase tracking-wider">Customer Orders</h3>
              <span className="text-[10px] font-black uppercase text-gold-soft/70 tracking-widest">Order Activity</span>
           </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gold-soft/80 text-[10px] font-black uppercase tracking-[0.2em] bg-black/60 border-b border-gold-soft/10">
            <tr>
              <th className="px-8 py-5">Order ID</th>
              <th className="px-8 py-5">Customer</th>
              <th className="px-8 py-5">Amount</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-soft/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-8 py-40 text-center text-gold-soft/20 font-display italic text-2xl">Loading Orders...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-gold-soft/20 font-display italic text-xl">No orders found</td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order._id} className="hover:bg-gold-soft/[0.03] transition-colors group">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-gold-soft" />
                      <span className="font-mono text-[11px] font-black text-gold-soft uppercase tracking-tighter">#{order._id.slice(-10).toUpperCase()}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <p className="font-display font-black text-gold-soft text-lg tracking-tight uppercase italic">{order.shippingAddress.name}</p>
                   <p className="text-[9px] font-black text-gold-soft/70 uppercase tracking-widest">{order.shippingAddress.email}</p>
                </td>
                <td className="px-8 py-6 font-display font-black text-gold-soft text-xl italic">₹{order.totalPrice.toFixed(0)}</td>
                <td className="px-8 py-6">
                  <select 
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                    className={`h-9 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest border focus:outline-none cursor-pointer transition-all ${
                      order.status === 'paid' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 
                      order.status === 'processing' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' :
                      order.status === 'completed' ? 'text-gold-soft/40 border-gold-soft/10 bg-black/40' :
                      order.status === 'cancelled' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                      'text-orange-400 border-orange-500/30 bg-orange-500/10'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="h-10 px-6 bg-black/40 border border-gold-soft/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-gold-soft hover:text-gold-soft hover:border-gold-soft transition-all flex items-center gap-3 ml-auto group/btn shadow-xl"
                  >
                    Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
