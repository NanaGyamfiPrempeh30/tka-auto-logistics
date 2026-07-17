import type { Metadata } from "next";
import Container from "@/components/ui/container";
import ButtonLink from "@/components/ui/button-link";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "New to US car auctions? Learn the basics of auction bidding, title status, and fees before you request a quote from TKA Auto's & Logistics.",
};

const glossary = [
  {
    term: "Clean Title",
    body: "The vehicle has no reported major damage or insurance total-loss history. Usually costs more at auction than a salvage title.",
  },
  {
    term: "Salvage Title",
    body: "The vehicle was declared a total loss by an insurer, usually after an accident. Many are fully repairable and sell far below market value — a common choice for buyers shipping overseas.",
  },
  {
    term: "Buyer's Fee",
    body: "A percentage-based fee auctions charge on top of your winning bid. It's built into the sourcing quote we give you — no surprise charges after the fact.",
  },
  {
    term: "Run & Drive",
    body: "A listing note meaning the vehicle started and moved under its own power at intake — not a guarantee of full mechanical health.",
  },
  {
    term: "VIN (Vehicle Identification Number)",
    body: "The 17-character ID unique to the vehicle. If you already know the VIN of a car you've seen listed, share it on the quote form and we'll pull the full auction report.",
  },
];

const faqs = [
  {
    q: "Can I bid myself, or does TKA bid for me?",
    a: "TKA bids on your behalf. Copart, IAAI, and Manheim require licensed dealer or broker access for most listings — we hold that access so you don't need your own auction account.",
  },
  {
    q: "Do I pay before or after the car is won?",
    a: "You place a refundable deposit to authorize bidding up to your budget. If we win, the deposit applies to the purchase; if we don't win, it's refunded or rolled into your next attempt.",
  },
  {
    q: "What if the car has more damage than expected?",
    a: "We review the auction condition report and photos with you before bidding whenever possible, and flag anything that looks like it'll affect shippability or repair cost.",
  },
  {
    q: "How long does the whole process take?",
    a: "From a winning bid to delivery in Ghana typically runs several weeks, depending on container vs. RoRo shipping and port schedules. Your dashboard shows real dates once your order is active.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-ink text-paper py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="First time buying at auction?"
            title="Auction bidding, explained"
            description="US salvage and dealer auctions run differently from a regular used car lot. Here's what you need to know before you request a quote."
            light
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-paper">
        <Container>
          <SectionHeading eyebrow="Glossary" title="Terms you'll see on auction reports" />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {glossary.map((item) => (
              <div key={item.term} className="rounded-md border border-line p-6">
                <dt className="font-heading text-base font-semibold uppercase tracking-wide text-ink">
                  {item.term}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-paper-dim border-y border-line">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-10 divide-y divide-line rounded-md border border-line bg-paper">
            {faqs.map((item) => (
              <details key={item.q} className="group p-6">
                <summary className="cursor-pointer list-none font-heading text-base font-semibold uppercase tracking-wide text-ink marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-gold-deep transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-ink text-paper">
        <Container className="flex flex-col items-center text-center gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-wide max-w-xl">
            Ready to tell us what you&apos;re looking for?
          </h2>
          <ButtonLink href="/get-a-quote">Get a Quote</ButtonLink>
        </Container>
      </section>
    </>
  );
}
