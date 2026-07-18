import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="border-b border-line bg-ink text-paper">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="font-heading text-lg font-semibold uppercase tracking-wide">
            TKA <span className="text-gold">Tracker</span>
          </Link>
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
