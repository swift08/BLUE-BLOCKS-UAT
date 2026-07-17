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
 *      0.8  Core conversion and main content pages (about, admissions, programs, campus, etc.)
 *      0.7  Sub-pages, articles, and publications
 *      0.6  Legal, utility, and markdown files
 *  - changefreq:
 *      weekly   – Homepage, blog index
 *      monthly  – Core + content pages
 *      yearly   – Legal, privacy, terms
 */

const fs = require("fs");
const path = require("path");

const siteData = require("../src/data/site.json");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://blueblocks.in"
).replace(/\/$/, "");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function absoluteUrl(route = "/") {
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  // Enforce trailing slash if it doesn't end with one and has no file extension
  if (!cleanRoute.endsWith("/") && !path.extname(cleanRoute)) {
    return `${SITE_URL}${cleanRoute}/`;
  }
  return `${SITE_URL}${cleanRoute}`;
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

function getStaticRoutes(dir, base = "", routes = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Skip dynamic route folders starting with '['
      if (item.startsWith("[")) continue;
      // Skip forms index and subpages completely (they are noindexed)
      if (item === "forms") continue;
      getStaticRoutes(fullPath, `${base}/${item}`, routes);
    } else if (item === "page.js") {
      const route = base || "/";
      if (route === "/_not-found") continue;
      routes.push(route);
    }
  }
  return routes;
}

function getPriorityAndFreq(route) {
  if (route === "/") return { changefreq: "weekly", priority: "1.0" };

  // Core conversion & high-value pages
  const highPriority = [
    "/admissions",
    "/programs",
    "/contact-us",
    "/about-us",
    "/careers",
    "/campus",
    "/research-institute",
    "/montessori-system",
    "/ami-training",
    "/innovation",
    "/parents",
  ];
  if (highPriority.includes(route)) {
    return { changefreq: "monthly", priority: "0.8" };
  }

  // Legal / utility pages
  if (route.startsWith("/privacy-policy") || route.startsWith("/terms")) {
    return { changefreq: "yearly", priority: "0.5" };
  }

  // Blog posts and publications
  if (route.startsWith("/blog/") || route.startsWith("/publications/")) {
    return { changefreq: "monthly", priority: "0.7" };
  }

  // Everything else: sub-pages, articles, FAQ, videos, etc.
  return { changefreq: "monthly", priority: "0.7" };
}

function getRoutes({ researchOutputs = [], blogPosts = [] }) {
  const appDir = path.join(process.cwd(), "src", "app");
  const staticRoutesList = getStaticRoutes(appDir);

  const staticRoutes = staticRoutesList.map((route) => {
    const config = getPriorityAndFreq(route);
    return { route, ...config };
  });

  // Dynamic routes from data

  // Founders (under about-us/founders/[slug])
  const aboutUsSection = (siteData?.pages?.aboutUs?.sections || []).find(
    (item) => item?.type === "foundersGuides"
  );
  const founders = Array.isArray(aboutUsSection?.props?.items) ? aboutUsSection.props.items.slice(0, 2) : [];
  const founderRoutes = founders.map((founder) => {
    const raw = String(founder?.readMoreHref || founder?.name || "").trim().toLowerCase();
    const slug = raw.includes("pavan-goyal")
      ? "pavan-goyal"
      : raw.includes("munira-hussain")
      ? "munira-hussain"
      : raw.replace(/^\/+|\/+$/g, "").split("/").pop();
    return { route: `/about-us/founders/${slug}`, changefreq: "monthly", priority: "0.7" };
  });

  // Program detail pages
  const programDetails = Object.keys(siteData?.pages?.programDetails || {})
    .filter((key) => !["breadcrumbs", "schema", "toddlerDetail"].includes(key))
    .map((slug) => ({ route: `/programs/${slug}`, changefreq: "monthly", priority: "0.7" }));

  // Innovation detail pages
  const innovationDetails = Object.keys(siteData?.pages?.innovationDetail || {})
    .filter((key) => !["breadcrumbs", "schema"].includes(key))
    .map((slug) => ({ route: `/innovation/${slug}`, changefreq: "monthly", priority: "0.7" }));

  // Research publications
  const publicationRoutes = researchOutputs.map((item) => ({
    route: `/publications/${item.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  // Research publications markdown views
  const publicationMdRoutes = researchOutputs.map((item) => ({
    route: `/publications/${item.slug}/${item.slug}.md`,
    changefreq: "monthly",
    priority: "0.6",
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
    ...staticRoutes,
    ...founderRoutes,
    ...programDetails,
    ...innovationDetails,
    ...publicationRoutes,
    ...publicationMdRoutes,
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
