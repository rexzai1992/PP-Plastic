"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Camera, ClipboardList, Truck } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLanguage } from "@/components/LanguageProvider";
import { categories } from "@/data/categories";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { formatListPreview, SITE_NAME_FULL } from "@/lib/utils";

export interface HomeProductPreview {
  id: string;
  slug: string;
  name: string;
  category: string;
  sizes: string[];
  moq: string;
  customSize: boolean;
  customPrint: boolean;
}

interface HomePageContentProps {
  featuredProducts: HomeProductPreview[];
  popularProducts: HomeProductPreview[];
}

const homeCopy = {
  en: {
    shopEyebrow: "Shop by need",
    shopTitle: "Start from what you want to pack",
    shopDescription:
      "Jump straight to any product category instead of scrolling through the full catalogue.",
    allCategories: "View all categories",
    browseItems: "Browse items",
    fastEyebrow: "Fast moving stock",
    fastTitle: "Common items customers ask for first",
    fastDescription:
      "A shorter list for quick browsing. Open any item to choose size, thickness, quantity, and send it to WhatsApp.",
    needElse: "Need something else?",
    needElseText:
      "Send a photo or rough size. We can suggest a close product from stock or a custom option.",
    askWhatsapp: "Ask on WhatsApp",
    quoteEyebrow: "Quote flow",
    quoteTitle: "Fastest way to get pricing",
    quoteSteps: [
      {
        icon: Camera,
        title: "Send a photo or product name",
        text: "Not sure what the item is called? A clear photo is enough for us to check.",
      },
      {
        icon: ClipboardList,
        title: "Share size and quantity",
        text: "Example: 500ml, 1 carton, 10x15 inch, or custom size.",
      },
      {
        icon: Truck,
        title: "Confirm pickup or delivery",
        text: "We will check stock, lead time, and delivery options.",
      },
    ],
    customEyebrow: "Custom friendly",
    customTitle: "Items that can start a custom enquiry",
    customPrint: "Custom print",
    customSize: "Custom size",
    requestCustom: "Request Custom Quote",
    deliveryEyebrow: "Northern Delivery Support",
    deliveryTitle: "Need a custom size, higher quantity, or delivery arrangement?",
    deliveryDescription:
      "Send your requirements to the sales team with reference images, preferred materials, and delivery area details. We'll help confirm the right product, stock availability, and quotation.",
    contactSales: "Contact Sales Team",
    whatsappMessage: `Hi, I am looking for plastic or packaging products from ${SITE_NAME_FULL}.`,
  },
  bm: {
    shopEyebrow: "Beli ikut keperluan",
    shopTitle: "Mula dengan barang yang anda mahu bungkus",
    shopDescription:
      "Terus pilih kategori produk tanpa perlu scroll seluruh katalog.",
    allCategories: "Lihat semua kategori",
    browseItems: "Lihat item",
    fastEyebrow: "Stok bergerak cepat",
    fastTitle: "Item biasa yang pelanggan tanya dahulu",
    fastDescription:
      "Senarai ringkas untuk semakan cepat. Buka item untuk pilih saiz, ketebalan, kuantiti, dan hantar ke WhatsApp.",
    needElse: "Cari barang lain?",
    needElseText:
      "Hantar gambar atau anggaran saiz. Kami boleh cadangkan produk sedia stok yang hampir atau pilihan saiz khas.",
    askWhatsapp: "Tanya di WhatsApp",
    quoteEyebrow: "Cara minta harga",
    quoteTitle: "Cara paling cepat untuk dapat harga",
    quoteSteps: [
      {
        icon: Camera,
        title: "Hantar gambar atau nama produk",
        text: "Tak pasti nama item? Gambar yang jelas pun cukup untuk kami semak.",
      },
      {
        icon: ClipboardList,
        title: "Beritahu saiz dan kuantiti",
        text: "Contoh: 500ml, 1 karton, 10x15 inci, atau saiz khas.",
      },
      {
        icon: Truck,
        title: "Pilih ambil sendiri atau penghantaran",
        text: "Kami semak stok, masa siap, dan pilihan penghantaran.",
      },
    ],
    customEyebrow: "Boleh buat khas",
    customTitle: "Item yang sesuai untuk pertanyaan khas",
    customPrint: "Cetakan khas",
    customSize: "Saiz khas",
    requestCustom: "Minta Harga Khas",
    deliveryEyebrow: "Sokongan Penghantaran Utara",
    deliveryTitle: "Perlu saiz khas, kuantiti besar, atau penghantaran?",
    deliveryDescription:
      "Hantar keperluan kepada team jualan bersama gambar rujukan, bahan pilihan, dan kawasan penghantaran. Kami bantu semak produk yang sesuai, stok, dan sebut harga.",
    contactSales: "Hubungi Team Jualan",
    whatsappMessage: `Hi, saya nak cari produk plastik atau pembungkusan dari ${SITE_NAME_FULL}.`,
  },
};

