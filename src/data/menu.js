// Central inventory for CAFIORA.
// Schema: { id, name, description, basePrice, category, isRecommended, imagePlaceholder }

// Coffee product images — sourced from the existing "Images folder" in the project root
// (copied into src/assets/coffee with cleaned filenames, since the original filenames
// contain a literal "#" character that breaks Vite's asset import resolution).
import imgVelvetCaramelLatte from '../assets/coffee/velvet-caramel-latte.png';
import imgSignatureMocha from '../assets/coffee/signature-mocha.png';
import imgClassicCappuccino from '../assets/coffee/classic-cappuccino.png';
import imgClassicAmericano from '../assets/coffee/classic-americano.png';
import imgColdBrewNoir from '../assets/coffee/cold-brew-noir.png';
import imgIcedCaramelBrew from '../assets/coffee/iced-caramel-brew.png';
import imgCaramelHazelnutLatte from '../assets/coffee/caramel-hazelnut-latte.png';
import imgVanillaCaramelLatte from '../assets/coffee/vanilla-caramel-latte.png';
import imgHouseBlend from '../assets/coffee/house-blend.png';
import imgSingleOrigin from '../assets/coffee/single-origin.png';
import imgEspressoBlend from '../assets/coffee/espresso-blend.png';

export const CATEGORY = {
  PREMIUM: 'premium',
  GENERAL: 'general',
};

export const coffees = [
  // Premium Coffees
  {
    id: 'signature-latte',
    name: 'Signature Latte',
    description:
      'Double-pulled ristretto shots folded into steamed milk, finished with a single pour of dark caramel.',
    basePrice: 220,
    category: CATEGORY.PREMIUM,
    isRecommended: true,
    available: true,
    imagePlaceholder: true,
    image: imgVelvetCaramelLatte,
  },
  {
    id: 'signature-mocha',
    name: 'Signature Mocha',
    description:
      'Single-origin cacao melted into espresso, layered with steamed milk and a whisper of sea salt.',
    basePrice: 240,
    category: CATEGORY.PREMIUM,
    isRecommended: true,
    available: true,
    imagePlaceholder: true,
    image: imgSignatureMocha,
  },

  // General Coffees
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and airy microfoam.',
    basePrice: 150,
    category: CATEGORY.GENERAL,
    tag: 'Classic',
    isRecommended: false,
    available: true,
    imagePlaceholder: true,
    image: imgClassicCappuccino,
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso, slowly opened with hot water for a cleaner cup.',
    basePrice: 120,
    category: CATEGORY.GENERAL,
    tag: 'Light',
    isRecommended: false,
    available: true,
    imagePlaceholder: true,
    image: imgClassicAmericano,
  },
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A concentrated pull, dense and syrupy, served neat.',
    basePrice: 130,
    category: CATEGORY.GENERAL,
    tag: 'Bold',
    isRecommended: false,
    available: true,
    imagePlaceholder: true,
    image: imgIcedCaramelBrew,
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    description: 'Chilled espresso blended with milk over ice, lightly sweetened.',
    basePrice: 160,
    category: CATEGORY.GENERAL,
    tag: 'Cold',
    isRecommended: true,
    available: true,
    imagePlaceholder: true,
    image: imgColdBrewNoir,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Ristretto shots under a thin layer of velvet steamed milk.',
    basePrice: 170,
    category: CATEGORY.GENERAL,
    tag: 'Classic',
    isRecommended: false,
    available: true,
    imagePlaceholder: true,
    image: imgCaramelHazelnutLatte,
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    description: 'Vanilla-scented milk marked with espresso and caramel drizzle.',
    basePrice: 180,
    category: CATEGORY.GENERAL,
    tag: 'Sweet',
    isRecommended: false,
    available: false, // demo of the "unavailable" state
    imagePlaceholder: true,
    image: imgVanillaCaramelLatte,
  },
];

export const snacks = [
  {
    id: 'chocolate-cookie',
    name: 'Chocolate Cookie',
    description: 'Dark chocolate chunks, baked in-house.',
    basePrice: 60,
    imagePlaceholder: true,
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    description: 'Wild blueberries folded into a butter-soft crumb.',
    basePrice: 90,
    imagePlaceholder: true,
  },
  {
    id: 'croissant',
    name: 'Croissant',
    description: 'Laminated, golden, and finished with a light glaze.',
    basePrice: 80,
    imagePlaceholder: true,
  },
  {
    id: 'brownie',
    name: 'Brownie',
    description: 'Dense fudge brownie with a shattering top crust.',
    basePrice: 100,
    imagePlaceholder: true,
  },
];

