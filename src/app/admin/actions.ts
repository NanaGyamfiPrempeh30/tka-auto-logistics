"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/supabase/types";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", leadId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${leadId}`);
  return { error: null };
}
