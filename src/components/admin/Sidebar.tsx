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
    { id: 'overview', icon: LayoutDashboard, label: 'Heritage Matrix' },
    { id: 'inventory', icon: Package, label: 'Botanical Registry' },
    { id: 'orders', icon: ShoppingCart, label: 'Acquisition Logs' },
    { id: 'categories', icon: Tag, label: 'Taxonomy Nodes' },
    { id: 'analytics', icon: BarChart3, label: 'Liquidation Analytics' },
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
            className="fixed inset-0 bg-cocoa-deep/20 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 w-80 border-r-2 border-cocoa-deep/5 bg-white flex flex-col z-50 shadow-4xl transition-transform duration-700 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Background Paper Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

        <div className="relative z-10 p-12 border-b-2 border-cocoa-deep/5">
           <div className="flex justify-center mb-8">
              <Logo className="w-56 h-auto" variant="dark" />
           </div>
           <div className="flex items-center gap-6 justify-center">
              <div className="h-[1px] w-8 bg-burnt-caramel/20" />
              <span className="text-[10px] tracking-[0.6em] font-body font-black text-cocoa-deep/30 uppercase text-center">Curator_Panel_v09</span>
              <div className="h-[1px] w-8 bg-burnt-caramel/20" />
           </div>
        </div>
        
        <nav className="relative z-10 flex-1 p-10 space-y-4">
          {tabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-6 px-8 py-5 rounded-[24px] transition-all duration-700 group relative overflow-hidden ${
                activeTab === item.id 
                  ? 'bg-cocoa-deep text-ivory-warm shadow-3xl' 
                  : 'text-cocoa-deep/40 hover:text-cocoa-deep hover:bg-[#FAF9F6]'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-burnt-caramel' : 'group-hover:text-burnt-caramel transition-colors'} />
              <span className="font-body font-black text-[11px] uppercase tracking-[0.4em]">{item.label}</span>
              {activeTab === item.id && (
                 <motion.div layoutId="activePill" className="absolute right-6 size-2 rounded-full bg-burnt-caramel" />
              )}
            </button>
          ))}
        </nav>

        <div className="relative z-10 p-10 border-t-2 border-cocoa-deep/5 bg-[#FAF9F6]/40">
          <button onClick={logout} className="flex items-center gap-6 px-8 py-5 w-full text-cocoa-deep/40 hover:text-rose-600 transition-all font-body font-black text-[11px] uppercase tracking-[0.4em] rounded-[24px] hover:bg-rose-50 border border-transparent hover:border-rose-100">
            <LogOut size={20} />
            <span>Terminate_Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
