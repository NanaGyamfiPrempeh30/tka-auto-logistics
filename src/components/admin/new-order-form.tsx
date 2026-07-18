"use client";

import { useActionState } from "react";
import { createOrderFromLead, type CreateOrderState } from "@/app/admin/orders/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Defaults = {
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  auctionSource: string;
  vin: string;
};

export default function NewOrderForm({
  leadId,
  defaults,
}: {
  leadId?: string;
  defaults: Defaults;
}) {
  const [state, formAction, pending] = useActionState<CreateOrderState, FormData>(
    createOrderFromLead,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      {leadId && <input type="hidden" name="leadId" value={leadId} />}

      <div className="space-y-1.5">
        <Label htmlFor="customerEmail">Customer email *</Label>
        <Input
          id="customerEmail"
          name="customerEmail"
          type="email"
          required
          defaultValue={defaults.customerEmail}
          placeholder="Must match an existing customer account"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="vehicleYear">Year *</Label>
          <Input id="vehicleYear" name="vehicleYear" required defaultValue={defaults.vehicleYear} />
        </div>
        <div className="col-span-2 space-y-1.5">
          <Label htmlFor="vehicleMake">Make *</Label>
          <Input id="vehicleMake" name="vehicleMake" required defaultValue={defaults.vehicleMake} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vehicleModel">Model *</Label>
        <Input id="vehicleModel" name="vehicleModel" required defaultValue={defaults.vehicleModel} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="auctionSource">Auction site</Label>
          <Input id="auctionSource" name="auctionSource" defaultValue={defaults.auctionSource} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vin">VIN</Label>
          <Input id="vin" name="vin" defaultValue={defaults.vin} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="depositAmount">Deposit amount (USD)</Label>
          <Input id="depositAmount" name="depositAmount" type="number" min="0" step="0.01" defaultValue="0" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="balanceAmount">Balance amount (USD)</Label>
          <Input id="balanceAmount" name="balanceAmount" type="number" min="0" step="0.01" defaultValue="0" />
        </div>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating order…" : "Create order"}
      </Button>
    </form>
  );
}
