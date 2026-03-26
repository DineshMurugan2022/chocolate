import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Ship, Lock, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { addToCart, decrementQuantity } from '../store/cartSlice';
import type { RootState, AppDispatch } from '../store';
import Header from '../components/Header';
import Logo from '../components/Logo';
import axios from 'axios';
import AuthModal from '../components/AuthModal';

const Checkout = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const grandTotal = totalPrice;

  const handleRazorpayPayment = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!shippingData.address || !shippingData.phoneNumber) {
      alert('Please fill in all curatorial details');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data: order } = await axios.post(`${apiUrl}/orders/razorpay/order`, {
        items: items.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        receipt: `receipt_${Date.now()}`
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: 'Asian Chocolate Store',
        description: 'Heritage Registry Acquisition',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                user: user._id,
                items: items.map(item => ({
                  product: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity
                })),
                totalPrice: grandTotal,
                shippingAddress: shippingData
              }
            };

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const { data: result } = await axios.post(
              `${apiUrl}/orders/razorpay/verify`, 
              verificationData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (result.status === 'success') {
              navigate('/order-success');
            }
          } catch (err) {
            console.error('Liquidation failed:', err);
            alert('Verification failed. Contact the Heritage Registry.');
          }
        },
        prefill: {
          name: shippingData.name,
          email: shippingData.email,
          contact: shippingData.phoneNumber
        },
        theme: {
          color: '#1A0F0D'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Acquisition failed:', error);
      alert('Could not initiate liquidation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-cocoa-deep selection:bg-burnt-caramel selection:text-white relative overflow-hidden">
      
      {/* Heritage Grid Motif & Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#1A0F0D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={() => {}} />
      
      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 pt-48 relative z-10 pb-40">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-6 text-cocoa-deep/20 hover:text-burnt-caramel transition-all mb-20 uppercase text-[9px] tracking-[0.8em] font-black group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-3 transition-transform" /> Back_to_Registry
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-24 items-start">
          
          {/* Left Side: Inventory & Global Shipping Identification */}
          <div className="space-y-32">
            
            <section className="space-y-12">
               <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-cocoa-deep/5 pb-10 gap-6">
                  <div className="space-y-4">
                     <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-burnt-caramel opacity-40">Section_01A</span>
                     <h1 className="text-5xl md:text-7xl font-display font-black leading-[0.8] tracking-tighter uppercase">
                        Acquisition <span className="italic font-light text-cocoa-deep/20">Matrix</span>
                     </h1>
                  </div>
                  <Logo className="w-32 h-auto opacity-20 hidden md:block" variant="dark" />
               </div>
              
              <div className="space-y-8">
                {items.length === 0 ? (
                  <div className="p-24 text-center bg-white/40 backdrop-blur-3xl rounded-[60px] border border-dashed border-cocoa-deep/10 py-40">
                    <p className="font-serif italic text-3xl text-cocoa-deep/20">No artifacts selected in current batch.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      className="p-10 bg-white rounded-[48px] border border-cocoa-deep/[0.03] flex flex-wrap lg:flex-nowrap items-center gap-10 group shadow-sm hover:shadow-2xl transition-all duration-700"
                    >
                      <div className="size-32 bg-ivory-warm rounded-[32px] overflow-hidden shrink-0 border border-cocoa-deep/5 p-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-4">
                           <div className="h-[1px] w-10 bg-burnt-caramel/20" />
                           <span className="font-body text-[9px] font-black text-burnt-caramel uppercase tracking-[0.4em]">{item.category || 'Limited Piece'}</span>
                        </div>
                        <h3 className="text-3xl font-display text-cocoa-deep italic leading-tight">{item.name}</h3>
                        <p className="font-mono text-[9px] text-cocoa-deep/20 uppercase tracking-[0.2em] font-black">ORIGIN_BATCH_{item.id.slice(-6).toUpperCase()}</p>
                      </div>

                      <div className="flex items-center gap-6 bg-[#FAF9F6] p-2 rounded-[24px] border border-cocoa-deep/5 self-end lg:self-center">
                        <button 
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="size-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-cocoa-deep/30 hover:text-burnt-caramel shadow-sm active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-body font-black text-cocoa-deep text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(addToCart(item))}
                          className="size-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-cocoa-deep/30 hover:text-burnt-caramel shadow-sm active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right min-w-[120px] self-end lg:self-center">
                        <p className="text-4xl font-display font-black text-cocoa-deep tracking-tighter">₹{item.price * item.quantity}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </section>

            {/* Curatorial Registry Integration (Shipping) */}
            <section className="p-16 md:p-24 bg-white/40 backdrop-blur-3xl rounded-[80px] border border-white shadow-3xl space-y-20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-burnt-caramel/10" />
               
               <div className="flex flex-col md:flex-row items-center justify-between border-b border-cocoa-deep/5 pb-12 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="size-14 rounded-[20px] bg-botanical-green flex items-center justify-center text-ivory-warm shadow-xl">
                      <Ship size={20} />
                    </div>
                    <h2 className="text-4xl font-display italic leading-none">Curatorial <span className="text-burnt-caramel font-black not-italic tracking-tighter">Registry</span></h2>
                  </div>
                </div>
                <div className="flex items-center gap-6 opacity-40">
                   <ShieldCheck size={20} />
                   <span className="font-body text-[9px] font-black uppercase tracking-[0.6em]">SECURE_EXTRACTION_PROTOCOL</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="col-span-2 space-y-6">
                  <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.8em] ml-4">Authorized Curator Identity</span>
                  <input 
                    type="text" 
                    value={shippingData.name}
                    onChange={(e) => setShippingData({...shippingData, name: e.target.value})}
                    placeholder="HARVEST_NAME" 
                    className="w-full bg-white border-b-2 border-cocoa-deep/5 rounded-none p-8 pl-0 text-cocoa-deep focus:outline-none focus:border-burnt-caramel transition-all font-body text-xs font-black uppercase tracking-[0.4em] bg-transparent" 
                  />
                </div>
                
                <div className="space-y-6">
                   <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.8em] ml-4">Digital Link</span>
                  <input 
                    type="email" 
                    value={shippingData.email}
                    onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                    placeholder="EMAIL_STATION" 
                    className="w-full bg-white border-b-2 border-cocoa-deep/5 rounded-none p-8 pl-0 text-cocoa-deep focus:outline-none focus:border-burnt-caramel transition-all font-body text-xs font-black uppercase tracking-[0.4em] bg-transparent" 
                  />
                </div>

                <div className="space-y-6">
                   <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.8em] ml-4">Voice Path</span>
                  <input 
                    type="tel" 
                    value={shippingData.phoneNumber}
                    onChange={(e) => setShippingData({...shippingData, phoneNumber: e.target.value})}
                    placeholder="+91_MOBILE_FREQ" 
                    className="w-full bg-white border-b-2 border-cocoa-deep/5 rounded-none p-8 pl-0 text-cocoa-deep focus:outline-none focus:border-burnt-caramel transition-all font-body text-xs font-black uppercase tracking-[0.4em] bg-transparent" 
                  />
                </div>

                <div className="col-span-2 space-y-6">
                  <span className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.8em] ml-4">Extraction Point Address</span>
                  <input 
                    type="text" 
                    value={shippingData.address}
                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                    placeholder="UNIT_STREET_AREA_ESTATE" 
                    className="w-full bg-white border-b-2 border-cocoa-deep/5 rounded-none p-8 pl-0 text-cocoa-deep focus:outline-none focus:border-burnt-caramel transition-all font-body text-xs font-black uppercase tracking-[0.4em] bg-transparent" 
                  />
                </div>

                <div className="space-y-6">
                  <input 
                    type="text" 
                    value={shippingData.city}
                    onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                    placeholder="DISTRICT" 
                    className="w-full bg-white border-b-2 border-cocoa-deep/5 rounded-none p-8 pl-0 text-cocoa-deep focus:outline-none focus:border-burnt-caramel transition-all font-body text-xs font-black uppercase tracking-[0.4em] bg-transparent" 
                  />
                </div>

                <div className="space-y-6">
                  <input 
                    type="text" 
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                    placeholder="PIN_CODE" 
                    className="w-full bg-white border-b-2 border-cocoa-deep/5 rounded-none p-8 pl-0 text-cocoa-deep focus:outline-none focus:border-burnt-caramel transition-all font-body text-xs font-black uppercase tracking-[0.4em] bg-transparent" 
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Side: High-End Heritage Liquidation */}
          <div className="sticky top-40">
            <div className="p-16 bg-botanical-green rounded-[100px] text-ivory-warm space-y-20 shadow-4xl relative overflow-hidden group border-8 border-white/5">
               {/* Internal Text Texture */}
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none font-display font-black text-[30vw] italic text-white -rotate-12 translate-y-1/2">ACS</div>
               
              <div className="space-y-6 border-b border-white/10 pb-12 text-center">
                 <Logo className="w-48 h-auto mx-auto mb-8" variant="light" />
                 <h2 className="text-4xl font-display italic">Acquisition <span className="text-burnt-caramel font-black not-italic">Liquidation</span></h2>
                 <p className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-white/30 italic">Registry_Verified_v09</p>
              </div>
              
              <div className="space-y-12">
                <div className="flex justify-between items-center px-4">
                  <span className="font-body text-white/20 tracking-[0.4em] uppercase text-[10px] font-black italic">Net Batch Valuation</span>
                  <span className="font-display font-black text-3xl tracking-tighter">₹{totalPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center px-4">
                  <span className="font-body text-white/20 tracking-[0.4em] uppercase text-[10px] font-black italic">Matrix Logistics</span>
                  <span className="text-burnt-caramel font-black uppercase tracking-[0.4em] text-[11px] italic">Complimentary</span>
                </div>
              </div>

              <div className="space-y-6 pt-12 border-t border-white/10 text-center">
                 <span className="font-body text-white/20 tracking-[0.8em] uppercase text-[11px] font-black">Authorized_Total</span>
                 <div className="flex items-center justify-center">
                    <span className="text-8xl font-display font-black tracking-tighter shadow-sm">₹{grandTotal.toFixed(0)}</span>
                 </div>
              </div>

              <div className="space-y-10 pt-10">
                {user ? (
                  <button 
                    disabled={loading || items.length === 0}
                    onClick={handleRazorpayPayment}
                    className="w-full h-24 bg-ivory-warm hover:bg-burnt-caramel text-botanical-green hover:text-white font-body font-black rounded-[40px] shadow-3xl flex items-center justify-center gap-10 transition-all transform group active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="uppercase tracking-[0.6em] text-[13px]">
                       {loading ? 'AUTHENTICATING...' : 'FINALIZE_ACQUISITION'}
                    </span>
                    {!loading && <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />}
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full h-24 bg-white/5 hover:bg-white/10 text-ivory-warm font-body font-black rounded-[40px] flex items-center justify-center gap-10 transition-all border border-white/10 uppercase tracking-[0.4em] text-[12px] italic"
                  >
                    Identify as Curator to Proceed <Lock size={20} />
                  </button>
                )}
                
                <div className="flex items-center justify-center gap-6 opacity-30">
                   <ShieldCheck size={20} />
                   <p className="text-[10px] font-body font-black uppercase tracking-[0.5em] italic">
                      Encrypted Portfolio Protocol_RSA
                   </p>
                </div>
              </div>
            </div>
            
            {/* Payment Verification Partners */}
            <div className="mt-16 flex items-center justify-center gap-12 opacity-10 filter grayscale brightness-200">
               <img src="https://razorpay.com/assets/razorpay-glyph-white.svg" alt="" className="h-4" />
               <div className="h-4 w-[1px] bg-white" />
               <span className="font-body text-[9px] font-black uppercase tracking-widest">VISA_LEGACY</span>
               <div className="h-4 w-[1px] bg-white" />
               <span className="font-body text-[9px] font-black uppercase tracking-widest">MATRIX_SECURE</span>
            </div>
          </div>
        </div>
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Checkout;
