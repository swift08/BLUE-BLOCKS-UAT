/**
 * siteConfig.js — Single source of truth for site-wide SEO constants.
 *
 * Import from this file in metadata generators, sitemap scripts, and
 * schema builders instead of repeating the URL/name inline everywhere.
 */

export const SITE_URL = "https://blueblocks.in";
export const SITE_NAME = "Blue Blocks Montessori School";
export const SITE_LEGAL_NAME = "Blue Blocks Montessori Educational Society";
export const SITE_TWITTER = "@BlueblocksEdu";
export const SITE_LOCALE = "en_IN";
export const SITE_LANG = "en-IN";
export const SITE_FOUNDED = "2009";
export const SITE_REGION = "IN-TG";
export const SITE_CITY = "Hyderabad";

/** Canonical base — always production, never localhost or Vercel preview. */
export function canonicalUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
