import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { snacks } from '../data/menu.js';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { items, subtotal, tax, total, addSnack } = useCart();
  const navigate = useNavigate();

  // Empty cart should not render an order summary.
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [items, navigate]);

  if (items.length === 0) return null;

  const handlePay = () => {
    navigate('/success');
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10">
      <h1 className="font-serif text-3xl text-ristretto">Checkout</h1>

      <section className="mt-10">
        <h2 className="font-sans text-[13px] text-terracotta">Order summary</h2>
        <div className="mt-4 rounded-2xl border border-terracotta/15 bg-cashmere px-6 py-2 sm:px-8">
          {items.map((item) => (
            <div
              key={item.cartItemId}
              className="flex items-center justify-between gap-4 border-b border-terracotta/15 py-4 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="font-serif text-base text-ristretto">
                  {item.name} <span className="font-sans text-sm text-ristretto/50">× {item.quantity}</span>
                </p>
                {item.customizationLabel && (
                  <p className="mt-0.5 font-sans text-[12px] text-terracotta">{item.customizationLabel}</p>
                )}
              </div>
              <span className="shrink-0 font-sans text-sm text-ristretto">
                ₹{item.unitPrice * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-sans text-[13px] text-terracotta">Add something sweet</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {snacks.map((snack) => (
            <button
              key={snack.id}
              type="button"
              onClick={() => addSnack(snack)}
              className="rounded-2xl border border-terracotta/15 bg-cashmere px-4 py-5 text-left transition-colors duration-300 hover:border-terracotta/40"
            >
              <p className="font-serif text-[15px] text-ristretto">{snack.name}</p>
              <p className="mt-1 font-sans text-[13px] text-terracotta">₹{snack.basePrice}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-2 border-t border-terracotta/15 pt-6">
        <div className="flex justify-between font-sans text-sm text-ristretto/70">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between font-sans text-sm text-ristretto/70">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between pt-2 font-sans text-base text-ristretto">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </section>

      <button
        type="button"
        onClick={handlePay}
        className="mt-10 w-full rounded-full bg-ristretto py-4 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta sm:w-auto sm:px-10"
      >
        Pay ₹{total}
      </button>
    </div>
  );
}
