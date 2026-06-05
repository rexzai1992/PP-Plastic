"use client";

import { X } from "lucide-react";
import type { Product } from "@/types/product";
import { useLanguage } from "@/components/LanguageProvider";
import { ProductSpecSelector } from "@/components/ProductSpecSelector";

interface AddToQuoteModalProps {
  product?: Product | null;
  onClose: () => void;
}

export function AddToQuoteModal({ product, onClose }: AddToQuoteModalProps) {
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? {
          eyebrow: "Tambah Cepat",
          description:
            "Pilih spesifikasi, kuantiti, dan nota pilihan sebelum tambah item ini ke senarai harga.",
        }
      : {
          eyebrow: "Quick Add to Quote",
          description:
            "Choose specifications, quantity, and optional notes before adding this item to your quote list.",
        };

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-10">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#F7F8FA] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1F2933]">{product.name}</h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              {copy.description}
            </p>
          </div>
          <button
            className="rounded-lg border border-[#D6DCE3] bg-white p-2 text-[#1F2933]"
            type="button"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6">
          <ProductSpecSelector compact onAdded={onClose} product={product} />
        </div>
      </div>
    </div>
  );
}
