"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { AddToQuoteModal } from "@/components/AddToQuoteModal";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";
import {
  BUSINESS_HIGHLIGHTS,
  SERVICE_HIGHLIGHTS,
  SITE_NAME_FULL,
} from "@/lib/utils";

interface HomePageContentProps {
  featuredProducts: Product[];
  popularProducts: Product[];
}

export function HomePageContent({
  featuredProducts,
  popularProducts,
}: HomePageContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <HeroSection />

      <section className="border-y border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="page-shell page-section">
          <SectionTitle
            eyebrow="Popular products"
            title="Popular packaging and plastic items"
            description="These products are commonly used for food service, takeaway, retail packing, logistics, and warehouse operations."
          />
          <div className="mt-8">
            <ProductGrid products={popularProducts} onQuickAdd={setSelectedProduct} />
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <SectionTitle
          eyebrow="Our Services"
          title={`Perkhidmatan utama dari ${SITE_NAME_FULL}`}
          description="Maklumat ini diambil daripada profil perniagaan rujukan dan digunakan di sini supaya laman ini memaparkan servis serta kekuatan kedai sebenar."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {SERVICE_HIGHLIGHTS.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
            >
              <p className="text-base font-semibold text-[#1F2933]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="page-shell page-section">
          <SectionTitle
            eyebrow="Why Choose Us"
            title={`Apa yang menonjol tentang ${SITE_NAME_FULL}`}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-5">
            {BUSINESS_HIGHLIGHTS.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
                  Highlight {index + 1}
                </p>
                <p className="mt-3 text-base font-semibold leading-7 text-[#1F2933]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <SectionTitle
          eyebrow="Featured stock"
          title="Catalogue items ready for your next quote request"
          description="These highlighted products are a strong starting point for new enquiries and repeat supply needs."
        />
        <div className="mt-8">
          <ProductGrid products={featuredProducts} onQuickAdd={setSelectedProduct} />
        </div>
      </section>

      <section className="page-shell pb-20">
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#0F4C81] px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
            Northern Delivery Support
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Need a custom size, higher quantity, or delivery arrangement?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-100">
            Send your requirements to the sales team with reference images, preferred
            materials, and delivery area details. We&apos;ll help you confirm the right
            product, stock availability, and quotation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0F4C81]"
              href="/request-quote"
            >
              Request Custom Quote
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white"
              href="/contact"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

      <AddToQuoteModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
