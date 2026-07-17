import type { Metadata } from "next";
import Container from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-paper-dim py-16">
      <Container className="max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-ink">
              TKA Admin
            </CardTitle>
            <CardDescription>Sign in to manage leads.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm redirectTo={redirectTo} />
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
