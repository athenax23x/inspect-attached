"use client";

import { useState } from "react";

/* There is no newsletter backend in this static export, so the form opens a
   pre-addressed email instead of faking a subscription success state. */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const href = `mailto:dirtndawn@hotmail.com?subject=${encodeURIComponent(
    "Newsletter signup — The Dawn Dispatch"
  )}&body=${encodeURIComponent(
    `Hi Dirt and Dawn,\n\nPlease add me to the Dawn Dispatch newsletter.\n\nEmail: ${email || ""}\n`
  )}`;

  return (
    <form
      className="mx-auto mt-8 flex max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (valid) window.location.href = href;
      }}
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={touched && !valid}
        aria-describedby={touched && !valid ? "newsletter-email-error" : undefined}
        placeholder="you@email.com"
        className="input"
      />
      <a
        href={href}
        onClick={(e) => {
          setTouched(true);
          if (!valid) e.preventDefault();
        }}
        className="btn-primary whitespace-nowrap"
        aria-disabled={touched && !valid}
      >
        Subscribe
      </a>
      {touched && !valid && (
        <p id="newsletter-email-error" className="sr-only" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
