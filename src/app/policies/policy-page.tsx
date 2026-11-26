import Link from "next/link";
import type { PolicyBody, PolicySection, RelatedLink } from "./types";

const BUSINESS = {
  name: "Dirt Dawn",
  tradingAs: "Dirt and Dawn",
  address: "932 Owens RD, Oxon Hill, MD 20745, United States",
  email: "dirtndawn@hotmail.com",
  website: "https://dirtdawn.solutions",
  websiteLabel: "dirtdawn.solutions",
};

function BodyItem({ item }: { item: PolicyBody }) {
  if (typeof item === "string") return <p>{item}</p>;
  return (
    <p className="pending-note">
      <span className="font-semibold not-italic">Pending owner confirmation — </span>
      {item.pending}
    </p>
  );
}

function Section({ section }: { section: PolicySection }) {
  return (
    <div>
      <h2 className="font-display text-lg text-charcoal">{section.heading}</h2>
      <div className="mt-2 space-y-3">
        {section.body.map((item, i) => (
          <BodyItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function BusinessInfo({ heading = "Business Information" }: { heading?: string }) {
  return (
    <div>
      <h2 className="font-display text-lg text-charcoal">{heading}</h2>
      <address className="mt-2 space-y-1 not-italic">
        <p>
          <span className="font-semibold">Business Name:</span> {BUSINESS.name}{" "}
          <span className="text-charcoal-muted">(trading as {BUSINESS.tradingAs})</span>
        </p>
        <p>
          <span className="font-semibold">Address:</span> {BUSINESS.address}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          <a href={`mailto:${BUSINESS.email}`} className="underline decoration-earth underline-offset-4 hover:text-earth">
            {BUSINESS.email}
          </a>
        </p>
        <p>
          <span className="font-semibold">Website:</span>{" "}
          <a href={BUSINESS.website} className="underline decoration-earth underline-offset-4 hover:text-earth">
            {BUSINESS.websiteLabel}
          </a>
        </p>
      </address>
    </div>
  );
}

function Related({ links }: { links: RelatedLink[] }) {
  return (
    <div>
      <h2 className="font-display text-lg text-charcoal">Related policies</h2>
      <ul className="mt-2 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="underline decoration-earth underline-offset-4 hover:text-earth">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PolicyLayout({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  related,
  contactHeading,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
  related?: RelatedLink[];
  contactHeading?: string;
}) {
  return (
    <section className="container-x max-w-2xl py-16">
      <p className="eyebrow text-earth-dark">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-charcoal-muted">
        Last updated {updated}
      </p>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-charcoal/80">
        <p>{intro}</p>
        {sections.map((s) => (
          <Section key={s.heading} section={s} />
        ))}
        <BusinessInfo heading={contactHeading} />
        {related && related.length > 0 ? <Related links={related} /> : null}
      </div>
    </section>
  );
}
