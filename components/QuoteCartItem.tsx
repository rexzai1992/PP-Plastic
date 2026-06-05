"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import type { QuoteCartItem as QuoteCartItemType, UploadedReference } from "@/types/quote";
import { FileUpload } from "@/components/FileUpload";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLanguage } from "@/components/LanguageProvider";
import { useQuoteCartStore } from "@/store/quoteCartStore";

interface QuoteCartItemProps {
  item: QuoteCartItemType;
}

export function QuoteCartItem({ item }: QuoteCartItemProps) {
  const updateItem = useQuoteCartStore((state) => state.updateItem);
  const removeItem = useQuoteCartStore((state) => state.removeItem);
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? {
          referenceName: "Gambar rujukan",
          remove: "Buang",
          size: "Saiz",
          thickness: "Ketebalan",
          color: "Warna",
          quantity: "Kuantiti",
          notes: "Nota",
          notesPlaceholder: "Nota tambahan untuk item ini",
          notSelected: "Belum dipilih",
          reference: "Gambar Rujukan",
          decrease: "Kurangkan kuantiti",
          increase: "Tambah kuantiti",
        }
      : {
          referenceName: "Reference image",
          remove: "Remove",
          size: "Size",
          thickness: "Thickness",
          color: "Color",
          quantity: "Quantity",
          notes: "Notes",
          notesPlaceholder: "Extra notes for this item",
          notSelected: "Not selected",
          reference: "Reference Image",
          decrease: "Decrease quantity",
          increase: "Increase quantity",
        };
  const product = products.find((candidate) => candidate.slug === item.slug);

  function updateQuoteItem(updates: Partial<QuoteCartItemType>) {
    updateItem(item.id, updates);
  }

  function updateQuantity(nextQuantity: number) {
    updateQuoteItem({ quantity: Math.max(1, nextQuantity) });
  }

  function updateReference(reference?: UploadedReference) {
    updateQuoteItem({
      referenceImageKey: reference?.key,
      referenceImageName: reference?.name,
      referenceImageUrl: reference?.url,
    });
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
            <button
              className="inline-flex w-fit items-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-sm font-medium text-[#B91C1C]"
              type="button"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {copy.remove}
            </button>
          </div>

          <div className="mt-5 space-y-4 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="block text-sm font-medium text-[#1F2933]">
                {copy.size}
                <select
                  className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
                  value={item.selectedSize}
                  onChange={(event) => updateQuoteItem({ selectedSize: event.target.value })}
                >
                  <option value="">{copy.notSelected}</option>
                  {(product?.sizes ?? []).map((option) => (
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
                  value={item.selectedThickness}
                  onChange={(event) =>
                    updateQuoteItem({ selectedThickness: event.target.value })
                  }
                >
                  <option value="">{copy.notSelected}</option>
                  {(product?.thickness ?? []).map((option) => (
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
                  value={item.selectedColor}
                  onChange={(event) => updateQuoteItem({ selectedColor: event.target.value })}
                >
                  <option value="">{copy.notSelected}</option>
                  {(product?.colors ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="block text-sm font-medium text-[#1F2933]">
                  {copy.quantity}
                </span>
                <div className="mt-2 grid h-11 grid-cols-[44px_1fr_44px] overflow-hidden rounded-lg border border-[#D6DCE3] bg-white">
                  <button
                    aria-label={copy.decrease}
                    className="inline-flex items-center justify-center border-r border-[#D6DCE3] text-[#1F2933] transition-colors hover:bg-[#EEF2F6] disabled:cursor-not-allowed disabled:text-[#CBD5E1]"
                    disabled={item.quantity <= 1}
                    type="button"
                    onClick={() => updateQuantity(item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    className="min-w-0 px-3 text-center text-sm font-semibold text-[#1F2933] outline-none"
                    min={1}
                    type="number"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(Number(event.target.value) || 1)}
                  />
                  <button
                    aria-label={copy.increase}
                    className="inline-flex items-center justify-center border-l border-[#D6DCE3] text-[#1F2933] transition-colors hover:bg-[#EEF2F6]"
                    type="button"
                    onClick={() => updateQuantity(item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <label className="block text-sm font-medium text-[#1F2933]">
              {copy.notes}
              <textarea
                className="mt-2 min-h-20 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
                placeholder={copy.notesPlaceholder}
                value={item.notes}
                onChange={(event) => updateQuoteItem({ notes: event.target.value })}
              />
            </label>

            <FileUpload
              label={copy.reference}
              value={
                item.referenceImageUrl
                  ? {
                      key: item.referenceImageKey || "",
                      name: item.referenceImageName || copy.referenceName,
                      url: item.referenceImageUrl,
                    }
                  : undefined
              }
              onChange={updateReference}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
