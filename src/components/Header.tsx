"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/types";

/* Shop menu: only links backed by real, non-empty categories.
   ("Shoes" has no products yet; "Hydration" and "Trail/Trekking" share the
   equipment category, so they get one merged entry.)
   "Activities" and "Collections" land on pages that exist today. */
const SHOP_MENU: { label: string; href: string; blurb: string }[] = [
  { label: "Shop All", href: "/shop/all", blurb: "Everything, in one place" },
  { label: "Running Apparel", href: "/shop/apparel", blurb: "Tees, shorts & shells" },
  { label: "Hydration & Trail Gear", href: "/shop/equipment", blurb: "Race vests, packs & poles" },
  { label: "Tracking & Navigation", href: "/shop/electronics", blurb: "GPS watches & heart rate" },
  { label: "Lighting & Visibility", href: "/shop/lighting", blurb: "Headlamps & reflective" },
  { label: "Running Accessories", href: "/shop/accessories", blurb: "Headwear, eyewear & socks" },
  { label: "Nutrition & Fuel", href: "/shop/nutrition", blurb: "Gels & electrolytes" },
  { label: "Recovery & Training", href: "/shop/recovery", blurb: "Rollers & massage" },
];

const ACTIVITIES = [
  { label: "Road Running", href: "/shop/apparel" },
  { label: "Trail Running", href: "/shop/equipment" },
  { label: "Trekking", href: "/shop/equipment" },
  { label: "Outdoor Training", href: "/shop/recovery" },
];

const COLLECTIONS = [
  { label: "New Arrivals", href: "/shop/new-arrivals" },
  { label: "Sale", href: "/shop/sale" },
];

const UTILITY = "p-2 hover:text-earth transition-colors";

export default function Header() {
  const { cartCount, wishlist, user } = useStore();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    // Intentional: the pathname is only known on the client in the static export.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActivePath(window.location.pathname);
  }, []);

  const isActive = (href: string) => activePath === href;

  return (
    <>
      {/* Announcement bar — only verified info. DAWN10 (10% off, any order, no expiry) is a real code in the store. */}
      <div className="bg-charcoal text-bone text-center text-[11px] uppercase tracking-[0.2em] py-2 px-4">
        Code <span className="font-bold">DAWN10</span> — 10% off your order
      </div>

      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-bone/90 backdrop-blur" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden p-2 -ml-2"
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 1h20M0 7h20M0 13h20" />
            </svg>
          </button>

          {/* Wordmark + tagline */}
          <Link href="/" className="flex flex-col items-center leading-none md:flex-row md:gap-3">
            <span className="whitespace-nowrap font-display text-lg md:text-3xl tracking-[0.08em]">
              DIRT <span className="text-earth">&</span> DAWN
            </span>
            <span className="mt-1 hidden md:block text-[10px] uppercase tracking-[0.35em] text-charcoal/50">
              Built for the Outdoors
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em]"
            onMouseLeave={() => setOpenMenu(null)}
            onKeyDown={(e) => { if (e.key === "Escape") setOpenMenu(null); }}
          >
            <div className="relative" onMouseEnter={() => setOpenMenu("shop")}>
              <button
                className={`flex items-center gap-1 ${openMenu === "shop" || activePath.startsWith("/shop") ? "text-forest" : "hover:text-earth"}`}
                aria-expanded={openMenu === "shop"}
                aria-haspopup="true"
                onClick={() => setOpenMenu("shop")}
              >
                Shop
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l3.5 4L8 1"/></svg>
              </button>
              {openMenu === "shop" && (
                <div className="absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 pt-4">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 rounded-sm border border-charcoal/10 bg-bone p-6 shadow-lg">
                    {SHOP_MENU.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group rounded px-3 py-2 hover:bg-sand-light"
                        onClick={() => setOpenMenu(null)}
                      >
                        <span className="block text-[11px] font-semibold tracking-[0.12em] group-hover:text-earth">{item.label}</span>
                        <span className="block text-[10px] normal-case tracking-normal text-charcoal/50">{item.blurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setOpenMenu("activities")}>
              <button
                className={`flex items-center gap-1 ${openMenu === "activities" ? "text-forest" : "hover:text-earth"}`}
                aria-expanded={openMenu === "activities"}
                aria-haspopup="true"
                onClick={() => setOpenMenu("activities")}
              >
                Activities
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l3.5 4L8 1"/></svg>
              </button>
              {openMenu === "activities" && (
                <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-4">
                  <div className="rounded-sm border border-charcoal/10 bg-bone p-4 shadow-lg">
                    {ACTIVITIES.map((item) => (
                      <Link key={item.label} href={item.href} className="block rounded px-3 py-2 hover:bg-sand-light" onClick={() => setOpenMenu(null)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setOpenMenu("collections")}>
              <button
                className={`flex items-center gap-1 ${openMenu === "collections" ? "text-forest" : "hover:text-earth"}`}
                aria-expanded={openMenu === "collections"}
                aria-haspopup="true"
                onClick={() => setOpenMenu("collections")}
              >
                Collections
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l3.5 4L8 1"/></svg>
              </button>
              {openMenu === "collections" && (
                <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-4">
                  <div className="rounded-sm border border-charcoal/10 bg-bone p-4 shadow-lg">
                    {COLLECTIONS.map((item) => (
                      <Link key={item.label} href={item.href} className="block rounded px-3 py-2 hover:bg-sand-light" onClick={() => setOpenMenu(null)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/story" className={isActive("/story") ? "text-forest" : "hover:text-earth"}>Our Story</Link>
          </nav>

          {/* Utility icons — one consistent stroke family */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link href="/shop/all" aria-label="Search products" title="Search" className={UTILITY}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
            </Link>
            <Link href="/account" aria-label="Account" title="Account" className={UTILITY}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </Link>
            <Link href="/wishlist" aria-label={`Wishlist${wishlist.length ? ` (${wishlist.length} items)` : ""}`} title="Wishlist" className={`${UTILITY} relative`}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-8 11-8 11z"/></svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-earth text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{wishlist.length}</span>
              )}
            </Link>
            <Link href="/cart" aria-label={`Shopping bag${cartCount ? ` (${cartCount} items)` : ""}`} title="Shopping bag" className={`${UTILITY} relative`}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 016 0"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-forest text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden border-t border-charcoal/10 bg-bone px-6 py-4 flex flex-col gap-3 text-sm font-semibold uppercase tracking-[0.15em]" aria-label="Mobile">
            <span className="label">Shop</span>
            {SHOP_MENU.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="pl-2">{item.label}</Link>
            ))}
            <span className="label mt-2">Collections</span>
            {COLLECTIONS.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="pl-2">{item.label}</Link>
            ))}
            <span className="label mt-2">Activities</span>
            {ACTIVITIES.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="pl-2">{item.label}</Link>
            ))}
            <Link href="/story" onClick={() => setOpen(false)} className="mt-2">Our Story</Link>
          </nav>
        )}
      </header>
    </>
  );
}
