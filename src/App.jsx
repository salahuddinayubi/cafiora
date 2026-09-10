import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import FloatingHeader from './components/FloatingHeader.jsx';
import AddToCartToast from './components/AddToCartToast.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import Success from './pages/Success.jsx';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-parchment sm:p-4">
          <div className="relative mx-auto flex min-h-screen w-full flex-col bg-parchment sm:rounded-canvas sm:border sm:border-terracotta/15 sm:overflow-hidden">
            <FloatingHeader />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        <AddToCartToast />
        <CartDrawer />
      </BrowserRouter>
    </CartProvider>
  );
}
