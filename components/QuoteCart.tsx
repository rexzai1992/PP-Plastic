"use client";

import Link from "next/link";
import { toast } from "sonner";
import { generateQuoteCartMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { CustomerDetailsForm } from "@/components/CustomerDetailsForm";
import { EmptyState } from "@/components/EmptyState";
import { QuoteCartItem } from "@/components/QuoteCartItem";
import { useQuoteCartStore } from "@/store/quoteCartStore";

export function QuoteCart() {
  const items = useQuoteCartStore((state) => state.items);
  const customerDetails = useQuoteCartStore((state) => state.customerDetails);
  const clearItems = useQuoteCartStore((state) => state.clearItems);
  const setCustomerDetails = useQuoteCartStore((state) => state.setCustomerDetails);

  function handleSendOrder() {
    if (!items.length) {
      toast.error("Add at least one product before sending your quote list.");
      return;
    }

    if (!customerDetails.name.trim()) {
      toast.error("Customer name is required.");
      return;
    }

    if (!customerDetails.phoneNumber.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    if (items.some((item) => item.quantity <= 0)) {
      toast.error("Each quote item must have a quantity greater than 0.");
      return;
    }

    const href = generateWhatsAppLink(
      generateQuoteCartMessage(customerDetails, items),
    );

    window.open(href, "_blank", "noopener,noreferrer");
  }

  if (!items.length) {
    return (
      <section className="page-shell page-section">
        <EmptyState
          actionHref="/products"
          actionLabel="Browse Products"
          description="Your quote list is empty. Browse products and add items to request a quotation."
          title="Your quote list is empty"
        />
      </section>
    );
  }

  return (
    <section className="page-shell page-section">
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
                Quote Review
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#1F2933]">
                Quote List
              </h1>
            </div>
            <div className="rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-2 text-sm text-[#4B5563]">
              {items.length} {items.length === 1 ? "item" : "items"} selected
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <QuoteCartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <CustomerDetailsForm
            values={customerDetails}
            onChange={setCustomerDetails}
          />

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1F2933]">Send Order Request</h2>
            <p className="mt-2 text-sm leading-7 text-[#6B7280]">
              Your WhatsApp message will include customer details, selected products,
              quantities, notes, and uploaded reference image links.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-[#D6DCE3] bg-white px-4 py-3 text-sm font-semibold text-[#1F2933] transition-colors hover:bg-[#F7F8FA]"
                href="/products"
              >
                Continue Browsing
              </Link>
              <button
                className="inline-flex items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-semibold text-[#B91C1C]"
                type="button"
                onClick={clearItems}
              >
                Clear Quote List
              </button>
              <button
                className="inline-flex items-center justify-center rounded-lg bg-[#1F6F5B] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#175746]"
                type="button"
                onClick={handleSendOrder}
              >
                Send Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
