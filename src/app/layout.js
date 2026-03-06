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
