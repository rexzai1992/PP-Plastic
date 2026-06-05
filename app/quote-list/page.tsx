import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";

export const metadata: Metadata = {
  title: "Request Plastic Supply Quotation",
  description:
    "Review your selected plastic products, add customer details, and send the full order request via WhatsApp.",
};

export default function QuoteListPage() {
  return <QuoteCart />;
}
