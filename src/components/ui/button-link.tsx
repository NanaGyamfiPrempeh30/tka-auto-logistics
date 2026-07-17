import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  external?: boolean;
};

const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary: "bg-gold text-ink hover:bg-gold-soft",
  outline: "border border-paper/30 text-paper hover:border-gold hover:text-gold",
  ghost: "text-ink hover:text-gold",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
    variants[variant],
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
