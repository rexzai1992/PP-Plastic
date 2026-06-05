import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "default" | "warning" | "accent";
}

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "default" && "border-slate-200 bg-slate-50 text-slate-700",
        tone === "warning" && "border-amber-200 bg-amber-50 text-amber-700",
        tone === "accent" && "border-emerald-200 bg-emerald-50 text-emerald-700",
      )}
    >
      {children}
    </span>
  );
}
