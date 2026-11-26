"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore, fmt } from "@/lib/store";

export default function AccountPage() {
  const { user, login, logout, orders, wishlist } = useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    const submit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
      login({ name: mode === "register" ? name : email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()), email });
    };
    return (
      <div className="container-x max-w-md py-16">
        <h1 className="font-display text-3xl">{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-charcoal/60">Demo auth — accounts are stored in this browser only.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "register" && (
            <div><label className="label">Full name</label><input required className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} /></div>
          )}
          <div><label className="label">Email</label><input required type="email" className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><label className="label">Password</label><input required type="password" className="input mt-1" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          {error && <p className="text-xs text-earth">{error}</p>}
          <button className="btn-primary w-full">{mode === "login" ? "Sign in" : "Create account"}</button>
        </form>
        <button
          className="mt-4 text-xs uppercase tracking-[0.15em] text-charcoal/50 hover:text-charcoal"
          onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
        >
          {mode === "login" ? "No account? Register" : "Have an account? Sign in"}
        </button>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Account</p>
          <h1 className="mt-2 font-display text-3xl">Hi, {user.name.split(" ")[0]}</h1>
          <p className="text-sm text-charcoal/60">{user.email}</p>
        </div>
        <button onClick={logout} className="text-xs uppercase tracking-[0.15em] text-charcoal/50 hover:text-earth">Sign out</button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="bg-sand-light p-6">
          <p className="label">Orders placed</p>
          <p className="mt-2 font-display text-3xl">{orders.length}</p>
          <Link href="#orders" className="mt-2 inline-block text-xs uppercase tracking-[0.15em] hover:text-earth">View ↓</Link>
        </div>
        <div className="bg-sand-light p-6">
          <p className="label">Wishlist items</p>
          <p className="mt-2 font-display text-3xl">{wishlist.length}</p>
          <Link href="/wishlist" className="mt-2 inline-block text-xs uppercase tracking-[0.15em] hover:text-earth">View →</Link>
        </div>
        <div className="bg-sand-light p-6">
          <p className="label">Member since</p>
          <p className="mt-2 font-display text-3xl">2026</p>
          <p className="mt-2 text-xs text-charcoal/50">Dawn Patrol member</p>
        </div>
      </div>

      <section id="orders" className="mt-14">
        <h2 className="font-display text-2xl">Order History</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-charcoal/60">No orders yet. <Link href="/shop/all" className="underline hover:text-earth">Start shopping</Link>.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((o) => (
              <details key={o.id} className="border border-charcoal/15 bg-white/60 p-5">
                <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="font-semibold">{o.id} · {new Date(o.date).toLocaleDateString()}</span>
                  <span className="text-charcoal/60">{o.items.length} items · {fmt(o.total)}</span>
                  <span className="bg-forest/10 text-forest text-xs font-semibold uppercase tracking-[0.15em] px-2 py-1">{o.status}</span>
                </summary>
                <ul className="mt-4 space-y-1 text-sm text-charcoal/70">
                  {o.items.map((it, i) => (
                    <li key={i}>{it.qty} × {it.name} <span className="text-charcoal/40">({it.size}, {it.color})</span></li>
                  ))}
                </ul>
                <Link href={`/order?id=${o.id}`} className="mt-3 inline-block text-xs uppercase tracking-[0.15em] text-earth hover:text-charcoal">Full details →</Link>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
