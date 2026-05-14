import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import type { RootState } from '../store';
import api from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, ChevronRight, User as UserIcon, Mail,
  ShoppingBag, ShieldCheck, History, Globe, Zap, Cpu, Terminal,
  Box, CreditCard, LogOut, X, Package, CheckCircle2, Hash
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import CartDrawer from '../components/CartDrawer';
import CelestialBackground from '../components/CelestialBackground';
import { OrderSkeleton } from '../components/Skeleton';
import { fadeUp, stagger } from '@/utils/motion';

export default function UserProfile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'registry' | 'access' | 'notices'>('registry');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-light flex items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
           <div className="absolute top-0 right-0 w-[40%] h-full bg-heritage-red/10 -skew-x-12" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8 max-w-md relative z-10 p-12 bg-white border-2 border-onyx-black"
        >
          <Logo variant="dark" className="scale-110 mx-auto" />
          <div className="space-y-4">
            <h2 className="text-4xl font-display text-onyx-black font-black uppercase tracking-tighter">
              ACCESS <span className="text-heritage-red">DENIED</span>
            </h2>
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-onyx-black/60 leading-relaxed px-10">
              Identify yourself to access the acquisition vault.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full h-14 bg-heritage-red text-white font-body text-[10px] uppercase tracking-[0.3em] font-black hover:bg-onyx-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            RETURN TO ENTRY
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-light text-onyx-black selection:bg-heritage-red selection:text-white relative overflow-x-hidden ruby-noir-theme">
      {/* Architectural Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-white border-l-2 border-onyx-black/5" />
         <div className="absolute top-[20%] left-[-5%] w-[110%] h-[1px] bg-heritage-red/10 rotate-12" />
         <div className="absolute top-[40%] left-[-5%] w-[110%] h-[1px] bg-heritage-red/10 -rotate-6" />
      </div>

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <motion.main
        className="px-6 lg:px-20 pt-44 pb-32 relative z-10"
        variants={stagger(0.05)}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-7xl mx-auto">

          {/* Angular Dashboard Header */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 mb-20 border-b-2 border-onyx-black">
            <motion.div className="lg:col-span-3 pb-12 space-y-4" variants={fadeUp}>
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-16 bg-heritage-red" />
                <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-heritage-red">MEMBER TERMINAL</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-display font-black leading-none tracking-tighter uppercase">
                HELLO, <span className="text-heritage-red">{user.name.split(' ')[0]}</span>
              </h1>
            </motion.div>

            <motion.div className="flex flex-col justify-end pb-12" variants={fadeUp}>
              <div className="bg-white border-2 border-onyx-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-body text-[8px] uppercase text-onyx-black/40 tracking-widest font-black">Account Rank</p>
                    <p className="font-body text-xs text-heritage-red font-black tracking-widest uppercase">RUBY MEMBER</p>
                  </div>
                  <ShieldCheck size={20} className="text-heritage-red" />
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-6 h-12 bg-onyx-black text-white flex items-center justify-center gap-3 hover:bg-heritage-red transition-all font-body text-[8px] font-black uppercase tracking-widest group"
                >
                  TERMINATE SESSION <LogOut size={12} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Sidebar Navigation - Angular Tabs */}
            <motion.div className="lg:col-span-3 lg:sticky lg:top-40 space-y-8" variants={fadeUp}>
              <div className="space-y-4">
                {[
                  { id: 'registry', label: 'ACQUISITIONS' },
                  { id: 'access', label: 'SECURITY' },
                  { id: 'notices', label: 'MESSAGES' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full h-16 flex items-center justify-between px-8 border-2 transition-all duration-300 group relative ${activeTab === tab.id 
                      ? 'bg-heritage-red border-onyx-black text-white translate-x-4' 
                      : 'bg-white border-onyx-black/10 text-onyx-black/40 hover:border-onyx-black hover:text-onyx-black'
                    }`}
                  >
                    <span className="font-body text-[10px] font-black uppercase tracking-[0.3em]">{tab.label}</span>
                    <ChevronRight size={16} className={activeTab === tab.id ? '' : 'group-hover:translate-x-2 transition-transform'} />
                  </button>
                ))}
              </div>

              {/* Account Identity Shard */}
              <div className="bg-white border-2 border-onyx-black p-8 space-y-6 shadow-[12px_12px_0px_0px_rgba(209,31,31,0.1)]">
                <p className="font-body text-[8px] uppercase tracking-[0.4em] text-heritage-red font-black border-b border-onyx-black/5 pb-2">USER IDENTITY</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-display font-black text-onyx-black uppercase tracking-tighter">{user.name}</p>
                    <p className="font-body text-[9px] text-onyx-black/40 uppercase tracking-widest mt-1 font-bold">{user.email}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 h-10 border border-onyx-black/10 flex items-center justify-center text-onyx-black hover:bg-heritage-red hover:text-white transition-all">
                      <CreditCard size={14} />
                    </button>
                    <button className="flex-1 h-10 border border-onyx-black/10 flex items-center justify-center text-onyx-black hover:bg-heritage-red hover:text-white transition-all">
                      <MapPin size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div className="lg:col-span-9" variants={fadeUp}>
              <AnimatePresence mode="wait">
                {activeTab === 'registry' && (
                  <motion.div
                    key="registry"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-end justify-between border-b-2 border-onyx-black/5 pb-8">
                      <div className="space-y-1">
                        <p className="font-body text-[8px] uppercase text-heritage-red tracking-[0.5em] font-black">DATABASE ARCHIVES</p>
                        <h3 className="text-4xl font-display font-black tracking-tighter uppercase text-onyx-black">
                          Previous <span className="text-heritage-red">Acquisitions</span>
                        </h3>
                      </div>
                      <span className="font-body text-[10px] uppercase tracking-widest text-onyx-black/20 font-black">{orders.length} RECORDS FOUND</span>
                    </div>

                    {loading ? (
                      <div className="space-y-6">
                        <div className="h-40 bg-white border border-onyx-black/5 animate-pulse" />
                        <div className="h-40 bg-white border border-onyx-black/5 animate-pulse" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="p-32 text-center bg-white border-2 border-dashed border-onyx-black/10 flex flex-col items-center gap-8">
                        <ShoppingBag size={48} className="text-onyx-black/10" />
                        <div className="space-y-2">
                          <p className="font-display text-4xl font-black text-onyx-black/20 uppercase tracking-tighter">NO DATA RECORDED</p>
                          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-onyx-black/20">The acquisition vault is currently empty.</p>
                        </div>
                        <button
                          onClick={() => navigate('/shop')}
                          className="h-14 px-12 bg-heritage-red text-white font-body font-black text-[10px] uppercase tracking-[0.3em] hover:bg-onyx-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
                        >
                          INITIALIZE SHOPPING
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order, idx) => (
                          <motion.div
                            key={order._id}
                            className="group bg-white border-2 border-onyx-black/5 hover:border-heritage-red transition-all duration-300 relative overflow-hidden"
                          >
                            <div className="absolute left-0 top-0 w-2 h-full bg-onyx-black group-hover:bg-heritage-red transition-colors" />
                            
                            <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                              <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                  <div className="space-y-1">
                                    <p className="font-body text-[8px] uppercase text-onyx-black/30 tracking-[0.4em] font-black">REF_ID</p>
                                    <p className="font-body text-xs text-onyx-black font-black tracking-tight uppercase">#{order._id.slice(-8)}</p>
                                  </div>
                                  <div className={`px-4 py-1 text-[8px] font-body font-black uppercase tracking-[0.2em] border ${order.status === 'Delivered' 
                                    ? 'bg-heritage-red/5 text-heritage-red border-heritage-red/20' 
                                    : 'bg-onyx-black/5 text-onyx-black/30 border-onyx-black/10'
                                    }`}>
                                    {order.status}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-5xl font-display text-onyx-black font-black uppercase tracking-tighter">
                                    {order.items.length} <span className="text-heritage-red">Artifacts</span>
                                  </h4>
                                  <div className="flex items-center gap-6 text-onyx-black/40">
                                    <div className="flex items-center gap-2 font-body text-[9px] uppercase tracking-widest font-black"><Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                                    <div className="flex items-center gap-2 font-body text-[9px] uppercase tracking-widest font-black"><MapPin size={12} /> {order.shippingAddress.city}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-12">
                                <div className="text-right space-y-1">
                                  <p className="font-body text-[8px] uppercase text-onyx-black/30 tracking-[0.5em] font-black">TOTAL_VALUE</p>
                                  <p className="text-5xl font-body font-black text-onyx-black tabular-nums tracking-tighter">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                                </div>
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="size-16 bg-onyx-black text-white flex items-center justify-center hover:bg-heritage-red transition-all group-hover:translate-x-2"
                                >
                                  <ChevronRight size={32} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                 {activeTab === 'access' && (
                   <motion.div
                     key="access"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="p-20 text-center bg-white border-2 border-onyx-black shadow-[15px_15px_0px_0px_rgba(209,31,31,0.05)]"
                   >
                     <div className="size-20 bg-heritage-red/5 flex items-center justify-center text-heritage-red mx-auto mb-8">
                       <ShieldCheck size={40} />
                     </div>
                     <div className="space-y-4 mb-10">
                       <h3 className="text-4xl font-display font-black uppercase tracking-tighter text-onyx-black">ACCESS <span className="text-heritage-red">PROTECTED</span></h3>
                       <p className="font-body text-[10px] text-onyx-black/30 uppercase tracking-[0.4em] max-w-sm mx-auto font-black leading-loose">ENCRYPTED DATA PROTOCOLS ARE ACTIVE FOR YOUR SECURITY.</p>
                     </div>
                     <button className="h-14 px-12 bg-onyx-black text-white font-body text-[10px] font-black uppercase tracking-widest hover:bg-heritage-red transition-all">
                       UPDATE CREDENTIALS
                     </button>
                   </motion.div>
                 )}

                {activeTab === 'notices' && (
                  <motion.div
                    key="notices"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-20 text-center bg-white border-2 border-onyx-black shadow-[15px_15px_0px_0px_rgba(209,31,31,0.05)]"
                  >
                    <div className="size-20 bg-heritage-red/5 flex items-center justify-center text-heritage-red mx-auto mb-8">
                      <Mail size={40} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-4xl font-display font-black uppercase tracking-tighter text-onyx-black">SECURE <span className="text-heritage-red">MESSAGES</span></h3>
                      <p className="font-body text-[10px] text-onyx-black/30 uppercase tracking-[0.4em] max-w-sm mx-auto font-black leading-loose">NO NEW SYSTEM NOTICES DETECTED IN THE ARCHIVE.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.main>

      {/* Order Details Modal - Angular Ruby Shard */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-6 py-10 bg-onyx-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white border-4 border-onyx-black w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="p-10 border-b-2 border-onyx-black flex items-center justify-between shrink-0 bg-heritage-red text-white">
                <div className="space-y-1">
                  <p className="font-body text-[10px] uppercase text-white/60 tracking-[0.5em] font-black">LOG_DATA_ENTRY</p>
                  <h2 className="text-5xl font-display font-black text-white uppercase tracking-tighter">REGISTRY SUMMARY</h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="size-16 bg-white text-onyx-black flex items-center justify-center hover:bg-onyx-black hover:text-white transition-all shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                
                {/* ID & Status */}
                <div className="grid grid-cols-2 gap-0 border-2 border-onyx-black">
                  <div className="p-8 border-r-2 border-onyx-black">
                    <p className="font-body text-[8px] uppercase text-onyx-black/40 tracking-widest mb-2 font-black italic">REFERENCE_ID</p>
                    <p className="font-body text-xs text-onyx-black font-black uppercase">#{selectedOrder._id}</p>
                  </div>
                  <div className="p-8 bg-onyx-black text-white">
                    <p className="font-body text-[8px] uppercase text-white/40 tracking-widest mb-2 font-black italic">REGISTRY_STATUS</p>
                    <div className="flex items-center gap-3">
                      <div className="size-2 bg-heritage-red animate-pulse" />
                      <p className="font-body text-xs text-heritage-red font-black uppercase tracking-[0.2em]">{selectedOrder.status}</p>
                    </div>
                  </div>
                </div>

                {/* Artifacts List */}
                <div className="space-y-6">
                  <p className="font-body text-[10px] uppercase text-heritage-red tracking-[0.5em] font-black border-l-4 border-heritage-red pl-4">SECURED ARTIFACTS</p>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-8 bg-stone-light border border-onyx-black/10 group hover:border-heritage-red transition-all">
                        <div className="flex items-center gap-6">
                          <div className="size-12 bg-onyx-black text-white flex items-center justify-center">
                            <Package size={24} />
                          </div>
                          <div>
                            <p className="font-display text-2xl font-black text-onyx-black uppercase tracking-tighter">{item.name}</p>
                            <p className="font-body text-[10px] text-onyx-black/40 uppercase tracking-widest font-black">QUANTITY: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-3xl font-body font-black text-onyx-black">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="bg-white border-2 border-onyx-black p-10 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-heritage-red/5 -rotate-45 translate-x-12 -translate-y-12" />
                  <div className="flex items-center gap-4 border-b border-onyx-black/5 pb-4">
                    <MapPin className="text-heritage-red" size={20} />
                    <p className="font-body text-[10px] uppercase text-onyx-black font-black tracking-[0.3em]">DESTINATION PROTOCOL</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-display font-black text-onyx-black uppercase tracking-tighter">
                      {selectedOrder.shippingAddress.address}, <span className="text-heritage-red">{selectedOrder.shippingAddress.city}</span>
                    </p>
                    <p className="font-body text-[10px] text-onyx-black/40 uppercase tracking-widest font-black">PINCODE: {selectedOrder.shippingAddress.postalCode}</p>
                  </div>
                </div>

                {/* Final Total */}
                <div className="flex items-center justify-between py-12 border-t-4 border-onyx-black px-4">
                  <div className="space-y-1">
                    <p className="font-body text-[10px] uppercase text-heritage-red tracking-[0.6em] font-black italic">NET_ACQUISITION_VALUE</p>
                    <p className="text-7xl font-body font-black text-onyx-black tracking-tighter tabular-nums">₹{selectedOrder.totalPrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}


interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
}
