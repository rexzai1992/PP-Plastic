"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ArrowRight, Filter, MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import {
  ProductFilter,
  type ProductFilterOptions,
  type ProductFilterValues,
} from "@/components/ProductFilter";
import { AddToQuoteModal } from "@/components/AddToQuoteModal";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSearch } from "@/components/ProductSearch";
import { EmptyState } from "@/components/EmptyState";
import { useLanguage } from "@/components/LanguageProvider";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { SITE_NAME_FULL } from "@/lib/utils";

interface ProductsCatalogueProps {
  products: Product[];
  initialSearch?: string;
  initialCategory?: string;
}

const defaultFilters: ProductFilterValues = {
  category: "",
  color: "",
  material: "",
  size: "",
  thickness: "",
  usage: "",
};

const catalogueCopy = {
  en: {
    eyebrow: "Plastic Products Catalogue",
    title: "Browse plastic products for quotation requests",
    description:
      "Search by product name and narrow results by category, material, size, thickness, color, and usage.",
    requestCustom: "Request Custom Quote",
    whatsappStock: "WhatsApp Stock Check",
    searchPlaceholder: "Search product, size, material, or usage...",
    sortPopular: "Popular first",
    sortName: "Product name A-Z",
    sortCustom: "Custom size available",
    filters: "Filters",
    available: "Available products",
    items: "catalogue items",
    reset: "Reset Catalogue",
    emptyTitle: "No matching products",
    emptyDescription:
      "No products match your current filters. Clear the filters and try a broader search.",
    close: "Close",
    whatsappMessage: `Hi, I want to check stock and pricing for ${SITE_NAME_FULL} products.`,
  },
  bm: {
    eyebrow: "Katalog Produk Plastik",
    title: "Lihat produk plastik untuk minta harga",
    description:
      "Cari ikut nama produk dan tapis mengikut kategori, bahan, saiz, ketebalan, warna, dan kegunaan.",
    requestCustom: "Minta Harga Khas",
    whatsappStock: "Semak Stok WhatsApp",
    searchPlaceholder: "Cari produk, saiz, bahan, atau kegunaan...",
    sortPopular: "Popular dahulu",
    sortName: "Nama produk A-Z",
    sortCustom: "Ada saiz khas",
    filters: "Tapis",
    available: "Produk tersedia",
    items: "item katalog",
    reset: "Reset Katalog",
    emptyTitle: "Tiada produk sepadan",
    emptyDescription:
      "Tiada produk yang sepadan dengan tapisan semasa. Kosongkan tapisan dan cuba carian yang lebih luas.",
    close: "Tutup",
    whatsappMessage: `Hi, saya nak semak stok dan harga produk dari ${SITE_NAME_FULL}.`,
  },
};

