import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Payment Policy",
  description: "Accepted payment methods, authorisation, failed transactions and payment security at Dirt and Dawn.",
};

export default function PaymentPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Payment Policy"
      updated="26 November 2026"
      intro="How payment works at Dirt and Dawn: what you can pay with, when money is taken, what happens when a transaction fails, and how your details are protected."
      sections={[
        {
          heading: "Accepted payment methods",
          body: [
            "Major payment cards are accepted. Card payments are processed on our behalf by NMI (Network Merchants Inc.), our payment provider.",
            { pending: "the definitive list of accepted payment methods (card networks, digital wallets, bank transfer), to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Currency, pricing and taxes",
          body: [
            "Prices are displayed in the currency shown on each product page, with the final total — including shipping and any applicable taxes — shown at checkout before you confirm payment.",
            { pending: "the applicable sales-tax treatment and who bears it, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Payment authorisation and processing",
          body: [
            "When you place an order, your card is authorised first and charged when the order is confirmed for dispatch. Card details are collected and processed by our payment provider on secure pages; they never reach Dirt and Dawn's servers or staff.",
          ],
        },
        {
          heading: "Failed transactions",
          body: [
            "If a payment is declined, no order is created and you are not charged. Check the card details and billing address, or try another card. If you believe you were charged but see no order, email dirtndawn@hotmail.com with the time of payment and we will trace it.",
          ],
        },
        {
          heading: "Refund processing",
          body: [
            "Approved refunds are always returned to the original payment method — never to a different card or account.",
            { pending: "the refund processing timeframe, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Payment security",
          body: [
            "Checkout runs over an encrypted connection, and payment is handled by a third-party provider that specialises in card processing. We never store full card numbers, and no one at Dirt and Dawn can see them.",
          ],
        },
      ]}
      related={[
        { href: "/policies/cancellation", label: "Cancellation Policy" },
        { href: "/policies/returns", label: "Refund & Returns Policy" },
        { href: "/policies/terms", label: "Terms & Conditions" },
      ]}
    />
  );
}
