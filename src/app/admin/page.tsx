import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import LeadsInbox from "@/components/admin/leads-inbox";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
        Leads
      </h1>
      <p className="mt-1 text-sm text-ink/60">{leads?.length ?? 0} total</p>

      {error ? (
        <p className="mt-6 text-sm text-destructive">Couldn&apos;t load leads: {error.message}</p>
      ) : (
        <div className="mt-6">
          <LeadsInbox leads={leads ?? []} />
        </div>
      )}
    </div>
  );
}
