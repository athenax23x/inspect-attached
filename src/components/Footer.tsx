import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

/* Only categories with real products are listed (the "shoes" category is
   currently empty and linked nowhere). */
const SHOP_LINKS = CATEGORIES.filter((c) => c.id !== "shoes").map((c) => ({
  label: c.name,
  href: `/shop/${c.id}`,
}));

const SUPPORT_LINKS = [
  { label: "Contact & Customer Support", href: "/policies/contact" },
  { label: "Shipping & Delivery", href: "/policies/shipping" },
  { label: "Returns & Refunds", href: "/policies/returns" },
  { label: "Cancellation Policy", href: "/policies/cancellation" },
  { label: "Warranty Policy", href: "/policies/warranty" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/policies/terms" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Cookie Policy", href: "/policies/cookies" },
  { label: "Payment Policy", href: "/policies/payment" },
];

const COL_HEAD = "text-xs font-semibold uppercase tracking-[0.2em] text-sand";
const COL_LIST = "mt-4 space-y-2 text-sm text-bone-muted";
const COL_ITEM = "hover:text-bone transition-colors";

export default function Footer() {
  return (
    <footer className="mt-24 bg-charcoal text-bone">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="font-display text-2xl">DIRT <span className="text-sand">&</span> DAWN</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-bone-muted">Built for the Outdoors</p>
          <p className="mt-4 text-sm text-bone-muted max-w-[16rem]">Find Your Ground. Chase Your Dawn.</p>
          <address className="mt-6 space-y-1 text-sm not-italic text-bone-muted">
            <p>Dirt Dawn</p>
            <p>932 Owens RD, Oxon Hill, MD 20745, United States</p>
            <p>
              <a href="mailto:dirtndawn@hotmail.com" className="hover:text-bone transition-colors">dirtndawn@hotmail.com</a>
            </p>
          </address>
        </div>

        {/* Shop */}
        <nav aria-label="Shop">
          <p className={COL_HEAD}>Shop</p>
          <ul className={COL_LIST}>
            <li><Link prefetch={false} href="/shop/all" className={COL_ITEM}>Shop All</Link></li>
            {SHOP_LINKS.map((l) => (
              <li key={l.href}><Link prefetch={false} href={l.href} className={COL_ITEM}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Customer Support */}
        <nav aria-label="Customer Support">
          <p className={COL_HEAD}>Customer Support</p>
          <ul className={COL_LIST}>
            {SUPPORT_LINKS.map((l) => (
              <li key={l.href}><Link prefetch={false} href={l.href} className={COL_ITEM}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal">
          <p className={COL_HEAD}>Legal</p>
          <ul className={COL_LIST}>
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}><Link prefetch={false} href={l.href} className={COL_ITEM}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bone/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs uppercase tracking-[0.2em] text-bone-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Dirt Dawn. All rights reserved.</p>
          <p><a href="https://dirtdawn.solutions" className="hover:text-bone transition-colors">dirtdawn.solutions</a></p>
        </div>
      </div>
    </footer>
  );
}
