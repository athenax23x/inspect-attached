import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description: "How to return or exchange Dirt and Dawn gear and how refunds are paid.",
};

export default function ReturnsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Refund & Returns Policy"
      updated="1 November 2026"
      intro="Trail gear has to fit and it has to survive. If it does neither, send it back: you have 30 days from delivery on unworn items, and longer if a product fails."
      sections={[
        {
          heading: "30-day returns",
          body: [
            "Return any unworn item with its tags within 30 days of delivery for a full refund. Start a return by emailing returns@dirtanddawn.com with your order number \u2014 we send a prepaid label for addresses across Indonesia.",
            "Refunds go back to your original payment method within 7 business days of the parcel reaching us.",
          ],
        },
        {
          heading: "Exchanges",
          body: [
            "Sizing exchanges are free, including the shipping both ways, once per order. Tell us the size you need and we ship it as soon as the return is scanned by the courier.",
          ],
        },
        {
          heading: "Exceptions",
          body: [
            "For hygiene reasons we cannot accept returns of headwear (caps, beanies, headbands) or eyewear lenses that have been unsealed. Socks and base layers can only be returned unworn in original packaging.",
          ],
        },
        {
          heading: "The damage guarantee",
          body: [
            "If a seam, zip or strap fails within two years of purchase under normal trail use, we repair it free or replace the item if it cannot be repaired. This is the core promise the brand was built on \u2014 no receipt gymnastics, just your order number and a photo.",
          ],
        },
        {
          heading: "Refused or non-arriving returns",
          body: [
            "If a returned item arrives worn, washed or past the 30-day window, we contact you and either return it to you or issue a partial refund, which you can decline.",
          ],
        },
      ]}
    />
  );
}
