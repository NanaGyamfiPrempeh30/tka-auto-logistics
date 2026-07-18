import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import OrdersList from "@/components/admin/orders-list";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
            Orders
          </h1>
          <p className="mt-1 text-sm text-ink/60">{orders?.length ?? 0} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/orders/new">New order</Link>
        </Button>
      </div>

      {error ? (
        <p className="mt-6 text-sm text-destructive">Couldn&apos;t load orders: {error.message}</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-md border border-line bg-paper">
          <OrdersList orders={orders ?? []} />
        </div>
      )}
    </div>
  );
}
