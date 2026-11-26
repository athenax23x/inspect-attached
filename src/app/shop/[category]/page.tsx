import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import type { Category } from "@/lib/types";

const VALID: Category[] = ["apparel", "equipment", "accessories"];

export async function generateStaticParams() {
  return [...VALID, "all"].map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const t = category === "all" ? "Shop All" : category[0].toUpperCase() + category.slice(1);
  return { title: t };
}

export default async function ShopPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const valid = (VALID as string[]).includes(category) ? (category as Category) : "all";
  return <ShopClient category={valid} />;
}
