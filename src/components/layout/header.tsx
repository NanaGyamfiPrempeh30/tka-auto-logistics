"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/container";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper border-b border-white/10">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-wide uppercase"
          onClick={() => setOpen(false)}
        >
          {siteConfig.shortName}
          <span className="text-gold"> Auto's</span> & Logistics
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-gold",
                  active ? "text-gold" : "text-paper/85"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/get-a-quote"
          className="hidden md:inline-flex items-center rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-soft transition-colors"
        >
          Get a Quote
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink">
          <Container className="flex flex-col py-4 gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-sm px-3 py-2.5 text-base font-medium",
                    active ? "text-gold" : "text-paper/85 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/get-a-quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-gold px-4 py-2.5 text-base font-semibold text-ink"
            >
              Get a Quote
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
