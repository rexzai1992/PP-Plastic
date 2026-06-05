"use client";

import { useDeferredValue, useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToQuoteModal } from "@/components/AddToQuoteModal";
import {
  ProductFilter,
  type ProductFilterOptions,
  type ProductFilterValues,
} from "@/components/ProductFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductComparison } from "@/components/ProductComparison";
import { ProductSearch } from "@/components/ProductSearch";
import { EmptyState } from "@/components/EmptyState";

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
  const [search, setSearch] = useState(initialSearch);
  const deferredSearch = useDeferredValue(search);
  const [sort, setSort] = useState("popular");
  const [filters, setFilters] = useState<ProductFilterValues>({
    ...defaultFilters,
    category: initialCategory,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

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
      const searchTarget = `${product.name} ${product.category} ${product.material}`.toLowerCase();
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

  function toggleCompare(product: Product) {
    setComparedProducts((current) => {
      const exists = current.some((item) => item.slug === product.slug);
      if (exists) {
        return current.filter((item) => item.slug !== product.slug);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, product];
    });
  }

  return (
    <>
      <section className="border-b border-[#E5E7EB] bg-[#F7F8FA]">
        <div className={`${catalogueShellClass} py-10`}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            Plastic Products Catalogue
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1F2933]">
            Browse plastic products for quotation requests
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#6B7280]">
            Search by product name and narrow results by category, material, size,
            thickness, color, and usage before adding items to your quote list.
          </p>
        </div>
      </section>

      <section className={`${catalogueShellClass} page-section`}>
        <div className="grid gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm lg:grid-cols-[1fr_220px]">
          <ProductSearch value={search} onChange={setSearch} />
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className="h-12 rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="popular">Popular first</option>
              <option value="name">Product name A-Z</option>
              <option value="custom-size">Custom size available</option>
              <option value="moq">MOQ</option>
            </select>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-[#D6DCE3] bg-white px-4 py-3 text-sm font-semibold text-[#1F2933] lg:hidden"
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
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
            <ProductComparison
              products={comparedProducts}
              onClear={() => setComparedProducts([])}
              onRemove={(slug) =>
                setComparedProducts((current) =>
                  current.filter((item) => item.slug !== slug),
                )
              }
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
                  Available products
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#1F2933]">
                  {filteredProducts.length} catalogue items
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-2 text-sm text-[#6B7280]">
                <SlidersHorizontal className="h-4 w-4" />
                Compare up to 3 products
              </div>
            </div>

            {filteredProducts.length ? (
              <ProductGrid
                className="gap-7 md:grid-cols-2 2xl:grid-cols-3 2xl:gap-8"
                comparedSlugs={comparedProducts.map((product) => product.slug)}
                onQuickAdd={setSelectedProduct}
                onToggleCompare={toggleCompare}
                products={filteredProducts}
              />
            ) : (
              <EmptyState
                actionHref="/products"
                actionLabel="Reset Catalogue"
                description="No products match your current filters. Clear the filters and try a broader search."
                title="No matching products"
              />
            )}
          </div>
        </div>
      </section>

      {isMobileFilterOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/50 px-4 py-6 lg:hidden">
          <div className="mx-auto max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-[#F7F8FA] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1F2933]">Filters</h2>
              <button
                className="text-sm font-medium text-[#0F4C81]"
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Close
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
