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
  className,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickAdd={onQuickAdd} />
      ))}
    </div>
  );
}
