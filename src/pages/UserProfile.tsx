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
      <div className="min-h-screen bg-parchment-base flex items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[30%] bg-gold-soft/10 blur-[120px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-md relative z-10"
        >
          <Logo variant="dark" className="scale-110 mx-auto opacity-30" />
          <div className="space-y-4">
            <h2 className="text-4xl font-display text-cocoa-deep font-black italic">
              Authentication Required
            </h2>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-burnt-caramel/40 leading-relaxed px-10">
              Please enter the vault to view your acquisition history.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="h-12 px-10 bg-cocoa-deep text-white rounded-xl font-body text-[9px] uppercase tracking-widest hover:bg-burnt-caramel transition-all shadow-lg"
          >
            Return to Store
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-base text-cocoa-deep selection:bg-burnt-caramel selection:text-white relative overflow-x-hidden flex flex-col">
      {/* Heritage Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-gold-soft/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[30%] bg-burnt-caramel/5 blur-[120px] rounded-full" />
      </div>

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <motion.main
        className="flex-grow px-6 lg:px-12 pt-40 pb-20 relative z-10"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-7xl mx-auto">

          {/* Heritage Dashboard Header */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 items-end">
            <motion.div className="lg:col-span-3 space-y-4" variants={fadeUp}>
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-10 bg-burnt-caramel/30" />
                <span className="font-body text-[8px] font-black uppercase tracking-[0.5em] text-burnt-caramel">Account Profile</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black leading-none text-cocoa-deep italic">
                Welcome, {user.name.split(' ')[0]}
              </h1>
            </motion.div>

            <motion.div className="flex flex-col gap-4" variants={fadeUp}>
              <div className="bg-white/40 backdrop-blur-3xl border border-gold-soft/10 rounded-2xl p-5 flex items-center justify-between group">
                <div className="space-y-0.5">
                  <p className="font-body text-[7px] uppercase text-cocoa-deep/40 tracking-widest font-black">Authorized Level</p>
                  <p className="font-body text-[10px] text-burnt-caramel font-black tracking-widest">LEGACY MEMBER</p>
                </div>
                <div className="size-8 rounded-full bg-burnt-caramel/10 flex items-center justify-center text-burnt-caramel">
                  <ShieldCheck size={16} />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full h-12 bg-white/30 border border-gold-soft/10 rounded-xl flex items-center justify-center gap-3 hover:bg-red-500/5 hover:border-red-500/20 text-cocoa-deep/40 hover:text-red-500 transition-all font-body text-[8px] font-black uppercase tracking-widest group"
              >
                Log Out <LogOut size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

            {/* Sidebar Navigation - Glass Tabs */}
            <motion.div className="lg:col-span-3 lg:sticky lg:top-32 space-y-6" variants={fadeUp}>
              <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] p-5 border border-gold-soft/10 space-y-2 shadow-xl">
                {[
                  { id: 'registry', icon: History, label: 'ORDER HISTORY' },
                  { id: 'access', icon: ShieldCheck, label: 'SECURITY SETTINGS' },
                  { id: 'notices', icon: Mail, label: 'NOTIFICATIONS' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full h-14 rounded-2xl flex items-center gap-4 px-5 transition-all duration-500 group relative overflow-hidden ${activeTab === tab.id ? 'bg-cocoa-deep text-white shadow-lg' : 'hover:bg-white/40 text-cocoa-deep/40 hover:text-cocoa-deep'
                      }`}
                  >
                    <tab.icon size={16} className={activeTab === tab.id ? '' : 'group-hover:rotate-12 transition-transform'} />
                    <span className="font-body text-[9px] font-black uppercase tracking-widest text-left">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Account Identity Shard */}
              <div className="bg-gradient-to-br from-burnt-caramel/5 to-transparent backdrop-blur-2xl rounded-[32px] p-8 border border-gold-soft/10 relative overflow-hidden">
                <p className="font-body text-[7px] uppercase tracking-[0.4em] text-burnt-caramel font-black mb-4">Account Details</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-display italic text-cocoa-deep font-black">{user.name}</p>
                    <p className="font-body text-[8px] text-cocoa-deep/30 uppercase tracking-widest mt-1">{user.email}</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <div className="size-9 rounded-xl bg-white/50 border border-gold-soft/10 flex items-center justify-center text-cocoa-deep/20">
                      <CreditCard size={16} />
                    </div>
                    <div className="size-9 rounded-xl bg-white/50 border border-gold-soft/10 flex items-center justify-center text-cocoa-deep/20">
                      <MapPin size={16} />
                    </div>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between border-b border-gold-soft/10 pb-6">
                      <h3 className="text-3xl font-display font-black tracking-tight uppercase text-cocoa-deep">
                        Order <span className="text-burnt-caramel italic font-light">History</span>
                      </h3>
                      <span className="font-body text-[8px] uppercase tracking-widest text-cocoa-deep/30 font-black">{orders.length} Entries Recorded</span>
                    </div>

                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-64 bg-white/40 rounded-[32px] animate-pulse border border-gold-soft/10" />
                        <div className="h-64 bg-white/40 rounded-[32px] animate-pulse border border-gold-soft/10" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="p-20 text-center rounded-[48px] bg-white/30 border border-gold-soft/10 flex flex-col items-center gap-8 shadow-sm">
                        <div className="size-20 rounded-full bg-gold-soft/5 flex items-center justify-center text-gold-soft/20">
                          <ShoppingBag size={32} />
                        </div>
                        <div className="space-y-2">
                          <p className="font-display text-3xl italic text-cocoa-deep/40">No orders found.</p>
                          <p className="font-body text-[8px] uppercase tracking-[0.4em] text-cocoa-deep/20">Explore our collection to place your first order.</p>
                        </div>
                        <button
                          onClick={() => navigate('/shop')}
                          className="h-12 px-10 bg-cocoa-deep text-white rounded-xl font-body font-black text-[9px] uppercase tracking-widest hover:bg-burnt-caramel transition-all shadow-lg"
                        >
                          Explore Collection
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {orders.map((order, idx) => (
                          <motion.div
                            key={order._id}
                            className="group bg-white/40 backdrop-blur-3xl rounded-[40px] border border-gold-soft/10 p-10 hover:border-burnt-caramel/30 transition-all duration-700 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1"
                          >
                            {/* Paper Grain Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                            {/* Archive Index Watermark */}
                            <div className="absolute -right-4 -top-4 text-[140px] font-display font-black text-cocoa-deep/[0.03] select-none pointer-events-none italic tracking-tighter group-hover:text-burnt-caramel/[0.05] transition-colors duration-700">
                              {String(idx + 1).padStart(2, '0')}
                            </div>

                            <div className="space-y-10 relative z-10">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="font-body text-[8px] uppercase text-cocoa-deep/30 tracking-[0.4em] font-black">Order ID</p>
                                  <p className="font-body text-xs text-cocoa-deep font-black tracking-tight">#{order._id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[8px] font-body font-black uppercase tracking-[0.2em] shadow-inner ${order.status === 'Delivered'
                                  ? 'bg-burnt-caramel/10 text-burnt-caramel border border-burnt-caramel/10'
                                  : 'bg-cocoa-deep/5 text-cocoa-deep/30 border border-gold-soft/10'
                                  }`}>
                                  {order.status}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <div className="h-[1px] w-8 bg-burnt-caramel/20" />
                                  <h4 className="text-4xl font-display text-cocoa-deep italic leading-none">
                                    {order.items.length} <span className="text-cocoa-deep/20 not-italic font-black text-[10px] uppercase tracking-[0.4em] ml-2">Items Purchased</span>
                                  </h4>
                                </div>

                                <div className="flex items-center gap-6 text-cocoa-deep/40 pl-12">
                                  <div className="flex items-center gap-2 font-body text-[9px] uppercase tracking-widest font-black">
                                    <Calendar size={12} className="text-burnt-caramel/40" />
                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </div>
                                  <div className="flex items-center gap-2 font-body text-[9px] uppercase tracking-widest font-black">
                                    <MapPin size={12} className="text-burnt-caramel/40" />
                                    {order.shippingAddress.city.toUpperCase()}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-end justify-between pt-8 border-t border-gold-soft/10">
                                <div className="space-y-1">
                                  <p className="font-body text-[8px] uppercase text-cocoa-deep/30 tracking-[0.5em] font-black">Total Price</p>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-body font-black text-burnt-caramel/40">₹</span>
                                    <p className="text-4xl font-body font-black text-cocoa-deep tabular-nums tracking-tighter">
                                      {order.totalPrice.toLocaleString('en-IN')}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="size-14 rounded-2xl bg-white/60 border border-gold-soft/10 flex items-center justify-center text-cocoa-deep hover:bg-cocoa-deep hover:text-white transition-all shadow-lg hover:shadow-cocoa-deep/20 group-hover:translate-x-1"
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

                {activeTab === 'access' && (
                  <motion.div
                    key="access"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-16 text-center space-y-6 bg-white/40 rounded-[32px] border border-gold-soft/10 shadow-sm"
                  >
                    <div className="size-16 rounded-full bg-burnt-caramel/5 flex items-center justify-center text-burnt-caramel mx-auto">
                      <ShieldCheck size={28} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display italic font-black uppercase text-cocoa-deep">Security <span className="text-burnt-caramel font-light">Settings</span></h3>
                      <p className="font-body text-[9px] text-cocoa-deep/30 uppercase tracking-widest max-w-xs mx-auto font-black leading-loose">Your account credentials are secured with end-to-end encryption.</p>
                    </div>
                    <button className="h-12 px-10 bg-white/50 border border-gold-soft/10 text-cocoa-deep rounded-xl font-body text-[8px] font-black uppercase tracking-widest hover:bg-cocoa-deep hover:text-white transition-all shadow-sm">
                      Update Password
                    </button>
                  </motion.div>
                )}

                {activeTab === 'notices' && (
                  <motion.div
                    key="notices"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-16 text-center space-y-6 bg-white/40 rounded-[32px] border border-gold-soft/10 shadow-sm"
                  >
                    <div className="size-16 rounded-full bg-gold-soft/5 flex items-center justify-center text-gold-soft mx-auto">
                      <Mail size={28} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display italic font-black uppercase text-cocoa-deep">Store <span className="text-burnt-caramel font-light">Notifications</span></h3>
                      <p className="font-body text-[9px] text-cocoa-deep/30 uppercase tracking-widest max-w-xs mx-auto font-black leading-loose">Updates and announcements from British Chocolate Store will appear here.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.main>

      {/* Order Details Modal - Refined Heritage Shard */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center px-6 py-10 bg-cocoa-deep/20 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-parchment-base border border-gold-soft/20 rounded-[40px] w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl"
            >
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-50" />
              </div>

              {/* Modal Header */}
              <div className="p-8 border-b border-gold-soft/10 flex items-center justify-between shrink-0 relative z-10">
                <div className="space-y-0.5">
                  <p className="font-body text-[7px] uppercase text-burnt-caramel tracking-[0.4em] font-black">Order Information</p>
                  <h2 className="text-3xl font-display font-black text-cocoa-deep italic">Order Summary</h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="size-10 rounded-xl bg-white/40 border border-gold-soft/10 flex items-center justify-center text-cocoa-deep/30 hover:text-cocoa-deep transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar relative z-10">

                {/* ID & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/40 rounded-2xl p-4 border border-gold-soft/10">
                    <p className="font-body text-[7px] uppercase text-cocoa-deep/20 tracking-widest mb-1 font-black">Order Reference</p>
                    <p className="font-body text-[9px] text-cocoa-deep font-black tracking-tight">#{selectedOrder._id}</p>
                  </div>
                  <div className="bg-white/40 rounded-2xl p-4 border border-gold-soft/10">
                    <p className="font-body text-[7px] uppercase text-cocoa-deep/20 tracking-widest mb-1 font-black">Current Status</p>
                    <div className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-burnt-caramel animate-pulse" />
                      <p className="font-body text-[9px] text-burnt-caramel font-black uppercase tracking-widest">{selectedOrder.status}</p>
                    </div>
                  </div>
                </div>

                {/* Artifacts List */}
                <div className="space-y-4">
                  <p className="font-body text-[8px] uppercase text-cocoa-deep/20 tracking-[0.3em] font-black text-center border-b border-gold-soft/5 pb-2">Ordered Items</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/30 rounded-xl border border-gold-soft/5 group">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-gold-soft/5 flex items-center justify-center text-gold-soft/40">
                            <Package size={16} />
                          </div>
                          <div>
                            <p className="font-display text-base text-cocoa-deep italic font-black">{item.name}</p>
                            <p className="font-body text-[8px] text-cocoa-deep/20 uppercase tracking-widest font-black">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-lg font-body font-black text-cocoa-deep/80 tabular-nums">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="bg-white/40 rounded-[24px] p-6 border border-gold-soft/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-burnt-caramel" size={14} />
                    <p className="font-body text-[8px] uppercase text-cocoa-deep font-black tracking-widest">Delivery Destination</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-display italic text-cocoa-deep/70">
                      {selectedOrder.shippingAddress.address}, <span className="text-cocoa-deep font-black not-italic">{selectedOrder.shippingAddress.city}</span>
                    </p>
                    <p className="font-body text-[8px] text-cocoa-deep/20 uppercase tracking-widest font-black">Postal Code: {selectedOrder.shippingAddress.postalCode}</p>
                  </div>
                </div>

                {/* Net Final */}
                <div className="flex items-center justify-between py-6 border-t border-gold-soft/10">
                  <div className="space-y-0.5">
                    <p className="font-body text-[8px] uppercase text-cocoa-deep/20 tracking-[0.5em] font-black">Total Amount Paid</p>
                    <p className="text-4xl font-body font-black text-cocoa-deep tabular-nums tracking-tighter">₹{selectedOrder.totalPrice.toLocaleString('en-IN')}</p>
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
