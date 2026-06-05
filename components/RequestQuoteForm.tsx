"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { QuoteRequestFormValues, UploadedReference } from "@/types/quote";
import { generateRequestQuoteMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { FileUpload } from "@/components/FileUpload";

const initialValues: QuoteRequestFormValues = {
  company: "",
  deliveryArea: "",
  email: "",
  estimatedQuantity: "",
  estimatedSize: "",
  materialPreference: "",
  name: "",
  notes: "",
  phone: "",
  productUsage: "",
  requiredDate: "",
};

export function RequestQuoteForm() {
  const [values, setValues] = useState(initialValues);
  const [reference, setReference] = useState<UploadedReference | undefined>();

  function updateValue<Key extends keyof QuoteRequestFormValues>(
    key: Key,
    value: QuoteRequestFormValues[Key],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit() {
    if (!values.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!values.phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    const href = generateWhatsAppLink(
      generateRequestQuoteMessage({
        ...values,
        referenceImageKey: reference?.key,
        referenceImageName: reference?.name,
        referenceImageUrl: reference?.url,
      }),
    );

    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="page-shell page-section">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            Custom Plastic Packaging Quote
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1F2933]">
            Tell us what you need and our sales team will recommend the right product
          </h1>
          <p className="mt-4 text-base leading-7 text-[#6B7280]">
            This form is for customers who need product guidance or custom size
            recommendations before deciding what to add to the quote list.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-[#1F2933]">
              Name
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.name}
                onChange={(event) => updateValue("name", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Company
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.company}
                onChange={(event) => updateValue("company", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Phone
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.phone}
                onChange={(event) => updateValue("phone", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Email
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.email}
                onChange={(event) => updateValue("email", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933] md:col-span-2">
              Product Usage
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder="For retail packaging, factory lining, frozen food, events..."
                value={values.productUsage}
                onChange={(event) => updateValue("productUsage", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Estimated Size
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder="8x12 inch, 500mm x 300m, custom..."
                value={values.estimatedSize}
                onChange={(event) => updateValue("estimatedSize", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Estimated Quantity
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder="10 cartons, 5 rolls..."
                value={values.estimatedQuantity}
                onChange={(event) => updateValue("estimatedQuantity", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Material Preference
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder="HDPE, LDPE, PP, no preference..."
                value={values.materialPreference}
                onChange={(event) => updateValue("materialPreference", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              Delivery Area
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.deliveryArea}
                onChange={(event) => updateValue("deliveryArea", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933] md:col-span-2">
              Required Date
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                type="date"
                value={values.requiredDate}
                onChange={(event) => updateValue("requiredDate", event.target.value)}
              />
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-[#1F2933]">
            Notes
            <textarea
              className="mt-2 min-h-28 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
              value={values.notes}
              onChange={(event) => updateValue("notes", event.target.value)}
            />
          </label>

          <div className="mt-4">
            <FileUpload
              label="Upload Reference Image"
              value={reference}
              onChange={(nextValue) => setReference(nextValue)}
            />
          </div>

          <button
            className="mt-6 inline-flex rounded-lg bg-[#1F6F5B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#175746]"
            type="button"
            onClick={handleSubmit}
          >
            Send Request via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
