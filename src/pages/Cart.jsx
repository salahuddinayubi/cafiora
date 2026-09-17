import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartRow from '../components/CartRow.jsx';

export default function Cart() {
  const { items, subtotal, tax, total, orderHistory, clearOrderHistory } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10">
      <h1 className="font-serif text-3xl text-ristretto">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center py-12 text-center border-b border-terracotta/15">
          <p className="font-serif text-2xl text-ristretto">Your cart is empty</p>
          <Link
            to="/"
            className="mt-4 border-b border-ristretto/30 pb-1 font-sans text-sm text-ristretto transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            Back to the menu
          </Link>
        </div>
      ) : (
        <>
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
        </>
      )}

      {orderHistory.length > 0 && (
        <div className="mt-16 border-t border-terracotta/15 pt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-ristretto">Order History</h2>
            <button
              onClick={clearOrderHistory}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-terracotta/15 text-ristretto/70 hover:border-terracotta hover:text-terracotta transition-colors duration-300"
              title="Clear order history"
            >
              ×
            </button>
          </div>
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div key={order.orderId} className="rounded-2xl border border-terracotta/15 bg-cashmere/50 p-6">
                <div className="flex items-center justify-between border-b border-terracotta/15 pb-4 mb-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-ristretto">{order.orderId}</p>
                    <p className="font-sans text-[13px] text-terracotta">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-sans text-base font-medium text-ristretto">₹{order.total}</p>
                </div>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={`${item.cartItemId}-${idx}`} className="flex justify-between font-sans text-sm text-ristretto/80">
                      <span>{item.quantity}x {item.name} {item.customizationLabel ? `(${item.customizationLabel})` : ''}</span>
                      <span>₹{item.unitPrice * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
