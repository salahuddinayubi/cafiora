import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { getProductById, CUSTOMIZATIONS } from '../data/menu.js';
import CustomizationToggles from '../components/CustomizationToggles.jsx';
import { useCart } from '../context/CartContext.jsx';

const GRIND_OPTIONS = [
  { id: 'whole-bean', label: 'Whole Bean', price: 0 },
  { id: 'ground', label: 'Ground', price: 0 },
];

const TABS_COPY = {
  brewingGuideDrink:
    'Pulled to order by hand, every time — no batching, no holding on a burner. Best enjoyed within the first few minutes, while the crema is still intact.',
  brewingGuideBean:
    'For drip: 1:16 coffee-to-water ratio, water just off the boil. For French press: coarser grind, 4-minute steep. For espresso: request a fine grind at checkout.',
  shipping:
    'Orders are prepared fresh and shipped within 2 business days. Domestic delivery typically takes 3–5 business days. Unopened bags can be returned within 14 days.',
};

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addDrink, addBean } = useCart();

  const product = getProductById(productId);

  // Drink customization state
  const [size, setSize] = useState('regular');
  const [milk, setMilk] = useState('whole');
  const [extras, setExtras] = useState([]);

  // Bean customization state
  const [beanSize, setBeanSize] = useState(product?.sizes?.[0]?.id ?? null);
  const [grind, setGrind] = useState('whole-bean');

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  // Invalid or unknown productId — redirect to home.
  useEffect(() => {
    if (!product) {
      navigate('/', { replace: true });
    }
  }, [product, navigate]);

  const isDrink = product?.productType === 'drink';
  const isBean = product?.productType === 'bean';
  const isAvailable = product ? product.available !== false : false;

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    if (isDrink) {
      const sizePrice = CUSTOMIZATIONS.size.find((o) => o.id === size)?.price ?? 0;
      const milkPrice = CUSTOMIZATIONS.milk.find((o) => o.id === milk)?.price ?? 0;
      const extrasPrice = extras.reduce((sum, extraId) => {
        const option = CUSTOMIZATIONS.extras.find((o) => o.id === extraId);
        return sum + (option?.price ?? 0);
      }, 0);
      return product.basePrice + sizePrice + milkPrice + extrasPrice;
    }
    if (isBean) {
      return product.sizes.find((s) => s.id === beanSize)?.price ?? product.sizes[0].price;
    }
    return 0;
  }, [product, isDrink, isBean, size, milk, extras, beanSize]);

  if (!product) return null;

  const toggleExtra = (extraId) => {
    setExtras((current) =>
      current.includes(extraId) ? current.filter((id) => id !== extraId) : [...current, extraId]
    );
  };

  const handleAdd = () => {
    if (!isAvailable) return;
    if (isDrink) {
      addDrink(product, { size, milk, extras }, unitPrice, quantity);
    } else if (isBean) {
      addBean(product, beanSize, grind, unitPrice, quantity);
    }
    navigate('/');
  };

  const tabs = [
    { id: 'details', label: 'Details' },
    ...(isBean ? [{ id: 'tasting', label: 'Tasting Notes' }] : []),
    { id: 'brewing', label: 'Brewing Guide' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-12 px-6 pb-24 pt-32 sm:grid-cols-2 sm:gap-16 sm:px-10">
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-terracotta/10 sm:sticky sm:top-32 sm:h-[calc(100vh-12rem)] sm:aspect-auto">
        {product.image && (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        )}
      </div>

      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-serif text-3xl text-ristretto">{product.name}</h1>
          {!isAvailable && (
            <span className="shrink-0 rounded-full border border-terracotta/25 px-3 py-1 font-sans text-[11px] text-terracotta">
              Currently unavailable
            </span>
          )}
        </div>
        {isBean && (
          <span className="mt-3 inline-block w-fit rounded-full border border-terracotta/20 px-3 py-1 font-sans text-[11px] text-terracotta">
            {product.roast} roast
          </span>
        )}
        <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ristretto/70">
          {product.description}
        </p>

        <div className="mt-10 space-y-8">
          {isDrink && (
            <>
              <CustomizationToggles
                label="Size"
                options={CUSTOMIZATIONS.size}
                selected={size}
                onToggle={setSize}
              />
              <CustomizationToggles
                label="Milk"
                options={CUSTOMIZATIONS.milk}
                selected={milk}
                onToggle={setMilk}
              />
              <CustomizationToggles
                label="Extras"
                options={CUSTOMIZATIONS.extras}
                selected={extras}
                onToggle={toggleExtra}
                multiple
              />
            </>
          )}

          {isBean && (
            <>
              <CustomizationToggles
                label="Size"
                options={product.sizes}
                selected={beanSize}
                onToggle={setBeanSize}
              />
              <CustomizationToggles
                label="Grind"
                options={GRIND_OPTIONS}
                selected={grind}
                onToggle={setGrind}
              />
            </>
          )}

          <div>
            <p className="font-sans text-[13px] text-terracotta">Quantity</p>
            <div className="mt-3 flex w-fit items-center gap-4 rounded-full border border-terracotta/20 px-4 py-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="text-ristretto transition-colors duration-300 hover:text-terracotta"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span className="w-4 text-center font-sans text-sm text-ristretto">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="text-ristretto transition-colors duration-300 hover:text-terracotta"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-terracotta/15 pt-6">
          <div>
            <p className="font-sans text-[13px] text-terracotta">Total</p>
            <p className="font-serif text-2xl text-ristretto">₹{unitPrice * quantity}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!isAvailable}
            className="rounded-full bg-ristretto px-10 py-4 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-ristretto"
          >
            {isAvailable ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>

        {/* Details / Tasting Notes / Brewing Guide / Shipping & Returns */}
        <div className="mt-12 border-t border-terracotta/15 pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`font-sans text-[13px] transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-ristretto underline underline-offset-4' : 'text-ristretto/50 hover:text-terracotta'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-5 font-sans text-sm leading-relaxed text-ristretto/70">
            {activeTab === 'details' && <p>{product.description}</p>}
            {activeTab === 'tasting' && isBean && <p>{product.tastingNotes.join(' · ')}</p>}
            {activeTab === 'brewing' && <p>{isBean ? TABS_COPY.brewingGuideBean : TABS_COPY.brewingGuideDrink}</p>}
            {activeTab === 'shipping' && <p>{TABS_COPY.shipping}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
