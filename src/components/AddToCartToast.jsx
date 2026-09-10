import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const DISMISS_MS = 3600;

export default function AddToCartToast() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => dismissToast(toast.id), DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:bottom-8 sm:justify-end sm:pr-8">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-terracotta/15 bg-cashmere px-5 py-4 shadow-[0_18px_40px_-20px_rgba(26,23,21,0.35)]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-terracotta/25 bg-parchment">
              <Check size={14} strokeWidth={1.5} className="text-ristretto" />
            </span>
            <span className="font-sans text-sm text-ristretto">
              <span className="font-medium">{toast.itemName}</span>
              <span className="text-terracotta"> — added to your cart</span>
            </span>
            <Link
              to="/cart"
              onClick={() => dismissToast(toast.id)}
              className="font-sans text-sm text-ristretto underline decoration-terracotta/40 underline-offset-4 transition-colors duration-300 hover:text-terracotta whitespace-nowrap"
            >
              View Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
