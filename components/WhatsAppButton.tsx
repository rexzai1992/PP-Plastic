import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  href: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function WhatsAppButton({
  href,
  label,
  className,
  variant = "primary",
}: WhatsAppButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
        variant === "primary" &&
          "bg-[#1F6F5B] text-white hover:bg-[#175746]",
        variant === "secondary" &&
          "border border-[#D6DCE3] bg-white text-[#1F2933] hover:bg-[#F7F8FA]",
        className,
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircleMore className="h-4 w-4" />
      {label}
    </Link>
  );
}
