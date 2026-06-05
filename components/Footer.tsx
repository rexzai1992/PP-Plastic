"use client";

import Link from "next/link";
import { MapPin, Phone, Truck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  BRANCH_LOCATIONS,
  SERVICE_REGIONS,
  SITE_NAME_FULL,
  WHATSAPP_NUMBER,
} from "@/lib/utils";

export function Footer() {
  const { language } = useLanguage();
  const copy = {
    en: {
      description:
        "Plastic packaging supplier for plastic bags, food containers, stretch film, shrink film, bubble wrap, courier bags, garbage bags, and custom printed plastic packaging in Kedah, Pulau Pinang, Perlis, and Perak.",
      navigation: "Navigation",
      products: "Products",
      categories: "Categories",
      quoteList: "Quote List",
      requestQuote: "Request Quote",
      contact: "Contact",
      whatsapp: "WhatsApp",
      serviceArea: "Service area",
      copyright: "All rights reserved.",
      seo: "Plastic packaging supplier for northern Malaysia.",
    },
    bm: {
      description:
        "Pembekal barangan plastik, bekas makanan, stretch film, shrink film, bubble wrap, beg courier, beg sampah, dan plastik cetakan khas untuk Kedah, Pulau Pinang, Perlis, dan Perak.",
      navigation: "Navigasi",
      products: "Produk",
      categories: "Kategori",
      quoteList: "Senarai Harga",
      requestQuote: "Minta Harga",
      contact: "Hubungi",
      whatsapp: "WhatsApp",
      serviceArea: "Kawasan servis",
      copyright: "Hak cipta terpelihara.",
      seo: "Pembekal plastik dan pembungkusan untuk utara Malaysia.",
    },
  }[language];

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-xl font-semibold text-[#1F2933]">{SITE_NAME_FULL}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280]">
            {copy.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            {copy.navigation}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#4B5563]">
            <Link href="/products">{copy.products}</Link>
            <Link href="/categories">{copy.categories}</Link>
            <Link href="/quote-list">{copy.quoteList}</Link>
            <Link href="/request-quote">{copy.requestQuote}</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            {copy.contact}
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[#4B5563]">
            <p className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
              <span>
                {copy.whatsapp}: +{WHATSAPP_NUMBER}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
              <span>
                {copy.serviceArea}: {SERVICE_REGIONS.join(", ")}
              </span>
            </p>
            {BRANCH_LOCATIONS.map((branch) => (
              <p key={branch.name} className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
                <span>
                  {branch.name}: {branch.address}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-[#6B7280] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            Copyright © 2026 {SITE_NAME_FULL}. {copy.copyright}
          </p>
          <p>{copy.seo}</p>
        </div>
      </div>
    </footer>
  );
}
