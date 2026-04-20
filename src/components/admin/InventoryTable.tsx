import { Search, Edit2, Trash2, Package } from 'lucide-react';

import { type Product } from '@/../../shared/types';

interface InventoryTableProps {
  products: Product[];
  loading: boolean;
  handleOpenModal: (product: Product) => void;
  handleDelete: (id: string) => void;
}

const InventoryTable = ({ products, loading, handleOpenModal, handleDelete }: InventoryTableProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-3xl rounded-[20px] border border-gold-soft/10 overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-gold-soft/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gold-soft/[0.02]">
        <div className="flex items-center gap-4">
           <div className="size-10 rounded-xl bg-gold-soft/10 flex items-center justify-center text-gold-soft">
              <Package size={20} />
           </div>
           <div className="flex flex-col">
              <h3 className="text-xl font-display font-black text-gold-soft italic uppercase tracking-wider">Heritage_Registry</h3>
              <span className="text-[10px] font-black uppercase text-gold-soft/30 tracking-widest">Database_Sync_Secure</span>
           </div>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft/30" size={14} />
          <input 
            type="text" 
            placeholder="Search manifests..."
            className="pl-12 pr-6 py-3 bg-black/40 border border-gold-soft/10 rounded-full text-[11px] font-black uppercase tracking-[0.2em] focus:border-gold-soft focus:outline-none w-full md:w-80 transition-all text-gold-soft placeholder:text-gold-soft/10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gold-soft/30 text-[10px] font-black uppercase tracking-[0.2em] bg-black/60 border-b border-gold-soft/10">
            <tr>
              <th className="px-8 py-5">ARTIFACT_NAME</th>
              <th className="px-8 py-5">TAXONOMY</th>
              <th className="px-8 py-5">VALUATION</th>
              <th className="px-8 py-5">QUANTITY</th>
              <th className="px-8 py-5 text-right">PROTOCOLS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-soft/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-8 py-40 text-center text-gold-soft/20 font-display italic text-2xl">Synchronizing Artifacts...</td>
              </tr>
            ) : products.map((p) => (
              <tr key={p._id} className="hover:bg-gold-soft/[0.03] transition-colors group">
                <td className="px-8 py-6 flex items-center gap-6">
                  <div className="size-16 rounded-xl overflow-hidden border border-gold-soft/10 shadow-2xl shrink-0 p-1 bg-black/20">
                    <img src={p.image} className="w-full h-full object-contain mix-blend-screen" alt={p.name} />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-display font-black text-gold-soft text-lg tracking-tight uppercase italic">{p.name}</p>
                    <p className="text-[9px] font-black text-gold-soft/20 uppercase tracking-widest">HASH: {p._id.slice(-12).toUpperCase()}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <span className="px-3 py-1.5 bg-gold-soft/5 border border-gold-soft/10 rounded-md text-[9px] font-black uppercase text-gold-soft tracking-wider">
                     {p.category}
                   </span>
                </td>
                <td className="px-8 py-6 font-display font-black text-gold-soft text-xl italic">₹{p.price}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                    (p.stock ?? 0) > 10 ? 'bg-gold-soft/10 border-gold-soft/20 text-gold-soft' : 'bg-red-900/40 border-red-500/50 text-red-400'
                  }`}>
                    {p.stock ?? 0} Units
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(p)}
                      className="p-3 text-gold-soft/60 hover:text-gold-soft hover:bg-gold-soft/10 rounded-xl border border-gold-soft/10 transition-all active:scale-90"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)}
                      className="p-3 text-gold-soft/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl border border-gold-soft/10 hover:border-red-500/20 transition-all active:scale-90"
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
