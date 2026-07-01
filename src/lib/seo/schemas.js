/**
 * schemas.js — Reusable Schema.org JSON-LD builders.
 *
 * Each function returns a plain JSON-serialisable object ready to be
 * passed to <JsonLd /> or <PageJsonLd />.
 */

import { SITE_URL, SITE_NAME } from "./siteConfig";

/** Absolute URL helper — accepts site-relative paths or full URLs. */
function abs(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

/**
 * buildBreadcrumbSchema(items)
 *
 * @param {Array<{ name: string, href?: string }>} items
 *   Last item may omit href (it is the current page).
 * @returns Schema.org BreadcrumbList object
 */
export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: abs(item.href) } : {}),
    })),
  };
}

// ---------------------------------------------------------------------------
// WebPage
// ---------------------------------------------------------------------------

/**
 * buildWebPageSchema({ path, name, description, type? })
 *
 * @param {{ path: string, name: string, description: string, type?: string }} opts
 * @returns Schema.org WebPage object
 */
export function buildWebPageSchema({ path, name, description, type = "WebPage" }) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

// ---------------------------------------------------------------------------
// Article / BlogPosting
// ---------------------------------------------------------------------------

/**
 * buildArticleSchema({ path, headline, description, datePublished, dateModified?, authorName? })
 *
 * @returns Schema.org BlogPosting / Article object
 */
export function buildArticleSchema({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  authorName = "Pavan Goyal",
  type = "BlogPosting",
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    url,
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#pavan`,
      name: authorName,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-IN",
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

/**
 * buildFaqSchema(qaPairs)
 *
 * @param {Array<{ question: string, answer: string }>} qaPairs
 * @returns Schema.org FAQPage object
 */
export function buildFaqSchema(qaPairs = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qaPairs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// ScholarlyArticle (Research Papers)
// ---------------------------------------------------------------------------

/**
 * buildScholarlyArticleSchema({ path, name, description, datePublished, authorName? })
 */
export function buildScholarlyArticleSchema({
  path,
  name,
  description,
  datePublished,
  authorName = "Pavan Goyal",
}) {
  return buildArticleSchema({
    path,
    headline: name,
    description,
    datePublished,
    authorName,
    type: "ScholarlyArticle",
  });
}
