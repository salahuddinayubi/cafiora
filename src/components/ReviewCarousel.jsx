import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { reviews } from '../data/menu.js';

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const goPrev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section>
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl italic text-ristretto">What people are saying</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous review"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-terracotta/20 text-ristretto transition-colors duration-300 hover:border-terracotta/50 hover:text-terracotta"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next review"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-terracotta/20 text-ristretto transition-colors duration-300 hover:border-terracotta/50 hover:text-terracotta"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviews.map((r, i) => (
          <div
            key={r.id}
            className={`rounded-2xl border bg-cashmere px-6 py-7 transition-colors duration-300 sm:block ${
              i === index ? 'border-terracotta/40' : 'border-terracotta/15'
            } ${i === index ? 'block' : 'hidden'}`}
          >
            <ReviewCardContent review={r} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewCardContent({ review }) {
  return (
    <>
      <div className="flex gap-1 text-terracotta">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.5}
            fill={i < review.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <p className="mt-4 font-sans text-sm leading-relaxed text-ristretto/80">"{review.text}"</p>
      <div className="mt-5 flex items-center gap-2">
        <span className="font-sans text-[13px] text-ristretto">{review.name}</span>
        {review.verified && (
          <span className="font-sans text-[11px] text-terracotta">Verified customer</span>
        )}
      </div>
    </>
  );
}
