import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { ProductDetail } from "@/components/ProductDetail";
import { SITE_NAME_FULL } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: `${product.name} from ${SITE_NAME_FULL}. Browse specifications, sizes, thickness options, and request a quotation through WhatsApp.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      product={product}
      relatedProducts={getRelatedProducts(product)}
    />
  );
}
