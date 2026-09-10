import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

// Builds the exact cartItemId format specified in the brief, e.g.
// "mocha-regular-oat-0shot-0vanilla"
function buildDrinkCartItemId(productId, customization) {
  const { size, milk, extras } = customization;
  const shotFlag = extras.includes('shot') ? 1 : 0;
  const vanillaFlag = extras.includes('vanilla') ? 1 : 0;
  return `${productId}-${size}-${milk}-${shotFlag}shot-${vanillaFlag}vanilla`;
}

function buildDrinkLabel(customization) {
  const sizeLabel = customization.size === 'large' ? 'Large' : 'Regular';
  const milkLabel =
    customization.milk === 'oat' ? 'Oat Milk' : customization.milk === 'almond' ? 'Almond Milk' : 'Whole Milk';
  const extraLabels = [];
  if (customization.extras.includes('shot')) extraLabels.push('Extra Shot');
  if (customization.extras.includes('vanilla')) extraLabels.push('Vanilla Syrup');
  const parts = [sizeLabel, milkLabel, ...extraLabels];
  return parts.join(' · ');
}

function buildBeanCartItemId(productId, size, grind) {
  return `${productId}-${size}-${grind}`;
}

function buildBeanLabel(size, grind) {
  const grindLabel = grind === 'ground' ? 'Ground' : 'Whole Bean';
  return `${size} · ${grindLabel}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null); // { id, itemName }
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((open) => !open), []);

  const showToast = useCallback((itemName) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToast({ id, itemName });
  }, []);

  const dismissToast = useCallback((id) => {
    setToast((current) => (current && current.id === id ? null : current));
  }, []);

  // customization = { size: 'regular'|'large', milk: 'whole'|'oat'|'almond', extras: string[] }
  const addDrink = useCallback((product, customization, unitPrice, quantity = 1) => {
    const cartItemId = buildDrinkCartItemId(product.id, customization);
    const customizationLabel = buildDrinkLabel(customization);

    setItems((current) => {
      const existing = current.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return current.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...current,
        {
          cartItemId,
          type: 'drink',
          productId: product.id,
          name: product.name,
          customizationLabel,
          unitPrice,
          quantity,
          image: product.image,
        },
      ];
    });

    showToast(product.name);
  }, [showToast]);

  // Snacks use their own id as cartItemId directly — no customization string.
  const addSnack = useCallback((product) => {
    const cartItemId = product.id;

    setItems((current) => {
      const existing = current.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return current.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...current,
        {
          cartItemId,
          type: 'snack',
          productId: product.id,
          name: product.name,
          customizationLabel: null,
          unitPrice: product.basePrice,
          quantity: 1,
          ...(product.image ? { image: product.image } : {}),
        },
      ];
    });

    showToast(product.name);
  }, [showToast]);

  // Beans stack by product + size + grind, same pattern as drinks.
  const addBean = useCallback((product, size, grind, unitPrice, quantity = 1) => {
    const cartItemId = buildBeanCartItemId(product.id, size, grind);
    const customizationLabel = buildBeanLabel(size, grind);

    setItems((current) => {
      const existing = current.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return current.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...current,
        {
          cartItemId,
          type: 'bean',
          productId: product.id,
          name: product.name,
          customizationLabel,
          unitPrice,
          quantity,
          image: product.image,
        },
      ];
    });

    showToast(product.name);
  }, [showToast]);

  // Decrementing to 0 removes the line item entirely — no zero-quantity rows persist.
  const decrementItem = useCallback((cartItemId) => {
    setItems((current) =>
      current
        .map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const incrementItem = useCallback((cartItemId) => {
    setItems((current) =>
      current.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const removeItem = useCallback((cartItemId) => {
    setItems((current) => current.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Rounding rule: round only at the final tax/total step, never at unitPrice
  // or line-item level. All source prices are whole rupees, so subtotal is
  // already an integer; only the 5% tax needs rounding.
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );
  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = subtotal + tax;

  const value = {
    items,
    addDrink,
    addSnack,
    addBean,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    cartCount,
    subtotal,
    tax,
    total,
    toast,
    dismissToast,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
