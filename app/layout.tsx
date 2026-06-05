import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { FloatingQuoteButton } from "@/components/FloatingQuoteButton";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { SITE_NAME_FULL } from "@/lib/utils";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME_FULL} | Plastic Packaging Supplier`,
    template: `%s | ${SITE_NAME_FULL}`,
  },
  description:
    "RR Plastic Packaging Trading supplies plastic goods, packaging items, and delivery support for customers across northern Peninsular Malaysia.",
  keywords: [
    "Plastic Supply Malaysia",
    "Plastic Bag Supplier Malaysia",
    "Plastic Packaging Supplier",
    "Bulk Plastic Supplier",
    "Custom Plastic Packaging",
    "Industrial Plastic Supply",
    "Plastic Roll Supplier",
    "Garbage Bag Supplier",
    "Stretch Film Supplier",
    "Food Packaging Supplier",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-[#1F2933]">
        <Providers />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingQuoteButton />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
