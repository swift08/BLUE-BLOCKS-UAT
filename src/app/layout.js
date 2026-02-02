// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderShell from "@/components/layout/HeaderShell";
import Footer from "@/components/layout/Footer";
import NavigationLoader from "@/components/ui/NavigationLoader";
import HashScrollFix from "@/components/ui/HashScrollFix";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import siteData from "@/data/site.json";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://dev65.blueblocks.in";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  // ✅ GLOBAL NOINDEX / NOFOLLOW
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },

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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Blue Blocks",
  url: SITE_URL,
  logo: `${SITE_URL}/icon/logo.svg`,
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "MIG 3, Lane opposite to DLF, Gachibowli",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Tellapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white text-slate-900 ${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd id="org-jsonld" data={orgSchema} />

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
