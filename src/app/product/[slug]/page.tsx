import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, productBySlug } from "@/lib/products";
import ProductPurchase from "@/components/ProductPurchase";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-x py-10">
      <nav className="text-xs uppercase tracking-[0.15em] text-charcoal/50 flex flex-wrap items-center gap-y-1">
        <Link href="/shop/all" className="hover:text-charcoal">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-charcoal">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <Image
            src={product.image}
            alt={product.name}
            width={1000}
            height={1250}
            priority
            className="aspect-[4/5] w-full object-cover bg-sand-light"
          />
        </div>

        <div>
          <p className="eyebrow">{product.subcategory}</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xl">{product.compareAtPrice ? (
              <><span className="text-earth">{`$${product.price}`}</span><span className="ml-2 text-sm text-charcoal/40 line-through">{`$${product.compareAtPrice}`}</span></>
            ) : `$${product.price}`}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-charcoal/80">{product.description}</p>
          <ProductPurchase product={product} />
          {product.details.length > 0 && (
            <div className="mt-10 border-t border-charcoal/10 pt-6">
              <p className="label mb-3">Details</p>
              <ul className="space-y-2 text-sm text-charcoal/75">
                {product.details.map((d) => <li key={d} className="flex gap-2"><span className="text-earth">—</span>{d}</li>)}
              </ul>
            </div>
          )}
          <div className="mt-6 border-t border-charcoal/10 pt-6 text-sm text-charcoal/70 space-y-1 leading-relaxed">
            <p>Shipping options and rates are shown at checkout. We ship internationally.</p>
            <p>
              30-day returns — see{" "}
              <Link href="/policies/returns" className="underline hover:text-charcoal">Returns &amp; Refunds</Link>
              {" "}and{" "}
              <Link href="/policies/shipping" className="underline hover:text-charcoal">Shipping &amp; Delivery</Link>.
            </p>
          </div>
          {product.sourcingNote && (
            <div className="mt-6 border border-charcoal/15 bg-sand-light p-4 text-xs leading-relaxed text-charcoal/70">
              <strong className="font-semibold">Note:</strong> {product.sourcingNote}
            </div>
          )}
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl md:text-3xl">Pairs well with</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
