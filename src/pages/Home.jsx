import { coffees, coffeeBeans, CATEGORY } from '../data/menu.js';
import ProductCard from '../components/ProductCard.jsx';
import BeanCard from '../components/BeanCard.jsx';
import FindYourCoffee from '../components/FindYourCoffee.jsx';
import ReviewCarousel from '../components/ReviewCarousel.jsx';
import Newsletter from '../components/Newsletter.jsx';
import heroImage from '../assets/hero.png';

export default function Home() {
  const premium = coffees.filter((c) => c.category === CATEGORY.PREMIUM);
  const general = coffees.filter((c) => c.category === CATEGORY.GENERAL);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      {/* Hero — asymmetrical: offset text block against a large image block */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-5 sm:pt-12">
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-terracotta">
            Specialty coffee · Roasted with intention
          </span>
          <h1 className="mt-4 font-serif text-[2.6rem] leading-[1.08] text-ristretto sm:text-[3.2rem]">
            Coffee, held to a quieter standard.
          </h1>
          <p className="mt-6 max-w-sm font-sans text-[15px] leading-relaxed text-ristretto/70">
            Small-batch beans, pulled to order, without the noise. CAFIORA is a menu built around
            restraint — fewer drinks, made with more care.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#coffee"
              className="inline-block border-b border-ristretto/30 pb-1 font-sans text-sm text-ristretto transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
            >
              Shop coffee
            </a>
            <a
              href="#menu"
              className="inline-block font-sans text-sm text-ristretto/60 transition-colors duration-300 hover:text-terracotta"
            >
              Explore the menu
            </a>
          </div>
        </div>

        <div className="sm:col-span-7">
          <div className="aspect-[16/11] w-full overflow-hidden rounded-2xl bg-terracotta/10 sm:aspect-[16/12]">
            <img
              src={heroImage}
              alt="Cafiora specialty coffee drinks"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Premium coffees */}
      <section id="coffee" className="mt-28 scroll-mt-32 sm:mt-36">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl italic text-ristretto">Signature drinks</h2>
          <span className="font-sans text-[13px] text-terracotta">{premium.length} drinks</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {premium.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* General coffees — staggered grid */}
      <section id="menu" className="mt-24 scroll-mt-32">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl italic text-ristretto">The everyday list</h2>
          <span className="font-sans text-[13px] text-terracotta">{general.length} drinks</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {general.map((product, i) => (
            <div key={product.id} className={i % 3 === 1 ? 'sm:mt-8' : ''}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Coffee beans */}
      <section id="coffee-beans" className="mt-24 scroll-mt-32">
        <div className="mb-2">
          <h2 className="font-serif text-2xl italic text-ristretto">Coffee beans</h2>
          <p className="mt-2 font-sans text-sm text-ristretto/70">For the coffee you make at home.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {coffeeBeans.map((bean) => (
            <BeanCard key={bean.id} bean={bean} />
          ))}
        </div>
      </section>

      {/* Find your coffee */}
      <section className="mt-24">
        <FindYourCoffee />
      </section>

      {/* Our Standard */}
      <section className="mt-24">
        <h2 className="font-serif text-2xl italic text-ristretto">Our standard</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: 'Carefully sourced', body: 'Direct relationships with growers, chosen for quality over volume.' },
            { title: 'Small-batch roasted', body: 'Roasted in limited runs, close to when it will actually be brewed.' },
            { title: 'Made to order', body: 'Every cup is pulled fresh for you — nothing sits, nothing batches.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-terracotta/15 bg-cashmere px-6 py-8">
              <h3 className="font-serif text-lg text-ristretto">{item.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ristretto/70">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why CAFIORA / Our Story */}
      <section id="our-story" className="mt-24 scroll-mt-32">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <h2 className="font-serif text-2xl italic text-ristretto sm:text-3xl">
              Less choice. Better coffee.
            </h2>
          </div>
          <div className="sm:col-span-7">
            <ul className="space-y-6">
              {[
                { title: 'Curated menu', body: 'We\u2019d rather do a handful of drinks exceptionally than dozens adequately.' },
                { title: 'Quality over quantity', body: 'Every ingredient is chosen because it earns its place, not to fill a menu board.' },
                { title: 'A quieter coffee experience', body: 'No rush, no rewards app buzzing at you. Just a good cup, made properly.' },
              ].map((item) => (
                <li key={item.title} className="border-b border-terracotta/15 pb-6 last:border-b-0">
                  <h3 className="font-serif text-lg text-ristretto">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ristretto/70">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-24">
        <ReviewCarousel />
      </section>

      {/* Newsletter */}
      <section className="mt-24">
        <Newsletter />
      </section>
    </div>
  );
}
