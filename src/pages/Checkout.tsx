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

    setIsProcessing(true);
    try {
      // The backend expects shippingAddress as an object and items to have product ID and quantity
      const orderResponse = await api.post('/orders', {
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

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(totalPrice * 100),
        currency: "INR",
        name: "British Chocolate",
        description: "Artisan Selection",
        order_id: orderResponse.data.razorpayOrderId,
        handler: async function (response: any) {
          try {
            await api.post('/orders/verify', {
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
    <div className="min-h-screen bg-parchment-base pt-12 pb-24 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[30%] bg-gold-soft/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[30%] bg-burnt-caramel/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="flex flex-col gap-4">
             <button
               onClick={() => navigate(-1)}
               className="group flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.4em] text-burnt-caramel hover:text-cocoa-deep transition-all duration-500"
             >
               <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
               Return to Vault
             </button>
             <h1 className="text-5xl md:text-7xl font-display italic font-black text-cocoa-deep">Secure Procurement</h1>
          </div>
          <div className="hidden lg:block">
            <Logo variant="dark" showText={false} className="scale-150" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 items-start">
          
          {/* Left Column: Shipping Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/40 backdrop-blur-3xl rounded-[40px] border border-gold-soft/10 p-8 md:p-14 shadow-2xl space-y-12"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Truck size={24} className="text-burnt-caramel" />
                <h2 className="text-2xl md:text-3xl font-display italic font-black text-cocoa-deep">Shipping Logistics</h2>
              </div>
              <p className="text-[10px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel/40">Enter the destination for your artifacts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="space-y-3">
                <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={shippingData.name}
                  onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                  placeholder="Dinesh"
                  className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={shippingData.phoneNumber}
                  onChange={(e) => setShippingData({ ...shippingData, phoneNumber: e.target.value })}
                  placeholder="+919843240703"
                  className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Primary Address *</label>
                <input
                  type="text"
                  required
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  placeholder="Building No, Street Name"
                  className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Secondary Details</label>
                <input
                  type="text"
                  value={shippingData.addressLine2}
                  onChange={(e) => setShippingData({ ...shippingData, addressLine2: e.target.value })}
                  placeholder="Apartment, suite, landmark, etc."
                  className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">City / Municipality *</label>
                <input
                  type="text"
                  required
                  value={shippingData.city}
                  onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  placeholder="Davikapuram"
                  className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">State *</label>
                  <input
                    type="text"
                    required
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-body font-black text-cocoa-deep/40 uppercase tracking-[0.2em]">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    placeholder="632326"
                    className="w-full h-14 bg-white/50 border border-gold-soft/10 rounded-2xl px-6 text-sm font-body font-medium focus:outline-none focus:border-burnt-caramel focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="group relative w-full h-20 bg-cocoa-deep text-white rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(26,15,13,0.3)] transition-all active:scale-[0.98] flex items-center justify-center text-lg mt-14"
            >
              <div className="absolute inset-0 bg-burnt-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-6 text-[12px] font-body font-black uppercase tracking-[0.6em]">
                {isProcessing ? "Validating Secure Link..." : "Authenticate & Pay"}
                {!isProcessing && <ShieldCheck size={20} className="group-hover:scale-110 transition-transform duration-500" />}
              </span>
            </button>
          </motion.div>

          {/* Right Column: Order Summary */}
          <div className="space-y-8 sticky top-32">
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white/40 backdrop-blur-3xl rounded-[40px] border border-gold-soft/10 p-8 md:p-12 shadow-2xl space-y-10"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-display italic font-black text-cocoa-deep">Inventory Review</h2>
                <p className="text-[10px] font-body font-black uppercase tracking-[0.3em] text-burnt-caramel/40">Verifying your selection</p>
              </div>

              {/* Product List */}
              <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="group flex gap-6 items-center">
                    <div className="size-20 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-4">
                        <div className="space-y-1">
                          <h4 className="font-display italic font-black text-cocoa-deep text-lg group-hover:text-burnt-caramel transition-colors">{item.name}</h4>
                          <p className="text-[10px] font-body font-black text-cocoa-deep/40 uppercase tracking-widest">Qty: {item.quantity} · <span className="text-gold-soft">100g</span></p>
                        </div>
                        <span className="font-body font-black text-cocoa-deep text-lg tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-6 pt-10 border-t border-gold-soft/10">
                <div className="flex justify-between items-center">
                  <span className="text-cocoa-deep/40 font-body font-black uppercase text-[10px] tracking-[0.3em]">Vault Subtotal</span>
                  <span className="text-cocoa-deep/60 font-body font-bold text-sm">₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cocoa-deep/40 font-body font-black uppercase text-[10px] tracking-[0.3em]">Heritage Shipping</span>
                  <span className="text-gold-soft font-body font-black text-[10px] uppercase tracking-widest">Complimentary</span>
                </div>
                <div className="flex justify-between items-end pt-8 border-t border-gold-soft/10">
                   <div className="space-y-1">
                      <span className="text-cocoa-deep font-display italic text-3xl font-black leading-none">Total Due</span>
                      <p className="text-[8px] font-body font-black text-gold-soft uppercase tracking-[0.3em]">Authenticity Verified</p>
                   </div>
                   <span className="text-cocoa-deep font-body font-black text-4xl tracking-tighter">₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex flex-col items-center gap-4 pt-4 opacity-30">
                <div className="flex items-center gap-3">
                   <Tag size={12} className="text-gold-soft" />
                   <span className="text-[9px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep">Secure Pipeline Protocol</span>
                </div>
                <p className="text-[8px] font-body text-center leading-relaxed">
                   By completing this transaction, you acknowledge the heritage protocols of the British Chocolate Store. Securely processed by Razorpay.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
