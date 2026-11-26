import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description: "Return eligibility, the return procedure, refunds and exchanges at Dirt and Dawn.",
};

export default function ReturnsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Refund & Returns Policy"
      updated="26 November 2026"
      intro="Trail gear has to fit and it has to survive. If it does neither, we make it right — here is exactly how returns, refunds and exchanges work."
      sections={[
        {
          heading: "Return eligibility",
          body: [
            "Gear bought directly from dirtdawn.solutions can be returned within 30 days of delivery for a refund or exchange.",
          ],
        },
        {
          heading: "Product condition",
          body: [
            "Items must be unworn and unwashed, with their tags attached. Try shoes indoors on a clean floor; try kit at home, not on the trail. Returns that fail this check are sent back with a note explaining why.",
          ],
        },
        {
          heading: "How to start a return",
          body: [
            "Email dirtndawn@hotmail.com with your order number and the items you are returning. We reply with the return instructions and the address to ship to.",
          ],
        },
        {
          heading: "Refund processing",
          body: [
            "Once your return is received and checked, we refund the item value to the original payment method. Original shipping costs are refunded only where the return results from our error.",
            { pending: "the refund processing timeframe, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Exchanges",
          body: [
            "Need a different size? Ask for an exchange instead of a refund and we hold the replacement while your return is in transit, then ship it the day the return clears.",
          ],
        },
        {
          heading: "Non-returnable items",
          body: [
            "For hygiene reasons, opened consumables — nutrition, and similar products — cannot be returned unless faulty.",
          ],
        },
        {
          heading: "Damaged or incorrect orders",
          body: [
            "If an item arrives damaged or you receive the wrong thing, email us with your order number and a photo within a reasonable time after delivery. We cover return shipping and send the correct item or a full refund — your choice where both are possible.",
          ],
        },
        {
          heading: "Faulty gear after use",
          body: [
            "A fault that shows up on the trail is a warranty matter, not a return — see the Warranty Policy for coverage and how to claim.",
          ],
        },
      ]}
      related={[
        { href: "/policies/warranty", label: "Warranty Policy" },
        { href: "/policies/shipping", label: "Shipping & Delivery Policy" },
        { href: "/policies/cancellation", label: "Cancellation Policy" },
      ]}
    />
  );
}
