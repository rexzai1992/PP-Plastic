"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useQuoteCartStore } from "@/store/quoteCartStore";

export function FloatingQuoteButton() {
  const itemCount = useQuoteCartStore((state) => state.items.length);

  if (!itemCount) {
    return null;
  }

  return (
    <Link
      className="fixed bottom-24 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#0F4C81] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0C3B63] sm:right-6"
      href="/quote-list"
    >
      <ClipboardList className="h-4 w-4" />
      Quote List: {itemCount} {itemCount === 1 ? "item" : "items"}
    </Link>
  );
}
