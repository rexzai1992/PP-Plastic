"use client";

interface ProductFilterValues {
  category: string;
  material: string;
  size: string;
  thickness: string;
  color: string;
  usage: string;
}

interface ProductFilterOptions {
  categories: string[];
  materials: string[];
  sizes: string[];
  thicknesses: string[];
  colors: string[];
  usages: string[];
}

interface ProductFilterProps {
  filters: ProductFilterValues;
  options: ProductFilterOptions;
  onChange: (key: keyof ProductFilterValues, value: string) => void;
  onReset: () => void;
}

function FilterSelect({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#1F2933]">{label}</span>
      <select
        className="h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm text-[#1F2933] outline-none transition focus:border-[#0F4C81]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">All</option>
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

export type { ProductFilterValues, ProductFilterOptions };

export function ProductFilter({
  filters,
  options,
  onChange,
  onReset,
}: ProductFilterProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[#1F2933]">Filter Products</h2>
        <button
          className="text-sm font-medium text-[#0F4C81] hover:text-[#0C3B63]"
          type="button"
          onClick={onReset}
        >
          Clear all
        </button>
      </div>
      <FilterSelect
        label="Category"
        value={filters.category}
        values={options.categories}
        onChange={(value) => onChange("category", value)}
      />
      <FilterSelect
        label="Material"
        value={filters.material}
        values={options.materials}
        onChange={(value) => onChange("material", value)}
      />
      <FilterSelect
        label="Size"
        value={filters.size}
        values={options.sizes}
        onChange={(value) => onChange("size", value)}
      />
      <FilterSelect
        label="Thickness"
        value={filters.thickness}
        values={options.thicknesses}
        onChange={(value) => onChange("thickness", value)}
      />
      <FilterSelect
        label="Color"
        value={filters.color}
        values={options.colors}
        onChange={(value) => onChange("color", value)}
      />
      <FilterSelect
        label="Usage"
        value={filters.usage}
        values={options.usages}
        onChange={(value) => onChange("usage", value)}
      />
    </div>
  );
}
