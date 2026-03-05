// src/app/layout.js
import HeaderShell from "@/components/layout/HeaderShell";
import Footer from "@/components/layout/Footer";
import NavigationLoader from "@/components/ui/NavigationLoader";
import HashScrollFix from "@/components/ui/HashScrollFix";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import siteData from "@/data/site.json";
import JsonLd from "@/components/seo/JsonLd";
import normalizeJsonLd from "@/lib/seo/normalizeJsonLd";
import { Poppins } from "next/font/google";
import "@/styles/global.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "Blue Blocks | Montessori + Innovation Ecosystem (Hyderabad)",
    template: "%s | Blue Blocks",
  },
  description:
    "Blue Blocks is a Montessori + innovation ecosystem in Hyderabad, supporting learners from birth to 18 through a research-led approach.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Blue Blocks",
    title: "Blue Blocks | Montessori + Innovation Ecosystem (Hyderabad)",
    description:
      "Montessori + innovation ecosystem in Hyderabad, supporting learners from birth to 18.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Blocks | Montessori + Innovation Ecosystem (Hyderabad)",
    description:
      "Montessori + innovation ecosystem in Hyderabad, supporting learners from birth to 18.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  // Global / site-wide schema from site.json
  const org = normalizeJsonLd(siteData?.site?.schema?.organization);
  const website = normalizeJsonLd(siteData?.site?.schema?.website);

  return (
    <html lang="en">
      <body className={`min-h-screen bg-white text-slate-900 ${poppins.className}`}>
        {/* Global JSON-LD (visible in view-source) */}
        <JsonLd id="jsonld-organization" data={org} />
        <JsonLd id="jsonld-website" data={website} />

        <HeaderShell />
        <NavigationLoader minMs={450} />
        <HashScrollFix extraGap={12} />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat config={siteData?.whatsapp} />
      </body>
    </html>
  );
}