function parseMoqValue(value: string) {
  const match = value.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function ProductsCatalogue({
  products,
  initialSearch = "",
  initialCategory = "",
}: ProductsCatalogueProps) {
  const catalogueShellClass = "mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8";
  const { language } = useLanguage();
  const copy = catalogueCopy[language];
  const [search, setSearch] = useState(initialSearch);
  const deferredSearch = useDeferredValue(search);
  const [sort, setSort] = useState("popular");
  const [filters, setFilters] = useState<ProductFilterValues>({
    ...defaultFilters,
    category: initialCategory,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const options: ProductFilterOptions = {
    categories: Array.from(new Set(products.map((product) => product.category))).sort(),
    colors: Array.from(new Set(products.flatMap((product) => product.colors))).sort(),
    materials: Array.from(new Set(products.map((product) => product.material))).sort(),
    sizes: Array.from(new Set(products.flatMap((product) => product.sizes))).sort(),
    thicknesses: Array.from(new Set(products.flatMap((product) => product.thickness))).sort(),
    usages: Array.from(new Set(products.flatMap((product) => product.usage))).sort(),
  };

  const filteredProducts = products
    .filter((product) => {
      const searchTarget = [
        product.name,
        product.category,
        product.material,
        product.description,
        ...product.sizes,
        ...product.thickness,
        ...product.colors,
        ...product.usage,
      ]
        .join(" ")
        .toLowerCase();
      return searchTarget.includes(deferredSearch.toLowerCase());
    })
    .filter((product) => (filters.category ? product.category === filters.category : true))
    .filter((product) => (filters.material ? product.material === filters.material : true))
    .filter((product) => (filters.size ? product.sizes.includes(filters.size) : true))
    .filter((product) =>
      filters.thickness ? product.thickness.includes(filters.thickness) : true,
    )
    .filter((product) => (filters.color ? product.colors.includes(filters.color) : true))
    .filter((product) => (filters.usage ? product.usage.includes(filters.usage) : true))
    .sort((left, right) => {
      switch (sort) {
        case "name":
          return left.name.localeCompare(right.name);
        case "custom-size":
          return Number(right.customSize) - Number(left.customSize);
        case "moq":
          return parseMoqValue(left.moq) - parseMoqValue(right.moq);
        case "popular":
        default:
          return (
            Number(right.popular) - Number(left.popular) ||
            Number(right.featured) - Number(left.featured) ||
            left.name.localeCompare(right.name)
          );
      }
    });

  function updateFilter(key: keyof ProductFilterValues, value: string) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <>
      <section className="border-b border-[#E5E7EB] bg-[#F7F8FA]">
        <div className={`${catalogueShellClass} py-10`}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1F2933]">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#6B7280]">
            {copy.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
              href="/request-quote"
            >
              {copy.requestCustom}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-[#D6DCE3] bg-white px-5 py-3 text-sm font-semibold text-[#1F2933] transition-colors hover:bg-[#F7F8FA]"
              href={generateWhatsAppLink(
                copy.whatsappMessage,
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {copy.whatsappStock}
            </Link>
          </div>
        </div>
      </section>

      <section className={`${catalogueShellClass} page-section`}>
        <div className="grid gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm lg:grid-cols-[1fr_220px]">
          <ProductSearch
            placeholder={copy.searchPlaceholder}
            value={search}
            onChange={setSearch}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className="h-12 rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="popular">{copy.sortPopular}</option>
              <option value="name">{copy.sortName}</option>
              <option value="custom-size">{copy.sortCustom}</option>
              <option value="moq">MOQ</option>
            </select>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-[#D6DCE3] bg-white px-4 py-3 text-sm font-semibold text-[#1F2933] lg:hidden"
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {copy.filters}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-10">
          <div className="hidden lg:block">
            <ProductFilter
              filters={filters}
              options={options}
              onChange={updateFilter}
              onReset={() => setFilters(defaultFilters)}
            />
          </div>

          <div className="min-w-0 space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
                  {copy.available}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#1F2933]">
                  {filteredProducts.length} {copy.items}
                </h2>
              </div>
            </div>

            {filteredProducts.length ? (
              <ProductGrid
                className="gap-7 md:grid-cols-2 2xl:grid-cols-3 2xl:gap-8"
                onQuickAdd={setSelectedProduct}
                products={filteredProducts}
              />
            ) : (
              <EmptyState
                actionHref="/products"
                actionLabel={copy.reset}
                description={copy.emptyDescription}
                title={copy.emptyTitle}
              />
            )}
          </div>
        </div>
      </section>

      {isMobileFilterOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/50 px-4 py-6 lg:hidden">
          <div className="mx-auto max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-[#F7F8FA] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1F2933]">{copy.filters}</h2>
              <button
                className="text-sm font-medium text-[#0F4C81]"
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                {copy.close}
              </button>
            </div>
            <div className="mt-5">
              <ProductFilter
                filters={filters}
                options={options}
                onChange={updateFilter}
                onReset={() => setFilters(defaultFilters)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <AddToQuoteModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
