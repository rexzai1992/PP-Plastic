import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductsCatalogue } from "@/components/ProductsCatalogue";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Plastic Products Catalogue",
  description:
    "Browse plastic bags, rolls, packaging materials, and industrial plastic products for quotation requests.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = Array.isArray(resolvedSearchParams.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams.search || "";
  const category = Array.isArray(resolvedSearchParams.category)
    ? resolvedSearchParams.category[0]
    : resolvedSearchParams.category || "";

  return (
    <ProductsCatalogue
      initialCategory={category}
      initialSearch={search}
      products={products}
    />
  );
}
