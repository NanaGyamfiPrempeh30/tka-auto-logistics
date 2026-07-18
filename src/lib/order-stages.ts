import type { OrderStage } from "@/lib/supabase/types";

export const orderStages: { value: OrderStage; label: string }[] = [
  { value: "auction", label: "Auction" },
  { value: "container", label: "Container Shipping" },
  { value: "roro", label: "RoRo Shipping" },
  { value: "towing", label: "State-to-State Towing" },
  { value: "delivered", label: "Delivered" },
];

export const orderStageLabels: Record<OrderStage, string> = orderStages.reduce(
  (acc, s) => ({ ...acc, [s.value]: s.label }),
  {} as Record<OrderStage, string>
);

export const orderStageStyles: Record<OrderStage, string> = {
  auction: "bg-gold/15 text-gold-deep border-gold/30",
  container: "bg-ink/10 text-ink border-ink/20",
  roro: "bg-ink/10 text-ink border-ink/20",
  towing: "bg-ink/10 text-ink border-ink/20",
  delivered: "bg-green-600/10 text-green-700 border-green-600/20",
};
