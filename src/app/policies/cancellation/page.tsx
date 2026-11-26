import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "How to cancel a Dirt and Dawn order, when cancellation is possible, and how refunds are handled.",
};

export default function CancellationPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Cancellation Policy"
      updated="26 November 2026"
      intro="We know plans change before the sun does. Here is exactly how cancelling an order with Dirt and Dawn works, and where the line sits once a parcel is on its way."
      sections={[
        {
          heading: "How to request a cancellation",
          body: [
            "Email dirtndawn@hotmail.com with your order number and the word \u201cCancellation\u201d in the subject line. Requests are handled in the order they arrive, and you receive a written confirmation when a cancellation has been actioned.",
          ],
        },
        {
          heading: "When you can cancel",
          body: [
            "An order can be cancelled while it is still in our processing queue — before it has been packed and handed to the courier. Once a tracking number has been issued, the order counts as shipped and can no longer be cancelled; you can instead return the items after delivery under our Refund & Returns Policy.",
          ],
        },
        {
          heading: "Orders already processed or shipped",
          body: [
            "If an order has already shipped when we receive your request, we will not interrupt delivery. Refuse the parcel or let it arrive and start a standard return — the same refund rules apply.",
          ],
        },
        {
          heading: "Cancellations by us",
          body: [
            "If we cancel an order — an item sold out before dispatch, a pricing error, or an address we cannot deliver to — you are refunded in full, including any shipping charge, without you needing to ask.",
          ],
        },
        {
          heading: "Refund handling",
          body: [
            "Approved cancellations are refunded to the original payment method.",
            { pending: "the refund processing timeframe for cancelled orders (to be confirmed by the business owner)." },
          ],
        },
      ]}
      related={[
        { href: "/policies/returns", label: "Refund & Returns Policy" },
        { href: "/policies/shipping", label: "Shipping & Delivery Policy" },
        { href: "/policies/payment", label: "Payment Policy" },
      ]}
    />
  );
}
