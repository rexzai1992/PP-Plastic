import Link from "next/link";
import type { Category } from "@/types/category";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface CategoryCardProps {
  category: Category;
  productCount: number;
}

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#E5E7EB] bg-[#F7F8FA]">
        <ImageWithFallback
          fill
          alt={category.name}
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          src={category.image}
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#1F2933]">{category.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">{category.description}</p>
        <p className="mt-4 text-sm font-medium text-[#0F4C81]">{productCount} products</p>
        <Link
          className="mt-5 inline-flex rounded-lg border border-[#D6DCE3] bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2933] transition-colors hover:bg-[#F7F8FA]"
          href={`/products?category=${encodeURIComponent(category.name)}`}
        >
          View Products
        </Link>
      </div>
    </article>
  );
}
