import type { Metadata } from "next";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import QuoteForm from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell TKA Auto's & Logistics what you need sourced or shipped, and where in Ghana it's headed — we'll follow up within one business day.",
};

export default function GetAQuotePage() {
  return (
    <section className="bg-paper-dim py-16 sm:py-20">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Get a quote"
          title="Tell us what you need"
          description="Four quick steps — no account required. We'll follow up by phone or WhatsApp within one business day."
        />
        <div className="mt-10">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
