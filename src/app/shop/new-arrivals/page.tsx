import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest gear from Dirt and Dawn.",
};

export default function NewArrivalsPage() {
  return <ShopClient category="all" title="New Arrivals" initialSort="newest" initialOnlyNew />;
}
