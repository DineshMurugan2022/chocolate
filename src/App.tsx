import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { RootState, AppDispatch } from '@/store';
import { SocketProvider } from '@/context/SocketContext';
import { fetchWishlist } from '@/store/wishlistSlice';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('@/pages/Home'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const UserProfile = lazy(() => import('@/pages/UserProfile'));
const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'));
const About = lazy(() => import('@/pages/About'));
const Shop = lazy(() => import('@/pages/Shop'));
const Brands = lazy(() => import('@/pages/Brands'));
const Events = lazy(() => import('@/pages/Events'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const ShippingPolicy = lazy(() => import('@/pages/ShippingPolicy'));
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'));
const HeavyMetalsInfo = lazy(() => import('@/pages/HeavyMetalsInfo'));
const ChocolateColouring = lazy(() => import('@/pages/ChocolateColouring'));
const Accessories = lazy(() => import('@/pages/Accessories'));
const Workshop = lazy(() => import('@/pages/Workshop'));
const Subscription = lazy(() => import('@/pages/Subscription'));
const DietChocolates = lazy(() => import('@/pages/DietChocolates'));
const WeddingEvent = lazy(() => import('@/pages/events/Wedding'));
const BirthdayEvent = lazy(() => import('@/pages/events/Birthday'));
const FamilyEvent = lazy(() => import('@/pages/events/Family'));
const GiftsEvent = lazy(() => import('@/pages/events/Gifts'));
import CartNotification from '@/components/CartNotification';
import SocialProofToast from '@/components/SocialProofToast';
import ChocolateDripTransition from '@/components/ChocolateDripTransition';
import DecorativeElements from '@/components/DecorativeElements';
import ProtectedRoute from '@/components/ProtectedRoute';
import SmoothScroll from '@/components/SmoothScroll';
import ChocolateCursor from '@/components/ChocolateCursor';
import FallingSprinkles from '@/components/FallingSprinkles';

function PageWrapper() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <DecorativeElements />
      <ChocolateDripTransition isVisible={isTransitioning} />
      <Suspense fallback={<div className="h-screen w-full bg-[#1A0F0D]" />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/events" element={<Events />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/heavy-metals-info" element={<HeavyMetalsInfo />} />
            <Route path="/chocolate-colouring" element={<ChocolateColouring />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/diet" element={<DietChocolates />} />
            <Route path="/events/wedding" element={<WeddingEvent />} />
            <Route path="/events/birthday" element={<BirthdayEvent />} />
            <Route path="/events/family" element={<FamilyEvent />} />
            <Route path="/events/gifts" element={<GiftsEvent />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-success" 
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);

  return (
    <SocketProvider>
      <div className="relative w-full">
        <div className="noise-bg" />
        <SmoothScroll />
        <ChocolateCursor />
        <FallingSprinkles />
        <Router>
          <PageWrapper />
          <CartNotification />
          <SocialProofToast />
          <Toaster position="bottom-right" />
        </Router>
      </div>
    </SocketProvider>
  );
}

import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
