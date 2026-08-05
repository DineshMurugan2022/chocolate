import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Truck, ShieldCheck, Tag, Info, ShoppingCart } from 'lucide-react';
import type { RootState, AppDispatch } from '@/store';
import { clearCart } from '@/store/cartSlice';
import api from '@/utils/api';
import Logo from '@/components/Logo';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!shippingData.name || !shippingData.phoneNumber || !shippingData.address || !shippingData.city || !shippingData.postalCode || !shippingData.state) {
      alert('Please fill all required shipping details.');
      return;
    }

    if (typeof (window as any).Razorpay === 'undefined') {
      alert('Razorpay SDK failed to load. Please refresh the page or check your internet connection.');
      return;
    }

    setIsProcessing(true);
    try {
      // The backend expects shippingAddress as an object and items to have product ID and quantity
      const orderResponse = await api.post('/orders/razorpay/order', {
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          name: item.name
        })),
        shippingAddress: {
          name: shippingData.name,
          email: shippingData.email || user?.email || 'customer@example.com',
          phoneNumber: shippingData.phoneNumber,
          address: `${shippingData.address}${shippingData.addressLine2 ? ', ' + shippingData.addressLine2 : ''}, ${shippingData.state}`,
          city: shippingData.city,
          postalCode: shippingData.postalCode
        }
      });

      const razorpayOrderId = orderResponse.data.razorpayOrderId || orderResponse.data.order?.id;
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayOrderId) {
        alert('Failed to initialize Razorpay order.');
        setIsProcessing(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: Math.round(totalPrice * 100),
        currency: "INR",
        name: "British Chocolate",
        description: "Artisan Selection",
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            await api.post('/orders/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderResponse.data.orderId
            });
            dispatch(clearCart());
            navigate('/order-success', { state: { orderId: orderResponse.data.orderId } });
          } catch (error) {
            console.error("Verification failed", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: shippingData.name,
          email: shippingData.email,
          contact: shippingData.phoneNumber
        },
        theme: {
          color: "#357960"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Order creation failed", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex flex-col items-center justify-center p-6 text-center">
        <ShoppingCart size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#357960] text-white px-8 py-3 rounded-xl font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen bg-parchment-base py-4 md:py-8 px-4 md:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[30%] bg-gold-soft/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[30%] bg-burnt-caramel/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col h-full lg:max-h-[90vh]">
        {/* Header Section - More compact */}
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div className="flex flex-col gap-2">
             <button
               onClick={() => navigate(-1)}
               className="group flex items-center gap-2 text-[8px] font-body font-black uppercase tracking-[0.4em] text-burnt-caramel hover:text-cocoa-deep transition-all duration-500"
             >
               <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
               Registry
             </button>
             <h1 className="text-3xl md:text-4xl font-display italic font-black text-cocoa-deep leading-none">Procurement Terminal</h1>
          </div>
          <div className="opacity-40">
            <Logo variant="dark" showText={false} className="scale-100" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch overflow-hidden flex-1">
          
          {/* Left Column: Shipping Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-gold-soft/10 p-6 md:p-10 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-burnt-caramel" />
                  <h2 className="text-xl font-display italic font-black text-cocoa-deep">Logistics</h2>
                </div>
                <p className="text-[8px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel/40">Destination Authorization</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[8px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Authorized Personnel *</label>
                  <input
                    type="text"
                    required
                    value={shippingData.name}
                    onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full h-11 bg-white/50 border border-gold-soft/10 rounded-xl px-4 text-xs font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[8px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Secure Link (Phone) *</label>
                  <input
                    type="tel"
                    required
                    value={shippingData.phoneNumber}
                    onChange={(e) => setShippingData({ ...shippingData, phoneNumber: e.target.value })}
                    placeholder="+91"
                    className="w-full h-11 bg-white/50 border border-gold-soft/10 rounded-xl px-4 text-xs font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[8px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Primary Coordinates *</label>
                  <input
                    type="text"
                    required
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    placeholder="Address details"
                    className="w-full h-11 bg-white/50 border border-gold-soft/10 rounded-xl px-4 text-xs font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[8px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">City *</label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    placeholder="City"
                    className="w-full h-11 bg-white/50 border border-gold-soft/10 rounded-xl px-4 text-xs font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.state}
                      onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                      className="w-full h-11 bg-white/50 border border-gold-soft/10 rounded-xl px-4 text-xs font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Postal *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.postalCode}
                      onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                      className="w-full h-11 bg-white/50 border border-gold-soft/10 rounded-xl px-4 text-xs font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="group relative w-full h-14 bg-cocoa-deep text-white rounded-2xl overflow-hidden shadow-lg transition-all active:scale-[0.98] flex items-center justify-center mt-8"
            >
              <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] font-body font-black uppercase tracking-[0.4em]">
                {isProcessing ? "Processing..." : "Authorize & Pay"}
                {!isProcessing && <ShieldCheck size={16} />}
              </span>
            </button>
          </motion.div>

          {/* Right Column: Order Summary */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-gold-soft/10 p-6 md:p-8 shadow-xl flex flex-col overflow-hidden"
          >
            <div className="flex flex-col gap-1 mb-6 shrink-0">
              <h2 className="text-xl font-display italic font-black text-cocoa-deep">Registry Review</h2>
              <p className="text-[8px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel/40">Verified Selection</p>
            </div>

            {/* Product List - Constrained scroll area with explicit height fix */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar space-y-4 py-2">
              {items.map((item) => (
                <div key={item.id} className="group flex gap-4 items-center">
                  <div className="size-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gold-soft/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-3">
                      <div className="space-y-0.5">
                        <h4 className="font-display italic font-black text-cocoa-deep text-xs truncate">{item.name}</h4>
                        <p className="text-[8px] font-body font-black text-cocoa-deep/30 uppercase tracking-widest">{item.quantity} Unit · <span className="text-gold-soft">100g</span></p>
                      </div>
                      <span className="font-body font-black text-cocoa-deep text-xs tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals - More compact */}
            <div className="space-y-4 pt-6 border-t border-gold-soft/10 mt-6 shrink-0">
              <div className="flex justify-between items-center">
                <span className="text-cocoa-deep/40 font-body font-black uppercase text-[8px] tracking-[0.2em]">Subtotal</span>
                <span className="text-cocoa-deep/60 font-body font-bold text-xs">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-gold-soft/10">
                 <div className="space-y-0.5">
                    <span className="text-cocoa-deep font-display italic text-xl font-black leading-none">Total Due</span>
                    <p className="text-[7px] font-body font-black text-gold-soft uppercase tracking-[0.2em]">Heritage Logistics Included</p>
                 </div>
                 <span className="text-cocoa-deep font-body font-black text-2xl tracking-tighter">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 pt-2 opacity-30">
                <div className="flex items-center gap-2">
                   <Tag size={10} className="text-gold-soft" />
                   <span className="text-[7px] font-body font-black uppercase tracking-[0.3em] text-cocoa-deep text-center">Secure Protocol Verified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
