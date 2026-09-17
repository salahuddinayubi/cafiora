import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `#CAF-${code}`;
}

export default function Success() {
  const { completeOrder } = useCart();
  const [orderId] = useState(generateOrderId);

  // Complete the order once, on arrival at the success page.
  useEffect(() => {
    completeOrder(orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <p className="font-sans text-[13px] text-terracotta">Order confirmed</p>
        <h1 className="mt-4 font-serif text-3xl text-ristretto sm:text-4xl">Thank you.</h1>
        <p className="mt-6 font-sans text-sm text-ristretto/70">
          Your order <span className="text-ristretto">{orderId}</span> is being prepared.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            to="/"
            className="inline-block border-b border-ristretto/30 pb-1 font-sans text-sm text-ristretto transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            Back to the menu
          </Link>
          <Link
            to="/cart"
            className="inline-block rounded-full bg-ristretto px-6 py-3 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta"
          >
            View Order History
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
