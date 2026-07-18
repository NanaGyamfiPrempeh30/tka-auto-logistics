import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import OrdersList from "@/components/dashboard/orders-list";

export const metadata: Metadata = {
  title: "My Orders",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
        My Orders
      </h1>
      <p className="mt-1 text-sm text-ink/60">{orders?.length ?? 0} total</p>

      {error ? (
        <p className="mt-6 text-sm text-destructive">Couldn&apos;t load your orders: {error.message}</p>
      ) : (
        <div className="mt-6">
          <OrdersList orders={orders ?? []} />
        </div>
      )}
    </div>
  );
}
