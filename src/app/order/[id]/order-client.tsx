"use client";

import { use } from "react";
import Link from "next/link";
import { useStore, fmt } from "@/lib/store";

export default function OrderClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-3xl">Order not found</h1>
        <p className="mt-3 text-sm text-charcoal/60">This order was placed in another browser session. Orders are stored locally in this demo.</p>
        <Link href="/shop/all" className="mt-6 inline-block btn-primary">Back to the shop</Link>
      </div>
    );
  }

  return (
    <div className="container-x max-w-2xl py-16">
      <p className="eyebrow">Thank you</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Order {order.id} confirmed</h1>
      <p className="mt-3 text-sm text-charcoal/70">
        We&apos;ve sent a confirmation to {order.email}. Status: <span className="font-semibold">{order.status}</span>.
      </p>

      <div className="mt-8 border border-charcoal/15 bg-white/60 p-6 text-sm">
        <ul className="space-y-2">
          {order.items.map((it, i) => (
            <li key={i} className="flex justify-between">
              <span>{it.qty} × {it.name} <span className="text-charcoal/40">({it.size}, {it.color})</span></span>
              <span>{fmt(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-charcoal/15 pt-4 text-charcoal/70">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{fmt(order.subtotal)}</dd></div>
          {order.discount > 0 && <div className="flex justify-between text-forest"><dt>Discount</dt><dd>−{fmt(order.discount)}</dd></div>}
          <div className="flex justify-between"><dt>Shipping ({order.shippingMethod})</dt><dd>{order.shipping === 0 ? "Free" : fmt(order.shipping)}</dd></div>
          <div className="flex justify-between pt-2 font-semibold text-charcoal"><dt>Total</dt><dd>{fmt(order.total)}</dd></div>
        </dl>
        <div className="mt-4 border-t border-charcoal/15 pt-4 text-charcoal/70">
          <p>Ships to: {order.name}, {order.address}, {order.city} {order.postcode}</p>
          <p className="mt-1">Payment: {order.payment}</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/account" className="btn-primary">View My Orders</Link>
        <Link href="/shop/all" className="btn-outline">Keep Shopping</Link>
      </div>
    </div>
  );
}
