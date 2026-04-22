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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
           <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingBag size={18} />
           </div>
           <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-900">Order History</h3>
              <span className="text-xs text-gray-500">Manage customer orders</span>
           </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 text-xs font-bold uppercase tracking-wider bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-medium text-lg">Loading orders...</td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-blue-500" />
                      <span className="font-mono text-[10px] text-gray-500 uppercase tracking-tighter">#{order._id.slice(-10).toUpperCase()}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                   <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>
                   <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{order.shippingAddress.email}</p>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">₹{order.totalPrice.toFixed(0)}</td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                    className={`h-8 px-3 rounded-lg text-[10px] font-bold uppercase border bg-white focus:outline-none cursor-pointer transition-all ${
                      order.status === 'paid' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 
                      order.status === 'processing' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                      order.status === 'completed' ? 'text-gray-500 border-gray-200 bg-gray-100' :
                      'text-orange-600 border-orange-200 bg-orange-50'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="h-8 px-4 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase text-gray-500 hover:text-blue-600 hover:border-blue-500 hover:shadow-sm transition-all flex items-center gap-2 ml-auto group/btn"
                  >
                    View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
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
