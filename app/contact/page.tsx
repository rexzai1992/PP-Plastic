import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, MapPin, Phone, Truck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import {
  BRANCH_LOCATIONS,
  SERVICE_REGIONS,
  SITE_NAME_FULL,
  WHATSAPP_NUMBER,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact ${SITE_NAME_FULL}`,
  description: `Contact ${SITE_NAME_FULL} through WhatsApp and view the business branch locations in Kedah and Pulau Pinang.`,
};

export default function ContactPage() {
  const whatsappHref = generateWhatsAppLink(
    `Hi, saya ingin bertanya tentang produk ${SITE_NAME_FULL}.`,
  );

  return (
    <section className="page-shell page-section">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1F2933]">
              Hubungi {SITE_NAME_FULL}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#6B7280]">
              Gunakan WhatsApp untuk respon paling cepat, atau semak maklumat dua
              cawangan utama kami di bawah.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[#4B5563]">
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
                <span>WhatsApp utama: +{WHATSAPP_NUMBER}</span>
              </p>
              <p className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
                <span>Service area: {SERVICE_REGIONS.join(", ")}</span>
              </p>
              {BRANCH_LOCATIONS.map((branch) => (
                <div key={branch.name} className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-4">
                  <p className="text-sm font-semibold text-[#1F2933]">{branch.name}</p>
                  <p className="mt-2 flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="mt-2 flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
                    <span>{branch.hours}</span>
                  </p>
                  <p className="mt-2 flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
                    <span>
                      {branch.contactName}: +{branch.phone}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <Link
              className="mt-8 inline-flex rounded-lg bg-[#1F6F5B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#175746]"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp Sales Team
            </Link>
          </div>

          <div className="rounded-3xl border border-[#E5E7EB] bg-[#F7F8FA] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1F2933]">Location Map</h2>
            <div className="mt-5 flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-white text-sm text-[#6B7280]">
              Search on Google Maps: {SITE_NAME_FULL}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