export function HomePageContent({
  featuredProducts,
  popularProducts,
}: HomePageContentProps) {
  const shoppingCarouselRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const copy = homeCopy[language];
  const shoppingPaths = categories.map((category) => ({
    title: category.name,
    description: category.description,
    href: `/products?category=${encodeURIComponent(category.name)}`,
    image: category.image,
  }));
  const fastMovingProducts = popularProducts.slice(0, 4);
  const customReadyProducts = featuredProducts
    .filter((product) => product.customSize || product.customPrint)
    .slice(0, 4);

  function scrollShoppingPaths(direction: "left" | "right") {
    const carousel = shoppingCarouselRef.current;
    if (!carousel) {
      return;
    }

    carousel.scrollBy({
      left: direction === "left" ? -carousel.clientWidth * 0.82 : carousel.clientWidth * 0.82,
      behavior: "smooth",
    });
  }

  return (
    <>
      <HeroSection />

      <section className="border-y border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="page-shell page-section">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
                {copy.shopEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2933]">
                {copy.shopTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#6B7280]">
                {copy.shopDescription}
              </p>
            </div>
            <Link
              className="inline-flex items-center text-sm font-semibold text-[#0F4C81] hover:text-[#0C3B63]"
              href="/categories"
            >
              {copy.allCategories}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex justify-end">
              <div className="flex gap-2">
                <button
                  aria-label="Scroll shop by need left"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6DCE3] bg-white text-[#1F2933] transition-colors hover:bg-[#EEF2F6]"
                  type="button"
                  onClick={() => scrollShoppingPaths("left")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Scroll shop by need right"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6DCE3] bg-white text-[#1F2933] transition-colors hover:bg-[#EEF2F6]"
                  type="button"
                  onClick={() => scrollShoppingPaths("right")}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={shoppingCarouselRef}
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {shoppingPaths.map((path) => (
                <Link
                  key={path.title}
                  className="group min-w-[78%] snap-start overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:min-w-[46%] lg:min-w-[32%] xl:min-w-[24%]"
                  href={path.href}
                >
                  <div className="relative aspect-[4/3] border-b border-[#E5E7EB] bg-[#F7F8FA]">
                    <ImageWithFallback
                      fill
                      alt={path.title}
                      className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                      sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 78vw"
                      src={path.image}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#1F2933]">{path.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      {path.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0F4C81]">
                      {copy.browseItems}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
              {copy.fastEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2933]">
              {copy.fastTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#6B7280]">
              {copy.fastDescription}
            </p>
            <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-5">
              <p className="text-sm font-semibold text-[#1F2933]">{copy.needElse}</p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {copy.needElseText}
              </p>
              <Link
                className="mt-4 inline-flex items-center text-sm font-semibold text-[#0F4C81] hover:text-[#0C3B63]"
                href={generateWhatsAppLink(
                  copy.whatsappMessage,
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                {copy.askWhatsapp}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {fastMovingProducts.map((product) => (
              <Link
                key={product.id}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                href={`/products/${product.slug}`}
              >
                <div className="flex h-full flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0F4C81]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-6 text-[#1F2933]">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {formatListPreview(product.sizes)}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#1F2933]">
                    MOQ: {product.moq}
                  </p>
                  <span className="mt-auto inline-flex items-center pt-4 text-sm font-semibold text-[#0F4C81]">
                    {copy.browseItems}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="page-shell page-section">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <div className="rounded-3xl bg-[#0F4C81] p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#DCEBFA]">
                {copy.quoteEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                {copy.quoteTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {copy.quoteSteps.map((step) => (
                  <div
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-white/15 bg-white/10 p-4"
                  >
                    <step.icon className="mt-1 h-5 w-5 shrink-0 text-[#FFDA6A]" />
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#DCEBFA]">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
                {copy.customEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2933]">
                {copy.customTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {customReadyProducts.map((product) => (
                  <Link
                    key={product.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4 transition-colors hover:bg-white"
                    href={`/products/${product.slug}`}
                  >
                    <div>
                      <p className="font-semibold text-[#1F2933]">{product.name}</p>
                      <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                        {product.customPrint ? copy.customPrint : copy.customSize} •{" "}
                        {product.category}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#0F4C81]" />
                  </Link>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex items-center rounded-lg bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
                href="/request-quote"
              >
                {copy.requestCustom}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-20">
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#0F4C81] px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
            {copy.deliveryEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {copy.deliveryTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-100">
            {copy.deliveryDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0F4C81]"
              href="/request-quote"
            >
              {copy.requestCustom}
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white"
              href="/contact"
            >
              {copy.contactSales}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
