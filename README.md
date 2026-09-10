# CAFIORA

A quiet-luxury specialty coffee ordering prototype. React + Vite + Tailwind CSS + React Router v6 + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   FloatingHeader, ProductCard, CustomizationToggles, CartRow, AddToCartToast
  context/      CartContext.jsx — cart state, smart stacking, pricing math
  data/         menu.js — coffees, snacks, customization options
  pages/        Home, Cart, Customize, Checkout, Success
```

## Notes

- All images are gray placeholder blocks by design (no real product photography).
- Cart state resets on page refresh — this is intentional, not a bug.
- The "Pay" button on checkout is a demo action; no real payment processing occurs.
