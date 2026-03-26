import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, User as UserIcon, Mail, ShoppingBag, ShieldCheck, History, Globe, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import CartDrawer from '../components/CartDrawer';
import { OrderSkeleton } from '../components/Skeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UserProfile() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />
        
        <div className="space-y-12 max-w-md relative z-10">
           <Logo className="w-48 h-auto mx-auto opacity-20" variant="dark" />
           <div className="space-y-6">
              <h2 className="text-5xl font-display text-cocoa-deep italic font-black uppercase tracking-tighter">Authorized <span className="text-burnt-caramel font-light">Induction</span> Required.</h2>
              <p className="font-serif text-xl italic text-cocoa-deep/40 leading-relaxed px-10 border-l border-burnt-caramel/20 ml-10">Please identify yourself as a heritage curator to access the private acquisition archives.</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-cocoa-deep selection:bg-burnt-caramel selection:text-white relative overflow-x-hidden">
      
      {/* Heritage Grid Motif & Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#1A0F0D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={setIsCartOpen} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main className="pt-48 pb-40 px-6 lg:px-20 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-32">
          
          {/* Dashboard Header: Personalized Heritage Matrix */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-cocoa-deep/5 pb-12">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                 <div className="h-[2px] w-16 bg-burnt-caramel" />
                 <span className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-burnt-caramel/60">Curatorial_Dashboard_v04</span>
              </div>
              <h1 className="text-6xl md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter uppercase">
                 Bonjour, <br /> <span className="italic font-light text-cocoa-deep/20 pr-4">{user.name.split(' ')[0]}</span> <span className="text-botanical-green">Curator</span>
              </h1>
            </div>
            
            <div className="pb-4 space-y-6 text-right">
               <Logo className="w-40 h-auto opacity-10 ml-auto hidden md:block" variant="dark" />
               <div className="flex items-center gap-6 justify-end">
                  <div className="px-8 py-3 bg-botanical-green text-ivory-warm rounded-[20px] font-body text-[9px] font-black uppercase tracking-[0.5em] shadow-2xl transform hover:scale-105 transition-transform">Registry_Active</div>
                  <div className="size-14 rounded-full border border-cocoa-deep/5 flex items-center justify-center bg-white shadow-sm hover:rotate-180 transition-transform duration-700">
                     <History size={20} className="text-burnt-caramel/30" />
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Left Column: Curator Credentials Artifact */}
            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
              <div className="bg-white rounded-[80px] p-16 border border-cocoa-deep/[0.03] shadow-4xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }} />
                
                <h3 className="text-3xl font-display italic text-cocoa-deep mb-12 border-b border-cocoa-deep/5 pb-8">Personal <span className="text-burnt-caramel font-black not-italic tracking-tighter">Registry</span></h3>
                
                <div className="space-y-12">
                  <div className="flex items-start gap-8 group/item">
                    <div className="size-20 rounded-[28px] bg-[#FAF9F6] border border-cocoa-deep/5 flex items-center justify-center text-botanical-green shadow-sm group-hover/item:bg-botanical-green group-hover/item:text-white transition-all duration-700">
                       <UserIcon size={24} />
                    </div>
                    <div className="space-y-2">
                      <p className="font-body text-[9px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em] ml-1">Identity</p>
                      <p className="text-3xl font-display italic text-cocoa-deep leading-tight">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 group/item">
                    <div className="size-20 rounded-[28px] bg-[#FAF9F6] border border-cocoa-deep/5 flex items-center justify-center text-burnt-caramel shadow-sm group-hover/item:bg-burnt-caramel group-hover/item:text-white transition-all duration-700">
                       <Mail size={24} />
                    </div>
                    <div className="space-y-2">
                      <p className="font-body text-[9px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em] ml-1">Communique</p>
                      <p className="text-xl font-display italic text-cocoa-deep truncate max-w-[200px] border-b border-burnt-caramel/10 pb-1">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-20 pt-12 border-t border-cocoa-deep/5 flex flex-col gap-6">
                   <div className="flex items-center gap-4 opacity-20">
                      <ShieldCheck size={16} />
                      <span className="font-body text-[8px] font-black uppercase tracking-[0.4em]">Protocol_v09_Secured</span>
                   </div>
                   <div className="flex items-center gap-4 opacity-20">
                      <Globe size={16} />
                      <span className="font-body text-[8px] font-black uppercase tracking-[0.4em]">Asian_Estate_Access_L3</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Acquisition Archive Registry */}
            <div className="lg:col-span-8 space-y-16">
              <div className="flex items-center justify-between border-b border-cocoa-deep/5 pb-8">
                <div className="flex items-center gap-6">
                   <Zap size={20} className="text-burnt-caramel opacity-30" />
                   <h3 className="text-4xl font-display italic text-cocoa-deep">Acquisition <span className="text-burnt-caramel font-black not-italic tracking-tighter">Archives</span></h3>
                </div>
                <span className="font-body text-[10px] font-black uppercase tracking-[0.6em] text-cocoa-deep/20 italic">{orders.length} Batch_Logs</span>
              </div>

              {loading ? (
                <div className="space-y-10">
                  <OrderSkeleton />
                  <OrderSkeleton />
                  <OrderSkeleton />
                </div>
              ) : orders.length === 0 ? (
                <div className="p-40 text-center rounded-[100px] bg-white/40 border-2 border-dashed border-cocoa-deep/5 flex flex-col items-center gap-10 py-60 group">
                  <div className="size-32 rounded-full border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/10 group-hover:bg-ivory-warm group-hover:text-burnt-caramel transition-all duration-1000 shadow-sm relative overflow-hidden">
                     <ShoppingBag size={48} strokeWidth={1} />
                  </div>
                  <div className="space-y-6">
                    <p className="font-display text-4xl italic text-cocoa-deep/30 max-w-sm mx-auto">Your curatorial archive is currently vacant.</p>
                    <p className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-cocoa-deep/10">Extract artifacts to begin your heritage log.</p>
                  </div>
                  <button onClick={() => navigate('/shop')} className="h-20 px-16 bg-white border border-cocoa-deep/5 text-cocoa-deep rounded-[32px] font-body font-black text-[11px] uppercase tracking-[0.6em] hover:bg-burnt-caramel hover:text-white transition-all shadow-3xl transform active:scale-95 flex items-center gap-6">
                     Initiate_Harvest <ChevronRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {orders.map((order, idx) => (
                    <motion.div 
                      key={order._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      className="group bg-white rounded-[60px] border border-cocoa-deep/5 p-12 hover:shadow-4xl transition-all duration-700 relative overflow-hidden"
                    >
                       {/* High-End Archive Marker */}
                       <div className="absolute top-[-50px] right-[-30px] text-[20vw] font-display font-black text-cocoa-deep/[0.02] select-none pointer-events-none italic tracking-tighter">
                          {String(idx + 1).padStart(2, '0')}
                       </div>

                       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 relative z-10">
                          <div className="space-y-10">
                             <div className="flex flex-wrap items-center gap-8">
                                <span className={`h-10 px-8 flex items-center bg-botanical-green/5 text-botanical-green border border-botanical-green/10 rounded-full font-body text-[10px] font-black uppercase tracking-[0.4em] ${order.status !== 'Delivered' ? 'text-burnt-caramel bg-burnt-caramel/5 border-burnt-caramel/10' : ''}`}>
                                  {order.status}
                                </span>
                                <div className="h-[1px] w-12 bg-cocoa-deep/10" />
                                <p className="font-mono text-[10px] text-cocoa-deep/30 uppercase tracking-tighter font-bold">BATCH_LOG_{order._id.slice(-12).toUpperCase()}</p>
                             </div>
                             
                             <div className="space-y-4">
                                <h4 className="text-4xl md:text-5xl font-display text-cocoa-deep italic leading-none group-hover:pl-6 transition-all duration-1000">
                                   {order.items.length} Curated <span className="font-black text-botanical-green not-italic">Artifacts</span>
                                </h4>
                                <p className="font-serif italic text-xl text-cocoa-deep/40 pl-6 border-l border-burnt-caramel/10">Extraction completed from estate HQ</p>
                             </div>
                             
                             <div className="flex flex-wrap items-center gap-12 pt-4">
                                <span className="flex items-center gap-4 font-body text-[10px] font-black uppercase tracking-[0.5em] text-cocoa-deep/20"><Calendar size={16} className="text-burnt-caramel/40" /> {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                <span className="flex items-center gap-4 font-body text-[10px] font-black uppercase tracking-[0.5em] text-cocoa-deep/20"><MapPin size={16} className="text-botanical-green/40" /> {order.shippingAddress.city.toUpperCase()}</span>
                             </div>
                          </div>
                          
                          <div className="flex items-end lg:items-center justify-between lg:justify-end gap-16 lg:text-right border-t lg:border-t-0 lg:border-l border-cocoa-deep/5 pt-12 lg:pt-0 lg:pl-16">
                             <div className="space-y-3">
                                <p className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.8em] italic">Net_Valuation</p>
                                <p className="text-5xl md:text-7xl font-display font-black text-cocoa-deep tracking-tighter tabular-nums shadow-sm">₹{order.totalPrice.toFixed(0)}</p>
                             </div>
                             <div className="size-24 rounded-[40px] bg-[#FAF9F6] border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/10 group-hover:bg-burnt-caramel group-hover:text-white transition-all shadow-3xl transform active:scale-95 cursor-pointer">
                                <ChevronRight size={32} className="group-hover:translate-x-3 transition-transform" />
                             </div>
                          </div>
                       </div>

                       {/* Artifact Breakdown: Reveal on Hover */}
                       <div className="mt-16 pt-12 border-t border-cocoa-deep/5 grid grid-cols-2 md:grid-cols-4 gap-12 transition-all duration-1000 max-h-0 group-hover:max-h-[300px] overflow-hidden opacity-0 group-hover:opacity-100">
                          {order.items.slice(0, 4).map((item: any, i: number) => (
                             <div key={i} className="space-y-3 relative group/artifact">
                                <div className="absolute -left-6 top-1 w-[1px] h-10 bg-burnt-caramel/20" />
                                <p className="font-body text-[10px] font-black text-cocoa-deep uppercase tracking-[0.4em] truncate italic">{item.name}</p>
                                <div className="flex items-center justify-between">
                                   <p className="font-mono text-[9px] text-cocoa-deep/40 font-bold uppercase">Qty: {item.quantity}</p>
                                   <p className="font-mono text-[9px] text-botanical-green font-black">₹{item.price}</p>
                                </div>
                                <div className="w-0 h-[1px] bg-burnt-caramel/40 group-hover/artifact:w-full transition-all duration-700" />
                             </div>
                          ))}
                       </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
