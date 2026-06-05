"use client";

import { useEffect, useState } from "react";
import { Package, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/types/product";
import { saveRecentlyViewedProduct } from "@/lib/quoteCart";
import { AddToQuoteModal } from "@/components/AddToQuoteModal";
import { Badge } from "@/components/Badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLanguage } from "@/components/LanguageProvider";
import { ProductSpecSelector } from "@/components/ProductSpecSelector";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { RelatedProducts } from "@/components/RelatedProducts";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? {
          popular: "Popular",
          customSize: "Saiz Khas",
          customPrint: "Cetakan Khas",
          foodGrade: "Food Grade",
          industrial: "Kegunaan Industri",
          leadTime: "Masa Siap",
          packaging: "Pembungkusan",
          selectSpecs: "Pilih Spesifikasi",
          specHelp:
            "Pilih pilihan yang tersedia di bawah. Jika medan dibiarkan kosong, mesej WhatsApp akan tandakan sebagai belum dipilih.",
          specTable: "Jadual Spesifikasi",
          material: "Bahan",
          category: "Kategori",
          sizes: "Saiz",
          thickness: "Ketebalan",
          colors: "Warna",
          available: "Tersedia",
          no: "Tidak",
          usage: "Contoh Kegunaan",
          faster: "Perlu harga lebih cepat?",
          fasterText:
            "Guna tambah cepat untuk sediakan senarai harga, kemudian hantar satu mesej WhatsApp dengan beberapa produk dan maklumat pelanggan.",
          quickAdd: "Tambah Cepat",
        }
      : {
          popular: "Popular",
          customSize: "Custom Size",
          customPrint: "Custom Print Available",
          foodGrade: "Food Grade",
          industrial: "Industrial Use",
          leadTime: "Lead Time",
          packaging: "Packaging",
          selectSpecs: "Select Specifications",
          specHelp:
            "Choose available options below. If a field is left blank, the WhatsApp message will note it as not selected.",
          specTable: "Specification Table",
          material: "Material",
          category: "Category",
          sizes: "Sizes",
          thickness: "Thickness",
          colors: "Colors",
          available: "Available",
          no: "No",
          usage: "Usage Examples",
          faster: "Need a faster quotation?",
          fasterText:
            "Use quick add to prepare your quote list, then send one combined WhatsApp request with multiple products and customer details.",
          quickAdd: "Quick Add to Quote",
        };

  useEffect(() => {
    saveRecentlyViewedProduct(product.slug);
  }, [product.slug]);

  return (
    <>
      <section className="page-shell page-section">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA]">
              <ImageWithFallback
                fill
                alt={product.name}
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                src={activeImage}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {product.images.map((image) => (
                <button
                  key={image}
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border ${
                    activeImage === image ? "border-[#0F4C81]" : "border-[#E5E7EB]"
                  } bg-[#F7F8FA]`}
                  type="button"
                  onClick={() => setActiveImage(image)}
                >
                  <ImageWithFallback
                    fill
                    alt={product.name}
                    className="object-cover"
                    sizes="(min-width: 1024px) 10vw, 25vw"
                    src={image}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {product.popular ? <Badge tone="warning">{copy.popular}</Badge> : null}
              {product.customSize ? <Badge tone="accent">{copy.customSize}</Badge> : null}
              {product.customPrint ? <Badge tone="accent">{copy.customPrint}</Badge> : null}
              {product.foodGrade ? <Badge>{copy.foodGrade}</Badge> : null}
              {product.industrialUse ? <Badge>{copy.industrial}</Badge> : null}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1F2933]">
              {product.name}
            </h1>
            <p className="mt-3 text-base font-medium text-[#0F4C81]">
              {product.category} • {product.material}
            </p>
            <p className="mt-5 text-base leading-8 text-[#4B5563]">{product.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                <Package className="h-5 w-5 text-[#0F4C81]" />
                <p className="mt-3 text-sm font-semibold text-[#1F2933]">MOQ</p>
                <p className="mt-1 text-sm text-[#6B7280]">{product.moq}</p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                <Truck className="h-5 w-5 text-[#0F4C81]" />
                <p className="mt-3 text-sm font-semibold text-[#1F2933]">
                  {copy.leadTime}
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">{product.leadTime}</p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                <ShieldCheck className="h-5 w-5 text-[#0F4C81]" />
                <p className="mt-3 text-sm font-semibold text-[#1F2933]">
                  {copy.packaging}
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">{product.packaging}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-[#1F2933]">
                {copy.selectSpecs}
              </h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                {copy.specHelp}
              </p>
              <div className="mt-5">
                <ProductSpecSelector product={product} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-semibold text-[#1F2933]">{copy.specTable}</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
              <table className="min-w-full border-collapse">
                <tbody>
                  {[
                    [copy.material, product.material],
                    [copy.category, product.category],
                    [copy.sizes, product.sizes.join(", ")],
                    [copy.thickness, product.thickness.join(", ")],
                    [copy.colors, product.colors.join(", ")],
                    ["MOQ", product.moq],
                    [copy.packaging, product.packaging],
                    [copy.leadTime, product.leadTime],
                    [copy.customSize, product.customSize ? copy.available : copy.no],
                    [copy.customPrint, product.customPrint ? copy.available : copy.no],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <th className="w-44 border-b border-[#E5E7EB] bg-[#F7F8FA] px-4 py-3 text-left text-sm font-semibold text-[#1F2933]">
                        {label}
                      </th>
                      <td className="border-b border-[#E5E7EB] px-4 py-3 text-sm leading-7 text-[#4B5563]">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#1F2933]">{copy.usage}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {product.usage.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-6">
              <h3 className="text-lg font-semibold text-[#1F2933]">{copy.faster}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                {copy.fasterText}
              </p>
              <button
                className="mt-5 inline-flex rounded-lg bg-[#0F4C81] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
                type="button"
                onClick={() => setQuickAddProduct(product)}
              >
                {copy.quickAdd}
              </button>
            </div>
          </div>
        </div>

        <RelatedProducts products={relatedProducts} onQuickAdd={setQuickAddProduct} />
        <RecentlyViewed currentSlug={product.slug} />
      </section>

      <AddToQuoteModal product={quickAddProduct} onClose={() => setQuickAddProduct(null)} />
    </>
  );
}
