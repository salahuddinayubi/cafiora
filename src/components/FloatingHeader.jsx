import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const NAV_LINKS = [
  { label: 'Coffee', href: '/#coffee' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Our Story', href: '/#our-story' },
];

export default function FloatingHeader() {
  const { cartCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCartClick = () => {
    setMobileOpen(false);
    toggleCart();
  };

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-6">
      <motion.header
        animate={{
          width: scrolled ? 'min(640px, 92vw)' : 'min(1040px, 94vw)',
          paddingTop: scrolled ? 10 : 20,
          paddingBottom: scrolled ? 10 : 20,
          backgroundColor: scrolled ? 'rgba(249, 248, 246, 0.72)' : 'rgba(249, 248, 246, 0)',
          borderColor: scrolled ? 'rgba(124, 108, 99, 0.18)' : 'rgba(124, 108, 99, 0)',
          boxShadow: scrolled
            ? '0 12px 32px -18px rgba(26, 23, 21, 0.35)'
            : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ backdropFilter: scrolled ? 'blur(14px)' : 'none' }}
        className="flex w-full flex-col rounded-[28px] border px-6 sm:rounded-full"
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-lg tracking-wide text-ristretto">
            CAFIORA
          </Link>

          <nav className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[13px] text-ristretto/80 transition-colors duration-300 hover:text-terracotta"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleCartClick}
              className="flex items-center gap-2 font-sans text-[13px] text-ristretto transition-colors duration-300 hover:text-terracotta"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="hidden sm:inline">Cart ({cartCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
              className="text-ristretto sm:hidden"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex flex-col overflow-hidden sm:hidden"
            >
              <div className="flex flex-col gap-4 border-t border-terracotta/15 pb-2 pt-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-sm text-ristretto/80 transition-colors duration-300 hover:text-terracotta"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
