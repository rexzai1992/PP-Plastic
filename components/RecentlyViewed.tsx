"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { products } from "@/data/products";
import {
  getRecentlyViewedProductSlugs,
  RECENT_PRODUCTS_UPDATED_EVENT,
} from "@/lib/quoteCart";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLanguage } from "@/components/LanguageProvider";

interface RecentlyViewedProps {
  currentSlug: string;
}

export function RecentlyViewed({ currentSlug }: RecentlyViewedProps) {
  const { language } = useLanguage();
  const recentSlugs = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") {
        return () => undefined;
      }

      const handler = () => callback();
      window.addEventListener("storage", handler);
      window.addEventListener(RECENT_PRODUCTS_UPDATED_EVENT, handler);

      return () => {
        window.removeEventListener("storage", handler);
        window.removeEventListener(RECENT_PRODUCTS_UPDATED_EVENT, handler);
      };
    },
    () => getRecentlyViewedProductSlugs(),
    () => getRecentlyViewedProductSlugs(),
  );

  const recentProducts = recentSlugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  if (!recentProducts.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-[#1F2933]">
        {language === "bm" ? "Produk Baru Dilihat" : "Recently Viewed Products"}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {recentProducts.map((product) => (
          <Link
            key={product.slug}
            className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-shadow hover:shadow-md"
            href={`/products/${product.slug}`}
          >
            <div className="relative aspect-[4/3] border-b border-[#E5E7EB] bg-[#F7F8FA]">
              <ImageWithFallback
                fill
                alt={product.name}
                className="object-cover"
                sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 100vw"
                src={product.images[0]}
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-[#1F2933]">{product.name}</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                {product.category} • {product.material}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
