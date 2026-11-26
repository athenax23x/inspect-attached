"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-x py-10">
      <p className="eyebrow">Saved for later</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Wishlist</h1>
      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-charcoal/60">Nothing saved yet. Tap the heart on any product.</p>
          <Link href="/shop/all" className="mt-6 inline-block btn-primary">Browse gear</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
