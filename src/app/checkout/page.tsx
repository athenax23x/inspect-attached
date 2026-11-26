"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, cartLinesDetailed, fmt } from "@/lib/store";
import { discountCodes, SHIPPING_METHODS } from "@/lib/products";

export default function CheckoutPage() {
  const { cart, user, clearCart, placeOrder } = useStore();
  const lines = cartLinesDetailed(cart);
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name ?? "", email: user?.email ?? "", address: "", city: "", postcode: "",
  });
  const [shipping, setShipping] = useState<keyof typeof SHIPPING_METHODS>("standard");
  const [payment, setPayment] = useState("card");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; rate: number } | null>(null);
  const [codeError, setCodeError] = useState("");
  const [placing, setPlacing] = useState(false);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
    const discount = applied ? subtotal * applied.rate : 0;
    const ship = SHIPPING_METHODS[shipping].price;
    return { subtotal, discount, shipping: subtotal >= 150 && shipping === "standard" ? 0 : ship, total: subtotal - discount + (subtotal >= 150 && shipping === "standard" ? 0 : ship) };
  }, [lines, applied, shipping]);

  const applyCode = () => {
    const rate = discountCodes[code.trim().toUpperCase()];
    if (rate) { setApplied({ code: code.trim().toUpperCase(), rate }); setCodeError(""); }
    else setCodeError("That code isn't valid.");
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setPlacing(true);
    const order = {
      id: `DD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      email: form.email,
      name: form.name,
      address: form.address,
      city: form.city,
      postcode: form.postcode,
      shippingMethod: SHIPPING_METHODS[shipping].label,
      payment,
      items: lines.map((l) => ({ name: l.product.name, size: l.size, color: l.color, qty: l.qty, price: l.product.price })),
      subtotal: totals.subtotal, discount: totals.discount, shipping: totals.shipping, total: totals.total,
      status: "Processing" as const,
    };
    placeOrder(order);
    clearCart();
    router.push(`/order/${order.id}`);
  };

  if (lines.length === 0 && !placing) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to check out</h1>
        <p className="mt-3 text-charcoal/60 text-sm">Your cart is empty.</p>
        <Link href="/shop/all" className="mt-6 inline-block btn-primary">Shop the Collection</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="font-display text-3xl md:text-4xl">Checkout</h1>
      <form onSubmit={submit} className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl">1 · Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><label className="label">Full name</label><input required className="input mt-1" value={form.name} onChange={set("name")} /></div>
              <div><label className="label">Email</label><input required type="email" className="input mt-1" value={form.email} onChange={set("email")} /></div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl">2 · Shipping</h2>
            <div className="mt-4 space-y-4">
              <div><label className="label">Address</label><input required className="input mt-1" value={form.address} onChange={set("address")} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label">City</label><input required className="input mt-1" value={form.city} onChange={set("city")} /></div>
                <div><label className="label">Postcode</label><input required className="input mt-1" value={form.postcode} onChange={set("postcode")} /></div>
              </div>
              <div>
                <label className="label">Method</label>
                <div className="mt-2 space-y-2">
                  {Object.entries(SHIPPING_METHODS).map(([k, m]) => (
                    <label key={k} className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm ${shipping === k ? "border-charcoal bg-sand-light" : "border-charcoal/20"}`}>
                      <span className="flex items-center gap-3">
                        <input type="radio" name="shipping" checked={shipping === k} onChange={() => setShipping(k as keyof typeof SHIPPING_METHODS)} />
                        {m.label}
                      </span>
                      <span>{fmt(m.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl">3 · Payment</h2>
            <p className="mt-2 text-xs text-charcoal/50">Demo store — no payment is processed. Card fields are placeholders.</p>
            <div className="mt-4 space-y-2">
              {[
                { k: "card", label: "Credit / Debit Card (Stripe-ready)" },
                { k: "qris", label: "QRIS" },
                { k: "gopay", label: "GoPay" },
                { k: "transfer", label: "Bank Transfer" },
              ].map((o) => (
                <label key={o.k} className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${payment === o.k ? "border-charcoal bg-sand-light" : "border-charcoal/20"}`}>
                  <input type="radio" name="payment" checked={payment === o.k} onChange={() => setPayment(o.k)} />
                  {o.label}
                </label>
              ))}
            </div>
            {payment === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <input placeholder="Card number" className="input sm:col-span-3" inputMode="numeric" />
                <input placeholder="MM / YY" className="input" inputMode="numeric" />
                <input placeholder="CVC" className="input" inputMode="numeric" />
                <input placeholder="ZIP" className="input" inputMode="numeric" />
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit bg-sand-light p-6">
          <h2 className="font-display text-xl">Your Order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={`${l.productId}-${l.size}-${l.color}`} className="flex justify-between gap-3">
                <span className="text-charcoal/70">{l.qty} × {l.product.name} <span className="text-charcoal/40">({l.size})</span></span>
                <span>{fmt(l.lineTotal)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-2">
            <input placeholder="Discount code" className="input" value={code} onChange={(e) => setCode(e.target.value)} />
            <button type="button" onClick={applyCode} className="btn-outline px-4 py-2">Apply</button>
          </div>
          {codeError && <p className="mt-2 text-xs text-earth">{codeError}</p>}
          {applied && <p className="mt-2 text-xs text-forest">{applied.code} applied — {Math.round(applied.rate * 100)}% off.</p>}

          <dl className="mt-5 space-y-2 border-t border-charcoal/15 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-charcoal/60">Subtotal</dt><dd>{fmt(totals.subtotal)}</dd></div>
            {totals.discount > 0 && <div className="flex justify-between text-forest"><dt>Discount</dt><dd>−{fmt(totals.discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-charcoal/60">Shipping</dt><dd>{totals.shipping === 0 ? "Free" : fmt(totals.shipping)}</dd></div>
            <div className="flex justify-between border-t border-charcoal/15 pt-2 text-base font-semibold"><dt>Total</dt><dd>{fmt(totals.total)}</dd></div>
          </dl>
          <button className="btn-primary mt-6 w-full">Place Order</button>
        </aside>
      </form>
    </div>
  );
}
