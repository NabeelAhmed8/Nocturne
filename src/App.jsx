import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { useStore } from './store/useStore';

// Code-split pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Lookbook = lazy(() => import('./pages/Lookbook'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Success = lazy(() => import('./pages/Success'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Account = lazy(() => import('./pages/Account'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));

const PageLoader = () => (
  <div className="flex-1 min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-neutral-800 border-t-white animate-spin" />
  </div>
);

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const verifyAuth = useStore((state) => state.verifyAuth);
  const checkServerHealth = useStore((state) => state.checkServerHealth);

  useEffect(() => {
    fetchProducts();
    checkServerHealth();
    verifyAuth();
  }, [fetchProducts, checkServerHealth, verifyAuth]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-screen min-h-dvh bg-[#070707] text-[#f5f5f5] font-sans selection:bg-neutral-200 selection:text-black flex flex-col overflow-x-clip">
        <Header onOpenCart={() => setIsCartOpen(true)} />

        <main className="flex-1 flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails onOpenCart={() => setIsCartOpen(true)} />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/wishlist" element={<Wishlist onOpenCart={() => setIsCartOpen(true)} />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<Login />} />
              <Route path="/verify-login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping" element={<PolicyPage type="shipping" badge="Courier Protocol" />} />
              <Route path="/returns" element={<PolicyPage type="returns" badge="Client Services" />} />
              <Route path="/sizing" element={<PolicyPage type="sizing" badge="Specifications" />} />
              <Route path="/care" element={<PolicyPage type="care" badge="Textile Maintenance" />} />
              <Route path="/textile-care" element={<PolicyPage type="care" badge="Textile Maintenance" />} />
              <Route path="/privacy" element={<PolicyPage type="privacy" badge="Confidentiality" />} />
              <Route path="/terms" element={<PolicyPage type="terms" badge="Legal Conditions" />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </Router>
  );
}
