"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/language";

const languageOptions: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "bm", label: "BM" },
];

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label="Language"
      className={cn(
        "inline-flex shrink-0 rounded-full border border-[#D6DCE3] bg-white p-1",
        compact ? "w-full" : "",
      )}
      role="group"
    >
      {languageOptions.map((option) => (
        <button
          key={option.value}
          aria-pressed={language === option.value}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
            compact ? "flex-1" : "",
            language === option.value
              ? "bg-[var(--brand-yellow)] text-[#102A43]"
              : "text-[#4B5563] hover:bg-[#F7F8FA]",
          )}
          type="button"
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
