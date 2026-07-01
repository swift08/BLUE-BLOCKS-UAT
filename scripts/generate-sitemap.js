/**
 * generate-sitemap.js — Builds public/sitemap.xml at prebuild time.
 *
 * Rules:
 *  - lastmod reflects the actual mtime of the source file, not build time.
 *  - Routes are deduplicated and sorted by priority.
 *  - Excluded: text/asset files (/llms.txt, /llms-full.txt, /sitemap.xml).
 *  - Excluded: draft, redirect, and 404 routes.
 *  - Priority tiers:
 *      1.0  Homepage
 *      0.9  Core conversion pages (programs, admissions, contact)
 *      0.8  Content pages (about, research, campus, innovation, etc.)
 *      0.7  Sub-pages (individual programs, innovation details, publications)
 *      0.6  Utility / legal pages
 *  - changefreq:
 *      weekly   – Homepage, blog index
 *      monthly  – Core + content pages
 *      yearly   – Legal, privacy, terms
 */

const fs = require("fs");
const path = require("path");

const siteData = require("../src/data/site.json");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.blueblocks.in"
).replace(/\/$/, "");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function absoluteUrl(route = "/") {
  return `${SITE_URL}${route.startsWith("/") ? route : `/${route}`}`;
}

/**
 * Get the last-modified time for a route by checking its page.js source file.
 * Falls back to the mtime of site.json (data-driven pages) then site.json
 * itself, and finally the current build time as last resort.
 */
function getLastmod(route) {
  // Map route → source file candidates (most-specific first)
  const candidates = [
    // e.g. /about-us → src/app/about-us/page.js
    path.join(process.cwd(), "src", "app", ...route.split("/").filter(Boolean), "page.js"),
    // Data-driven pages share site.json mtime
    path.join(process.cwd(), "src", "data", "site.json"),
    // Publishing data (blog posts, research)
    path.join(process.cwd(), "src", "data", "publishing.js"),
  ];

  for (const candidate of candidates) {
    try {
      const stat = fs.statSync(candidate);
      return stat.mtime.toISOString().split(".")[0] + "Z";
    } catch {
      // file doesn't exist — try next
    }
  }

  // Absolute fallback
  return new Date().toISOString().split(".")[0] + "Z";
}

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

