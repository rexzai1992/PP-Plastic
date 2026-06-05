import type { Metadata } from "next";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

export const metadata: Metadata = {
  title: "Custom Plastic Packaging Quote",
  description:
    "Share your packaging usage, preferred materials, reference images, and required quantities for a custom quotation request.",
};

export default function RequestQuotePage() {
  return <RequestQuoteForm />;
}
