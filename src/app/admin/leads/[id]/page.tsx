import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusSelect from "@/components/admin/status-select";

export const metadata: Metadata = {
  title: "Lead detail",
  robots: { index: false, follow: false },
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const fields = [
  { key: "contact", label: "Contact" },
  { key: "vehicle_interest", label: "Vehicle interest" },
  { key: "ghana_city", label: "Ghana delivery city" },
] as const;

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: lead, error } = await supabase.from("leads").select("*").eq("id", id).single();

  if (error || !lead) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to leads
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
            {lead.name}
          </h1>
          <p className="mt-1 text-sm text-ink/50">
            Submitted {formatDateTime(lead.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link href={`/admin/orders/new?leadId=${lead.id}`}>Create order from this lead</Link>
          </Button>
          <StatusSelect leadId={lead.id} status={lead.status} />
        </div>
      </div>

      <Card className="mt-6 max-w-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-ink">Lead details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="divide-y divide-line">
            {fields.map((field) => (
              <div key={field.key} className="grid grid-cols-3 gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="text-sm text-ink/50">{field.label}</dt>
                <dd className="col-span-2 text-sm text-ink">{lead[field.key]}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
