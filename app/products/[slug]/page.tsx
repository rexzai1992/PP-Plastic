import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { ProductDetail } from "@/components/ProductDetail";
import { SITE_NAME_FULL, getSiteUrl } from "@/lib/utils";

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
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${SITE_NAME_FULL}`,
      description: product.description,
      url: `/products/${product.slug}`,
      type: "website",
      images: product.images.slice(0, 1).map((image) => ({
        url: image,
        alt: product.name,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME_FULL}`,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!product) {
    notFound();
  }

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/products/${product.slug}#product`,
    name: product.name,
    description: product.description,
    image: product.images.map((image) =>
      image.startsWith("http") ? image : `${siteUrl}${image}`,
    ),
    brand: {
      "@type": "Brand",
      name: SITE_NAME_FULL,
    },
    category: product.category,
    material: product.material,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Available sizes",
        value: product.sizes.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Thickness options",
        value: product.thickness.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Minimum order quantity",
        value: product.moq,
      },
      {
        "@type": "PropertyValue",
        name: "Lead time",
        value: product.leadTime,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      <ProductDetail
        product={product}
        relatedProducts={getRelatedProducts(product)}
      />
    </>
  );
}
