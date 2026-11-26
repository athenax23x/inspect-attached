import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dirtanddawn.example.com";
  return [
    "",
    "/shop/all",
    "/shop/apparel",
    "/shop/equipment",
    "/shop/accessories",
    "/story",
    "/cart",
    ...PRODUCTS.map((p) => `/product/${p.slug}`),
  ].map((path) => ({ url: base + path, lastModified: new Date() }));
}
