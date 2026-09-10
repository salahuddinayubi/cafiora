export default function CustomizationToggles({ label, options, selected, onToggle, multiple = false }) {
  const isActive = (optionId) =>
    multiple ? selected.includes(optionId) : selected === optionId;

  return (
    <div>
      <p className="font-sans text-[13px] text-terracotta">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = isActive(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 font-sans text-[13px] transition-colors duration-300 ease-out-cubic ${
                active
                  ? 'border-ristretto bg-ristretto text-parchment'
                  : 'border-terracotta/25 bg-transparent text-ristretto hover:border-terracotta/60'
              }`}
            >
              {option.label}
              {option.price > 0 && (
                <span className={active ? 'text-parchment/70' : 'text-terracotta'}> · +₹{option.price}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
