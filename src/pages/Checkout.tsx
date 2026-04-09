import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Ship, Lock, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { addToCart, decrementQuantity } from '../store/cartSlice';
import type { RootState, AppDispatch } from '../store';
import Header from '../components/Header';
import Logo from '../components/Logo';
import api from '@/utils/api';
import AuthModal from '../components/AuthModal';
import { fadeDown, fadeUp, stagger } from '@/utils/motion';

const Checkout = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const sectionViewport = { once: true, margin: '0px 0px -120px 0px' };

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

  interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill: { name: string; email: string; contact: string };
    theme: { color: string };
  }

  interface WindowWithRazorpay extends Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }

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
      const { data } = await api.post(`/orders/razorpay/order`, {
        items: items.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        receipt: `receipt_${Date.now()}`,
        shippingAddress: shippingData
      });
      const order = data.order;
      if (!order) {
        throw new Error('Failed to create Razorpay order');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Asian Chocolate Store',
        description: 'Heritage Registry Acquisition',
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: result } = await api.post(
              `/orders/razorpay/verify`,
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

      const rzp = new (window as unknown as WindowWithRazorpay).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Acquisition failed:', error);
      alert('Could not initiate liquidation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cocoa-deep text-gold-soft selection:bg-gold-soft selection:text-black relative overflow-hidden">

      {/* Heritage Grid Motif & Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#1A0F0D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Header setIsCartOpen={() => { }} />

      <motion.main
        className="max-w-[1400px] mx-auto px-6 lg:px-20 pt-48 relative z-10 pb-40"
        variants={stagger(0.2)}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-6 text-gold-soft/20 hover:text-gold-soft transition-all mb-20 uppercase text-[9px] tracking-[0.8em] font-black group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-3 transition-transform" /> Back_to_Registry
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-24 items-start">

          {/* Left Side: Inventory & Global Shipping Identification */}
          <div className="space-y-32">

            <motion.section className="space-y-12" variants={fadeDown}>
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gold-soft/10 pb-10 gap-6">
                <div className="space-y-4">
                  <span className="font-body text-[10px] uppercase font-black tracking-[0.6em] text-gold-soft/40">Section_01A</span>
                  <h1 className="text-5xl md:text-7xl font-display font-black leading-[0.8] tracking-tighter uppercase text-gold-soft">
                    Acquisition <span className="italic font-light text-gold-soft/20">Matrix</span>
                  </h1>
                </div>
                <Logo className="w-32 h-auto opacity-20 hidden md:block" variant="light" />
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
                      className="p-10 bg-black/40 backdrop-blur-3xl rounded-[48px] border border-gold-soft/10 flex flex-wrap lg:flex-nowrap items-center gap-10 group shadow-sm hover:shadow-2xl transition-all duration-700"
                    >
                      <div className="size-32 bg-black/40 rounded-[32px] overflow-hidden shrink-0 border border-gold-soft/10 p-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
                      </div>

                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="h-[1px] w-10 bg-gold-soft/20" />
                          <span className="font-body text-[9px] font-black text-gold-soft uppercase tracking-[0.4em]">{item.category || 'Limited Piece'}</span>
                        </div>
                        <h3 className="text-3xl font-display text-gold-soft italic leading-tight">{item.name}</h3>
                        <p className="font-mono text-[9px] text-gold-soft/20 uppercase tracking-[0.2em] font-black">ORIGIN_BATCH_{item.id.slice(-6).toUpperCase()}</p>
                      </div>

                      <div className="flex items-center gap-6 bg-black/40 p-2 rounded-[24px] border border-gold-soft/10 self-end lg:self-center">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="size-10 flex items-center justify-center hover:bg-gold-soft/10 rounded-xl transition-all text-gold-soft/30 hover:text-gold-soft shadow-sm active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-body font-black text-gold-soft text-sm">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="size-10 flex items-center justify-center hover:bg-gold-soft/10 rounded-xl transition-all text-gold-soft/30 hover:text-gold-soft shadow-sm active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right min-w-[120px] self-end lg:self-center">
                        <p className="text-4xl font-display font-black text-gold-soft tracking-tighter shadow-sm">₹{item.price * item.quantity}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.section>

            {/* Curatorial Registry Integration (Shipping) */}
            <motion.section
              className="p-16 md:p-24 bg-black/40 backdrop-blur-3xl rounded-[80px] border border-gold-soft/10 shadow-3xl space-y-20 relative overflow-hidden"
              variants={fadeUp}
              viewport={sectionViewport}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gold-soft/10" />

              <div className="flex flex-col md:flex-row items-center justify-between border-b border-gold-soft/10 pb-12 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="size-14 rounded-[20px] bg-gold-soft flex items-center justify-center text-black shadow-xl">
                      <Ship size={20} />
                    </div>
                    <h2 className="text-4xl font-display italic leading-none text-gold-soft">Curatorial <span className="text-gold-soft font-black not-italic tracking-tighter">Registry</span></h2>
                  </div>
                </div>
                <div className="flex items-center gap-6 opacity-40">
                  <ShieldCheck size={20} className="text-gold-soft" />
                  <span className="font-body text-[9px] font-black uppercase tracking-[0.6em] text-gold-soft">SECURE_EXTRACTION_PROTOCOL</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="col-span-2 space-y-6">
                  <span className="font-body text-[10px] font-black text-gold-soft/20 uppercase tracking-[0.8em] ml-4">Authorized Curator Identity</span>
                  <input
                    type="text"
                    value={shippingData.name}
                    onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                    placeholder="HARVEST_NAME"
                    className="w-full bg-transparent border-b-2 border-gold-soft/10 rounded-none p-8 pl-0 text-gold-soft focus:outline-none focus:border-gold-soft transition-all font-body text-xs font-black uppercase tracking-[0.4em]"
                  />
                </div>

                <div className="space-y-6">
                  <span className="font-body text-[10px] font-black text-gold-soft/20 uppercase tracking-[0.8em] ml-4">Digital Link</span>
                  <input
                    type="email"
                    value={shippingData.email}
                    onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                    placeholder="EMAIL_STATION"
                    className="w-full bg-transparent border-b-2 border-gold-soft/10 rounded-none p-8 pl-0 text-gold-soft focus:outline-none focus:border-gold-soft transition-all font-body text-xs font-black uppercase tracking-[0.4em]"
                  />
                </div>

                <div className="space-y-6">
                  <span className="font-body text-[10px] font-black text-gold-soft/20 uppercase tracking-[0.8em] ml-4">Voice Path</span>
                  <input
                    type="tel"
                    value={shippingData.phoneNumber}
                    onChange={(e) => setShippingData({ ...shippingData, phoneNumber: e.target.value })}
                    placeholder="+91_MOBILE_FREQ"
                    className="w-full bg-transparent border-b-2 border-gold-soft/10 rounded-none p-8 pl-0 text-gold-soft focus:outline-none focus:border-gold-soft transition-all font-body text-xs font-black uppercase tracking-[0.4em]"
                  />
                </div>

                <div className="col-span-2 space-y-6">
                  <span className="font-body text-[10px] font-black text-gold-soft/20 uppercase tracking-[0.8em] ml-4">Extraction Point Address</span>
                  <input
                    type="text"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    placeholder="UNIT_STREET_AREA_ESTATE"
                    className="w-full bg-transparent border-b-2 border-gold-soft/10 rounded-none p-8 pl-0 text-gold-soft focus:outline-none focus:border-gold-soft transition-all font-body text-xs font-black uppercase tracking-[0.4em]"
                  />
                </div>

                <div className="space-y-6">
                  <input
                    type="text"
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    placeholder="DISTRICT"
                    className="w-full bg-transparent border-b-2 border-gold-soft/10 rounded-none p-8 pl-0 text-gold-soft focus:outline-none focus:border-gold-soft transition-all font-body text-xs font-black uppercase tracking-[0.4em]"
                  />
                </div>

                <div className="space-y-6">
                  <input
                    type="text"
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    placeholder="PIN_CODE"
                    className="w-full bg-transparent border-b-2 border-gold-soft/10 rounded-none p-8 pl-0 text-gold-soft focus:outline-none focus:border-gold-soft transition-all font-body text-xs font-black uppercase tracking-[0.4em]"
                  />
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Side: High-End Heritage Liquidation */}
          <motion.div className="sticky top-40" variants={fadeUp}>
            <div className="p-16 bg-black/40 backdrop-blur-3xl rounded-[100px] text-gold-soft space-y-20 shadow-4xl relative overflow-hidden group border-8 border-gold-soft/5">
              {/* Internal Text Texture */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none font-display font-black text-[30vw] italic text-white -rotate-12 translate-y-1/2">ACS</div>

              <div className="space-y-6 border-b border-gold-soft/10 pb-12 text-center">
                <Logo className="w-48 h-auto mx-auto mb-8" variant="light" />
                <h2 className="text-4xl font-display italic">Acquisition <span className="text-gold-soft font-black not-italic">Liquidation</span></h2>
                <p className="font-body text-[10px] font-black uppercase tracking-[0.8em] text-gold-soft/30 italic">Registry_Verified_v09</p>
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

              <div className="space-y-6 pt-12 border-t border-gold-soft/10 text-center">
                <span className="font-body text-gold-soft/20 tracking-[0.8em] uppercase text-[11px] font-black">Authorized_Total</span>
                <div className="flex items-center justify-center">
                  <span className="text-8xl font-display font-black tracking-tighter shadow-sm">₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>
              <div className="space-y-10 pt-10">
                {user ? (
                  <button
                    disabled={loading || items.length === 0}
                    onClick={handleRazorpayPayment}
                    className="w-full h-24 bg-gold-soft hover:bg-gold-soft/80 text-black font-body font-black rounded-[40px] shadow-3xl flex items-center justify-center gap-10 transition-all transform group active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="uppercase tracking-[0.6em] text-[13px]">
                      {loading ? 'AUTHENTICATING...' : 'FINALIZE_ACQUISITION'}
                    </span>
                    {!loading && <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full h-24 bg-black/40 hover:bg-black/60 text-gold-soft font-body font-black rounded-[40px] flex items-center justify-center gap-10 transition-all border border-gold-soft/10 uppercase tracking-[0.4em] text-[12px] italic"
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
          </motion.div>
        </div>
      </motion.main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Checkout;
