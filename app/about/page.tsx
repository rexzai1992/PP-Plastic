import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import {
  BRANCH_LOCATIONS,
  BUSINESS_PROFILE_TEXT,
  BUSINESS_HIGHLIGHTS,
  SERVICE_HIGHLIGHTS,
  SITE_NAME_FULL,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: `About ${SITE_NAME_FULL}`,
  description: `Learn about ${SITE_NAME_FULL}, its branch locations, service coverage, and packaging supply support.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="page-shell py-14">
          <SectionTitle
            eyebrow="About Us"
            title={`${SITE_NAME_FULL} sebagai pembekal plastik dan packaging`}
            description={`${SITE_NAME_FULL} ialah perniagaan 100% Bumiputera yang menjalankan jualan barangan plastik, pembungkusan, dan pelbagai produk pilihan dari Thailand.`}
          />
        </div>
      </section>

      <section className="page-shell page-section grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#1F2933]">Profil Perniagaan</h2>
          <p className="mt-4 text-base leading-8 text-[#4B5563]">
            {BUSINESS_PROFILE_TEXT}
          </p>
          <p className="mt-4 text-base leading-8 text-[#4B5563]">
            Di laman ini, kami kekalkan aliran permintaan sebut harga supaya pelanggan
            boleh semak produk, pilih spesifikasi, dan hubungi terus pasukan jualan
            melalui WhatsApp.
          </p>
        </div>

        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#1F2933]">Branch Locations</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BRANCH_LOCATIONS.map((branch) => (
              <div
                key={branch.name}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4 text-sm font-semibold text-[#1F2933]"
              >
                <p>{branch.name}</p>
                <p className="mt-2 font-normal leading-6 text-[#4B5563]">{branch.address}</p>
                <p className="mt-2 font-normal text-[#4B5563]">{branch.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
        <div className="page-shell page-section">
          <SectionTitle eyebrow="Services" title="Perkhidmatan & kekuatan utama" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {SERVICE_HIGHLIGHTS.map((reason) => (
              <div
                key={reason}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
              >
                <p className="text-base font-semibold text-[#1F2933]">{reason}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {BUSINESS_HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
              >
                <p className="text-base font-semibold text-[#1F2933]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
