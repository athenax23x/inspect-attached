"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore, fmt } from "@/lib/store";
import type { Product } from "@/lib/types";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wished = wishlist.includes(product.id);
  const oneSize = product.sizes.length === 1;

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-sand-light">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={750}
            priority={priority}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-forest text-bone text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1">New</span>
          )}
          {product.compareAtPrice && (
            <span className="bg-earth text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-1">Sale</span>
          )}
        </div>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center bg-bone/90 hover:bg-bone"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "#82735f" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-8 11-8 11z" />
          </svg>
        </button>
        {!oneSize && (
          <div className="absolute inset-x-0 bottom-0 hidden group-hover:block">
            <div className="flex bg-charcoal/90 text-bone text-xs">
              {product.sizes.slice(0, 6).map((s) => (
                <button
                  key={s}
                  className="flex-1 py-2.5 hover:bg-forest"
                  onClick={() => addToCart({ productId: product.id, size: s, color: product.colors[0], qty: 1 })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`} className="text-sm font-semibold hover:text-earth">
            {product.name}
          </Link>
          <p className="text-xs text-charcoal/50 mt-0.5">{product.subcategory}</p>
        </div>
        <div className="text-sm whitespace-nowrap">
          <span className={product.compareAtPrice ? "text-earth" : ""}>{fmt(product.price)}</span>
          {product.compareAtPrice && (
            <span className="ml-2 text-xs text-charcoal/40 line-through">{fmt(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
      {oneSize && (
        <button
          className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-forest hover:text-earth"
          onClick={() => addToCart({ productId: product.id, size: product.sizes[0], color: product.colors[0], qty: 1 })}
        >
          Add to cart +
        </button>
      )}
    </div>
  );
}
