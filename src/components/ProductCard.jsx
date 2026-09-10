import { Link } from 'react-router-dom';

export default function ProductCard({ product, span = false }) {
  const isAvailable = product.available !== false;

  return (
    <Link
      to={isAvailable ? `/product/${product.id}` : '#'}
      aria-disabled={!isAvailable}
      onClick={(e) => {
        if (!isAvailable) e.preventDefault();
      }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-terracotta/15 bg-cashmere transition-colors duration-300 ${
        span ? 'sm:col-span-2' : ''
      } ${isAvailable ? 'hover:border-terracotta/40' : 'cursor-default opacity-60'}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-terracotta/10">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-ristretto/[0.06] transition-transform duration-700 ease-out-cubic group-hover:scale-[1.03]" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl leading-snug text-ristretto">{product.name}</h3>
          {product.isRecommended && isAvailable && (
            <span className="shrink-0 font-sans text-[11px] text-terracotta">Recommended</span>
          )}
        </div>

        {product.tag && (
          <span className="w-fit rounded-full border border-terracotta/20 px-3 py-1 font-sans text-[11px] text-terracotta">
            {product.tag}
          </span>
        )}

        <p className="font-sans text-sm leading-relaxed text-ristretto/70">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-sans text-sm text-ristretto">₹{product.basePrice}</span>
          {isAvailable ? (
            <span className="font-sans text-sm text-ristretto underline decoration-terracotta/40 underline-offset-4 transition-colors duration-300 group-hover:text-terracotta">
              Add
            </span>
          ) : (
            <span className="font-sans text-sm text-ristretto/40">Unavailable</span>
          )}
        </div>
      </div>
    </Link>
  );
}
