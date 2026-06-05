"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { generateQuoteCartMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteCartStore } from "@/store/quoteCartStore";

export function FloatingWhatsAppButton() {
  const items = useQuoteCartStore((state) => state.items);
  const customerDetails = useQuoteCartStore((state) => state.customerDetails);
  const href = generateWhatsAppLink(generateQuoteCartMessage(customerDetails, items));

  return (
    <Link
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#1F6F5B] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#175746] sm:right-6"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircleMore className="h-4 w-4" />
      {items.length ? "Send Quote List" : "WhatsApp Sales"}
    </Link>
  );
}
