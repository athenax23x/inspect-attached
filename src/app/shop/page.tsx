import Link from "next/link";

export default function ShopIndex() {
  return (
    <div className="container-x py-10">
      <p className="eyebrow">Shop</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Shop All</h1>
      <Link href="/shop/all" className="mt-4 inline-block btn-primary">Browse the full collection</Link>
    </div>
  );
}
