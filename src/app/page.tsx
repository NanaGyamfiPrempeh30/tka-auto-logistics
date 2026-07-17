import { ShieldCheck, PackageCheck, Radar } from "lucide-react";
import Container from "@/components/ui/container";
import ButtonLink from "@/components/ui/button-link";
import SectionHeading from "@/components/ui/section-heading";
import TrustBar from "@/components/sections/trust-bar";
import ProcessSteps from "@/components/sections/process-steps";
import RouteMotif from "@/components/sections/route-motif";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Licensed Auction Access",
    body: "We bid directly at Copart, IAAI, and Manheim — no middleman markup on the auction price.",
  },
  {
    icon: PackageCheck,
    title: "Full Door-to-Door Service",
    body: "One team handles auction, shipping, customs, and delivery — you don't coordinate five vendors.",
  },
  {
    icon: Radar,
    title: "Track Every Stage",
    body: "Log in to your dashboard and see exactly where your vehicle is, from auction win to your driveway.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(201,164,65,0.25), transparent 45%), radial-gradient(circle at 85% 0%, rgba(201,164,65,0.12), transparent 40%)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <RouteMotif />
          <h1 className="mt-6 max-w-3xl font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase leading-[1.05] tracking-wide">
            US auction cars, delivered to your door in Ghana.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/75 leading-relaxed">
            TKA Auto&apos;s &amp; Logistics sources vehicles from Copart, IAAI, and Manheim, then
            handles container or RoRo shipping, inland towing, and customs clearance — so you get
            a straight path from auction to Accra, Kumasi, or anywhere in Ghana.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/get-a-quote">Get a Quote</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              See Our Process
            </ButtonLink>
          </div>
        </Container>
      </section>

      <TrustBar />

      <section className="py-20 bg-paper">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Five steps, start to finish"
            description="The same process TKA has run for years — now with a live status timeline on your customer dashboard."
          />
          <div className="mt-10">
            <ProcessSteps variant="compact" />
          </div>
        </Container>
      </section>

      <section className="py-20 bg-paper-dim border-y border-line">
        <Container>
          <SectionHeading
            eyebrow="Why TKA"
            title="Built for buyers who can't inspect the yard themselves"
            align="center"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold">
                  <item.icon size={24} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold uppercase tracking-wide text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-ink text-paper">
        <Container className="flex flex-col items-center text-center gap-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold uppercase tracking-wide max-w-2xl">
            Ready to source your next vehicle?
          </h2>
          <p className="max-w-xl text-paper/70">
            Tell us what you&apos;re looking for and we&apos;ll come back with a sourcing plan
            within one business day.
          </p>
          <ButtonLink href="/get-a-quote">Get a Quote</ButtonLink>
        </Container>
      </section>
    </>
  );
}
