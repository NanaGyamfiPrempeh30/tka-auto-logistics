import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions";

const navLinks = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="border-b border-line bg-ink text-paper">
        <Container className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-heading text-lg font-semibold uppercase tracking-wide">
              TKA <span className="text-gold">Admin</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-wide text-paper/80 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="border-paper/40 bg-transparent text-paper hover:bg-paper/10 hover:text-paper"
            >
              Sign out
            </Button>
          </form>
        </Container>
      </header>
      <Container className="py-10">{children}</Container>
    </div>
  );
}
