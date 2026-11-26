"use client";

import { useMemo, useState } from "react";
import { useStore, fmt } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";

type Tab = "overview" | "products" | "orders" | "customers";

export default function AdminPage() {
  const { orders } = useStore();
  const [tab, setTab] = useState<Tab>("overview");
  const [stock, setStock] = useState<Record<string, number>>(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]))
  );

  const stats = useMemo(() => {
    const revenue = orders.reduce((n, o) => n + o.total, 0);
    const items = orders.reduce((n, o) => n + o.items.reduce((m, i) => m + i.qty, 0), 0);
    const customers = new Set(orders.map((o) => o.email)).size;
    return { revenue, items, customers, aov: orders.length ? revenue / orders.length : 0 };
  }, [orders]);

  const lowStock = PRODUCTS.filter((p) => (stock[p.id] ?? p.stock) <= 15);

  const tabs: { k: Tab; label: string }[] = [
    { k: "overview", label: "Overview" },
    { k: "products", label: "Products" },
    { k: "orders", label: "Orders" },
    { k: "customers", label: "Customers" },
  ];

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; orders: number; spent: number }>();
    for (const o of orders) {
      const c = map.get(o.email) ?? { name: o.name, orders: 0, spent: 0 };
      c.orders += 1; c.spent += o.total;
      map.set(o.email, c);
    }
    return [...map.entries()].map(([email, c]) => ({ email, ...c }));
  }, [orders]);

  const demoCustomers = customers.length === 0
    ? [
        { email: "maya@example.com", name: "Maya Prasetyo", orders: 3, spent: 512 },
        { email: "budi@example.com", name: "Budi Santoso", orders: 1, spent: 165 },
        { email: "amara@example.com", name: "Amara Wijaya", orders: 2, spent: 298 },
      ]
    : customers;

  const demoOrders = orders.length === 0
    ? [
        { id: "DD-100241", date: "2026-11-24T02:10:00Z", email: "maya@example.com", name: "Maya Prasetyo", total: 233, status: "Shipped" as const, items: [{ name: "Summit Race Vest 12L", size: "One Size", color: "Charcoal", qty: 1, price: 165 }, { name: "Soft Flask 500 ml", size: "One Size", color: "Clear", qty: 2, price: 22 }], shippingMethod: "Express", payment: "card", address: "—", city: "—", postcode: "—", discount: 0, subtotal: 209, shipping: 14 },
        { id: "DD-100212", date: "2026-11-20T12:44:00Z", email: "budi@example.com", name: "Budi Santoso", total: 165, status: "Delivered" as const, items: [{ name: "Storm Cell Jacket", size: "M", color: "Forest", qty: 1, price: 165 }], shippingMethod: "Standard", payment: "qris", address: "—", city: "—", postcode: "—", discount: 0, subtotal: 165, shipping: 0 },
        { id: "DD-100187", date: "2026-11-17T22:03:00Z", email: "amara@example.com", name: "Amara Wijaya", total: 148, status: "Processing" as const, items: [{ name: "Dawn Chorus Cap", size: "One Size", color: "Sand", qty: 1, price: 34 }, { name: "Night Runner 800", size: "One Size", color: "Charcoal", qty: 1, price: 78 }, { name: "Merino Trail Socks (2 pack)", size: "M", color: "Sand", qty: 1, price: 26 }], shippingMethod: "Standard", payment: "gopay", address: "—", city: "—", postcode: "—", discount: 10, subtotal: 138, shipping: 6 },
      ]
    : orders;

  const shownOrders = orders.length ? orders : demoOrders;

  return (
    <div className="container-x py-12">
      <p className="eyebrow">Staff</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Admin Dashboard</h1>
      <p className="mt-2 text-xs text-charcoal/50">Demo data shown until real orders are placed in this browser.</p>

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-charcoal/10 pb-3">
        {tabs.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] ${tab === t.k ? "bg-charcoal text-bone" : "text-charcoal/60 hover:text-charcoal"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Revenue", value: fmt(stats.revenue || 263) },
              { label: "Orders", value: String(shownOrders.length) },
              { label: "Items sold", value: String(stats.items || 7) },
              { label: "Customers", value: String(stats.customers || 3) },
            ].map((s) => (
              <div key={s.label} className="bg-sand-light p-6">
                <p className="label">{s.label}</p>
                <p className="mt-2 font-display text-3xl">{s.value}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 font-display text-xl">Low stock (≤ 15)</h2>
          <ul className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10 text-sm">
            {lowStock.map((p) => (
              <li key={p.id} className="flex justify-between py-3">
                <span>{p.name}</span>
                <span className={stock[p.id] <= 10 ? "text-earth font-semibold" : "text-charcoal/60"}>{stock[p.id]} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "products" && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.15em] text-charcoal/50">
              <tr><th className="py-3">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Sales rank (reviews)</th></tr>
            </thead>
            <tbody className="divide-y divide-charcoal/10">
              {PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-semibold">{p.name}</td>
                  <td className="text-charcoal/60">{p.category}</td>
                  <td>${p.price}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={stock[p.id]}
                      onChange={(e) => setStock((s) => ({ ...s, [p.id]: Math.max(0, +e.target.value) }))}
                      className="w-20 border border-charcoal/20 px-2 py-1"
                      aria-label={`Stock for ${p.name}`}
                    />
                  </td>
                  <td className="text-charcoal/60">{p.reviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.15em] text-charcoal/50">
              <tr><th className="py-3">Order</th><th>Date</th><th>Customer</th><th>Payment</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-charcoal/10">
              {shownOrders.map((o) => (
                <tr key={o.id}>
                  <td className="py-3 font-semibold">{o.id}</td>
                  <td className="text-charcoal/60">{new Date(o.date).toLocaleDateString()}</td>
                  <td className="text-charcoal/60">{o.name}</td>
                  <td className="text-charcoal/60">{o.payment}</td>
                  <td>{fmt(o.total)}</td>
                  <td>
                    <span className={`text-xs font-semibold uppercase tracking-[0.15em] px-2 py-1 ${o.status === "Delivered" ? "text-forest bg-forest/10" : o.status === "Shipped" ? "text-earth bg-earth/10" : "bg-charcoal/10 text-charcoal/60"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "customers" && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.15em] text-charcoal/50">
              <tr><th className="py-3">Name</th><th>Email</th><th>Orders</th><th>Total spent</th></tr>
            </thead>
            <tbody className="divide-y divide-charcoal/10">
              {demoCustomers.map((c) => (
                <tr key={c.email}>
                  <td className="py-3 font-semibold">{c.name}</td>
                  <td className="text-charcoal/60">{c.email}</td>
                  <td>{c.orders}</td>
                  <td>{fmt(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
