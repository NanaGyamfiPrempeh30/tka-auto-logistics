import type { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import ContactForm from "@/components/forms/contact-form";
import { contact } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TKA Auto's & Logistics by WhatsApp, email, or the contact form. Hours: Mon-Sat 9am-7pm, Sun 11am-5pm.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper-dim py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk about your order"
          description="WhatsApp is the fastest way to reach us. Prefer email or a form? Those work too."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-md border border-line bg-paper p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                WhatsApp
              </p>
              <div className="mt-3 space-y-3">
                <a
                  href={contact.whatsapp.us.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-ink hover:text-gold-deep transition-colors"
                >
                  <MessageCircle size={16} />
                  US: {contact.whatsapp.us.number}
                </a>
                <a
                  href={contact.whatsapp.ghana.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-ink hover:text-gold-deep transition-colors"
                >
                  <MessageCircle size={16} />
                  Ghana: {contact.whatsapp.ghana.number}
                </a>
              </div>
            </div>

            <div className="rounded-md border border-line bg-paper p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-3 flex items-center gap-2 text-sm text-ink hover:text-gold-deep transition-colors"
              >
                <Mail size={16} />
                {contact.email}
              </a>
            </div>

            <div className="rounded-md border border-line bg-paper p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">Hours</p>
              <div className="mt-3 space-y-2">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex items-start gap-2 text-sm text-ink">
                    <Clock size={16} className="mt-0.5 shrink-0" />
                    <span>
                      {h.days}: {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
