"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import { useQuoteCartStore } from "@/store/quoteCartStore";
import { cn, SITE_NAME_SHORT } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: { en: "Home", bm: "Utama" } },
  { href: "/products", label: { en: "Products", bm: "Produk" } },
  { href: "/categories", label: { en: "Categories", bm: "Kategori" } },
  { href: "/quote-list", label: { en: "Quote List", bm: "Senarai Harga" } },
  { href: "/request-quote", label: { en: "Request Quote", bm: "Minta Harga" } },
  { href: "/about", label: { en: "About", bm: "Tentang" } },
  { href: "/contact", label: { en: "Contact", bm: "Hubungi" } },
];

export function Navbar() {
  const pathname = usePathname();
  const itemCount = useQuoteCartStore((state) => state.items.length);
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const deliveryLabel =
    language === "bm"
      ? "Penghantaran Kedah, Pulau Pinang, Perlis & Perak"
      : "Kedah, Penang, Perlis & Perak delivery";

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-[#1F2933]">
            {SITE_NAME_SHORT}
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-3 py-1 text-sm text-[#6B7280] lg:flex">
            <Phone className="h-4 w-4" />
            {deliveryLabel}
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#F0F5FA] text-[#0F4C81]"
                    : "text-[#4B5563] hover:bg-[#F7F8FA] hover:text-[#1F2933]",
                )}
                href={item.href}
              >
                {item.label[language]}
                {item.href === "/quote-list" ? ` (${itemCount})` : ""}
              </Link>
            );
          })}
          <LanguageToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex rounded-lg border border-[#D6DCE3] p-2 text-[#1F2933]"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-[#E5E7EB] bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium",
                    isActive
                      ? "bg-[#F0F5FA] text-[#0F4C81]"
                      : "text-[#4B5563] hover:bg-[#F7F8FA]",
                  )}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label[language]}
                  {item.href === "/quote-list" ? ` (${itemCount})` : ""}
                </Link>
              );
            })}
            <div className="px-3 pt-3">
              <LanguageToggle compact />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
