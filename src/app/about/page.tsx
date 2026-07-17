import type { Metadata } from "next";
import { ShieldCheck, MapPin, Clock3 } from "lucide-react";
import Container from "@/components/ui/container";
import ButtonLink from "@/components/ui/button-link";
import SectionHeading from "@/components/ui/section-heading";
import RouteMotif from "@/components/sections/route-motif";
import { contact } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "TKA Auto's & Logistics is an Atlanta-based auction sourcing and shipping company connecting US auto auctions to buyers in Ghana.",
};

const badges = [
  {
    icon: ShieldCheck,
    title: "Licensed Auction Buyer",
    body: "Direct bidding access at Copart, IAAI, and Manheim — no reseller markup.",
  },
  {
    icon: MapPin,
    title: "Atlanta, GA Based",
    body: "US operations run out of Atlanta, with a dedicated Ghana-side delivery team.",
  },
  {
    icon: Clock3,
    title: "Real Response Times",
    body: "WhatsApp is our primary channel — most messages get a reply the same day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-paper py-16 sm:py-20">
        <Container>
          <RouteMotif />
          <h1 className="mt-6 max-w-2xl font-heading text-3xl sm:text-4xl font-semibold uppercase tracking-wide">
            Connecting US auctions to Ghanaian buyers
          </h1>
          <p className="mt-5 max-w-2xl text-paper/75 leading-relaxed">
            TKA Auto&apos;s &amp; Logistics is built around one problem: buying a car at a US
            auction is hard to do from Ghana, and shipping it home is harder. We handle the
            sourcing, the paperwork, the shipping, and the delivery, so customers deal with one
            company from bid to door.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-paper">
        <Container>
          <SectionHeading eyebrow="Why customers work with us" title="What TKA brings to every order" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {badges.map((item) => (
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

      <section className="py-16 sm:py-20 bg-paper-dim border-y border-line">
        <Container className="flex flex-col items-center text-center gap-6">
          <SectionHeading
            eyebrow="Get in touch"
            title="Reach us the way you prefer"
            align="center"
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={contact.whatsapp.us.link} external>
              WhatsApp US
            </ButtonLink>
            <ButtonLink href={contact.whatsapp.ghana.link} external variant="outline" className="border-ink/20 text-ink hover:border-gold-deep hover:text-gold-deep">
              WhatsApp Ghana
            </ButtonLink>
            <ButtonLink href={contact.social.instagram.link} external variant="ghost">
              Instagram
            </ButtonLink>
            <ButtonLink href={contact.social.snapchat.link} external variant="ghost">
              Snapchat
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
