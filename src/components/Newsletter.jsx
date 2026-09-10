import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | subscribed

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || status !== 'idle') return;
    setStatus('loading');
    // Demo only — no real backend.
    setTimeout(() => setStatus('subscribed'), 700);
  };

  return (
    <section className="rounded-2xl border border-terracotta/15 bg-cashmere px-6 py-12 text-center sm:px-10">
      <h2 className="font-serif text-2xl italic text-ristretto">Stay in the ritual.</h2>
      <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-ristretto/70">
        The occasional note on new beans, seasonal drinks, and small-batch releases.
      </p>

      {status === 'subscribed' ? (
        <p className="mt-8 font-sans text-sm text-ristretto">
          You're on the list. See you in your inbox.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-full border border-terracotta/25 bg-parchment px-5 py-3 font-sans text-sm text-ristretto placeholder:text-ristretto/40 focus:border-terracotta/60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 rounded-full bg-ristretto px-8 py-3 font-sans text-sm text-parchment transition-colors duration-300 hover:bg-terracotta disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}
    </section>
  );
}
