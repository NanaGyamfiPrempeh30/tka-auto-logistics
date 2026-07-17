import { cn } from "@/lib/utils";

export default function RouteMotif({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tone === "dark"
          ? "border-gold/40 bg-gold/10 text-gold-soft"
          : "border-gold-deep/30 bg-gold/10 text-gold-deep",
        className
      )}
    >
      <span aria-hidden>🇺🇸</span>
      <span className={tone === "dark" ? "text-paper/50" : "text-ink/40"}>→</span>
      <span aria-hidden>🇬🇭</span>
      <span>USA to Ghana</span>
    </span>
  );
}
