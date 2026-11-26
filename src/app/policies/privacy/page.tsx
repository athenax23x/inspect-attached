import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dirt and Dawn collects, uses and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="1 November 2026"
      intro="We collect the minimum data we need to run the store, we never sell it, and you can ask us to delete it at any time."
      sections={[
        {
          heading: "What we collect",
          body: [
            "Order data: your name, delivery address, email and the items you bought. Payment card details are handled by our payment processor and never reach our servers.",
            "Account data: your email, saved addresses and wishlist if you create an account.",
            "Usage data: anonymous page views so we can see which products and guides are useful.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To fulfil your orders and tell you where they are. To answer support questions. To send The Dawn Dispatch newsletter \u2014 only if you subscribed, and every email carries an unsubscribe link.",
          ],
        },
        {
          heading: "What we never do",
          body: [
            "We do not sell, rent or trade your personal data. We share it only with the courier delivering your order and the payment processor taking your payment, and only the fields they need.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use a single first-party cookie to keep your cart between visits. No advertising or cross-site tracking cookies are set.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request a copy of your data, correct it, or have it deleted by emailing privacy@dirtanddawn.com. We respond within 14 days.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Order records are kept for 10 years where Indonesian tax law requires it. Everything else is deleted within 90 days of account closure.",
          ],
        },
      ]}
    />
  );
}
