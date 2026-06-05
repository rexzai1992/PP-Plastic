"use client";

import { Search } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProductSearch({
  value,
  onChange,
  placeholder = "Search products by name...",
}: ProductSearchProps) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
      <input
        className="h-12 w-full rounded-lg border border-[#D6DCE3] bg-white pl-11 pr-4 text-sm text-[#1F2933] outline-none transition focus:border-[#0F4C81]"
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
