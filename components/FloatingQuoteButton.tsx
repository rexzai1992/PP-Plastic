"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useQuoteCartStore } from "@/store/quoteCartStore";

export function FloatingQuoteButton() {
  const itemCount = useQuoteCartStore((state) => state.items.length);
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? { label: "Senarai Harga", item: "item", items: "item" }
      : { label: "Quote List", item: "item", items: "items" };

  if (!itemCount) {
    return null;
  }

  return (
    <Link
      aria-label={`${copy.label}: ${itemCount} ${
        itemCount === 1 ? copy.item : copy.items
      }`}
      className="fixed bottom-24 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0F4C81] text-white shadow-lg transition-colors hover:bg-[#0C3B63] sm:right-6 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3 sm:text-sm sm:font-semibold"
      href="/quote-list"
    >
      <span className="relative">
        <ClipboardList className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand-yellow)] px-1 text-[11px] font-bold leading-none text-[#102A43] ring-2 ring-[#0F4C81] sm:hidden">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      </span>
      <span className="hidden sm:inline">
        {copy.label}: {itemCount} {itemCount === 1 ? copy.item : copy.items}
      </span>
    </Link>
  );
}
