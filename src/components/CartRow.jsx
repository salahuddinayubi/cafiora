import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function CartRow({ item }) {
  const { incrementItem, decrementItem, removeItem } = useCart();
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-terracotta/15 py-6 last:border-b-0">
      <div className="flex min-w-0 gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-terracotta/15 bg-terracotta/10">
          {item.image && (
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          )}
        </div>

        <div className="min-w-0">
          <h4 className="font-serif text-lg text-ristretto">{item.name}</h4>
          {item.customizationLabel && (
            <p className="mt-1 font-sans text-[13px] text-terracotta">{item.customizationLabel}</p>
          )}
          <p className="mt-2 font-sans text-[13px] text-ristretto/60">₹{item.unitPrice} each</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => removeItem(item.cartItemId)}
          aria-label={`Remove ${item.name}`}
          className="text-ristretto/40 transition-colors duration-300 hover:text-terracotta"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3 rounded-full border border-terracotta/20 px-3 py-1.5">
          <button
            type="button"
            onClick={() => decrementItem(item.cartItemId)}
            aria-label={`Decrease quantity of ${item.name}`}
            className="text-ristretto transition-colors duration-300 hover:text-terracotta"
          >
            <Minus size={13} strokeWidth={1.5} />
          </button>
          <span className="w-4 text-center font-sans text-sm text-ristretto">{item.quantity}</span>
          <button
            type="button"
            onClick={() => incrementItem(item.cartItemId)}
            aria-label={`Increase quantity of ${item.name}`}
            className="text-ristretto transition-colors duration-300 hover:text-terracotta"
          >
            <Plus size={13} strokeWidth={1.5} />
          </button>
        </div>

        <p className="font-sans text-sm text-ristretto">₹{lineTotal}</p>
      </div>
    </div>
  );
}
