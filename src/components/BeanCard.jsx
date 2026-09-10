import { Link } from 'react-router-dom';

export default function BeanCard({ bean }) {
  const startingPrice = bean.sizes[0]?.price ?? 0;

  return (
    <Link
      to={`/product/${bean.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-terracotta/15 bg-cashmere transition-colors duration-300 hover:border-terracotta/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-terracotta/10">
        {bean.image ? (
          <img
            src={bean.image}
            alt={bean.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-ristretto/[0.06] transition-transform duration-700 ease-out-cubic group-hover:scale-[1.03]" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl leading-snug text-ristretto">{bean.name}</h3>
          {bean.isRecommended && (
            <span className="shrink-0 font-sans text-[11px] text-terracotta">Recommended</span>
          )}
        </div>

        <span className="w-fit rounded-full border border-terracotta/20 px-3 py-1 font-sans text-[11px] text-terracotta">
          {bean.roast} roast
        </span>

        <p className="font-sans text-sm leading-relaxed text-ristretto/70">{bean.description}</p>

        <p className="font-sans text-[13px] text-ristretto/50">{bean.tastingNotes.join(' · ')}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-sans text-sm text-ristretto">From ₹{startingPrice}</span>
          <span className="font-sans text-sm text-ristretto underline decoration-terracotta/40 underline-offset-4 transition-colors duration-300 group-hover:text-terracotta">
            Add
          </span>
        </div>
      </div>
    </Link>
  );
}
