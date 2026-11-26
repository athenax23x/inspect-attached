"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore, cartLinesDetailed, fmt } from "@/lib/store";

export default function CartPage() {
  const { cart, updateQty, removeLine } = useStore();
  const lines = cartLinesDetailed(cart);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl md:text-4xl">Cart</h1>

      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-charcoal/60">Your cart is empty. The trails aren&apos;t waiting.</p>
          <Link href="/shop/all" className="mt-6 inline-block btn-primary">Shop the Collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {lines.map((l, i) => (
              <div key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-5 py-6">
                <Image src={l.product.image} alt={l.product.name} width={120} height={150} className="aspect-[4/5] w-24 object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link href={`/product/${l.product.slug}`} className="text-sm font-semibold hover:text-earth">{l.product.name}</Link>
                      <p className="mt-1 text-xs text-charcoal/50">Size {l.size} · {l.color}</p>
                    </div>
                    <p className="text-sm font-semibold">{fmt(l.lineTotal)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex border border-charcoal/25">
                      <button className="px-3 py-1 hover:bg-sand-light" onClick={() => updateQty(i, l.qty - 1)}>−</button>
                      <span className="px-3 py-1 text-sm">{l.qty}</span>
                      <button className="px-3 py-1 hover:bg-sand-light" onClick={() => updateQty(i, l.qty + 1)}>+</button>
                    </div>
                    <button className="text-xs uppercase tracking-[0.15em] text-charcoal/50 hover:text-earth" onClick={() => removeLine(i)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit bg-sand-light p-6">
            <h2 className="font-display text-xl">Order Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-charcoal/60">Subtotal</dt><dd>{fmt(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal/60">Shipping</dt><dd>{subtotal >= 150 ? "Free" : "From $6.00"}</dd></div>
              <div className="flex justify-between border-t border-charcoal/15 pt-3 font-semibold"><dt>Total</dt><dd>{fmt(subtotal >= 150 ? subtotal : subtotal + 6)}</dd></div>
            </dl>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Proceed to Checkout</Link>
            <Link href="/shop/all" className="mt-3 block text-center text-xs uppercase tracking-[0.15em] text-charcoal/50 hover:text-charcoal">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
