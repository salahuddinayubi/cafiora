import { useState } from 'react';
import CustomizationToggles from './CustomizationToggles.jsx';
import { BEAN_FILTERS } from '../data/menu.js';

export default function FindYourCoffee() {
  const [roast, setRoast] = useState('medium');
  const [format, setFormat] = useState('whole-bean');
  const [weight, setWeight] = useState('250g');

  const handleViewCoffee = () => {
    document.getElementById('coffee-beans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="rounded-2xl border border-terracotta/15 bg-cashmere px-6 py-10 sm:px-10 sm:py-12">
      <h2 className="font-serif text-2xl italic text-ristretto">Find your coffee</h2>
      <p className="mt-2 max-w-md font-sans text-sm text-ristretto/70">
        Tell us how you brew, and we'll point you to the right bag.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <CustomizationToggles
          label="Roast"
          options={BEAN_FILTERS.roast}
          selected={roast}
          onToggle={setRoast}
        />
        <CustomizationToggles
          label="Format"
          options={BEAN_FILTERS.format}
          selected={format}
          onToggle={setFormat}
        />
        <CustomizationToggles
          label="Weight"
          options={BEAN_FILTERS.weight}
          selected={weight}
          onToggle={setWeight}
        />
      </div>

      <button
        type="button"
        onClick={handleViewCoffee}
        className="mt-10 rounded-full bg-ristretto px-10 py-4 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta"
      >
        View coffee
      </button>
    </section>
  );
}
