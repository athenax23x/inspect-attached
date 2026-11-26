import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Delivery times, costs and coverage for Dirt and Dawn orders across Indonesia.",
};

export default function ShippingPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Shipping Policy"
      updated="1 November 2026"
      intro="Every order ships from Bandung, West Java, within 48 hours. Orders over $150 ship free; the code DAWN10 does not affect shipping cost."
      sections={[
        {
          heading: "Destinations and timing",
          body: [
            "Java: 1\u20132 business days. Sumatra, Kalimantan, Sulawesi, Bali and Nusa Tenggara: 3\u20135 business days. Maluku and Papua: 5\u20138 business days.",
            "\u201c48 hours\u201d means from payment confirmation to hand-over to the courier, not door-to-door time.",
          ],
        },
        {
          heading: "Costs",
          body: [
            "Standard shipping is a flat $8 across Indonesia, free on orders of $150 or more after discounts. You will see the final shipping cost at checkout before you pay.",
          ],
        },
        {
          heading: "Tracking",
          body: [
            "You receive a tracking link by email the moment your parcel is scanned by the courier. If tracking has not moved for 5 days, contact support@dirtanddawn.com and we will chase the courier for you.",
          ],
        },
        {
          heading: "Failed delivery",
          body: [
            "The courier attempts delivery three times before returning a parcel to us. We will contact you to arrange reshipping; a second shipping fee applies only if the original address was wrong.",
          ],
        },
        {
          heading: "Damage in transit",
          body: [
            "If a parcel arrives damaged, photograph it before opening if you can, and email us within 7 days. We replace damaged items at our cost, including shipping.",
          ],
        },
      ]}
    />
  );
}
