"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  if (done) {
    return <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-forest">Welcome aboard — see you at dawn.</p>;
  }

  return (
    <form
      className="mx-auto mt-8 flex max-w-md"
      onSubmit={(e) => { e.preventDefault(); setDone(true); }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="input"
      />
      <button className="btn-primary whitespace-nowrap">Subscribe</button>
    </form>
  );
}
