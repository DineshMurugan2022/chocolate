import { LayoutDashboard, Plus, Search } from 'lucide-react';

interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  weight: string;
  image: string;
  images: string[];
  description: string;
}

interface AdminHeaderProps {
  activeTab: string;
  setIsSidebarOpen: (open: boolean) => void;
  handleOpenModal: (product?: AdminProduct) => void;
  newCatName: string;
  setNewCatName: (name: string) => void;
  handleAddCategory: () => void;
}

const AdminHeader = ({ activeTab, setIsSidebarOpen, handleOpenModal, newCatName, setNewCatName, handleAddCategory }: AdminHeaderProps) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Registry_Overview';
      case 'inventory': return 'Heritage_Registry';
      case 'orders': return 'Manifest_Logs';
      case 'categories': return 'Taxonomy_Manager';
      case 'analytics': return 'Temporal_Metrics';
      default: return 'Admin_Protocol';
    }
  };

  return (
    <header className="h-24 border-b border-gold-soft/10 bg-[#0F0A09]/80 backdrop-blur-2xl flex items-center justify-between px-10 gap-6 sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-3 lg:hidden text-gold-soft/40 hover:text-gold-soft hover:bg-gold-soft/10 rounded-xl transition-all border border-gold-soft/10"
        >
          <LayoutDashboard size={20} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-3xl font-display font-black text-gold-soft italic tracking-tighter uppercase leading-none">
            {getTitle()}
          </h2>
          <span className="text-[9px] font-black text-gold-soft/30 uppercase tracking-[0.4em] mt-1 hidden sm:block">Access_Level: Administrator_Root</span>
        </div>
      </div>

      <div className="flex-1 max-w-xl hidden md:flex items-center px-6 h-14 bg-black/40 rounded-2xl border border-gold-soft/10 focus-within:border-gold-soft transition-all group shadow-inner">
        <Search size={18} className="text-gold-soft/20 group-focus-within:text-gold-soft transition-colors" />
        <input
          type="text"
          placeholder="ID_Registry_Global_Search..."
          className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-black uppercase tracking-[0.3em] px-4 placeholder:text-gold-soft/10 text-gold-soft"
        />
      </div>

      <div className="flex items-center gap-4">
        {activeTab === 'inventory' && (
          <button
            onClick={() => handleOpenModal()}
            className="h-12 px-8 bg-gold-soft text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-bright transition-all shadow-[0_15px_30px_rgba(212,175,55,0.15)] flex items-center gap-3 shrink-0 active:scale-95"
          >
            <Plus size={18} />
            <span>Initialize_Artifact</span>
          </button>
        )}

        {activeTab === 'categories' && (
          <div className="flex gap-4">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Classification..."
              className="h-12 px-6 bg-black/40 border border-gold-soft/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gold-soft focus:bg-black/60 focus:border-gold-soft focus:outline-none w-40 md:w-64 transition-all placeholder:text-gold-soft/10"
            />
            <button
              onClick={handleAddCategory}
              className="h-12 px-8 bg-gold-soft text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-bright transition-all shadow-[0_15px_30px_rgba(212,175,55,0.15)] flex items-center gap-3 shrink-0 active:scale-95"
            >
              <Plus size={18} />
              <span>Commit_Taxon</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
