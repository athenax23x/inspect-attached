import Image from "next/image";
import Link from "next/link";

const CARD_BRANDS = [
  { src: "/icons/simple-icons-visa-f4f2ec.svg", alt: "Visa" },
  { src: "/icons/simple-icons-mastercard-f4f2ec.svg", alt: "Mastercard" },
  { src: "/icons/simple-icons-americanexpress-f4f2ec.svg", alt: "American Express" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-charcoal text-bone">
      <div className="container-x grid gap-12 py-16 md:grid-cols-5">
        <div>
          <p className="font-display text-xl">DIRT <span className="text-sand">&</span> DAWN</p>
          <p className="mt-3 text-sm text-bone/60">Find Your Ground. Chase Your Dawn.</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-bone/60">© 2026 Dirt and Dawn</p>
          <div className="mt-6 flex items-center gap-3" aria-label="Accepted payment methods">
            <p className="sr-only">We accept Visa, Mastercard and American Express.</p>
            {CARD_BRANDS.map((card) => (
              <Image key={card.alt} src={card.src} alt={card.alt} width={40} height={26}
                className="h-6 w-auto opacity-80" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-bone/70">
            <li><Link href="/shop/apparel" className="hover:text-bone">Apparel</Link></li>
            <li><Link href="/shop/equipment" className="hover:text-bone">Equipment</Link></li>
            <li><Link href="/shop/accessories" className="hover:text-bone">Accessories</Link></li>
            <li><Link href="/shop/all" className="hover:text-bone">Shop All</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-bone/70">
            <li><Link href="/story" className="hover:text-bone">Our Story</Link></li>
            <li><Link href="/account" className="hover:text-bone">Account</Link></li>
            <li><Link href="/admin" className="hover:text-bone">Admin</Link></li>
            <li><Link href="/story#contact" className="hover:text-bone">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Legal</p>
          <ul className="mt-4 space-y-2 text-sm text-bone/70">
            <li><Link href="/policies/terms" className="hover:text-bone">Terms &amp; Conditions</Link></li>
            <li><Link href="/policies/privacy" className="hover:text-bone">Privacy Policy</Link></li>
            <li><Link href="/policies/shipping" className="hover:text-bone">Shipping Policy</Link></li>
            <li><Link href="/policies/returns" className="hover:text-bone">Refund &amp; Returns Policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand">Newsletter</p>
          <p className="mt-4 text-sm text-bone/70">Trail stories and early access. One email a month.</p>
          <form className="mt-4 flex" action="/story">
            <input type="email" required placeholder="you@email.com" className="flex-1 bg-transparent border border-bone/30 px-4 py-3 text-sm outline-none placeholder:text-bone/40 focus:border-sand" />
            <button className="bg-bone text-charcoal px-4 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-sand">Join</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
