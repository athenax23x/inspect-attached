import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import { PRODUCTS, newArrivals } from "@/lib/products";
import { CATEGORIES } from "@/lib/types";

const ON_SALE = PRODUCTS.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
const LIVE_CATEGORIES = CATEGORIES.filter((c) => c.id !== "shoes");

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Image
          src="/stock/hero-trail.jpg"
          alt="Trail runner at dawn"
          width={1920}
          height={1080}
          priority
          className="h-[70vh] min-h-[480px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-x pb-16 md:pb-24 text-bone">
            <p className="eyebrow text-sand">Trail Running, Elevated</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl leading-tight">
              Find Your Ground.<br />Chase Your Dawn.
            </h1>
            <p className="mt-4 max-w-md text-bone/80 text-sm md:text-base">
              Apparel, packs and gear built for the hours when the trail is still asleep.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop/all" className="btn-light">Shop the Collection</Link>
              <Link href="/shop/equipment" className="btn border border-bone/60 text-bone hover:bg-bone hover:text-charcoal">Gear Up</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-20">
        <p className="eyebrow">The Categories</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Built for every kilometre</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {LIVE_CATEGORIES.map((c) => (
            <Link key={c.id} href={`/shop/${c.id}`} className="group relative overflow-hidden">
              <Image
                src={c.image}
                alt={c.name}
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent" />
              <div className="absolute bottom-0 p-6 text-bone">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-1 text-sm text-bone/90">{c.blurb}</p>
                <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-sand group-hover:text-bone">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* On sale — genuine discounts only */}
      <section className="container-x pb-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Priced to Move</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">On Sale</h2>
          </div>
          <Link href="/shop/sale" className="hidden md:inline text-xs font-semibold uppercase tracking-[0.15em] hover:text-earth">View all →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {ON_SALE.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} priority={i < 2} />)}
        </div>
      </section>

      {/* Brand story — neutral brand messaging */}
      <section className="bg-forest text-bone">
        <div className="container-x grid items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow text-sand">Our Story</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Built for the hour before first light</h2>
            <p className="mt-5 text-bone/80 text-sm leading-relaxed">
              Dirt and Dawn makes outdoor and trail-running gear for early starts and long days:
              honest kit designed for hard ground, changing weather and real distances — priced so
              the entry fee never outruns the trail fee.
            </p>
            <Link href="/story" className="mt-8 inline-block btn-light">Read Our Approach</Link>
          </div>
          <Image
            src="/stock/story-runner.jpg"
            alt="Runner at sunrise"
            width={900}
            height={700}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Just Landed</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">New Arrivals</h2>
          </div>
          <Link href="/shop/all" className="hidden md:inline text-xs font-semibold uppercase tracking-[0.15em] hover:text-earth">View all →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {newArrivals().slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-20">
        <div className="bg-sand-light px-6 py-16 text-center md:px-16">
          <p className="eyebrow">The Dawn Dispatch</p>
          <h2 className="mt-2 font-display text-3xl">Trail stories, route notes, early access</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-charcoal/60">One email a month. No noise, unsubscribe anytime.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
