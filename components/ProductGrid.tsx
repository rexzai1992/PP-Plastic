"use client";

import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  onQuickAdd?: (product: Product) => void;
  onToggleCompare?: (product: Product) => void;
  comparedSlugs?: string[];
  className?: string;
}

export function ProductGrid({
  products,
  onQuickAdd,
  onToggleCompare,
  comparedSlugs = [],
  className,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          isCompared={comparedSlugs.includes(product.slug)}
          onQuickAdd={onQuickAdd}
          onToggleCompare={onToggleCompare}
          product={product}
        />
      ))}
    </div>
  );
}
