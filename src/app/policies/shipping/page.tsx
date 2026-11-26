import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "Processing, tracking, delivery and lost-parcel handling for Dirt and Dawn orders.",
};

export default function ShippingPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Shipping & Delivery Policy"
      updated="26 November 2026"
      intro="Every order ships from our base in Oxon Hill, Maryland. This page covers how orders are processed, how you track them, and what happens when a parcel goes missing."
      sections={[
        {
          heading: "Order processing",
          body: [
            "Orders are packed and prepared for handover on business days after payment is confirmed. You receive a confirmation email the moment your order is received, and another with tracking when it ships.",
          ],
        },
        {
          heading: "Shipping methods and costs",
          body: [
            "The shipping options and their exact costs are shown at checkout before you pay — the final charge never changes after you confirm.",
            { pending: "shipping methods, rates and any free-shipping threshold, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Delivery estimates",
          body: [
            { pending: "delivery destinations and estimates per destination, to be confirmed by the business owner." },
            "Delivery estimates run from dispatch, not from the moment you order — the order confirmation and tracking email show the exact dates that apply to your parcel.",
          ],
        },
        {
          heading: "Tracking information",
          body: [
            "You receive a tracking link by email the moment your parcel is scanned by the courier. If tracking has not moved for several business days, contact us at dirtndawn@hotmail.com and we will chase the courier for you.",
          ],
        },
        {
          heading: "Delays and lost packages",
          body: [
            "Weather, carrier backlogs and address problems can delay a parcel beyond anyone's estimate. If a parcel is declared lost by the courier, we ship a replacement or refund the order — you do not carry the loss for a parcel that never arrived.",
          ],
        },
        {
          heading: "International shipping",
          body: [
            { pending: "whether international shipping is offered, and to which destinations, to be confirmed by the business owner." },
          ],
        },
      ]}
      related={[
        { href: "/policies/returns", label: "Refund & Returns Policy" },
        { href: "/policies/cancellation", label: "Cancellation Policy" },
        { href: "/policies/contact", label: "Contact & Customer Support" },
      ]}
    />
  );
}
