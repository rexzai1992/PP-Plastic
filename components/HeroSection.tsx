"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Truck,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useLanguage } from "@/components/LanguageProvider";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import {
  BRANCH_LOCATIONS,
  SERVICE_REGIONS,
  SITE_NAME_FULL,
  getGoogleMapsEmbedUrl,
} from "@/lib/utils";

const heroCopy = {
  en: {
    badge: "Packaging supply",
    headline: "Plastic stock and packaging supplies for shops, F&B, warehouses and delivery.",
    intro:
      "Choose a product, send the size or reference photo, and our team will help check stock, pricing, and delivery options for northern Malaysia.",
    browseProducts: "Browse Products",
    whatsapp: "WhatsApp Us",
    branches: "View Branches",
    catalogueStat: "catalogue items for common packaging needs",
    branchStat: "branches in Padang Serai and Tasek Gelugor",
    deliveryStat: "northern states covered for delivery support",
    quoteEyebrow: "Faster quote",
    quoteTitle: "Send these details for faster price checking",
    requestQuote: "Request Quote",
    checklist: [
      "Product photo or name",
      "Size and thickness",
      "Estimated quantity",
      "Delivery location",
    ],
    deliveryNote:
      "Delivery or pickup support depends on stock, quantity, and location.",
    cards: [
      {
        title: "Direct delivery",
        text: "Suitable for shops, markets, F&B, warehouses, and repeat business orders.",
      },
      {
        title: "Fast stock checking",
        text: "WhatsApp the product name or photo and we will suggest the closest available option.",
      },
      {
        title: "Size discussion",
        text: "Ready-stock products and custom options are available depending on the item.",
      },
    ],
    branchEyebrow: "Branch locations",
    branchIntro:
      "Check our two store locations from the homepage with Google Maps and operating hours for walk-in customers or pickup arrangements.",
    open: "Open",
    location: "Our location",
    hours: "Operating hours",
    fullContact: "View full contact details",
    whatsappMessage: `Hi, I would like to ask about ${SITE_NAME_FULL} products.`,
  },
  bm: {
    badge: "Bekalan pembungkusan",
    headline: "Stok plastik dan pembungkusan untuk kedai, F&B, gudang dan penghantaran.",
    intro:
      "Pilih produk, hantar saiz atau gambar rujukan, dan kami bantu semak stok, harga, serta pilihan penghantaran untuk kawasan utara.",
    browseProducts: "Lihat Produk",
    whatsapp: "WhatsApp Kami",
    branches: "Lihat Cawangan",
    catalogueStat: "item katalog untuk keperluan pembungkusan harian",
    branchStat: "cawangan di Padang Serai dan Tasek Gelugor",
    deliveryStat: "negeri utara untuk sokongan penghantaran",
    quoteEyebrow: "Semakan harga cepat",
    quoteTitle: "Hantar maklumat ini untuk semakan harga lebih pantas",
    requestQuote: "Minta Harga",
    checklist: [
      "Gambar atau nama produk",
      "Saiz dan ketebalan",
      "Kuantiti anggaran",
      "Lokasi penghantaran",
    ],
    deliveryNote: "Penghantaran atau ambil sendiri bergantung pada stok, kuantiti, dan lokasi.",
    cards: [
      {
        title: "Penghantaran terus",
        text: "Sesuai untuk kedai, pasar, F&B, gudang, dan pelanggan yang kerap order.",
      },
      {
        title: "Semak stok cepat",
        text: "WhatsApp nama produk atau gambar untuk kami semak pilihan yang hampir.",
      },
      {
        title: "Boleh bincang saiz",
        text: "Ada produk sedia stok dan pilihan saiz khas bergantung pada item.",
      },
    ],
    branchEyebrow: "Lokasi cawangan",
    branchIntro:
      "Semak dua lokasi kedai kami, lengkap dengan Google Maps dan waktu operasi untuk pelanggan walk-in atau urusan ambil sendiri.",
    open: "Buka",
    location: "Lokasi kami",
    hours: "Waktu operasi",
    fullContact: "Lihat maklumat penuh",
    whatsappMessage: `Hi, saya ingin bertanya tentang produk ${SITE_NAME_FULL}.`,
  },
};

