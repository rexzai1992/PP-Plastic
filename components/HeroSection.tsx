"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import {
  BRANCH_LOCATIONS,
  SERVICE_REGIONS,
  SITE_NAME_FULL,
  getGoogleMapsEmbedUrl,
} from "@/lib/utils";

export function HeroSection() {
  const whyBuyReasons = [
    "Dua cawangan utama untuk urusan lebih cepat",
    `Liputan penghantaran ke ${SERVICE_REGIONS.join(", ")}`,
    "Delivery terus ke rumah atau premis pelanggan",
    "Respon WhatsApp pantas untuk quotation dan semakan stok",
  ];

  return (
    <section className="border-b border-[#E5E7EB] bg-[linear-gradient(180deg,#fffdf7_0%,#f7f8fa_100%)]">
      <div className="page-shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#D6DCE3] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81] shadow-sm">
              {SITE_NAME_FULL} | Kedah & Pulau Pinang
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1F2933] sm:text-5xl">
              Kedai plastik dan packaging yang bantu pelanggan beli dengan lebih mudah
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6B7280]">
              {SITE_NAME_FULL} ialah perniagaan 100% Bumiputera yang membekalkan
              barangan plastik, packaging, dan produk berkaitan untuk pelanggan di
              utara Semenanjung. Kami fokus pada urusan yang cepat, servis yang mudah
              dihubungi, dan penghantaran yang terus sampai ke pelanggan.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <Store className="h-5 w-5 text-[#0F4C81]" />
                <p className="mt-3 text-base font-semibold text-[#1F2933]">Tentang Kedai</p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Dua cawangan utama di Padang Serai dan Tasek Gelugor untuk urusan
                  jualan dan sokongan pelanggan.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-[#0F4C81]" />
                <p className="mt-3 text-base font-semibold text-[#1F2933]">USP Kami</p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  100% Bumiputera, cover satu utara, dan sediakan delivery terus ke
                  rumah atau premis pelanggan.
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <Truck className="h-5 w-5 text-[#0F4C81]" />
                <p className="mt-3 text-base font-semibold text-[#1F2933]">
                  Kenapa Beli Dari Kami
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Pelanggan lebih mudah semak stok, minta quotation, dan atur
                  penghantaran terus melalui WhatsApp.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0C3B63]"
                href="/products"
              >
                View Products
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-[#1F6F5B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#175746]"
                href={generateWhatsAppLink(
                  `Hi, saya ingin bertanya tentang produk ${SITE_NAME_FULL}.`,
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp Us
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-[#D6DCE3] bg-white px-5 py-3 text-sm font-semibold text-[#1F2933] transition-colors hover:bg-[#F7F8FA]"
                href="/contact"
              >
                View Branches
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#D9E5F0] bg-[#0F4C81] p-6 text-white shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#DCEBFA]">
                  Why choose us
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Sebab pelanggan yakin beli dari kami
                </h2>
              </div>
              <ArrowRight className="h-5 w-5 text-[#DCEBFA]" />
            </div>
            <div className="mt-6 space-y-3">
              {whyBuyReasons.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4"
                >
                  <BadgeCheck className="mt-0.5 h-5 w-5 text-[#FFDA6A]" />
                  <p className="text-sm font-medium leading-6 text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {SERVICE_REGIONS.map((region) => (
                <span
                  key={region}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#DCEBFA]"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm lg:mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            Lokasi cawangan
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4B5563]">
            Semak dua lokasi kedai kami terus dari hero, lengkap dengan Google Maps
            embed dan waktu operasi untuk pelanggan walk-in atau urusan pickup.
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
                      Open
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-[#4B5563]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1F6F5B]" />
                    <span>
                      <span className="font-semibold text-[#1F2933]">Lokasi kami:</span>{" "}
                      {branch.address}
                    </span>
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#4B5563]">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#1F6F5B]" />
                    <span>
                      <span className="font-semibold text-[#1F2933]">Waktu operasi:</span>{" "}
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
            View full contact details
          </Link>
        </div>
      </div>
    </section>
  );
}
