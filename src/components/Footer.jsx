import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-terracotta/15 px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-serif text-lg text-ristretto">CAFIORA</p>
          <p className="mt-3 max-w-[220px] font-sans text-[13px] leading-relaxed text-ristretto/60">
            Specialty coffee, roasted with intention. A quieter kind of ritual.
          </p>
        </div>

        <div>
          <p className="font-sans text-[12px] uppercase tracking-wide text-terracotta">Shop</p>
          <ul className="mt-4 space-y-2">
            <li><a href="/#coffee" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Signature drinks</a></li>
            <li><a href="/#menu" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Everyday list</a></li>
            <li><a href="/#coffee-beans" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Coffee beans</a></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-[12px] uppercase tracking-wide text-terracotta">Help</p>
          <ul className="mt-4 space-y-2">
            <li><Link to="/cart" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Your cart</Link></li>
            <li><a href="#" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Shipping & Returns</a></li>
            <li><a href="mailto:hello@cafiora.com" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Contact</a></li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-[12px] uppercase tracking-wide text-terracotta">Connect</p>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">Instagram</a></li>
            <li><a href="mailto:hello@cafiora.com" className="font-sans text-[13px] text-ristretto/70 transition-colors duration-300 hover:text-terracotta">hello@cafiora.com</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-terracotta/15 pt-6 font-sans text-[12px] text-ristretto/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} CAFIORA. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="transition-colors duration-300 hover:text-terracotta">Privacy</a>
          <a href="#" className="transition-colors duration-300 hover:text-terracotta">Terms</a>
        </div>
      </div>
    </footer>
  );
}
