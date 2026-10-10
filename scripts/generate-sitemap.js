/**
 * generate-sitemap.js — Builds public/sitemap.xml at prebuild time.
 *
 * Rules:
 *  - lastmod = source file mtime (not build time).
 *  - Deduplicated, sorted by priority then path.
 *  - Alias/redirect routes excluded (canonicals only).
 *  - Every real indexable page included (forms noindex skipped).
 *  - Blog slugs from live WordPress (soft-fail).
 */

const fs = require("fs");
const path = require("path");

const siteData = require("../src/data/site.json");
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://blueblocks.in"
).replace(/\/$/, "");

function absoluteUrl(route = "/") {
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  if (!cleanRoute.endsWith("/") && !path.extname(cleanRoute)) {
    return `${SITE_URL}${cleanRoute}/`;
  }
  return `${SITE_URL}${cleanRoute}`;
}

function getLastmod(route) {
  const candidates = [
    path.join(process.cwd(), "src", "app", ...route.split("/").filter(Boolean), "page.js"),
    path.join(process.cwd(), "src", "data", "site.json"),
    path.join(process.cwd(), "src", "data", "publishing.js"),
  ];
  for (const candidate of candidates) {
    try {
      return fs.statSync(candidate).mtime.toISOString().split(".")[0] + "Z";
    } catch {
      /* try next */
    }
  }
  return new Date().toISOString().split(".")[0] + "Z";
}

/** Redirect/alias URLs — keep live for indexing via re-export, but sitemap lists canonical only. */
const SITEMAP_EXCLUDED_ROUTES = new Set([
  "/drone",
  "/video-catalogue",
  "/ami-training",
  "/annoucement-centre",
]);

function getStaticRoutes(dir, base = "", routes = []) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item.startsWith("[")) continue;
      if (item === "forms") continue; // noindex
      getStaticRoutes(fullPath, `${base}/${item}`, routes);
    } else if (item === "page.js") {
      const route = base || "/";
      if (route === "/_not-found") continue;
      if (SITEMAP_EXCLUDED_ROUTES.has(route)) continue;
      routes.push(route);
    }
  }
  return routes;
}

function getPriorityAndFreq(route) {
  if (route === "/") return { changefreq: "weekly", priority: "1.0" };

  const p09 = [
    "/admissions",
    "/programs",
    "/contact-us",
    "/about-us",
    "/campus",
    "/ami-montessori-training",
  ];
  if (p09.includes(route) || route.startsWith("/programs/")) {
    return { changefreq: "weekly", priority: "0.9" };
  }

  const p08 = [
    "/careers",
    "/research-institute",
    "/montessori-system",
    "/innovation",
    "/parents",
    "/faq",
    "/video-catalog",
    "/announcement-centre",
    "/papers",
    "/publications",
    "/achievements",
    "/newsroom",
    "/explore-montessori",
  ];
  if (p08.includes(route) || route.startsWith("/innovation/") || route.startsWith("/explore-montessori/")) {
    return { changefreq: "monthly", priority: "0.8" };
  }

  if (route.startsWith("/privacy-policy") || route.startsWith("/terms")) {
    return { changefreq: "yearly", priority: "0.4" };
  }

  if (route.startsWith("/blog/")) {
    return { changefreq: "weekly", priority: "0.7" };
  }

  if (route.startsWith("/publications/")) {
    return { changefreq: "monthly", priority: "0.7" };
  }

  if (route.startsWith("/governance") || route === "/sitemap") {
    return { changefreq: "yearly", priority: "0.5" };
  }

  return { changefreq: "monthly", priority: "0.6" };
}

function getRoutes({ researchOutputs = [], blogPosts = [] }) {
  const staticRoutes = getStaticRoutes(path.join(process.cwd(), "src", "app")).map(
    (route) => ({ route, ...getPriorityAndFreq(route) })
  );

  const aboutUsSection = (siteData?.pages?.aboutUs?.sections || []).find(
    (item) => item?.type === "foundersGuides"
  );
  const founders = Array.isArray(aboutUsSection?.props?.items)
    ? aboutUsSection.props.items.slice(0, 2)
    : [];
  const founderRoutes = founders.map((founder) => {
    const raw = String(founder?.readMoreHref || founder?.name || "").trim().toLowerCase();
    const slug = raw.includes("pavan-goyal")
      ? "pavan-goyal"
      : raw.includes("munira-hussain")
        ? "munira-hussain"
        : raw.replace(/^\/+|\/+$/g, "").split("/").pop();
    return { route: `/about-us/founders/${slug}`, changefreq: "monthly", priority: "0.7" };
  });

  const programDetails = Object.keys(siteData?.pages?.programDetails || {})
    .filter((key) => !["breadcrumbs", "schema", "toddlerDetail"].includes(key))
    .map((slug) => ({ route: `/programs/${slug}`, ...getPriorityAndFreq(`/programs/${slug}`) }));

  const innovationDetails = Object.keys(siteData?.pages?.innovationDetail || {})
    .filter((key) => !["breadcrumbs", "schema"].includes(key))
    .map((slug) => ({
      route: `/innovation/${slug}`,
      ...getPriorityAndFreq(`/innovation/${slug}`),
    }));

  const publicationRoutes = researchOutputs.map((item) => ({
    route: `/publications/${item.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  const publicationMdRoutes = researchOutputs.map((item) => ({
    route: `/publications/${item.slug}/${item.slug}.md/`,
    changefreq: "monthly",
    priority: "0.5",
  }));

  const blogRoutes = blogPosts
    .filter((p) => p.slug)
    .map((p) => ({
      route: `/blog/${p.slug}`,
      changefreq: "weekly",
      priority: "0.7",
    }));

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
  return all
    .filter(({ route }) => {
      if (SITEMAP_EXCLUDED_ROUTES.has(route)) return false;
      if (seen.has(route)) return false;
      seen.add(route);
      return true;
    })
    .sort((a, b) => {
      const pd = Number(b.priority) - Number(a.priority);
      return pd !== 0 ? pd : a.route.localeCompare(b.route);
    });
}

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

async function main() {
  const { pathToFileURL } = require("url");

  const publishingPath = path.join(process.cwd(), "src", "data", "publishing.js");
  const publishingModule = await import(pathToFileURL(publishingPath).href);
  const researchOutputs = Array.isArray(publishingModule.RESEARCH_OUTPUTS)
    ? publishingModule.RESEARCH_OUTPUTS
    : [];

  const wordpressPath = path.join(process.cwd(), "src", "lib", "wordpress.js");
  let blogPosts = [];
  try {
    const wp = await import(pathToFileURL(wordpressPath).href);
    blogPosts = await wp.getPostSlugs();
  } catch (err) {
    console.warn(`  ! Could not load blog slugs from WordPress: ${err?.message || err}`);
  }

  const entries = getRoutes({ researchOutputs, blogPosts });
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), buildXml(entries), "utf8");
  console.log(`✓ sitemap.xml generated (${entries.length} URLs) → public/sitemap.xml`);
  console.log(`  Base URL: ${SITE_URL}`);
}

main().catch((err) => {
  console.error("✗ Failed to generate sitemap.xml");
  console.error(err);
  process.exit(1);
});
