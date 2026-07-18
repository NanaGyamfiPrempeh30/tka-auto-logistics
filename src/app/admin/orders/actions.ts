"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { OrderStage } from "@/lib/supabase/types";

export type CreateOrderState = { error?: string } | undefined;

export async function createOrderFromLead(
  _prevState: CreateOrderState,
  formData: FormData
): Promise<CreateOrderState> {
  const customerEmail = String(formData.get("customerEmail") ?? "").trim();
  const vehicleMake = String(formData.get("vehicleMake") ?? "").trim();
  const vehicleModel = String(formData.get("vehicleModel") ?? "").trim();
  const vehicleYear = String(formData.get("vehicleYear") ?? "").trim();
  const auctionSource = String(formData.get("auctionSource") ?? "").trim();
  const vin = String(formData.get("vin") ?? "").trim();
  const depositAmount = Number(formData.get("depositAmount") ?? 0);
  const balanceAmount = Number(formData.get("balanceAmount") ?? 0);
  const leadId = String(formData.get("leadId") ?? "").trim();

  if (!customerEmail || !vehicleMake || !vehicleModel || !vehicleYear) {
    return { error: "Customer email, make, model, and year are required." };
  }

  const supabase = await createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", customerEmail)
    .maybeSingle();

  if (profileError) {
    return { error: "Couldn't look up that customer — try again." };
  }
  if (!profile) {
    return {
      error: "No customer account found for that email. Ask them to register at /register first.",
    };
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: profile.id,
      lead_id: leadId || null,
      vehicle_make: vehicleMake,
      vehicle_model: vehicleModel,
      vehicle_year: vehicleYear,
      auction_source: auctionSource || null,
      vin: vin || null,
      deposit_amount: depositAmount || 0,
      balance_amount: balanceAmount || 0,
    })
    .select("id")
    .single();

  if (error || !order) {
    return { error: "Couldn't create the order — try again." };
  }

  revalidatePath("/admin/orders");
  redirect(`/admin/orders/${order.id}`);
}

export type UpdateOrderState = { error?: string; success?: boolean } | undefined;

export async function updateOrder(
  orderId: string,
  _prevState: UpdateOrderState,
  formData: FormData
): Promise<UpdateOrderState> {
  const vehicleMake = String(formData.get("vehicleMake") ?? "").trim();
  const vehicleModel = String(formData.get("vehicleModel") ?? "").trim();
  const vehicleYear = String(formData.get("vehicleYear") ?? "").trim();
  const auctionSource = String(formData.get("auctionSource") ?? "").trim();
  const vin = String(formData.get("vin") ?? "").trim();
  const depositAmount = Number(formData.get("depositAmount") ?? 0);
  const balanceAmount = Number(formData.get("balanceAmount") ?? 0);
  const depositPaid = formData.get("depositPaid") === "on";
  const balancePaid = formData.get("balancePaid") === "on";

  if (!vehicleMake || !vehicleModel || !vehicleYear) {
    return { error: "Make, model, and year are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({
      vehicle_make: vehicleMake,
      vehicle_model: vehicleModel,
      vehicle_year: vehicleYear,
      auction_source: auctionSource || null,
      vin: vin || null,
      deposit_amount: depositAmount || 0,
      balance_amount: balanceAmount || 0,
      deposit_paid: depositPaid,
      balance_paid: balancePaid,
    })
    .eq("id", orderId);

  if (error) {
    return { error: "Couldn't save changes — try again." };
  }

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  return { success: true };
}

export async function postOrderUpdate(input: {
  orderId: string;
  stage: OrderStage;
  note: string;
  photoUrls: string[];
}): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error: insertError } = await supabase.from("order_updates").insert({
    order_id: input.orderId,
    stage: input.stage,
    note: input.note || null,
    photo_urls: input.photoUrls,
  });

  if (insertError) {
    return { error: "Couldn't post the update — try again." };
  }

  const { error: stageError } = await supabase
    .from("orders")
    .update({ stage: input.stage })
    .eq("id", input.orderId);

  if (stageError) {
    return { error: "Update posted, but couldn't sync the order's current stage." };
  }

  revalidatePath(`/admin/orders/${input.orderId}`);
  revalidatePath(`/dashboard/orders/${input.orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/dashboard");
  return {};
}
