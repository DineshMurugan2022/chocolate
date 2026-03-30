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
    switch(activeTab) {
      case 'inventory': return 'Inventory';
      case 'orders': return 'Orders';
      case 'categories': return 'Categories';
      default: return 'Admin Dashboard';
    }
  };

  return (
    <header className="h-24 border-b border-gold-soft/10 bg-cocoa-deep/80 backdrop-blur-xl flex items-center justify-between px-8 gap-4 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 lg:hidden text-gold-soft/40 hover:text-gold-soft hover:bg-gold-soft/10 rounded-lg transition-all"
        >
          <LayoutDashboard size={20} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-display font-black text-gold-soft italic tracking-tight uppercase">
            {getTitle()}
          </h2>
        </div>
      </div>
      
      <div className="flex-1 max-w-md hidden md:flex items-center px-6 h-12 bg-black/40 rounded-full border border-gold-soft/10 focus-within:border-gold-soft transition-all group">
         <Search size={16} className="text-gold-soft/20 group-focus-within:text-gold-soft" />
         <input 
           type="text" 
           placeholder="ID_Registry_Search..." 
           className="w-full bg-transparent border-none focus:ring-0 text-[11px] font-black uppercase tracking-[0.2em] px-3 placeholder:text-gold-soft/10 text-gold-soft"
         />
      </div>

      <div className="flex items-center gap-4">
        {activeTab === 'inventory' && (
          <button 
              onClick={() => handleOpenModal()}
              className="h-10 px-6 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2 shrink-0 active:scale-95"
          >
              <Plus size={18} />
              <span>Add Product</span>
          </button>
        )}
        
        {activeTab === 'categories' && (
          <div className="flex gap-4">
            <input 
              type="text" 
              value={newCatName} 
              onChange={(e) => setNewCatName(e.target.value)} 
              placeholder="Category name..." 
              className="h-10 px-4 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none w-32 md:w-48 transition-all"
            />
            <button 
              onClick={handleAddCategory}
              className="h-10 px-6 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Plus size={18} />
              <span>Add Category</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
