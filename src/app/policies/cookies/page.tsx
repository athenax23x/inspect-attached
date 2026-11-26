import type { Metadata } from "next";
import PolicyLayout from "../policy-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies Dirt and Dawn sets, why, and how your choices are respected.",
};

export default function CookiesPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Cookie Policy"
      updated="26 November 2026"
      intro="This page explains what cookies are, the ones Dirt and Dawn uses on dirtdawn.solutions, and how you can control them."
      sections={[
        {
          heading: "What cookies are",
          body: [
            "Cookies are small text files a website stores in your browser. They let the site remember things between pages and visits — such as the contents of your cart. Similar technologies (local storage, for example) are covered by this policy too.",
          ],
        },
        {
          heading: "Essential cookies",
          body: [
            "We set one first-party cookie to keep your shopping cart and session working as you move around the store and check out. Without it, the cart and checkout cannot function, so it does not require consent.",
          ],
        },
        {
          heading: "Analytics cookies",
          body: [
            { pending: "whether any analytics tool is in use and, if so, which one, what it measures and for how long data is kept. The store currently runs no paid analytics service." },
          ],
        },
        {
          heading: "Marketing cookies",
          body: [
            "We do not set advertising or cross-site marketing cookies, and we do not participate in ad networks.",
          ],
        },
        {
          heading: "Third-party cookies",
          body: [
            "Our payment provider handles card details on its own pages during checkout. If any third party sets cookies during payment, it does so under its own policy.",
            { pending: "the list of third-party services, if any, that set cookies on this site (to be confirmed by the business owner)." },
          ],
        },
        {
          heading: "Managing your preferences",
          body: [
            "You can delete or block cookies in your browser settings at any time; every browser's help pages explain how. Blocking the essential cart cookie will break the cart and checkout, which is the only way we use cookies today.",
          ],
        },
      ]}
      related={[
        { href: "/policies/privacy", label: "Privacy Policy" },
        { href: "/policies/terms", label: "Terms & Conditions" },
      ]}
    />
  );
}
