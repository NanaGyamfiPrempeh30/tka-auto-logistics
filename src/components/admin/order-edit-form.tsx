"use client";

import { useActionState } from "react";
import { updateOrder, type UpdateOrderState } from "@/app/admin/orders/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Order } from "@/lib/supabase/types";

export default function OrderEditForm({ order }: { order: Order }) {
  const updateOrderWithId = updateOrder.bind(null, order.id);
  const [state, formAction, pending] = useActionState<UpdateOrderState, FormData>(
    updateOrderWithId,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="vehicleYear">Year *</Label>
          <Input id="vehicleYear" name="vehicleYear" required defaultValue={order.vehicle_year} />
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label htmlFor="vehicleMake">Make *</Label>
          <Input id="vehicleMake" name="vehicleMake" required defaultValue={order.vehicle_make} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vehicleModel">Model *</Label>
        <Input id="vehicleModel" name="vehicleModel" required defaultValue={order.vehicle_model} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="auctionSource">Auction site</Label>
          <Input id="auctionSource" name="auctionSource" defaultValue={order.auction_source ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vin">VIN</Label>
          <Input id="vin" name="vin" defaultValue={order.vin ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="depositAmount">Deposit amount (USD)</Label>
          <Input
            id="depositAmount"
            name="depositAmount"
            type="number"
            min="0"
            step="0.01"
            defaultValue={order.deposit_amount}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="balanceAmount">Balance amount (USD)</Label>
          <Input
            id="balanceAmount"
            name="balanceAmount"
            type="number"
            min="0"
            step="0.01"
            defaultValue={order.balance_amount}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="depositPaid" defaultChecked={order.deposit_paid} />
          Deposit paid
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="balancePaid" defaultChecked={order.balance_paid} />
          Balance paid
        </label>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700">Saved.</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
