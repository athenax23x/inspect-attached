import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of the Dirt and Dawn store and purchases from us.",
};

export default function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="1 November 2026"
      intro="These terms govern your use of dirtanddawn.com and any purchase you make through it. By placing an order or creating an account, you agree to them."
      sections={[
        {
          heading: "1. Who we are",
          body: [
            "Dirt and Dawn (\u201cwe\u201d, \u201cus\u201d) is a trail running brand registered in Bandung, Indonesia. We sell apparel, equipment and accessories for trail and road running, shipped across Indonesia.",
          ],
        },
        {
          heading: "2. Orders and acceptance",
          body: [
            "Your order is an offer to buy. A contract exists only when we send an order confirmation email. If we cannot fulfil an order \u2014 for example a sizing run sells out \u2014 we cancel it and refund you in full within 5 business days.",
            "We may cancel an order where the price shown was a clear error, where payment cannot be verified, or where delivery cannot be made to the address given.",
          ],
        },
        {
          heading: "3. Pricing and payment",
          body: [
            "Prices are shown in US dollars and include applicable taxes. We accept Visa, Mastercard, American Express and bank transfer. Payment is taken in full when your order ships.",
            "Promotional codes such as DAWN10 apply to full-price items only and cannot be combined unless stated.",
          ],
        },
        {
          heading: "4. Products and imagery",
          body: [
            "We describe and photograph every product honestly, but colours may vary slightly between screens. Product measurements are given in centimetres on each size guide.",
          ],
        },
        {
          heading: "5. Accounts",
          body: [
            "You are responsible for keeping your account password confidential and for activity under your account. Tell us immediately if you suspect unauthorised use.",
          ],
        },
        {
          heading: "6. Liability",
          body: [
            "Nothing in these terms limits our liability for death or personal injury caused by negligence, or for fraud. Otherwise our liability for any order is limited to the amount you paid for it.",
          ],
        },
        {
          heading: "7. Governing law",
          body: [
            "These terms are governed by the laws of the Republic of Indonesia. Disputes are subject to the exclusive jurisdiction of the courts of Bandung.",
          ],
        },
      ]}
    />
  );
}
