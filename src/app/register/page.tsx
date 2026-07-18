import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-paper-dim py-16">
      <Container className="max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading uppercase tracking-wide text-ink">
              Create your account
            </CardTitle>
            <CardDescription>Track your shipment from auction to your door.</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <p className="mt-4 text-center text-sm text-ink/60">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-gold-deep">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
