import type { Metadata } from "next";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How Dirt and Dawn grew from 4:30 a.m. runs on Bandung's volcano trails into a premium trail running brand.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative">
        <Image src="/stock/story-runner.jpg" alt="Runner at dawn" width={1920} height={1080} priority className="h-[50vh] min-h-[360px] w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-x text-bone">
            <p className="eyebrow text-sand">Our Story</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Born before first light</h1>
          </div>
        </div>
      </section>

      <section className="container-x max-w-2xl py-16 space-y-6 text-sm leading-relaxed text-charcoal/80">
        <p>
          Dirt and Dawn started in 2023 with four friends and one rule: be on the trail by 4:30. Sundays meant
          headlamps in the dark on the slopes above Bandung, instant coffee at the summit, and a long argument
          about gear that never quite survived the humidity.
        </p>
        <p>
          We couldn&apos;t find kit built for our conditions — tropical downpours, volcanic grit, 30-degree climbs
          — so we started making it. First a tee that didn&apos;t chafe under a race vest. Then the vest. Then the
          jacket for the storm that always came at the halfway point.
        </p>
        <p>
          Today we still test every product on the same trails, in the same dark. Nothing ships until it has
          survived a full season of Sundays. {PRODUCTS.length} products in, the rule hasn&apos;t changed:
          honest gear, made for hard ground, priced so the entry fee never outruns the trail fee.
        </p>
        <div className="grid gap-6 pt-6 sm:grid-cols-3">
          {[["23", "Products tested"], ["4:30", "Start time, always"], ["100%", "Trail-proven"]].map(([n, l]) => (
            <div key={l} className="bg-sand-light p-6 text-center">
              <p className="font-display text-3xl">{n}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-charcoal/60">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-forest text-bone">
        <div className="container-x py-16 text-center">
          <h2 className="font-display text-3xl">Run with us</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-bone/75">
            Group runs every Sunday, 4:30, from the studio in Bandung. Questions about kit or orders — write to hello@dirtanddawn.run.
          </p>
          <a href="mailto:hello@dirtanddawn.run" className="mt-6 inline-block btn-light">Contact Us</a>
        </div>
      </section>
    </>
  );
}
