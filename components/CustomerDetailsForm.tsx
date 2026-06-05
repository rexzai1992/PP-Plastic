"use client";

import type { OrderType, QuoteCustomerDetails, UploadedReference } from "@/types/quote";
import { FileUpload } from "@/components/FileUpload";

interface CustomerDetailsFormProps {
  values: QuoteCustomerDetails;
  onChange: (updates: Partial<QuoteCustomerDetails>) => void;
}

const orderTypes: OrderType[] = [
  "Quotation only",
  "Ready to order",
  "Need recommendation",
];

export function CustomerDetailsForm({
  values,
  onChange,
}: CustomerDetailsFormProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-[#1F2933]">Customer Details</h2>
      <p className="mt-2 text-sm leading-7 text-[#6B7280]">
        Fill in your details before sending the full quote list to WhatsApp.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-[#1F2933]">
          Name
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            required
            type="text"
            value={values.name}
            onChange={(event) => onChange({ name: event.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          Company Name
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            type="text"
            value={values.companyName}
            onChange={(event) => onChange({ companyName: event.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          Phone Number
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            required
            type="tel"
            value={values.phoneNumber}
            onChange={(event) => onChange({ phoneNumber: event.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          Email
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            type="email"
            value={values.email}
            onChange={(event) => onChange({ email: event.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          Delivery Area
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            type="text"
            value={values.deliveryArea}
            onChange={(event) => onChange({ deliveryArea: event.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          Required Date
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            type="date"
            value={values.requiredDate}
            onChange={(event) => onChange({ requiredDate: event.target.value })}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933] md:col-span-2">
          Order Type
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={values.orderType}
            onChange={(event) =>
              onChange({ orderType: event.target.value as OrderType })
            }
          >
            {orderTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#1F2933]">
        Extra Message
        <textarea
          className="mt-2 min-h-28 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
          placeholder="Add delivery notes, custom size requirements, or general instructions."
          value={values.extraMessage}
          onChange={(event) => onChange({ extraMessage: event.target.value })}
        />
      </label>

      <div className="mt-4">
        <FileUpload
          label="General Reference Image"
          value={
            values.generalReferenceImageUrl
              ? ({
                  key: values.generalReferenceImageKey || "",
                  name: values.generalReferenceImageName || "General reference image",
                  url: values.generalReferenceImageUrl,
                } satisfies UploadedReference)
              : undefined
          }
          onChange={(nextValue) =>
            onChange({
              generalReferenceImageKey: nextValue?.key,
              generalReferenceImageName: nextValue?.name,
              generalReferenceImageUrl: nextValue?.url,
            })
          }
        />
      </div>
    </div>
  );
}