function getRoutes({ researchOutputs = [], blogPosts = [] }) {
  // Routes that are HTML pages and should appear in the sitemap
  const tier10 = [
    { route: "/", changefreq: "weekly", priority: "1.0" },
  ];

  const tier09 = [
    { route: "/programs", changefreq: "monthly", priority: "0.9" },
    { route: "/admissions", changefreq: "monthly", priority: "0.9" },
    { route: "/contact-us", changefreq: "monthly", priority: "0.9" },
  ];

  const tier08 = [
    { route: "/about-us", changefreq: "monthly", priority: "0.8" },
    { route: "/about-us/founders/pavan-goyal", changefreq: "monthly", priority: "0.8" },
    { route: "/about-us/founders/munira-hussain", changefreq: "monthly", priority: "0.8" },
    { route: "/innovation", changefreq: "monthly", priority: "0.8" },
    { route: "/research-institute", changefreq: "monthly", priority: "0.8" },
    { route: "/campus", changefreq: "monthly", priority: "0.8" },
    { route: "/blog", changefreq: "weekly", priority: "0.8" },
    { route: "/papers", changefreq: "monthly", priority: "0.8" },
    { route: "/parents", changefreq: "monthly", priority: "0.8" },
    { route: "/careers", changefreq: "monthly", priority: "0.8" },
    { route: "/montessori-system", changefreq: "monthly", priority: "0.8" },
    { route: "/ami-training", changefreq: "monthly", priority: "0.8" },
    { route: "/faq", changefreq: "monthly", priority: "0.8" },
    { route: "/videos", changefreq: "monthly", priority: "0.8" },
    { route: "/sitemap", changefreq: "monthly", priority: "0.8" },
  ];

  const tier07 = [
    // Governance
    { route: "/governance/ethics", changefreq: "monthly", priority: "0.7" },
    { route: "/governance/our-standards", changefreq: "monthly", priority: "0.7" },
    // Standalone paper pages
    { route: "/adolescent-social-newborn-paper", changefreq: "monthly", priority: "0.7" },
    { route: "/the-architecture-of-the-universe", changefreq: "monthly", priority: "0.7" },
    { route: "/neuropsychiatry-of-toddler-plane", changefreq: "monthly", priority: "0.7" },
    { route: "/the-conscious-construction-of-intelligence", changefreq: "monthly", priority: "0.7" },
    // Innovation/drone standalone
    { route: "/drone", changefreq: "monthly", priority: "0.7" },
  ];

  const tier06 = [
    { route: "/privacy-policy", changefreq: "yearly", priority: "0.6" },
    { route: "/terms", changefreq: "yearly", priority: "0.6" },
  ];

  // ---------------------------------------------------------------------------
  // Dynamic routes from data
  // ---------------------------------------------------------------------------

  // Program detail pages
  const programDetails = Object.keys(siteData?.pages?.programDetails || {})
    .filter((key) => !["breadcrumbs", "schema", "toddlerDetail"].includes(key))
    .map((slug) => ({ route: `/programs/${slug}`, changefreq: "monthly", priority: "0.7" }));

  // Innovation detail pages
  const innovationDetails = Object.keys(siteData?.pages?.innovationDetail || {})
    .filter((key) => !["breadcrumbs", "schema"].includes(key))
    .map((slug) => ({ route: `/innovation/${slug}`, changefreq: "monthly", priority: "0.7" }));

  // Primary detail pages
  const primaryDetails = Object.keys(siteData?.pages?.primaryDetail || {})
    .filter((key) => key !== "breadcrumbs")
    .map((slug) => ({ route: `/primary/${slug}`, changefreq: "monthly", priority: "0.7" }));

  // Research publications
  const publicationRoutes = researchOutputs.map((item) => ({
    route: `/publications/${item.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  // Blog posts
  const blogRoutes = blogPosts
    .filter((p) => p.slug)
    .map((p) => ({
      route: `/blog/${p.slug}`,
      changefreq: "weekly",
      priority: "0.7",
    }));

  // Combine all, deduplicate by route
  const all = [
    ...tier10,
    ...tier09,
    ...tier08,
    ...tier07,
    ...tier06,
    ...programDetails,
    ...innovationDetails,
    ...primaryDetails,
    ...publicationRoutes,
    ...blogRoutes,
  ];

  const seen = new Set();
  return all.filter(({ route }) => {
    if (seen.has(route)) return false;
    seen.add(route);
    return true;
  });
}

// ---------------------------------------------------------------------------
// XML builder
// ---------------------------------------------------------------------------

function buildXml(entries) {
  const urls = entries
    .map(({ route, changefreq, priority }) => {
      const lastmod = getLastmod(route);
      return `
  <url>
    <loc>${absoluteUrl(route)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${urls}
</urlset>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { pathToFileURL } = require("url");

  const publishingPath = path.join(process.cwd(), "src", "data", "publishing.js");
  const publishingModule = await import(pathToFileURL(publishingPath).href);

  const researchOutputs = Array.isArray(publishingModule.RESEARCH_OUTPUTS)
    ? publishingModule.RESEARCH_OUTPUTS
    : [];
  const blogPosts = Array.isArray(publishingModule.BLOG_POSTS)
    ? publishingModule.BLOG_POSTS
    : [];

  const entries = getRoutes({ researchOutputs, blogPosts });
  const xml = buildXml(entries);

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf8");

  console.log(`✓ sitemap.xml generated (${entries.length} URLs) → ${outputPath}`);
  console.log(`  Base URL: ${SITE_URL}`);
}

main().catch((err) => {
  console.error("✗ Failed to generate sitemap.xml");
  console.error(err);
  process.exit(1);
});
