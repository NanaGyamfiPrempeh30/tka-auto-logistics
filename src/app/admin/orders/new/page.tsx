import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewOrderForm from "@/components/admin/new-order-form";

export const metadata: Metadata = {
  title: "New order",
  robots: { index: false, follow: false },
};

// Leads store vehicle info as a single free-text string built by the quote
// form ("Source a car: 2020 Toyota Camry — auction: Copart — VIN ..."). Best-
// effort parse it back out for prefill; anything that doesn't match is left
// blank for the admin to fill in manually — never blocks order creation.
function parseLeadVehicle(interest: string) {
  const [main, ...rest] = interest.split(" — ");
  const afterColon = main.split(": ").slice(1).join(": ");
  const match = afterColon.match(/^(\d{4})\s+(\S+)\s+(.+)$/);
  const auctionPart = rest.find((r) => r.startsWith("auction: "));
  const vinPart = rest.find((r) => r.startsWith("VIN "));

  return {
    year: match?.[1] ?? "",
    make: match?.[2] ?? "",
    model: match?.[3] ?? "",
    auctionSource: auctionPart?.replace("auction: ", "") ?? "",
    vin: vinPart?.replace("VIN ", "") ?? "",
  };
}

function parseLeadEmail(contact: string) {
  const match = contact.match(/[^\s/]+@[^\s/]+/);
  return match?.[0] ?? "";
}

export default async function NewOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string }>;
}) {
  const { leadId } = await searchParams;
  let defaults = {
    customerEmail: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    auctionSource: "",
    vin: "",
  };

  if (leadId) {
    const supabase = await createClient();
    const { data: lead } = await supabase.from("leads").select("*").eq("id", leadId).single();
    if (lead) {
      const vehicle = parseLeadVehicle(lead.vehicle_interest);
      defaults = {
        customerEmail: parseLeadEmail(lead.contact),
        vehicleMake: vehicle.make,
        vehicleModel: vehicle.model,
        vehicleYear: vehicle.year,
        auctionSource: vehicle.auctionSource,
        vin: vehicle.vin,
      };
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
        New order
      </h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-ink">Order details</CardTitle>
        </CardHeader>
        <CardContent>
          <NewOrderForm leadId={leadId} defaults={defaults} />
        </CardContent>
      </Card>
    </div>
  );
}
