import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Warranty Policy",
  description: "What the Dirt and Dawn gear warranty covers, what it excludes, and how to make a claim.",
};

export default function WarrantyPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Warranty Policy"
      updated="26 November 2026"
      intro="Trail gear should survive the trails. Every Dirt and Dawn product is covered against defects in materials and workmanship — here is what that means in practice."
      sections={[
        {
          heading: "What the warranty covers",
          body: [
            "Dirt and Dawn products are warranted against defects in materials and workmanship under normal use — seams that split, zips that fail, straps or buckles that break when the product is used for what it was built.",
            { pending: "the warranty duration and whether it differs by product category, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "What the warranty excludes",
          body: [
            "Normal wear and tear — scuffed fabric, worn tread, faded colour, pilling. Damage from misuse, accidents, improper washing or storage, and modifications. Items bought second-hand or from anyone other than dirtdawn.solutions are not covered.",
          ],
        },
        {
          heading: "How to make a claim",
          body: [
            "Email dirtndawn@hotmail.com with your order number, a description of the fault, and a photo of the problem. We reply with the next step: a repair, a replacement, or a refund where neither is possible.",
          ],
        },
        {
          heading: "Proof of purchase",
          body: [
            "Your order number from dirtdawn.solutions is your proof of purchase — no receipt gymnastics. Claims without an order number cannot be verified and cannot be processed.",
          ],
        },
        {
          heading: "Repairs and replacements",
          body: [
            "Where a fault is confirmed as covered, we fix it at our cost, or replace the item with the same or an equivalent product if a repair is not possible. If neither repair nor replacement is available, you receive a refund of the purchase price.",
          ],
        },
      ]}
      related={[
        { href: "/policies/returns", label: "Refund & Returns Policy" },
        { href: "/policies/shipping", label: "Shipping & Delivery Policy" },
      ]}
    />
  );
}
