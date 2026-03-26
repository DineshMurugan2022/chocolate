import { LayoutDashboard, Plus, Search } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: string;
  setIsSidebarOpen: (open: boolean) => void;
  handleOpenModal: (product?: any) => void;
  newCatName: string;
  setNewCatName: (name: string) => void;
  handleAddCategory: () => void;
}

const AdminHeader = ({ activeTab, setIsSidebarOpen, handleOpenModal, newCatName, setNewCatName, handleAddCategory }: AdminHeaderProps) => {
  const getTitle = () => {
    switch(activeTab) {
      case 'inventory': return 'Botanical Registry';
      case 'orders': return 'Acquisition Logs';
      case 'categories': return 'Taxonomy Nodes';
      default: return 'Heritage Matrix Center';
    }
  };

  return (
    <header className="h-32 border-b-2 border-cocoa-deep/5 bg-white/40 backdrop-blur-3xl flex items-center justify-between px-12 gap-10 transition-all duration-700 relative z-20">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-4 lg:hidden text-cocoa-deep/30 hover:text-botanical-green hover:bg-white rounded-2xl border-2 border-cocoa-deep/5 transition-all shadow-sm"
        >
          <LayoutDashboard size={20} />
        </button>
        <div className="flex flex-col">
           <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-burnt-caramel/20" />
              <span className="font-body text-[9px] font-black uppercase tracking-[0.6em] text-burnt-caramel/40">Station_Alpha_Log</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-display font-black text-cocoa-deep italic leading-none mt-2">
             {getTitle()}
           </h2>
        </div>
      </div>
      
      <div className="flex-1 max-w-xl hidden md:flex items-center px-8 h-16 bg-[#FAF9F6] rounded-[24px] border border-cocoa-deep/5 shadow-inner group transition-all focus-within:shadow-2xl">
         <Search size={18} className="text-cocoa-deep/20 group-focus-within:text-burnt-caramel transition-colors" />
         <input 
           type="text" 
           placeholder="Search_Matrix_ID..." 
           className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-body font-black uppercase tracking-[0.5em] px-6 placeholder:text-cocoa-deep/10 text-cocoa-deep"
         />
      </div>

      <div className="flex items-center gap-6">
        {activeTab === 'inventory' && (
          <button 
              onClick={() => handleOpenModal()}
              className="h-16 px-12 bg-botanical-green text-ivory-warm rounded-[28px] font-body font-black text-[10px] uppercase tracking-[0.5em] hover:bg-burnt-caramel transition-all shadow-3xl flex items-center gap-6 shrink-0 active:scale-95 group"
          >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              <span>Induct_Harvest</span>
          </button>
        )}
        
        {activeTab === 'categories' && (
          <div className="flex gap-6">
            <input 
              type="text" 
              value={newCatName} 
              onChange={(e) => setNewCatName(e.target.value)} 
              placeholder="Node_ID..." 
              className="hidden lg:block h-16 px-8 bg-[#FAF9F6] border border-cocoa-deep/5 rounded-[24px] text-[11px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep focus:border-burnt-caramel focus:outline-none w-56 shadow-inner"
            />
            <button 
              onClick={handleAddCategory}
              className="h-16 px-12 bg-cocoa-deep text-white rounded-[28px] font-body font-black text-[10px] uppercase tracking-[0.5em] hover:bg-burnt-caramel transition-all shadow-3xl flex items-center gap-6 shrink-0 active:scale-95 group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              <span>Add_Node</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
