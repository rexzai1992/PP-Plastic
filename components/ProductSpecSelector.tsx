"use client";

import { startTransition, useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import type { UploadedReference } from "@/types/quote";
import { generateSingleProductMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteCartStore } from "@/store/quoteCartStore";
import { useLanguage } from "@/components/LanguageProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FileUpload } from "@/components/FileUpload";

interface ProductSpecSelectorProps {
  product: Product;
  submitLabel?: string;
  onAdded?: () => void;
  showWhatsAppButton?: boolean;
  compact?: boolean;
}

export function ProductSpecSelector({
  product,
  submitLabel,
  onAdded,
  showWhatsAppButton = true,
  compact = false,
}: ProductSpecSelectorProps) {
  const addItem = useQuoteCartStore((state) => state.addItem);
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? {
          add: "Tambah ke Senarai",
          notSelected: "Belum dipilih",
          size: "Saiz",
          thickness: "Ketebalan",
          color: "Warna",
          quantity: "Kuantiti",
          notes: "Nota",
          notesPlaceholder: "Nota pilihan untuk team jualan",
          referenceImage: "Gambar Rujukan",
          directWhatsapp: "Tanya Harga di WhatsApp",
          quantityError: "Kuantiti mesti lebih daripada 0.",
          added: "ditambah ke senarai harga.",
        }
      : {
          add: "Add to Quote",
          notSelected: "Not selected",
          size: "Size",
          thickness: "Thickness",
          color: "Color",
          quantity: "Quantity",
          notes: "Notes",
          notesPlaceholder: "Optional notes for your sales team",
          referenceImage: "Reference Image",
          directWhatsapp: "Direct WhatsApp Quote",
          quantityError: "Quantity must be more than 0.",
          added: "added to your quote list.",
        };
  const [size, setSize] = useState("");
  const [thickness, setThickness] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [reference, setReference] = useState<UploadedReference | undefined>();

  const whatsappHref = generateWhatsAppLink(
    generateSingleProductMessage(product, {
      color,
      notes,
      quantity,
      referenceImageUrl: reference?.url,
      size,
      thickness,
    }),
  );

  function handleAddToQuote() {
    if (quantity <= 0) {
      toast.error(copy.quantityError);
      return;
    }

    startTransition(() => {
      addItem({
        category: product.category,
        image: product.images[0],
        material: product.material,
        notes,
        productId: product.id,
        productName: product.name,
        quantity,
        referenceImageKey: reference?.key,
        referenceImageName: reference?.name,
        referenceImageUrl: reference?.url,
        selectedColor: color,
        selectedSize: size,
        selectedThickness: thickness,
        slug: product.slug,
      });
      toast.success(`${product.name} ${copy.added}`);
      onAdded?.();
    });
  }

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : ""}`}>
        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.size}
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="">{copy.notSelected}</option>
            {product.sizes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.thickness}
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={thickness}
            onChange={(event) => setThickness(event.target.value)}
          >
            <option value="">{copy.notSelected}</option>
            {product.thickness.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.color}
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="">{copy.notSelected}</option>
            {product.colors.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.quantity}
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            min={1}
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#1F2933]">
        {copy.notes}
        <textarea
          className="mt-2 min-h-28 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
          placeholder={copy.notesPlaceholder}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>

      <div className="mt-4">
        <FileUpload
          label={copy.referenceImage}
          value={reference}
          onChange={(nextValue) => setReference(nextValue)}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex items-center justify-center rounded-lg bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
          type="button"
          onClick={handleAddToQuote}
        >
          {submitLabel || copy.add}
        </button>
        {showWhatsAppButton ? (
          <WhatsAppButton href={whatsappHref} label={copy.directWhatsapp} variant="secondary" />
        ) : null}
      </div>
    </div>
  );
}
