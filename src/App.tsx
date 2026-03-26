import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store';
import type { RootState } from '@/store';
import { SocketProvider } from '@/context/SocketContext';
import { fetchWishlist } from '@/store/wishlistSlice';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Home from '@/pages/Home';
import AdminDashboard from '@/pages/AdminDashboard';
import ProductDetails from '@/pages/ProductDetails';
import Checkout from '@/pages/Checkout';
import UserProfile from '@/pages/UserProfile';
import OrderSuccess from '@/pages/OrderSuccess';
import About from '@/pages/About';
import Shop from '@/pages/Shop';
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
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
    </>
  );
}

function AppContent() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);

  return (
    <SocketProvider>
      <div className="relative w-full">
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

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
