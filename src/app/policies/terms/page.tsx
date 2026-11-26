import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of dirtdawn.solutions and every purchase you make there.",
};

export default function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="26 November 2026"
      intro="These terms govern your use of dirtdawn.solutions and any purchase you make through it. By placing an order or creating an account, you agree to them."
      sections={[
        {
          heading: "Acceptance of terms",
          body: [
            "By browsing dirtdawn.solutions, creating an account or placing an order, you accept these Terms & Conditions in full. If you do not accept them, please do not use the store.",
          ],
        },
        {
          heading: "Eligibility and your responsibilities",
          body: [
            "You must be able to form a legally binding contract to buy from us. You are responsible for the accuracy of the details you provide — delivery address, contact email and payment details — and for keeping your account credentials secure.",
          ],
        },
        {
          heading: "Product descriptions and availability",
          body: [
            "We describe and photograph our gear as carefully as we can, but colours can render differently between screens, and small production variations are normal. Products are subject to availability; if an item sells out after you order, we cancel that line and refund it.",
          ],
        },
        {
          heading: "Pricing and payment",
          body: [
            "Prices are shown on each product page, and the full total — including shipping and any applicable taxes — is displayed at checkout before you confirm payment. We may cancel an order where the price shown was a clear error, where payment cannot be verified, or where delivery cannot be made to the address given.",
            { pending: "the definitive list of accepted payment methods and the applicable tax treatment, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Orders and order acceptance",
          body: [
            "Your order is an offer to buy. A contract between you and Dirt Dawn is formed when we send the order confirmation email. Until then, we may decline an order and refund any payment taken.",
          ],
        },
        {
          heading: "Shipping and delivery",
          body: [
            "Delivery is handled under our Shipping & Delivery Policy, which forms part of these terms.",
            { pending: "shipping destinations and delivery estimates, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Returns and refunds",
          body: [
            "Returns, exchanges and refunds work as described in our Refund & Returns Policy.",
            { pending: "the return and refund timeframes, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The Dirt and Dawn name, wordmarks, photography and site design belong to Dirt Dawn and may not be copied or used commercially without written permission.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the maximum extent permitted by law, our liability for any claim connected with an order is limited to the amount you paid for the products in that order. We are not liable for indirect or consequential losses. Nothing in these terms limits liability that cannot be limited by law.",
            { pending: "governing law and jurisdiction, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms from time to time. The version in force is the one on this page at the moment you place your order.",
          ],
        },
      ]}
      related={[
        { href: "/policies/privacy", label: "Privacy Policy" },
        { href: "/policies/returns", label: "Refund & Returns Policy" },
        { href: "/policies/shipping", label: "Shipping & Delivery Policy" },
      ]}
    />
  );
}
