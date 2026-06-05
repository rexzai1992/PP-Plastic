import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/ProductGrid";

interface RelatedProductsProps {
  products: Product[];
  onQuickAdd: (product: Product) => void;
}

export function RelatedProducts({ products, onQuickAdd }: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-[#1F2933]">Related Products</h2>
      <p className="mt-2 text-sm text-[#6B7280]">
        Explore similar items from the same category or material group.
      </p>
      <div className="mt-6">
        <ProductGrid products={products} onQuickAdd={onQuickAdd} />
      </div>
    </section>
  );
}
