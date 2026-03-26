import { ShoppingBag, ChevronRight, History } from 'lucide-react';

interface OrdersTableProps {
  orders: any[];
  loading: boolean;
  handleUpdateOrderStatus: (id: string, status: string) => void;
  setSelectedOrder: (order: any) => void;
}

const OrdersTable = ({ orders, loading, handleUpdateOrderStatus, setSelectedOrder }: OrdersTableProps) => {
  return (
    <div className="bg-white rounded-[40px] border border-cocoa-deep/5 overflow-hidden shadow-organic transition-all duration-700">
      <div className="p-10 border-b border-cocoa-deep/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-ivory-warm/10">
        <div className="flex items-center gap-6">
           <div className="size-10 rounded-xl bg-botanical-green/5 flex items-center justify-center text-botanical-green">
              <ShoppingBag size={20} />
           </div>
           <div className="flex flex-col">
              <h3 className="text-xl font-display font-black text-cocoa-deep italic">Registry Logs</h3>
              <span className="font-body text-[8px] font-black uppercase tracking-[0.4em] text-cocoa-deep/20 mt-1">Live Acquisition Archive</span>
           </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-cocoa-deep/30 text-[9px] font-body font-black uppercase tracking-[0.4em] bg-ivory-warm/20">
            <tr>
              <th className="px-10 py-6">Registry_ID</th>
              <th className="px-10 py-6">Curator_Identity</th>
              <th className="px-10 py-6">Net Valuation</th>
              <th className="px-10 py-6">Status_Gate</th>
              <th className="px-10 py-6 text-right">Observation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cocoa-deep/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-10 py-32 text-center text-cocoa-deep/20 font-serif italic text-2xl">Synchronizing acquisition logs...</td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order._id} className="hover:bg-ivory-warm/40 transition-all duration-500 group">
                <td className="px-10 py-6">
                   <div className="flex items-center gap-3">
                      <div className="size-1.5 rounded-full bg-burnt-caramel" />
                      <span className="font-mono text-[9px] text-cocoa-deep/30 uppercase tracking-tighter">#{order._id.slice(-10).toUpperCase()}</span>
                   </div>
                </td>
                <td className="px-10 py-6">
                   <p className="font-display text-lg text-cocoa-deep italic group-hover:text-burnt-caramel transition-colors">{order.shippingAddress.name}</p>
                   <p className="font-body text-[8px] font-black uppercase tracking-widest text-cocoa-deep/20 truncate max-w-[150px]">{order.shippingAddress.email}</p>
                </td>
                <td className="px-10 py-6 font-display font-black text-xl text-cocoa-deep tracking-tighter">₹{order.totalPrice.toFixed(0)}</td>
                <td className="px-10 py-6">
                  <select 
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                    className={`h-10 px-4 rounded-xl font-body font-black text-[8px] uppercase tracking-widest border bg-white focus:outline-none cursor-pointer transition-all ${
                      order.status === 'paid' ? 'text-emerald-600 border-emerald-500/20 bg-emerald-50/50' : 
                      order.status === 'processing' ? 'text-blue-600 border-blue-500/20 bg-blue-50/50' :
                      order.status === 'completed' ? 'text-cocoa-deep/30 border-cocoa-deep/10 bg-ivory-warm/50' :
                      'text-burnt-caramel border-burnt-caramel/20 bg-burnt-caramel/5'
                    }`}
                  >
                    <option value="pending">PENDING_REVIEW</option>
                    <option value="paid">LIQUIDATED</option>
                    <option value="processing">IN_ATELIER</option>
                    <option value="completed">ARCHIVED_SUCCESS</option>
                    <option value="cancelled">VOID_SESSION</option>
                  </select>
                </td>
                <td className="px-10 py-6 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="h-10 px-6 bg-white border border-cocoa-deep/5 rounded-xl font-body font-black text-[8px] uppercase tracking-widest text-cocoa-deep/20 hover:text-burnt-caramel hover:border-burnt-caramel hover:shadow-lg transition-all flex items-center gap-3 ml-auto group/btn"
                  >
                    Examine Registry <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
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
