"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const LINKS = [
  { href: "/shop/apparel", label: "Apparel" },
  { href: "/shop/equipment", label: "Equipment" },
  { href: "/shop/accessories", label: "Accessories" },
  { href: "/shop/all", label: "Shop All" },
  { href: "/story", label: "Our Story" },
];

export default function Header() {
  const { cartCount, wishlist, user } = useStore();
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <>
      <div className="bg-charcoal text-bone text-center text-[11px] uppercase tracking-[0.2em] py-2 px-4">
        Free shipping over $150 · Code DAWN10 for 10% off
      </div>
      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-bone/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button
            aria-label="Menu"
            className="md:hidden p-2 -ml-2"
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 1h20M0 7h20M0 13h20" />
            </svg>
          </button>

          <Link href="/" className="font-display text-xl tracking-wide">
            DIRT <span className="text-earth">&</span> DAWN
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em]">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={activePath === l.href ? "text-forest" : "hover:text-earth"}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/account" aria-label="Account" className="hover:text-earth">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              {user && <span className="hidden lg:inline ml-1 text-xs">{user.name.split(" ")[0]}</span>}
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="hover:text-earth relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-8 11-8 11z"/></svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-earth text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{wishlist.length}</span>
              )}
            </Link>
            <Link href="/cart" aria-label="Cart" className="hover:text-earth relative">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 016 0"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-forest text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {open && (
          <nav className="md:hidden border-t border-charcoal/10 bg-bone px-6 py-4 flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.15em]">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
