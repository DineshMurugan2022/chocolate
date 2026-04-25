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
  const [activeTab, setActiveTab] = useState<'archives' | 'security' | 'intelligence'>('archives');
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
      <div className="min-h-screen bg-transparent flex items-center justify-center p-6 text-center relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 max-w-md relative z-10"
        >
          <Logo 
             variant="dark" 
             className="scale-125 mx-auto opacity-40"
           />
          <div className="space-y-6">
            <h2 className="text-5xl font-display text-cocoa-deep font-black uppercase tracking-tighter">
              LOGIN <span className="text-burnt-caramel font-thin">REQUIRED</span>
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-burnt-caramel/40 leading-relaxed px-10 border-l border-burnt-caramel/20 ml-10">
              Please log in to your account to view your orders and profile.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="h-14 px-12 bg-burnt-caramel/10 border border-burnt-caramel/20 text-burnt-caramel rounded-2xl font-mono text-[10px] uppercase tracking-widest hover:bg-burnt-caramel hover:text-white transition-all"
          >
            BACK TO HOME
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-cocoa-deep selection:bg-burnt-caramel selection:text-white relative overflow-x-hidden pt-32">

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <motion.main
        className="px-6 lg:px-20 relative z-10"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-[1500px] mx-auto">

          {/* Futuristic Dashboard Header */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20 lg:mb-32">
            <motion.div className="lg:col-span-3 space-y-6" variants={fadeUp}>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-burnt-caramel/40" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.5em] text-burnt-caramel">USER ACCOUNT PROFILE</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black leading-tight tracking-tight uppercase">
                Welcome, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnt-caramel via-cocoa-deep to-burnt-caramel bg-[length:200%_auto] animate-gradient-x italic font-light drop-shadow-[0_0_15px_rgba(179,83,15,0.3)]">
                  {user.name.split(' ')[0]}
                </span>
              </h1>
            </motion.div>

            <motion.div className="flex flex-col justify-end items-end gap-6 h-full" variants={fadeUp}>
              <div className="bg-white/40 backdrop-blur-3xl border border-gold-soft/20 rounded-[32px] p-6 w-full flex items-center justify-between group hover:border-burnt-caramel/30 transition-all">
                <div className="space-y-1">
                  <p className="font-mono text-[8px] uppercase text-cocoa-deep/40 tracking-widest">Account Status</p>
                  <p className="font-mono text-xs text-burnt-caramel font-bold tracking-widest">ACTIVE</p>
                </div>
                <div className="size-10 rounded-2xl bg-burnt-caramel/10 flex items-center justify-center text-burnt-caramel animate-pulse">
                  <Cpu size={18} />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full h-14 bg-white/40 border border-gold-soft/20 rounded-2xl flex items-center justify-center gap-4 hover:bg-red-500/10 hover:border-red-500/20 text-cocoa-deep/20 hover:text-red-400 transition-all font-mono text-[9px] uppercase tracking-widest group"
              >
                LOGOUT <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

            {/* Sidebar Navigation - Glass Tabs */}
            <motion.div className="lg:col-span-3 lg:sticky lg:top-40 space-y-6" variants={fadeUp}>
              <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] p-6 border border-gold-soft/20 space-y-3">
                {[
                  { id: 'archives', icon: Box, label: 'ORDER HISTORY' },
                  { id: 'security', icon: ShieldCheck, label: 'SECURITY SETTINGS' },
                  { id: 'intelligence', icon: Terminal, label: 'NOTIFICATIONS' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full h-16 rounded-3xl flex items-center gap-6 px-6 transition-all duration-500 group relative overflow-hidden ${activeTab === tab.id ? 'bg-burnt-caramel text-white' : 'hover:bg-white/20 text-cocoa-deep/40 hover:text-cocoa-deep'
                      }`}
                  >
                    <tab.icon size={20} className={activeTab === tab.id ? '' : 'group-hover:rotate-12 transition-transform'} />
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>

              {/* User Identity Artifact */}
              <div className="bg-gradient-to-br from-burnt-caramel/10 to-transparent backdrop-blur-2xl rounded-[40px] p-10 border border-burnt-caramel/20 relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 size-40 bg-burnt-caramel/10 blur-3xl rounded-full" />
                <p className="font-mono text-[8px] uppercase tracking-[0.5em] text-burnt-caramel/60 mb-6">User Details</p>
                <div className="space-y-6">
                  <div>
                    <p className="text-xl font-display italic text-cocoa-deep">{user.name}</p>
                    <p className="font-mono text-[9px] text-cocoa-deep/20 uppercase tracking-widest mt-1 italic">{user.email}</p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <div className="size-10 rounded-xl bg-white/40 border border-gold-soft/20 flex items-center justify-center text-cocoa-deep/20 hover:text-burnt-caramel transition-colors">
                      <CreditCard size={18} />
                    </div>
                    <div className="size-10 rounded-xl bg-white/40 border border-gold-soft/20 flex items-center justify-center text-cocoa-deep/20 hover:text-burnt-caramel transition-colors">
                      <MapPin size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area: Data Archives */}
            <motion.div className="lg:col-span-9" variants={fadeUp}>
              <AnimatePresence mode="wait">
                {activeTab === 'archives' && (
                  <motion.div
                    key="archives"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between border-b border-gold-soft/20 pb-8">
                      <h3 className="text-4xl font-display font-black tracking-tight uppercase flex items-center gap-6">
                        Order <span className="text-burnt-caramel italic font-light">History</span>
                        <div className="size-2 rounded-full bg-burnt-caramel animate-ping" />
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-cocoa-deep/20">{orders.length} Orders Found</span>
                    </div>

                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-[300px] bg-white/40 rounded-[40px] animate-pulse" />
                        <div className="h-[300px] bg-white/40 rounded-[40px] animate-pulse" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="p-40 text-center rounded-[60px] bg-white/40 border border-dashed border-gold-soft/20 flex flex-col items-center gap-10 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-burnt-caramel/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full translate-y-1/2" />
                        <div className="size-32 rounded-[40px] bg-white/40 border border-gold-soft/20 flex items-center justify-center text-cocoa-deep/10 group-hover:text-burnt-caramel transition-all duration-700 relative z-10">
                          <ShoppingBag size={48} strokeWidth={1} />
                        </div>
                        <div className="space-y-4 relative z-10">
                          <p className="font-display text-4xl italic text-cocoa-deep/30">Your order list is empty.</p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-cocoa-deep/10">Start shopping to see your orders here.</p>
                        </div>
                        <button
                          onClick={() => navigate('/shop')}
                          className="h-16 px-12 bg-burnt-caramel text-white rounded-2xl font-mono font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 shadow-[0_0_30px_rgba(179,83,15,0.3)]"
                        >
                          SHOP NOW
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {orders.map((order, idx) => (
                          <motion.div
                            key={order._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white/40 backdrop-blur-3xl rounded-[40px] border border-gold-soft/20 p-10 hover:border-burnt-caramel/40 transition-all duration-700 relative overflow-hidden"
                          >
                            <div className="absolute -right-4 -top-4 text-[120px] font-display font-black text-cocoa-deep/[0.02] select-none pointer-events-none italic tracking-tighter">
                              {String(idx + 1).padStart(2, '0')}
                            </div>

                            <div className="space-y-10 relative z-10">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="font-mono text-[8px] uppercase text-cocoa-deep/40 tracking-[0.5em]">Order ID</p>
                                  <p className="font-mono text-[10px] text-cocoa-deep font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-xl text-[8px] font-mono font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-burnt-caramel/10 text-burnt-caramel' : 'bg-cocoa-deep/10 text-cocoa-deep/40'
                                  }`}>
                                  {order.status}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="text-4xl font-display text-cocoa-deep italic group-hover:translate-x-3 transition-transform duration-700">
                                  {order.items.length} <span className="text-cocoa-deep/30 not-italic font-black">Items Purchase</span>
                                </h4>
                                <div className="flex items-center gap-6 text-cocoa-deep/20">
                                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"><Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest"><MapPin size={12} /> {order.shippingAddress.city.toUpperCase()}</div>
                                </div>
                              </div>

                              <div className="flex items-end justify-between pt-6 border-t border-gold-soft/10">
                                <div className="space-y-1">
                                  <p className="font-mono text-[8px] uppercase text-cocoa-deep/40 tracking-[0.5em]">Total Bill</p>
                                  <p className="text-4xl font-display font-black text-burnt-caramel tabular-nums drop-shadow-[0_0_10px_rgba(179,83,15,0.2)]">₹{order.totalPrice.toFixed(0)}</p>
                                </div>
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="size-14 rounded-2xl bg-white/40 border border-gold-soft/20 flex items-center justify-center text-cocoa-deep hover:bg-burnt-caramel hover:text-white transition-all shadow-xl group-hover:rotate-45"
                                >
                                  <ChevronRight size={24} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                 {activeTab === 'security' && (
                   <motion.div
                     key="security"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="p-20 text-center space-y-8 bg-white/40 rounded-[40px] border border-gold-soft/20"
                   >
                     <div className="size-24 rounded-full bg-burnt-caramel/10 flex items-center justify-center text-burnt-caramel mx-auto animate-pulse">
                       <ShieldCheck size={40} />
                     </div>
                     <div className="space-y-4">
                       <h3 className="text-3xl font-display italic font-black uppercase">Security <span className="text-burnt-caramel font-light">Protected</span></h3>
                       <p className="font-mono text-[10px] text-cocoa-deep/30 uppercase tracking-[0.4em] max-w-sm mx-auto">Your account is secured with encryption for your safety.</p>
                     </div>
                     <button className="h-14 px-12 bg-white/40 border border-gold-soft/20 text-burnt-caramel rounded-2xl font-mono text-[10px] uppercase tracking-widest hover:bg-burnt-caramel hover:text-white transition-all">
                       CHANGE PASSWORD
                     </button>
                   </motion.div>
                 )}

                {activeTab === 'intelligence' && (
                  <motion.div
                    key="intelligence"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-20 text-center space-y-8 bg-white/40 rounded-[40px] border border-gold-soft/20"
                  >
                    <div className="size-24 rounded-full bg-burnt-caramel/10 flex items-center justify-center text-burnt-caramel mx-auto">
                      <Terminal size={40} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-display italic font-black uppercase">Service <span className="text-burnt-caramel font-light">Notifications</span></h3>
                      <p className="font-mono text-[10px] text-cocoa-deep/30 uppercase tracking-[0.4em] max-w-sm mx-auto">Latest updates and offers from British Chocolate Store will appear here.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.main>

      {/* Order Details Modal - Decrypted Shard */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-6 py-10 bg-cocoa-deep/10 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#050510]/90 border border-aurora-cyan/30 rounded-[48px] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-[0_0_100px_rgba(0,245,255,0.1)]"
            >
              {/* Modal Header */}
              <div className="p-10 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="space-y-1">
                  <p className="font-mono text-[8px] uppercase text-aurora-cyan tracking-[0.5em]">ITEM DETAILS</p>
                  <h2 className="text-3xl font-display font-black text-white italic">Order Summary</h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar" data-lenis-prevent>

                {/* Status & ID */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                    <p className="font-mono text-[8px] uppercase text-white/20 tracking-widest mb-2 flex items-center gap-2">
                      <Hash size={10} /> Order ID
                    </p>
                    <p className="font-mono text-xs text-white font-bold">{selectedOrder._id}</p>
                  </div>
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                    <p className="font-mono text-[8px] uppercase text-white/20 tracking-widest mb-2 flex items-center gap-2">
                      <ShieldCheck size={10} /> Delivery Status
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-aurora-cyan animate-pulse" />
                      <p className="font-mono text-xs text-aurora-cyan font-bold uppercase">{selectedOrder.status}</p>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-6">
                  <p className="font-mono text-[9px] uppercase text-white/20 tracking-[0.4em] flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    Ordered Items
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </p>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-aurora-cyan/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-xl bg-aurora-cyan/10 flex items-center justify-center text-aurora-cyan">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="font-display text-lg text-white group-hover:pl-2 transition-all">{item.name}</p>
                            <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-xl font-display font-black text-white/80 shrink-0">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Intel */}
                <div className="bg-gradient-to-br from-aurora-cyan/5 to-transparent rounded-[40px] p-8 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-aurora-cyan" size={18} />
                    <p className="font-mono text-[10px] uppercase text-white font-black tracking-widest">Delivery Address</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-display italic text-white/60">
                      {selectedOrder.shippingAddress.address}, <span className="text-white">{selectedOrder.shippingAddress.city}</span>
                    </p>
                    <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Pincode: {selectedOrder.shippingAddress.postalCode}</p>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-10 border-t border-white/10 px-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase text-white/20 tracking-[0.6em]">NET TOTAL</p>
                    <p className="text-5xl font-display font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">₹{selectedOrder.totalPrice}</p>
                  </div>
                  <div className="flex items-center gap-3 text-aurora-cyan bg-aurora-cyan/10 px-6 py-3 rounded-2xl border border-aurora-cyan/20">
                    <CheckCircle2 size={16} />
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest">Payment Secure</span>
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
