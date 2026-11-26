import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Contact & Customer Support",
  description: "Reach Dirt and Dawn customer support: business details, email and how to get help with an order.",
};

export default function ContactPage() {
  return (
    <PolicyLayout
      eyebrow="Support"
      title="Contact & Customer Support"
      updated="26 November 2026"
      intro="Real people answer this inbox. Whether it is a question about kit, an order in flight, or a claim under warranty, here is how to reach us."
      sections={[
        {
          heading: "Customer support email",
          body: [
            "Email dirtndawn@hotmail.com — support questions, order changes, warranty claims and privacy requests all start here.",
            { pending: "customer support operating hours and expected response time, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "How to write to us",
          body: [
            "Include your order number (it looks like DD-XXXX) and the email address you ordered with — it saves a round trip. One topic per email keeps things clear.",
          ],
        },
        {
          heading: "What goes where",
          body: [
            "Orders and delivery questions — order status, address changes, tracking that has not moved.",
            "Returns and refunds — see the Refund & Returns Policy, then email us to start a return.",
            "Warranty claims — your order number, a description of the fault and a photo.",
            "Privacy requests — copies, corrections or deletion of your data under the Privacy Policy.",
          ],
        },
        {
          heading: "Before you write",
          body: [
            "Your order confirmation email contains the tracking link and your order number. Most delivery questions are answered there within minutes of the courier scanning your parcel.",
          ],
        },
      ]}
      contactHeading="Business Details"
      related={[
        { href: "/policies/shipping", label: "Shipping & Delivery Policy" },
        { href: "/policies/returns", label: "Refund & Returns Policy" },
        { href: "/policies/warranty", label: "Warranty Policy" },
      ]}
    />
  );
}
