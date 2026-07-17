import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 font-heading text-3xl sm:text-4xl font-semibold uppercase tracking-wide",
          light ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-paper/75" : "text-ink/70")}>
          {description}
        </p>
      )}
    </div>
  );
}
