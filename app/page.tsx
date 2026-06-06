import type { Metadata } from "next";
import { featuredProducts, popularProducts } from "@/data/products";
import {
  HomePageContent,
  type HomeProductPreview,
} from "@/components/HomePageContent";
import type { Product } from "@/types/product";
import { SITE_NAME_FULL } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME_FULL} | Plastic Packaging Supplier`,
  },
};

function toHomeProductPreview(product: Product): HomeProductPreview {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    sizes: product.sizes,
    moq: product.moq,
    customSize: product.customSize,
    customPrint: product.customPrint,
  };
}

export default function HomePage() {
  return (
    <HomePageContent
      featuredProducts={featuredProducts.map(toHomeProductPreview)}
      popularProducts={popularProducts.map(toHomeProductPreview)}
    />
  );
}
