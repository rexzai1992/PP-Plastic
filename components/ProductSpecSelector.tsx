"use client";

import { startTransition, useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import type { UploadedReference } from "@/types/quote";
import { generateSingleProductMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteCartStore } from "@/store/quoteCartStore";
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
  submitLabel = "Add to Quote",
  onAdded,
  showWhatsAppButton = true,
  compact = false,
}: ProductSpecSelectorProps) {
  const addItem = useQuoteCartStore((state) => state.addItem);
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
      toast.error("Quantity must be more than 0.");
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
      toast.success(`${product.name} added to your quote list.`);
      onAdded?.();
    });
  }

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : ""}`}>
        <label className="block text-sm font-medium text-[#1F2933]">
          Size
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="">Not selected</option>
            {product.sizes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#1F2933]">
          Thickness
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={thickness}
            onChange={(event) => setThickness(event.target.value)}
          >
            <option value="">Not selected</option>
            {product.thickness.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#1F2933]">
          Color
          <select
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="">Not selected</option>
            {product.colors.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#1F2933]">
          Quantity
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
        Notes
        <textarea
          className="mt-2 min-h-28 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
          placeholder="Optional notes for your sales team"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>

      <div className="mt-4">
        <FileUpload
          label="Reference Image"
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
          {submitLabel}
        </button>
        {showWhatsAppButton ? (
          <WhatsAppButton href={whatsappHref} label="Direct WhatsApp Quote" variant="secondary" />
        ) : null}
      </div>
    </div>
  );
}