export function HeroSection() {
  const { language } = useLanguage();
  const copy = heroCopy[language];

  return (
    <section className="overflow-hidden border-b border-[#E5E7EB] bg-white">
      <div className="relative bg-[#102A43] text-white">
        <div className="absolute inset-0">
          <ImageWithFallback
            fill
            priority
            alt="Large plastic rolls for packing and wrapping on warehouse shelving"
            className="object-cover object-center"
            sizes="100vw"
            src="/categories/plastic-rolls.webp"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,67,0.97)_0%,rgba(16,42,67,0.88)_42%,rgba(16,42,67,0.42)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-[var(--brand-yellow)]" />
          <div className="absolute right-8 top-8 hidden rounded-full bg-[var(--brand-yellow)] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#102A43] shadow-lg lg:block">
            {copy.badge}
          </div>
        </div>

        <div className="page-shell relative py-14 lg:py-20">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-[var(--brand-yellow)] bg-[var(--brand-yellow)] px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#102A43] shadow-sm">
              {SITE_NAME_FULL} | Kedah & Pulau Pinang
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#DCEBFA] sm:text-lg">
              {copy.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-yellow)] px-5 py-3 text-sm font-bold text-[#102A43] transition-colors hover:bg-[#FFE76B]"
                href="/products"
              >
                {copy.browseProducts}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#102A43] transition-colors hover:bg-[#F7F8FA]"
                href={generateWhatsAppLink(
                  copy.whatsappMessage,
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {copy.whatsapp}
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                href="/contact"
              >
                {copy.branches}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 border-y border-white/15 py-5 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold text-white">48</p>
                <p className="mt-1 text-sm leading-6 text-[#DCEBFA]">
                  {copy.catalogueStat}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">2</p>
                <p className="mt-1 text-sm leading-6 text-[#DCEBFA]">
                  {copy.branchStat}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">4</p>
                <p className="mt-1 text-sm leading-6 text-[#DCEBFA]">
                  {copy.deliveryStat}
                </p>
              </div>
            </div>

            <div className="mt-8 max-w-4xl rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-yellow)]">
                    {copy.quoteEyebrow}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {copy.quoteTitle}
                  </h2>
                </div>
                <Link
                  className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--brand-yellow)] px-4 py-3 text-sm font-bold text-[#102A43] transition-colors hover:bg-[#FFE76B]"
                  href="/request-quote"
                >
                  {copy.requestQuote}
                </Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {copy.checklist.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-yellow)] text-xs font-bold text-[#102A43]">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium leading-6 text-white">{item}</p>
                  </div>
                ))}
              </div>
            <div className="mt-5 flex items-start gap-3 border-t border-white/15 pt-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-yellow)]" />
                <p className="text-sm leading-6 text-[#DCEBFA]">
                  {copy.deliveryNote} {SERVICE_REGIONS.join(", ")}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F7F8FA] text-[#1F2933]">
        <div className="page-shell py-10 lg:py-12">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <Truck className="h-5 w-5 text-[#0F4C81]" />
              <p className="mt-3 text-base font-semibold text-[#1F2933]">
                {copy.cards[0].title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {copy.cards[0].text}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <Clock3 className="h-5 w-5 text-[#0F4C81]" />
              <p className="mt-3 text-base font-semibold text-[#1F2933]">
                {copy.cards[1].title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {copy.cards[1].text}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <BadgeCheck className="h-5 w-5 text-[#0F4C81]" />
              <p className="mt-3 text-base font-semibold text-[#1F2933]">
                {copy.cards[2].title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {copy.cards[2].text}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="page-shell py-10 lg:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            {copy.branchEyebrow}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4B5563]">
            {copy.branchIntro}
          </p>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {BRANCH_LOCATIONS.map((branch) => (
              <div
                key={branch.name}
                className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA]"
              >
                <iframe
                  allowFullScreen
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={getGoogleMapsEmbedUrl(branch.mapQuery)}
                  title={`${branch.name} Google Map`}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-lg font-semibold text-[#1F2933]">{branch.name}</p>
                    <a
                      className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#0F4C81] hover:text-[#0C3B63]"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {copy.open}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-[#4B5563]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1F6F5B]" />
                    <span>
                      <span className="font-semibold text-[#1F2933]">{copy.location}:</span>{" "}
                      {branch.address}
                    </span>
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#4B5563]">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#1F6F5B]" />
                    <span>
                      <span className="font-semibold text-[#1F2933]">{copy.hours}:</span>{" "}
                      {branch.hours}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            className="mt-6 inline-flex text-sm font-semibold text-[#0F4C81] hover:text-[#0C3B63]"
            href="/contact"
          >
            {copy.fullContact}
          </Link>
        </div>
      </div>
    </section>
  );
}
