import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FloatingQuoteButton } from "@/components/FloatingQuoteButton";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import {
  BRANCH_LOCATIONS,
  BUSINESS_PROFILE_TEXT,
  SERVICE_HIGHLIGHTS,
  SERVICE_REGIONS,
  SITE_NAME_FULL,
  SITE_NAME_SHORT,
  WHATSAPP_NUMBER,
  getSiteUrl,
} from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME_FULL} | Plastic Packaging Supplier Kedah & Penang`,
    template: `%s | ${SITE_NAME_FULL}`,
  },
  description:
    "RR Plastic Packaging Trading supplies plastic bags, food packaging, stretch film, bubble wrap, courier bags, garbage bags, and custom plastic packaging across Kedah, Pulau Pinang, Perlis, and Perak.",
  applicationName: SITE_NAME_FULL,
  authors: [{ name: SITE_NAME_FULL }],
  creator: SITE_NAME_FULL,
  publisher: SITE_NAME_FULL,
  keywords: [
    "plastic packaging supplier Kedah",
    "plastic packaging supplier Penang",
    "plastic bag supplier Kedah",
    "plastic bag supplier Pulau Pinang",
    "pembekal plastik Kedah",
    "pembekal plastik Penang",
    "kedai plastik Padang Serai",
    "kedai plastik Tasek Gelugor",
    "food packaging supplier Malaysia",
    "plastic container supplier",
    "stretch film supplier",
    "bubble wrap supplier",
    "courier bag supplier",
    "garbage bag supplier",
    "custom printed plastic bag",
    "bulk plastic supply northern Malaysia",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME_FULL} | Plastic Packaging Supplier Kedah & Penang`,
    description:
      "Plastic bags, food packaging, stretch film, bubble wrap, courier bags, garbage bags, and custom plastic packaging with northern Malaysia delivery support.",
    url: "/",
    siteName: SITE_NAME_FULL,
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/categories/plastic-rolls.webp",
        width: 800,
        height: 600,
        alt: `${SITE_NAME_FULL} plastic packaging products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME_FULL} | Plastic Packaging Supplier`,
    description:
      "Plastic packaging supplier for Kedah, Pulau Pinang, Perlis, and Perak.",
    images: ["/categories/plastic-rolls.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME_FULL,
        alternateName: SITE_NAME_SHORT,
        url: siteUrl,
        telephone: `+${WHATSAPP_NUMBER}`,
        description: BUSINESS_PROFILE_TEXT,
        areaServed: SERVICE_REGIONS.map((region) => ({
          "@type": "State",
          name: region,
          addressCountry: "MY",
        })),
        knowsAbout: [
          "plastic bags",
          "food packaging",
          "plastic containers",
          "stretch film",
          "shrink film",
          "bubble wrap",
          "courier bags",
          "garbage bags",
          "custom printed plastic packaging",
        ],
        makesOffer: SERVICE_HIGHLIGHTS.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME_FULL,
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: ["en-MY", "ms-MY"],
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      ...BRANCH_LOCATIONS.map((branch, index) => ({
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#branch-${index + 1}`,
        name: `${SITE_NAME_FULL} - ${branch.name}`,
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
        },
        url: siteUrl,
        telephone: `+${branch.phone}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: branch.address,
          addressCountry: "MY",
        },
        openingHours: branch.hours,
        areaServed: SERVICE_REGIONS,
        priceRange: "$$",
      })),
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-white font-sans text-[#1F2933]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingQuoteButton />
          <FloatingWhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
