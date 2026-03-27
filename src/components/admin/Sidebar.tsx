import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Tag, 
  BarChart3, 
  LogOut
} from 'lucide-react';
import Logo from '../Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  logout: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, logout }: SidebarProps) => {
  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: 'REGISTRY_STATUS' },
    { id: 'inventory', icon: Package, label: 'HERITAGE_COLLECTION' },
    { id: 'orders', icon: ShoppingCart, label: 'CUSTOMER_MANIFESTS' },
    { id: 'categories', icon: Tag, label: 'TAXONOMY_GROUPS' },
    { id: 'analytics', icon: BarChart3, label: 'ANALYTIC_METRICS' },
  ];

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 w-64 border-r border-gold-soft/10 bg-cocoa-deep flex flex-col z-50 shadow-2xl transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-gold-soft/10 bg-black/20">
           <div className="flex justify-center mb-4">
              <Logo className="w-40 h-auto" variant="light" />
           </div>
           <div className="text-center">
              <span className="text-[10px] font-bold text-gold-soft/30 uppercase tracking-[0.5em]">Registry_Protocol</span>
           </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {tabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all group ${
                activeTab === item.id 
                  ? 'bg-gold-soft text-black shadow-lg shadow-gold-soft/10' 
                  : 'text-gold-soft/50 hover:text-gold-soft hover:bg-gold-soft/5'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-black' : 'text-gold-soft/40 group-hover:text-gold-soft/60'} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-4 px-6 py-4 w-full text-gray-500 hover:text-red-600 transition-all font-semibold text-sm rounded-xl hover:bg-red-50 border border-transparent">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
