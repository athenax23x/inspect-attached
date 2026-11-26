import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Sale",
  description: "Dirt and Dawn gear on sale right now.",
};

export default function SalePage() {
  return <ShopClient category="all" title="Sale" initialOnlySale />;
}
