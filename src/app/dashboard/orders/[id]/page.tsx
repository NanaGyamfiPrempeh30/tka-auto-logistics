import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTimeline from "@/components/dashboard/order-timeline";
import { orderStageLabels, orderStageStyles } from "@/lib/order-stages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order detail",
  robots: { index: false, follow: false },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order, error } = await supabase.from("orders").select("*").eq("id", id).single();

  if (error || !order) {
    notFound();
  }

  const { data: updates } = await supabase
    .from("order_updates")
    .select("*")
    .eq("order_id", id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to my orders
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
            {order.vehicle_year} {order.vehicle_make} {order.vehicle_model}
          </h1>
        </div>
        <Badge variant="outline" className={cn("text-sm", orderStageStyles[order.stage])}>
          {orderStageLabels[order.stage]}
        </Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 self-start">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-ink">Vehicle details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-line">
              <div className="grid grid-cols-2 gap-4 py-3 first:pt-0">
                <dt className="text-sm text-ink/50">Auction site</dt>
                <dd className="text-sm text-ink">{order.auction_source || "—"}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-3">
                <dt className="text-sm text-ink/50">VIN</dt>
                <dd className="text-sm text-ink">{order.vin || "—"}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-3">
                <dt className="text-sm text-ink/50">Deposit</dt>
                <dd className="text-sm text-ink">
                  ${order.deposit_amount.toLocaleString()} {order.deposit_paid ? "· paid" : "· due"}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-4 py-3 last:pb-0">
                <dt className="text-sm text-ink/50">Balance</dt>
                <dd className="text-sm text-ink">
                  ${order.balance_amount.toLocaleString()} {order.balance_paid ? "· paid" : "· due"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-ink">Status timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTimeline updates={updates ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
