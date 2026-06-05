import type { Metadata } from "next";
import { featuredProducts, popularProducts } from "@/data/products";
import { HomePageContent } from "@/components/HomePageContent";
import { SITE_NAME_FULL } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME_FULL} | Plastic Packaging Supplier`,
  },
};

export default function HomePage() {
  return (
    <HomePageContent
      featuredProducts={featuredProducts}
      popularProducts={popularProducts}
    />
  );
}
