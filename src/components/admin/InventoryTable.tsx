import { Search, Edit2, Trash2, Package } from 'lucide-react';

interface InventoryTableProps {
  products: any[];
  loading: boolean;
  handleOpenModal: (product: any) => void;
  handleDelete: (id: string) => void;
}

const InventoryTable = ({ products, loading, handleOpenModal, handleDelete }: InventoryTableProps) => {
  return (
    <div className="bg-white rounded-[40px] border border-cocoa-deep/5 overflow-hidden shadow-organic transition-all duration-700">
      <div className="p-10 border-b border-cocoa-deep/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-ivory-warm/10">
        <div className="flex items-center gap-6">
           <div className="size-10 rounded-xl bg-botanical-green/5 flex items-center justify-center text-botanical-green">
              <Package size={20} />
           </div>
           <div className="flex flex-col">
              <h3 className="text-xl font-display font-black text-cocoa-deep italic">Registry Matrix</h3>
              <span className="font-body text-[8px] font-black uppercase tracking-[0.4em] text-cocoa-deep/20 mt-1">Verified Inventory Sector</span>
           </div>
        </div>
        
        <div className="relative w-full md:w-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-cocoa-deep/20 group-focus-within:text-burnt-caramel transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Filter_Registry_ID..."
            className="pl-16 pr-8 py-5 bg-white border border-cocoa-deep/5 rounded-[20px] text-[10px] font-body font-black uppercase tracking-[0.4em] focus:border-burnt-caramel focus:outline-none w-full md:w-80 transition-all text-cocoa-deep shadow-inner"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-cocoa-deep/30 text-[9px] font-body font-black uppercase tracking-[0.4em] bg-ivory-warm/20">
            <tr>
              <th className="px-10 py-6">Exhibit Identification</th>
              <th className="px-10 py-6">Sector</th>
              <th className="px-10 py-6">Valuation</th>
              <th className="px-10 py-6">Induction_Qty</th>
              <th className="px-10 py-6 text-right">Registry_Ops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cocoa-deep/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-10 py-32 text-center text-cocoa-deep/20 font-serif italic text-2xl">Synchronizing botanical matrix...</td>
              </tr>
            ) : products.map((p) => (
              <tr key={p._id} className="hover:bg-ivory-warm/40 transition-all duration-500 group">
                <td className="px-10 py-6 flex items-center gap-6">
                  <div className="size-14 rounded-2xl overflow-hidden border border-cocoa-deep/5 shadow-sm shrink-0">
                    <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-xl text-cocoa-deep italic group-hover:text-burnt-caramel transition-colors">{p.name}</p>
                    <p className="font-mono text-[8px] text-cocoa-deep/20 uppercase tracking-tighter">REF_CODE: {p._id.slice(-8).toUpperCase()}</p>
                  </div>
                </td>
                <td className="px-10 py-6">
                   <span className="h-8 px-4 flex items-center bg-white border border-cocoa-deep/5 rounded-xl text-[8px] font-body font-black uppercase tracking-widest text-cocoa-deep/30 group-hover:border-burnt-caramel/20 group-hover:text-burnt-caramel transition-all">
                     {p.category}
                   </span>
                </td>
                <td className="px-10 py-6 font-display font-black text-xl text-cocoa-deep tracking-tighter">₹{p.price}</td>
                <td className="px-10 py-6">
                  <span className={`h-8 px-4 flex items-center rounded-xl font-body font-black text-[8px] uppercase tracking-widest border ${
                    p.stock > 10 ? 'bg-botanical-green/5 text-botanical-green border-botanical-green/10' : 'bg-burnt-caramel/5 text-burnt-caramel border-burnt-caramel/10'
                  }`}>
                    {p.stock} Units
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500">
                    <button 
                      onClick={() => handleOpenModal(p)}
                      className="size-10 flex items-center justify-center bg-white border border-cocoa-deep/5 rounded-xl text-cocoa-deep/20 hover:text-burnt-caramel hover:shadow-lg transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)}
                      className="size-10 flex items-center justify-center bg-white border border-cocoa-deep/5 rounded-xl text-cocoa-deep/20 hover:text-rose-500 hover:shadow-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
