import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartRow from './CartRow.jsx';

export default function CartDrawer() {
  const { items, subtotal, tax, total, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-ristretto/30"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
            role="dialog"
            aria-label="Cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-parchment shadow-[0_0_60px_-20px_rgba(26,23,21,0.4)] sm:border-l sm:border-terracotta/15"
          >
            <div className="flex items-center justify-between border-b border-terracotta/15 px-6 py-6">
              <h2 className="font-serif text-xl text-ristretto">Your cart</h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="text-ristretto/50 transition-colors duration-300 hover:text-terracotta"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <p className="font-serif text-lg text-ristretto">Your cart is empty</p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-4 border-b border-ristretto/30 pb-1 font-sans text-sm text-ristretto transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {items.map((item) => (
                    <CartRow key={item.cartItemId} item={item} />
                  ))}
                </div>

                <div className="border-t border-terracotta/15 px-6 py-6">
                  <div className="flex justify-between font-sans text-sm text-ristretto/70">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="mt-1 flex justify-between font-sans text-sm text-ristretto/70">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="mt-2 flex justify-between font-sans text-base text-ristretto">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-6 w-full rounded-full bg-ristretto py-4 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta"
                  >
                    Checkout →
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full font-sans text-[13px] text-ristretto/60 transition-colors duration-300 hover:text-terracotta"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
