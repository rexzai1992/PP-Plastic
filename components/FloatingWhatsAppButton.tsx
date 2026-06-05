"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { generateQuoteCartMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteCartStore } from "@/store/quoteCartStore";

export function FloatingWhatsAppButton() {
  const items = useQuoteCartStore((state) => state.items);
  const customerDetails = useQuoteCartStore((state) => state.customerDetails);
  const { language } = useLanguage();
  const href = generateWhatsAppLink(generateQuoteCartMessage(customerDetails, items));
  const copy =
    language === "bm"
      ? { withItems: "Hantar Senarai", withItemsSuffix: "", empty: "WhatsApp", emptySuffix: " Jualan" }
      : { withItems: "Send Quote", withItemsSuffix: " List", empty: "WhatsApp", emptySuffix: " Sales" };

  return (
    <Link
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#1F6F5B] px-3.5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#175746] sm:right-6 sm:px-4"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircleMore className="h-4 w-4" />
      <span>{items.length ? copy.withItems : copy.empty}</span>
      <span className="hidden sm:inline">
        {items.length ? copy.withItemsSuffix : copy.emptySuffix}
      </span>
    </Link>
  );
}
