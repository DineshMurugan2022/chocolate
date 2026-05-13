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
    <div className="min-h-screen bg-[#F8FAF9] pt-12 pb-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#357960] transition-colors mb-8"
        >
          <ChevronLeft size={16} /> Back to Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          
          {/* Left Column: Shipping Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-sm space-y-10">
            <div className="flex items-center gap-4 text-[#1A1A1A]">
              <Truck size={24} className="text-[#357960]" />
              <h2 className="text-xl md:text-2xl font-bold">Shipping Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">Full Name *</label>
                <input
                  type="text"
                  value={shippingData.name}
                  onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                  placeholder="Dinesh"
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">Phone Number *</label>
                <input
                  type="tel"
                  value={shippingData.phoneNumber}
                  onChange={(e) => setShippingData({ ...shippingData, phoneNumber: e.target.value })}
                  placeholder="+919843240703"
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">Address Line 1 *</label>
                <input
                  type="text"
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  placeholder="Big Street"
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">Address Line 2</label>
                <input
                  type="text"
                  value={shippingData.addressLine2}
                  onChange={(e) => setShippingData({ ...shippingData, addressLine2: e.target.value })}
                  placeholder="Apartment, suite, etc."
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase">City *</label>
                <input
                  type="text"
                  value={shippingData.city}
                  onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  placeholder="Davikapuram"
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase">State *</label>
                  <input
                    type="text"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase">Pincode *</label>
                  <input
                    type="text"
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    placeholder="632326"
                    className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-[#357960] transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full h-16 bg-[#357960] hover:bg-[#2D6A4F] disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center text-lg mt-10"
            >
              {isProcessing ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Order Summary</h2>

              {/* Product List */}
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="size-16 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-[#1A1A1A] truncate">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">Qty: {item.quantity} <span className="ml-2">100 gms</span></p>
                        </div>
                        <span className="font-bold text-sm text-[#1A1A1A]">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-[#1A1A1A] font-bold">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="text-[#357960] font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[#1A1A1A] font-extrabold text-lg">Total</span>
                  <span className="text-[#1A1A1A] font-extrabold text-2xl">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 pt-4">
                <ShieldCheck size={14} className="text-gray-400" />
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Secure checkout powered by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
