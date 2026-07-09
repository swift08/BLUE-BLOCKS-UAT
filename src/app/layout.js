// src/app/layout.js
import Script from "next/script";
import HeaderShell from "@/components/layout/HeaderShell";
import Footer from "@/components/layout/Footer";
import NavigationLoader from "@/components/ui/NavigationLoader";
import HashScrollFix from "@/components/ui/HashScrollFix";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import siteData from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import normalizeJsonLd from "@/lib/seo/normalizeJsonLd";
import { buildNextLevelSchema } from "@/lib/seo/nextLevelSchemas";
import { Poppins } from "next/font/google";
import "@/styles/global.css";
import GoogleConversions from "@/components/GoogleConversions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  // Reduces CLS by adjusting the fallback font metrics to closely match Poppins,
  // preventing a visible layout shift when the custom font loads.
  adjustFontFallback: true,
  variable: "--font-poppins",
});

export const metadata = {
  // Always production — never localhost or Vercel preview URLs.
  metadataBase: new URL("https://blueblocks.in"),
  verification: {
    google: "SI7CvW22nLVTd7Oz5CRp01zUa_mrzQSWsufefVcW9QA",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
};

export default function RootLayout({ children }) {
  // Global / site-wide schema from site.json
  const org = normalizeJsonLd(siteData?.site?.schema?.organization);
  const website = normalizeJsonLd(siteData?.site?.schema?.website);
  const nextLevelSchema = buildNextLevelSchema();

  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        {/* DNS + TCP pre-negotiation for third-party domains.
            Reduces connection latency by 50-200ms on first visit. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://ssl.google-analytics.com" />
        {/* fonts.gstatic pre-negotiation (font file CDN) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`min-h-screen bg-white text-slate-900 ${poppins.className}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJR47ZKB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Google Tag Manager */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TJR47ZKB');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Global JSON-LD (visible in view-source) */}
        <JsonLd id="jsonld-organization" data={org} />
        <JsonLd id="jsonld-website" data={website} />
        <JsonLd id="jsonld-next-level" data={nextLevelSchema} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KYX146E33J"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());

            gtag('config', 'G-KYX146E33J');
            gtag('config', 'AW-1064646284');
          `}
        </Script>

        <GoogleConversions />


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

