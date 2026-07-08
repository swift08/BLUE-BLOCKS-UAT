/**
 * buildMetadata.js — Utility to generate fully-formed Next.js metadata objects.
 *
 * Usage:
 *   export const metadata = buildPageMetadata({
 *     path: "/about-us",
 *     title: "About Us | Blue Blocks",
 *     description: "...",
 *   });
 *
 * Guarantees:
 *   - Canonical always points to production domain.
 *   - metadataBase always points to production domain.
 *   - OG and Twitter tags are populated from page-level overrides or defaults.
 *   - robots defaults to index + follow.
 */

import { SITE_URL, SITE_NAME, SITE_TWITTER, SITE_LOCALE } from "./siteConfig";

const PRODUCTION_BASE = new URL(SITE_URL);

/**
 * @param {{
 *   path: string,
 *   title: string,
 *   description: string,
 *   keywords?: string[],
 *   ogImage?: string,
 *   ogType?: string,
 *   noIndex?: boolean,
 *   alternateLanguages?: Record<string, string>,
 * }} opts
 */
export function buildPageMetadata({
  path,
  title,
  description,
  keywords,
  ogImage = `${SITE_URL}/images/og-default.jpg`,
  ogType = "website",
  noIndex = false,
  alternateLanguages,
}) {
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    // Always use production base — never localhost or Vercel preview URLs.
    metadataBase: PRODUCTION_BASE,

    title,
    description,
    ...(keywords?.length ? { keywords } : {}),

    robots: noIndex
      ? { index: false, follow: false }
      : {
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

    alternates: {
      canonical,
      languages: alternateLanguages || {
        "en-in": canonical,
        "x-default": canonical,
      },
    },

    openGraph: {
      type: ogType,
      url: canonical,
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER,
      title,
      description,
      images: [ogImage],
    },
  };
}
