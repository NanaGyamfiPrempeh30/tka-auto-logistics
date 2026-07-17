import { Gavel, Container as ContainerIcon, Ship, Truck, Home } from "lucide-react";
import { processSteps } from "@/lib/constants";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  auction: Gavel,
  container: ContainerIcon,
  roro: Ship,
  towing: Truck,
  delivery: Home,
};

export default function ProcessSteps({
  variant = "compact",
}: {
  variant?: "compact" | "detailed";
}) {
  return (
    <ol
      className={cn(
        "grid gap-6",
        variant === "compact"
          ? "sm:grid-cols-2 lg:grid-cols-5"
          : "grid-cols-1"
      )}
    >
      {processSteps.map((step) => {
        const Icon = icons[step.key];
        return (
          <li
            key={step.key}
            className={cn(
              "relative rounded-md border border-line bg-paper p-6",
              variant === "detailed" && "sm:flex sm:items-start sm:gap-6"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                <Icon size={20} />
              </span>
              <span className="font-heading text-xs font-semibold uppercase tracking-widest text-ink/40">
                Step {step.step}
              </span>
            </div>

            <div className={variant === "detailed" ? "mt-4 sm:mt-0" : "mt-4"}>
              <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {variant === "detailed" ? step.detail : step.short}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
