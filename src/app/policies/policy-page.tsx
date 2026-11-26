import type { PolicySection } from "./types";

export default function PolicyLayout({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <section className="container-x max-w-2xl py-16">
      <p className="eyebrow text-earth">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-charcoal/50">
        Last updated {updated}
      </p>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-charcoal/80">
        <p>{intro}</p>
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-lg text-charcoal">{s.heading}</h2>
            <div className="mt-2 space-y-3">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
