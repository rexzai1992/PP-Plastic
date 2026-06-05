"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import type { QuoteCartItem as QuoteCartItemType, UploadedReference } from "@/types/quote";
import { FileUpload } from "@/components/FileUpload";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useQuoteCartStore } from "@/store/quoteCartStore";

interface QuoteCartItemProps {
  item: QuoteCartItemType;
}

export function QuoteCartItem({ item }: QuoteCartItemProps) {
  const updateItem = useQuoteCartStore((state) => state.updateItem);
  const removeItem = useQuoteCartStore((state) => state.removeItem);
  const product = products.find((candidate) => candidate.slug === item.slug);
  const [isEditing, setIsEditing] = useState(false);
  const [size, setSize] = useState(item.selectedSize);
  const [thickness, setThickness] = useState(item.selectedThickness);
  const [color, setColor] = useState(item.selectedColor);
  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes);
  const [reference, setReference] = useState<UploadedReference | undefined>(
    item.referenceImageUrl
      ? {
          key: item.referenceImageKey || "",
          name: item.referenceImageName || "Reference image",
          url: item.referenceImageUrl,
        }
      : undefined,
  );

  function handleSave() {
    if (quantity <= 0) {
      toast.error("Quantity must be more than 0.");
      return;
    }

    updateItem(item.id, {
      notes,
      quantity,
      referenceImageKey: reference?.key,
      referenceImageName: reference?.name,
      referenceImageUrl: reference?.url,
      selectedColor: color,
      selectedSize: size,
      selectedThickness: thickness,
    });
    setIsEditing(false);
    toast.success("Quote item updated.");
  }

  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA]">
          <ImageWithFallback
            fill
            alt={item.productName}
            className="object-cover"
            sizes="(min-width: 1024px) 180px, 100vw"
            src={item.image}
          />
        </div>

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#1F2933]">{item.productName}</h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                {item.category} • {item.material}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="inline-flex items-center rounded-lg border border-[#D6DCE3] px-3 py-2 text-sm font-medium text-[#1F2933]"
                type="button"
                onClick={() => setIsEditing((current) => !current)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button
                className="inline-flex items-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-sm font-medium text-[#B91C1C]"
                type="button"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </button>
            </div>
          </div>

          {!isEditing ? (
            <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-sm text-[#6B7280]">Size</dt>
                <dd className="mt-1 text-sm font-medium text-[#1F2933]">
                  {item.selectedSize || "Not selected"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[#6B7280]">Thickness</dt>
                <dd className="mt-1 text-sm font-medium text-[#1F2933]">
                  {item.selectedThickness || "Not selected"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[#6B7280]">Color</dt>
                <dd className="mt-1 text-sm font-medium text-[#1F2933]">
                  {item.selectedColor || "Not selected"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[#6B7280]">Quantity</dt>
                <dd className="mt-1 text-sm font-medium text-[#1F2933]">{item.quantity}</dd>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <dt className="text-sm text-[#6B7280]">Notes</dt>
                <dd className="mt-1 text-sm leading-6 text-[#1F2933]">
                  {item.notes || "No notes added."}
                </dd>
              </div>
              {item.referenceImageUrl ? (
                <div className="sm:col-span-2 lg:col-span-4">
                  <dt className="text-sm text-[#6B7280]">Reference Image</dt>
                  <dd className="mt-1 text-sm">
                    <a
                      className="font-medium text-[#0F4C81]"
                      href={item.referenceImageUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View uploaded reference
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <div className="mt-5 space-y-4 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm font-medium text-[#1F2933]">
                  Size
                  <select
                    className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                  >
                    <option value="">Not selected</option>
                    {(product?.sizes ?? []).map((option) => (
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
                    {(product?.thickness ?? []).map((option) => (
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
                    {(product?.colors ?? []).map((option) => (
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

              <label className="block text-sm font-medium text-[#1F2933]">
                Notes
                <textarea
                  className="mt-2 min-h-24 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>

              <FileUpload
                label="Reference Image"
                value={reference}
                onChange={(nextValue) => setReference(nextValue)}
              />

              <button
                className="inline-flex rounded-lg bg-[#0F4C81] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
                type="button"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
