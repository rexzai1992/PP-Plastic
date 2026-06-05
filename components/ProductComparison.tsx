"use client";

import type { Product } from "@/types/product";
import { Badge } from "@/components/Badge";

interface ProductComparisonProps {
  products: Product[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}

export function ProductComparison({
  products,
  onRemove,
  onClear,
}: ProductComparisonProps) {
  if (!products.length) {
    return null;
  }

  const rows = [
    { label: "Material", value: (product: Product) => product.material },
    { label: "Usage", value: (product: Product) => product.usage.join(", ") },
    { label: "Sizes", value: (product: Product) => product.sizes.join(", ") },
    { label: "Thickness", value: (product: Product) => product.thickness.join(", ") },
    { label: "MOQ", value: (product: Product) => product.moq },
    {
      label: "Custom Size",
      value: (product: Product) => (product.customSize ? "Available" : "No"),
    },
    {
      label: "Custom Print",
      value: (product: Product) => (product.customPrint ? "Available" : "No"),
    },
  ];

  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1F2933]">Product Comparison</h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            Compare up to three products side by side before sending your quote request.
          </p>
        </div>
        <button
          className="text-sm font-medium text-[#0F4C81] hover:text-[#0C3B63]"
          type="button"
          onClick={onClear}
        >
          Clear comparison
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="w-44 border-b border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#1F2933]">
                Specification
              </th>
              {products.map((product) => (
                <th
                  key={product.slug}
                  className="min-w-64 border-b border-[#E5E7EB] px-4 py-3 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-[#1F2933]">{product.name}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.popular ? <Badge tone="warning">Popular</Badge> : null}
                        {product.customSize ? <Badge tone="accent">Custom Size</Badge> : null}
                      </div>
                    </div>
                    <button
                      className="text-sm font-medium text-[#0F4C81]"
                      type="button"
                      onClick={() => onRemove(product.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="border-b border-[#E5E7EB] px-4 py-3 text-sm font-medium text-[#1F2933]">
                  {row.label}
                </td>
                {products.map((product) => (
                  <td
                    key={`${product.slug}-${row.label}`}
                    className="border-b border-[#E5E7EB] px-4 py-3 text-sm leading-6 text-[#4B5563]"
                  >
                    {row.value(product)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
