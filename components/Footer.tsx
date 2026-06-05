import Link from "next/link";
import { MapPin, Phone, Truck } from "lucide-react";
import {
  BRANCH_LOCATIONS,
  SERVICE_REGIONS,
  SITE_NAME_FULL,
  WHATSAPP_NUMBER,
} from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-xl font-semibold text-[#1F2933]">{SITE_NAME_FULL}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B7280]">
            Pembekal barangan plastik, pembungkusan, dan pilihan produk berkaitan untuk
            pelanggan perniagaan di utara Semenanjung Malaysia.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            Navigation
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#4B5563]">
            <Link href="/products">Products</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/quote-list">Quote List</Link>
            <Link href="/request-quote">Request Quote</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[#4B5563]">
            <p className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
              <span>WhatsApp: +{WHATSAPP_NUMBER}</span>
            </p>
            <p className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 text-[#1F6F5B]" />
              <span>Service area: {SERVICE_REGIONS.join(", ")}</span>
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
    </footer>
  );
}
