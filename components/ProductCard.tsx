"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLanguage } from "@/components/LanguageProvider";
import { formatListPreview } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? { size: "Saiz", view: "Lihat", addQuote: "Tambah ke Senarai" }
      : { size: "Size", view: "View", addQuote: "Add Quote" };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_42px_-32px_rgba(15,76,129,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-34px_rgba(15,76,129,0.55)]">
      <Link className="block shrink-0" href={`/products/${product.slug}`}>
        <div className="border-b border-[#E5E7EB] bg-[#F7F8FA] p-4">
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
            <ImageWithFallback
              fill
              alt={product.name}
              className="object-contain p-4 transition-transform duration-200 group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
              src={product.images[0]}
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold leading-7 text-[#1F2933]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-3 text-sm font-medium leading-6 text-[#6B7280]">
          {copy.size}:{" "}
          <span className="font-semibold text-[#1F2933]">
            {formatListPreview(product.sizes)}
          </span>
        </p>

        <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-2">
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-[#D6DCE3] bg-white px-3 py-2.5 text-sm font-semibold text-[#0F4C81] transition-colors hover:bg-[#F7F8FA]"
            href={`/products/${product.slug}`}
          >
            {copy.view}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-yellow)] px-3 py-2.5 text-sm font-bold text-[#102A43] transition-colors hover:bg-[#FFE76B]"
            type="button"
            onClick={() => onQuickAdd?.(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {copy.addQuote}
          </button>
        </div>
      </div>
    </article>
  );
}
