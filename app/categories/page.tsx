import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { SectionTitle } from "@/components/SectionTitle";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Plastic Product Categories",
  description:
    "Explore plastic supply categories including bags, stretch film, bubble wrap, courier bags, and industrial plastic products.",
};

export default function CategoriesPage() {
  const productCountByCategory = products.reduce<Record<string, number>>(
    (counts, product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
      return counts;
    },
    {},
  );

  return (
    <section className="page-shell page-section">
      <SectionTitle
        eyebrow="Categories"
        title="Browse plastic supply categories"
        description="Choose a category to explore common stock items, custom-size options, and packaging products used across retail, F&B, logistics, warehousing, and industrial operations."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            productCount={productCountByCategory[category.name] || 0}
          />
        ))}
      </div>
    </section>
  );
}
