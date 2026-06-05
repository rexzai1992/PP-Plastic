import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const SITE_NAME = "RR Plastic Packaging Trading";
export const SITE_NAME_SHORT = "RR Plastic";
export const WHATSAPP_NUMBER = "60194629600";
export const SECONDARY_PHONE_NUMBER = "601137161937";
export const FALLBACK_R2_PUBLIC_URL = "https://pub-xxxxx.r2.dev";
export const MAX_REFERENCE_IMAGE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_REFERENCE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const SITE_NAME_FULL = SITE_NAME;
export const SERVICE_REGIONS = ["Kedah", "Pulau Pinang", "Perlis", "Perak"];
export const BUSINESS_PROFILE_TEXT =
  `${SITE_NAME_FULL} adalah perniagaan milik 100% Melayu Muslim yang beroperasi dalam bidang jualan barangan plastik, pembungkusan dan pelbagai produk pilihan dari Thailand. Kami mempunyai dua cawangan utama iaitu di Padang Serai, Kedah dan Tasek Gelugor, Pulau Pinang. Bagi kemudahan pelanggan, kami juga menyediakan penghantaran pantas ke seluruh kawasan Utara Semenanjung Malaysia termasuk ${SERVICE_REGIONS.join(", ")}.`;

export const SERVICE_HIGHLIGHTS = [
  "Jualan barangan plastik",
  "Barangan pembungkusan",
  "Produk pilihan dari Thailand",
  "Penghantaran pantas ke seluruh Utara Semenanjung Malaysia",
  "Delivery terus ke rumah atau premis pelanggan",
];

export const BUSINESS_HIGHLIGHTS = [
  "Dimiliki sepenuhnya oleh Bumiputera",
  "Cover satu utara",
  "Delivery terus ke rumah",
  "Banyak order, satu Malaysia kami pusing",
  "Fast WhatsApp quotation response",
];

export const BRANCH_LOCATIONS = [
  {
    address: "LC 216, Jalan Bagan, Padang Serai, 09400 Padang Serai, Kedah",
    contactName: "Are Jiem",
    hours: "8.30 PAGI - 7.00 PETANG",
    mapQuery: "LC 216, Jalan Bagan, Padang Serai, 09400 Padang Serai, Kedah",
    name: "Cawangan Padang Serai, Kedah",
    phone: WHATSAPP_NUMBER,
  },
  {
    address:
      "Pusat Perniagaan Pasar Awam, 18, Lorong 2, 13300 Tasek Gelugor, Pulau Pinang",
    contactName: "Rizal",
    hours: "8.30 PAGI - 6.00 PETANG",
    mapQuery:
      "Pusat Perniagaan Pasar Awam, 18, Lorong 2, 13300 Tasek Gelugor, Pulau Pinang",
    name: "Cawangan Tasek Gelugor, Penang",
    phone: SECONDARY_PHONE_NUMBER,
  },
] as const;

export function getGoogleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPublicAssetBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
    process.env.CLOUDFLARE_R2_PUBLIC_URL ||
    FALLBACK_R2_PUBLIC_URL
  ).replace(/\/$/, "");
}

export function buildPublicAssetUrl(key: string) {
  return `${getPublicAssetBaseUrl()}/${key.replace(/^\//, "")}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatListPreview(values: string[], maxItems = 2) {
  if (values.length <= maxItems) {
    return values.join(", ");
  }

  return `${values.slice(0, maxItems).join(", ")} +${values.length - maxItems}`;
}

export function isValidReferenceImage(file: File) {
  if (!ACCEPTED_REFERENCE_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, or WEBP image.";
  }

  if (file.size > MAX_REFERENCE_IMAGE_SIZE) {
    return "Reference images must be smaller than 5MB.";
  }

  return null;
}

export function formatDateLabel(value: string) {
  if (!value) {
    return "Not provided";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function normalizeOptionalValue(value?: string | null, fallback = "Not selected") {
  if (!value) {
    return fallback;
  }

  return value.trim() || fallback;
}
