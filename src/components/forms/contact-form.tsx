"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  if (submitted) {
    return (
      <div className="rounded-md border border-line bg-paper p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
          <Check size={22} />
        </span>
        <h2 className="mt-4 font-heading text-xl font-semibold uppercase tracking-wide text-ink">
          Message sent
        </h2>
        <p className="mt-2 text-sm text-ink/70">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""} — we&apos;ll get back to you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-md border border-line bg-paper p-6 sm:p-8 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
          Name *
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink hover:bg-gold-soft transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
