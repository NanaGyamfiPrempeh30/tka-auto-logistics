import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderEditForm from "@/components/admin/order-edit-form";
import OrderUpdateForm from "@/components/admin/order-update-form";
import OrderTimeline from "@/components/dashboard/order-timeline";

export const metadata: Metadata = {
  title: "Order detail",
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetailPage({
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
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to orders
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
        {order.vehicle_year} {order.vehicle_make} {order.vehicle_model}
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-ink">Order details</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderEditForm order={order} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-ink">Post status update</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderUpdateForm orderId={order.id} currentStage={order.stage} />
            </CardContent>
          </Card>
        </div>

        <Card className="self-start">
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
