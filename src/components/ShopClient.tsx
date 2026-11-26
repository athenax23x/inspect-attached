"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { SUBCATEGORIES, type Category } from "@/lib/types";

const SORTS = {
  featured: "Featured",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  newest: "Newest",
  rating: "Top Rated",
} as const;
type Sort = keyof typeof SORTS;

export default function ShopClient({ category }: { category: Category | "all" }) {
  const [sub, setSub] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState(250);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSub = (s: string) =>
    setSub((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => (category === "all" ? true : p.category === category));
    if (sub.length) list = list.filter((p) => sub.includes(p.subcategory));
    list = list.filter((p) => p.price <= maxPrice);
    if (onlyNew) list = list.filter((p) => p.isNew);
    if (onlySale) list = list.filter((p) => p.compareAtPrice);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => (p.name + " " + p.subcategory + " " + p.description).toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "newest": list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false)); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [category, sub, maxPrice, onlyNew, onlySale, query, sort]);

  const subs = category === "all" ? Object.values(SUBCATEGORIES).flat() : SUBCATEGORIES[category];
  const title = category === "all" ? "Shop All" : category[0].toUpperCase() + category.slice(1);

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <p className="label mb-3">Search</p>
        <input className="input" placeholder="Search gear…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div>
        <p className="label mb-3">Category</p>
        <div className="space-y-2 text-sm">
          {subs.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={sub.includes(s)} onChange={() => toggleSub(s)} className="accent-forest" />
              {s}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="label mb-3">Max price: ${maxPrice}</p>
        <input type="range" min={20} max={250} step={5} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-forest" />
      </div>
      <div className="space-y-2 text-sm">
        <p className="label mb-3">Availability</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} className="accent-forest" /> New arrivals
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onlySale} onChange={(e) => setOnlySale(e.target.checked)} className="accent-forest" /> On sale
        </label>
      </div>
      <button
        className="text-xs font-semibold uppercase tracking-[0.15em] text-earth hover:text-charcoal"
        onClick={() => { setSub([]); setMaxPrice(250); setOnlyNew(false); setOnlySale(false); setQuery(""); }}
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="container-x py-10">
      <p className="eyebrow">Shop</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button className="md:hidden btn-outline py-2" onClick={() => setFiltersOpen(!filtersOpen)}>
          {filtersOpen ? "Hide filters" : "Filters"}
        </button>
        <p className="text-sm text-charcoal/50">{results.length} products</p>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input py-2 w-auto text-sm">
          {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className={filtersOpen ? "block" : "hidden md:block"}>{filterPanel}</aside>
        <div>
          {results.length === 0 ? (
            <p className="text-sm text-charcoal/50 py-16 text-center">No gear matches those filters. Try widening the price range.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {results.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 3} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
