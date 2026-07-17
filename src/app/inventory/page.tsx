import type { Metadata } from "next";
import { Info } from "lucide-react";
import Container from "@/components/ui/container";
import ButtonLink from "@/components/ui/button-link";
import SectionHeading from "@/components/ui/section-heading";
import { inventoryShowcase } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "A curated look at vehicles TKA Auto's & Logistics has recently sourced from Copart, IAAI, and Manheim for customers shipping to Ghana.",
};

const statusStyles: Record<string, string> = {
  Sourced: "bg-gold/15 text-gold-deep",
  "In Transit": "bg-ink/10 text-ink",
  Delivered: "bg-green-600/10 text-green-700",
};

export default function InventoryPage() {
  return (
    <>
      <section className="bg-ink text-paper py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Recently sourced"
            title="Cars we've recently sourced"
            description="A sample of vehicles TKA has bought and shipped for customers. This is a curated showcase, not live auction inventory — tell us what you want on the quote form and we'll go source it."
            light
          />
        </Container>
      </section>

      <section className="py-14 bg-paper-dim border-b border-line">
        <Container>
          <div className="flex items-start gap-3 rounded-md border border-line bg-paper px-5 py-4 text-sm text-ink/70">
            <Info size={18} className="mt-0.5 shrink-0 text-gold-deep" />
            <p>
              We don&apos;t run live search against Copart, IAAI, or Manheim — auction access is
              restricted to licensed buyers. These listings show past work; every order starts
              from a quote request so we can bid on the exact vehicle you want.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-paper">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inventoryShowcase.map((item) => (
              <div
                key={item.id}
                className="rounded-md border border-line bg-paper overflow-hidden flex flex-col"
              >
                <div className="h-40 bg-paper-dim flex items-center justify-center border-b border-line">
                  <span className="font-heading text-sm uppercase tracking-widest text-ink/30">
                    Photo coming soon
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-base font-semibold uppercase tracking-wide text-ink">
                      {item.title}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusStyles[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">{item.notes}</p>
                  <p className="mt-auto text-xs font-medium uppercase tracking-wide text-ink/40">
                    Sourced via {item.auctionSource}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center text-center gap-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-ink max-w-xl">
              Looking for something specific?
            </h2>
            <ButtonLink href="/get-a-quote">Get a Quote</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
