const fs = require("fs");
const path = require("path");

const siteData = require("../src/data/site.json");

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

function absoluteUrl(route = "/") {
  return `${SITE_URL}${route.startsWith("/") ? route : `/${route}`}`;
}

function getRoutes() {
  const staticRoutes = [
    "/",
    "/about-us",
    "/programs",
    "/admissions",
    "/contact-us",
    "/careers",
    "/research-institute",
    "/parents",
    "/innovation",
    "/montessori-system",
    "/campus",
    "/videos",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/adolescent-social-newborn-paper",
    "/the-architecture-of-the-universe",
    "/toddler-developmental-architecture",
    "/the-conscious-construction-of-intelligence",
    "/drone",
  ];

  const programDetails = Object.keys(siteData?.pages?.programDetails || {})
    .filter((key) => !["breadcrumbs", "schema", "toddlerDetail"].includes(key))
    .map((slug) => `/programs/${slug}`);

  const innovationDetails = Object.keys(siteData?.pages?.innovationDetail || {})
    .filter((key) => !["breadcrumbs", "schema"].includes(key))
    .map((slug) => `/innovation/${slug}`);

  const primaryDetails = Object.keys(siteData?.pages?.primaryDetail || {})
    .filter((key) => key !== "breadcrumbs")
    .map((slug) => `/primary/${slug}`);

  return [...new Set([...staticRoutes, ...programDetails, ...innovationDetails, ...primaryDetails])];
}

function buildXml(routes) {
  const now = new Date().toISOString();

  const urls = routes
    .map((route) => {
      const priority = route === "/" ? "1.0" : "0.8";
      const changefreq = route === "/" ? "weekly" : "monthly";

      return `
  <url>
    <loc>${absoluteUrl(route)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

const routes = getRoutes();
const xml = buildXml(routes);

const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
fs.writeFileSync(outputPath, xml, "utf8");

console.log(`sitemap.xml generated at ${outputPath}`);
console.log(`Base URL: ${SITE_URL}`);