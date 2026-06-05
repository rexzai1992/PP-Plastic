"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { QuoteRequestFormValues, UploadedReference } from "@/types/quote";
import { generateRequestQuoteMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { FileUpload } from "@/components/FileUpload";
import { useLanguage } from "@/components/LanguageProvider";

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
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? {
          nameError: "Nama diperlukan.",
          phoneError: "Nombor telefon diperlukan.",
          eyebrow: "Tanya Harga Produk Plastik",
          title:
            "Beritahu apa yang anda perlukan dan team jualan kami akan cadangkan produk yang sesuai",
          description:
            "Borang ini untuk pelanggan yang perlukan cadangan produk atau saiz khas sebelum tambah item ke senarai.",
          name: "Nama",
          company: "Syarikat",
          phone: "Telefon",
          email: "Email",
          usage: "Kegunaan Produk",
          usagePlaceholder: "Untuk pembungkusan retail, alas kilang, frozen food, event...",
          size: "Anggaran Saiz",
          sizePlaceholder: "8x12 inci, 500mm x 300m, saiz khas...",
          quantity: "Anggaran Kuantiti",
          quantityPlaceholder: "10 karton, 5 roll...",
          material: "Pilihan Bahan",
          materialPlaceholder: "HDPE, LDPE, PP, tiada pilihan...",
          area: "Kawasan Penghantaran",
          date: "Tarikh Diperlukan",
          notes: "Nota",
          upload: "Muat Naik Gambar Rujukan",
          send: "Hantar melalui WhatsApp",
        }
      : {
          nameError: "Name is required.",
          phoneError: "Phone number is required.",
          eyebrow: "Custom Plastic Packaging Quote",
          title:
            "Tell us what you need and our sales team will recommend the right product",
          description:
            "This form is for customers who need product guidance or custom size recommendations before deciding what to add to the quote list.",
          name: "Name",
          company: "Company",
          phone: "Phone",
          email: "Email",
          usage: "Product Usage",
          usagePlaceholder: "For retail packaging, factory lining, frozen food, events...",
          size: "Estimated Size",
          sizePlaceholder: "8x12 inch, 500mm x 300m, custom...",
          quantity: "Estimated Quantity",
          quantityPlaceholder: "10 cartons, 5 rolls...",
          material: "Material Preference",
          materialPlaceholder: "HDPE, LDPE, PP, no preference...",
          area: "Delivery Area",
          date: "Required Date",
          notes: "Notes",
          upload: "Upload Reference Image",
          send: "Send Request via WhatsApp",
        };
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
      toast.error(copy.nameError);
      return;
    }

    if (!values.phone.trim()) {
      toast.error(copy.phoneError);
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
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1F2933]">
            {copy.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#6B7280]">
            {copy.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.name}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.name}
                onChange={(event) => updateValue("name", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.company}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.company}
                onChange={(event) => updateValue("company", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.phone}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.phone}
                onChange={(event) => updateValue("phone", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.email}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.email}
                onChange={(event) => updateValue("email", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933] md:col-span-2">
              {copy.usage}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder={copy.usagePlaceholder}
                value={values.productUsage}
                onChange={(event) => updateValue("productUsage", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.size}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder={copy.sizePlaceholder}
                value={values.estimatedSize}
                onChange={(event) => updateValue("estimatedSize", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.quantity}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder={copy.quantityPlaceholder}
                value={values.estimatedQuantity}
                onChange={(event) => updateValue("estimatedQuantity", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.material}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder={copy.materialPlaceholder}
                value={values.materialPreference}
                onChange={(event) => updateValue("materialPreference", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.area}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                value={values.deliveryArea}
                onChange={(event) => updateValue("deliveryArea", event.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[#1F2933] md:col-span-2">
              {copy.date}
              <input
                className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                type="date"
                value={values.requiredDate}
                onChange={(event) => updateValue("requiredDate", event.target.value)}
              />
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-[#1F2933]">
            {copy.notes}
            <textarea
              className="mt-2 min-h-28 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
              value={values.notes}
              onChange={(event) => updateValue("notes", event.target.value)}
            />
          </label>

          <div className="mt-4">
            <FileUpload
              label={copy.upload}
              value={reference}
              onChange={(nextValue) => setReference(nextValue)}
            />
          </div>

          <button
            className="mt-6 inline-flex rounded-lg bg-[#1F6F5B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#175746]"
            type="button"
            onClick={handleSubmit}
          >
            {copy.send}
          </button>
        </div>
      </div>
    </section>
  );
}
