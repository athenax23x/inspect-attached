import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Dirt and Dawn makes outdoor and trail-running gear for early starts and long days — honest kit for hard ground.",
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
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Built before first light</h1>
          </div>
        </div>
      </section>

      <section className="container-x max-w-2xl py-16 space-y-6 text-sm leading-relaxed text-charcoal/80">
        <p>
          Dirt and Dawn exists for the early starts: the headlamp miles, the cold coffee, the long
          climb that earns the sunrise. We make outdoor and trail-running gear for people who would
          rather be on the trail when the day begins than anywhere else.
        </p>
        <p>
          Our approach is simple. Every piece in the range — from a featherweight merino tee to a
          12-litre race vest — is designed around real use on hard ground and in changing weather,
          with details that earn their place and nothing that doesn&apos;t. And it is priced so the
          entry fee never outruns the trail fee.
        </p>
        <p>
          We are an independent brand based in Oxon Hill, Maryland, shipping internationally. As the
          range grows, so does the standard we hold it to: honest kit, made for movement, ready
          before first light.
        </p>
      </section>

      <section className="bg-forest text-bone">
        <div className="container-x py-16 text-center">
          <h2 className="font-display text-3xl">Gear up with us</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-bone/75">
            Questions about kit, orders or anything else — write to dirtndawn@hotmail.com.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/shop/all" className="btn-light">Shop the Collection</Link>
            <a href="mailto:dirtndawn@hotmail.com" className="btn border border-bone/60 text-bone hover:bg-bone hover:text-charcoal">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
