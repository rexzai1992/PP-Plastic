"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuoteCartStore } from "@/store/quoteCartStore";
import { cn, SITE_NAME_SHORT } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/quote-list", label: "Quote List" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const itemCount = useQuoteCartStore((state) => state.items.length);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-[#1F2933]">
            {SITE_NAME_SHORT}
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-3 py-1 text-sm text-[#6B7280] lg:flex">
            <Phone className="h-4 w-4" />
            Kedah, Penang, Perlis & Perak delivery
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
                {item.label}
                {item.href === "/quote-list" ? ` (${itemCount})` : ""}
              </Link>
            );
          })}
        </nav>

        <button
          className="inline-flex rounded-lg border border-[#D6DCE3] p-2 text-[#1F2933] lg:hidden"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
                  {item.label}
                  {item.href === "/quote-list" ? ` (${itemCount})` : ""}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
