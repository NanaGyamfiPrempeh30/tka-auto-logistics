import type { Metadata } from "next";
import Container from "@/components/ui/container";
import ButtonLink from "@/components/ui/button-link";
import SectionHeading from "@/components/ui/section-heading";
import TrustBar from "@/components/sections/trust-bar";
import ProcessSteps from "@/components/sections/process-steps";

export const metadata: Metadata = {
  title: "Services",
  description:
    "How TKA Auto's & Logistics moves a vehicle from US auction to your door in Ghana: auction sourcing, container or RoRo shipping, inland towing, and customs-cleared delivery.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-paper py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our process"
            title="Every stage, handled by one team"
            description="TKA runs the same five-step process on every order — from the auction floor in the US to your driveway in Ghana. Here's exactly what happens at each stage."
            light
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-paper">
        <Container>
          <ProcessSteps variant="detailed" />
        </Container>
      </section>

      <section className="py-16 bg-paper-dim border-t border-line">
        <Container className="flex flex-col items-center text-center gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-ink max-w-xl">
            Not sure which shipping method fits your vehicle?
          </h2>
          <p className="max-w-xl text-ink/70">
            Tell us the vehicle and your budget on the quote form — we&apos;ll recommend container
            or RoRo shipping based on condition and cost.
          </p>
          <ButtonLink href="/get-a-quote">Get a Quote</ButtonLink>
        </Container>
      </section>

      <TrustBar />
    </>
  );
}
