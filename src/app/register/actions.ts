"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type RegisterState = { error?: string; checkEmail?: boolean } | undefined;

export async function register(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: fullName ? { full_name: fullName } : undefined,
      emailRedirectTo: origin ? `${origin}/login` : undefined,
    },
  });

  if (error) {
    return {
      error: error.message.toLowerCase().includes("registered")
        ? "An account with that email already exists."
        : "Couldn't create your account — try again.",
    };
  }

  if (data.session) {
    redirect("/dashboard");
  }

  return { checkEmail: true };
}
