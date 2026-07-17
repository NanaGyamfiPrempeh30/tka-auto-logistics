import Link from "next/link";
import { MessageCircle, Clock, Mail } from "lucide-react";
import Container from "@/components/ui/container";
import { contact, navLinks, siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 border-t border-white/10">
      <Container className="py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-semibold uppercase tracking-wide text-paper">
            {siteConfig.shortName} <span className="text-gold">Auto&apos;s</span> & Logistics
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Auction sourcing from Copart, IAAI &amp; Manheim — shipped door-to-door to Ghana.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={contact.social.instagram.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold transition-colors text-sm font-medium"
            >
              Instagram
            </a>
            <a
              href={contact.social.snapchat.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold transition-colors text-sm font-medium"
            >
              Snapchat
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-paper">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/get-a-quote" className="hover:text-gold transition-colors">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-paper">Talk to us</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={contact.whatsapp.us.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <MessageCircle size={16} className="shrink-0" />
                WhatsApp (US) {contact.whatsapp.us.number}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsapp.ghana.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <MessageCircle size={16} className="shrink-0" />
                WhatsApp (Ghana) {contact.whatsapp.ghana.number}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail size={16} className="shrink-0" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-paper">Hours</p>
          <ul className="mt-3 space-y-2 text-sm">
            {contact.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-2">
                <Clock size={16} className="shrink-0 mt-0.5" />
                <span>
                  {h.days}
                  <br />
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 text-xs text-paper/50">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
