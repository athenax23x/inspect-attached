import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What information Dirt and Dawn collects, how it is used, and the rights you have over it.",
};

export default function PrivacyPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="26 November 2026"
      intro="We collect the minimum we need to sell you gear and get it to you. This policy explains what we collect, why, and what you can ask us to do about it."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you order: your name, email address, delivery address and order contents. We never see your full card details — payment runs through our payment provider.",
            "When you create an account: your email address and password (stored only as a secure hash), plus your wishlist and order history.",
            "Automatically: the essential cookie that keeps your cart and session working, as described in our Cookie Policy.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "To fulfil orders, provide support, run accounts and wishlists, and — where the law allows — to detect fraud. We do not sell your data, and we do not send marketing email unless the store explicitly asks for a subscription.",
          ],
        },
        {
          heading: "Order and transaction information",
          body: [
            "Order records are kept so we can honour warranties, process returns and meet accounting obligations.",
            { pending: "data retention periods for order records and account data, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Cookies and tracking technologies",
          body: [
            "We set one essential first-party cookie for cart and session state. No advertising or cross-site tracking cookies are used. Details are in the Cookie Policy.",
          ],
        },
        {
          heading: "Third-party service providers",
          body: [
            "We share the details needed to deliver your parcel with our courier, and payment details with our payment provider, solely to perform those services. They may not use your data for anything else.",
            { pending: "the complete list of third-party providers, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Data protection",
          body: [
            "Passwords are stored hashed, connections run over encryption, and access to order data is limited to the people who need it to run the store.",
          ],
        },
        {
          heading: "Your privacy rights",
          body: [
            "You can request a copy of your data, correct it, or have it deleted by emailing dirtndawn@hotmail.com with the subject \u201cPrivacy request\u201d. We identify you through the email address on your order before actioning any request.",
            { pending: "the response timeframe for privacy requests and the specific statutory rights that apply to our customers, to be confirmed by the business owner." },
          ],
        },
        {
          heading: "Children",
          body: [
            "The store is not directed at children, and we do not knowingly collect data from anyone too young to form a binding contract.",
          ],
        },
      ]}
      related={[
        { href: "/policies/cookies", label: "Cookie Policy" },
        { href: "/policies/terms", label: "Terms & Conditions" },
        { href: "/policies/contact", label: "Contact & Customer Support" },
      ]}
    />
  );
}