// Coffee beans — sold for home brewing. Priced per size rather than one basePrice.
export const coffeeBeans = [
  {
    id: 'house-blend',
    name: 'House Blend',
    description: 'Our everyday blend — balanced, easy-drinking, built for a milk-based cup.',
    roast: 'Medium',
    tastingNotes: ['Milk chocolate', 'Toasted hazelnut', 'Soft caramel'],
    isRecommended: true,
    available: true,
    imagePlaceholder: true,
    image: imgHouseBlend,
    sizes: [
      { id: '250g', label: '250g', price: 380 },
      { id: '500g', label: '500g', price: 680 },
      { id: '1kg', label: '1kg', price: 1250 },
    ],
  },
  {
    id: 'single-origin',
    name: 'Single Origin',
    description: 'A rotating micro-lot, roasted lighter to let the origin speak for itself.',
    roast: 'Light',
    tastingNotes: ['Stone fruit', 'Jasmine', 'Bright citrus'],
    isRecommended: true,
    available: true,
    imagePlaceholder: true,
    image: imgSingleOrigin,
    sizes: [
      { id: '250g', label: '250g', price: 450 },
      { id: '500g', label: '500g', price: 820 },
      { id: '1kg', label: '1kg', price: 1550 },
    ],
  },
  {
    id: 'espresso-blend',
    name: 'Espresso Blend',
    description: 'Roasted darker and slower, built to hold its own under milk or on its own.',
    roast: 'Dark',
    tastingNotes: ['Dark cocoa', 'Roasted almond', 'Brown sugar'],
    isRecommended: false,
    available: true,
    imagePlaceholder: true,
    image: imgEspressoBlend,
    sizes: [
      { id: '250g', label: '250g', price: 400 },
      { id: '500g', label: '500g', price: 720 },
      { id: '1kg', label: '1kg', price: 1350 },
    ],
  },
];

export const CUSTOMIZATIONS = {
  size: [
    { id: 'regular', label: 'Regular', price: 0 },
    { id: 'large', label: 'Large', price: 40 },
  ],
  milk: [
    { id: 'whole', label: 'Whole Milk', price: 0 },
    { id: 'oat', label: 'Oat Milk', price: 30 },
    { id: 'almond', label: 'Almond Milk', price: 30 },
  ],
  extras: [
    { id: 'shot', label: 'Extra Espresso Shot', price: 40 },
    { id: 'vanilla', label: 'Vanilla Syrup', price: 20 },
  ],
};

// Filters shown in the "Find Your Coffee" section — informational/browsing aid.
export const BEAN_FILTERS = {
  roast: [
    { id: 'light', label: 'Light' },
    { id: 'medium', label: 'Medium' },
    { id: 'dark', label: 'Dark' },
  ],
  format: [
    { id: 'whole-bean', label: 'Whole Bean' },
    { id: 'ground', label: 'Ground' },
  ],
  weight: [
    { id: '250g', label: '250g' },
    { id: '500g', label: '500g' },
    { id: '1kg', label: '1kg' },
  ],
};

export const reviews = [
  {
    id: 'r1',
    name: 'Ananya R.',
    rating: 5,
    verified: true,
    text: 'The flat white here is unlike anything else nearby — quiet, confident, no burnt-milk aftertaste.',
  },
  {
    id: 'r2',
    name: 'Kabir S.',
    rating: 5,
    verified: true,
    text: 'Ordered the single origin beans for home. Tastes like the actual fruit notes they describe, not just marketing.',
  },
  {
    id: 'r3',
    name: 'Meera T.',
    rating: 4,
    verified: true,
    text: 'Small menu, but every single thing on it is genuinely good. The croissant alone is worth the visit.',
  },
];

export function getCoffeeById(id) {
  return coffees.find((c) => c.id === id);
}

export function getSnackById(id) {
  return snacks.find((s) => s.id === id);
}

export function getBeanById(id) {
  return coffeeBeans.find((b) => b.id === id);
}

// Looks up a product across both coffees and coffee beans, tagging its type.
export function getProductById(id) {
  const coffee = getCoffeeById(id);
  if (coffee) return { ...coffee, productType: 'drink' };
  const bean = getBeanById(id);
  if (bean) return { ...bean, productType: 'bean' };
  return null;
}
