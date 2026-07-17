import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="border-b border-line bg-ink text-paper">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/admin" className="font-heading text-lg font-semibold uppercase tracking-wide">
            TKA <span className="text-gold">Admin</span>
          </Link>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </Container>
      </header>
      <Container className="py-10">{children}</Container>
    </div>
  );
}
