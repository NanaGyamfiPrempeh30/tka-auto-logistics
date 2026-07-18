"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderStageLabels, orderStageStyles } from "@/lib/order-stages";
import { cn } from "@/lib/utils";
import type { Order } from "@/lib/supabase/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrdersList({ orders }: { orders: Order[] }) {
  const router = useRouter();

  if (orders.length === 0) {
    return <p className="p-8 text-center text-sm text-ink/50">No orders yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Deposit</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.id}
            className="cursor-pointer"
            onClick={() => router.push(`/admin/orders/${order.id}`)}
          >
            <TableCell className="font-medium text-ink">
              {order.vehicle_year} {order.vehicle_make} {order.vehicle_model}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={cn(orderStageStyles[order.stage])}>
                {orderStageLabels[order.stage]}
              </Badge>
            </TableCell>
            <TableCell className="text-ink/70">
              ${order.deposit_amount.toLocaleString()} {order.deposit_paid ? "· paid" : "· due"}
            </TableCell>
            <TableCell className="text-ink/70">
              ${order.balance_amount.toLocaleString()} {order.balance_paid ? "· paid" : "· due"}
            </TableCell>
            <TableCell className="text-ink/50">{formatDate(order.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
