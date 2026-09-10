import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartRow from '../components/CartRow.jsx';

export default function Cart() {
  const { items, subtotal, tax, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="font-serif text-2xl text-ristretto">Your cart is empty</p>
        <Link
          to="/"
          className="mt-4 border-b border-ristretto/30 pb-1 font-sans text-sm text-ristretto transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
        >
          Back to the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10">
      <h1 className="font-serif text-3xl text-ristretto">Your cart</h1>

      <div className="mt-10 rounded-2xl border border-terracotta/15 bg-cashmere px-6 sm:px-8">
        {items.map((item) => (
          <CartRow key={item.cartItemId} item={item} />
        ))}
      </div>

      <div className="mt-8 space-y-2 border-t border-terracotta/15 pt-6">
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
      </div>

      <button
        type="button"
        onClick={() => navigate('/checkout')}
        className="mt-10 w-full rounded-full bg-ristretto py-4 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta sm:w-auto sm:px-10"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
