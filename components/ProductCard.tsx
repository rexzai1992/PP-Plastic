"use client";

import Link from "next/link";
import { Scale, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/Badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { formatListPreview } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  onToggleCompare?: (product: Product) => void;
  isCompared?: boolean;
}

function getProductBadges(product: Product) {
  const badges: { label: string; tone?: "default" | "warning" | "accent" }[] = [];

  if (product.popular) {
    badges.push({ label: "Popular", tone: "warning" });
  }
  if (product.customSize) {
    badges.push({ label: "Custom Size", tone: "accent" });
  }
  if (product.customPrint) {
    badges.push({ label: "Custom Print Available", tone: "accent" });
  }
  if (product.foodGrade) {
    badges.push({ label: "Food Grade" });
  }
  if (product.industrialUse) {
    badges.push({ label: "Industrial Use" });
  }

  return badges.slice(0, 3);
}

export function ProductCard({
  product,
  onQuickAdd,
  onToggleCompare,
  isCompared = false,
}: ProductCardProps) {
  return (
    <article className="group flex self-start flex-col overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_16px_42px_-32px_rgba(15,76,129,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-34px_rgba(15,76,129,0.55)]">
      <div className="border-b border-[#E5E7EB] bg-[linear-gradient(180deg,#f9fbff_0%,#f7f8fa_100%)] p-5">
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
          <ImageWithFallback
            fill
            alt={product.name}
            className="object-contain p-4 transition-transform duration-200 group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
            src={product.images[0]}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2.5">
          {getProductBadges(product).map((badge) => (
            <Badge key={badge.label} tone={badge.tone}>
              {badge.label}
            </Badge>
          ))}
        </div>

        <h3 className="mt-5 text-xl font-semibold leading-8 text-[#1F2933]">
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#EDF4FB] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0F4C81]">
            {product.category}
          </span>
          <span className="rounded-full bg-[#EEF6F3] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F6F5B]">
            {product.material}
          </span>
        </div>

        <dl className="mt-5 space-y-2.5 rounded-2xl border border-[#E9EEF3] bg-[#FBFCFD] p-4 text-sm">
          <div className="grid grid-cols-[88px_1fr] gap-3 rounded-xl bg-white px-3 py-3">
            <dt className="font-medium text-[#6B7280]">Sizes</dt>
            <dd className="font-semibold leading-6 text-[#1F2933]">
              {formatListPreview(product.sizes)}
            </dd>
          </div>
          <div className="grid grid-cols-[88px_1fr] gap-3 rounded-xl bg-white px-3 py-3">
            <dt className="font-medium text-[#6B7280]">Thickness</dt>
            <dd className="font-semibold leading-6 text-[#1F2933]">
              {formatListPreview(product.thickness)}
            </dd>
          </div>
          <div className="grid grid-cols-[88px_1fr] gap-3 rounded-xl bg-white px-3 py-3">
            <dt className="font-medium text-[#6B7280]">MOQ</dt>
            <dd className="font-semibold leading-6 text-[#1F2933]">{product.moq}</dd>
          </div>
          <div className="grid grid-cols-[88px_1fr] gap-3 rounded-xl bg-white px-3 py-3">
            <dt className="font-medium text-[#6B7280]">Usage</dt>
            <dd className="font-semibold leading-6 text-[#1F2933]">
              {formatListPreview(product.usage, 1)}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              className="inline-flex items-center justify-center rounded-xl border border-[#D6DCE3] bg-white px-4 py-3 text-sm font-semibold text-[#1F2933] transition-colors hover:bg-[#F7F8FA]"
              href={`/products/${product.slug}`}
            >
              View Details
            </Link>
            <button
              className="inline-flex items-center justify-center rounded-xl bg-[#0F4C81] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
              type="button"
              onClick={() => onQuickAdd?.(product)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Quote
            </button>
          </div>
          {onToggleCompare ? (
            <button
              className="inline-flex items-center justify-center rounded-xl border border-[#D6DCE3] bg-[#F7F8FA] px-4 py-3 text-sm font-medium text-[#1F2933] transition-colors hover:bg-[#EEF2F6]"
              type="button"
              onClick={() => onToggleCompare(product)}
            >
              <Scale className="mr-2 h-4 w-4" />
              {isCompared ? "Remove from Compare" : "Compare Product"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
