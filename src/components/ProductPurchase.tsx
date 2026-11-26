"use client";

import { useState } from "react";
import { useStore, fmt } from "@/lib/store";
import type { Product } from "@/lib/types";

export default function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const wished = wishlist.includes(product.id);

  const add = () => {
    if (!size) { setSizeError(true); return; }
    addToCart({ productId: product.id, size, color, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="label">Size</p>
          <button className="text-xs underline text-charcoal/60 hover:text-charcoal" onClick={() => setGuideOpen(!guideOpen)}>
            Size guide
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setSizeError(false); }}
              className={`min-w-12 border px-4 py-2 text-sm ${size === s ? "border-charcoal bg-charcoal text-bone" : "border-charcoal/25 hover:border-charcoal"}`}
            >
              {s}
            </button>
          ))}
        </div>
        {sizeError && <p className="mt-2 text-xs text-earth">Please choose a size first.</p>}
        {guideOpen && (
          <div className="mt-3 border border-charcoal/15 bg-white/60 p-4 text-xs text-charcoal/70">
            <p className="font-semibold uppercase tracking-[0.15em] mb-2">Size guide</p>
            <table className="w-full text-left">
              <thead><tr className="text-charcoal/50"><th className="py-1">Size</th><th>Chest (cm)</th><th>Waist (cm)</th></tr></thead>
              <tbody>
                <tr><td className="py-1">XS</td><td>84–88</td><td>70–74</td></tr>
                <tr><td className="py-1">S</td><td>88–94</td><td>74–80</td></tr>
                <tr><td className="py-1">M</td><td>94–100</td><td>80–86</td></tr>
                <tr><td className="py-1">L</td><td>100–106</td><td>86–92</td></tr>
                <tr><td className="py-1">XL</td><td>106–112</td><td>92–98</td></tr>
              </tbody>
            </table>
            <p className="mt-2">Between sizes? Trail kit fits true — size up only for cold-weather layering.</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="label">Colour — {color}</p>
        <div className="mt-2 flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`border px-4 py-2 text-sm ${color === c ? "border-charcoal bg-charcoal text-bone" : "border-charcoal/25 hover:border-charcoal"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex border border-charcoal/25">
          <button className="px-4 py-2 hover:bg-sand-light" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span className="px-4 py-2 text-sm">{qty}</span>
          <button className="px-4 py-2 hover:bg-sand-light" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <p className="text-sm text-charcoal/50">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn-primary flex-1" onClick={add} disabled={product.stock === 0}>
          {added ? "Added ✓" : "Add to Cart"}
        </button>
        <button className="btn-outline" onClick={() => toggleWishlist(product.id)} aria-label="Wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "#82735f" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-8 11-8 11z" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-xs text-charcoal/50">
        {fmt(product.price)} · Shipping rates at checkout · 30-day returns
      </p>
    </div>
  );
}
