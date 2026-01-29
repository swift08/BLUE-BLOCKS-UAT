// src/app/sitemap.js
export const dynamic = "force-static";

const SITE_URL = "https://blueblocks.in"; // no trailing slash

export default function sitemap() {
  const routes = [
    "/",
    "/about-us/",
    "/programs/",
    "/admissions/",
    "/campus/",
    "/innovation/",
    "/parents/",
    "/research-institute/",
    "/videos/",
    "/faq/",
    "/contact-us/",
    "/privacy-policy/",
    "/terms/",
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    // optional: remove lastModified if it still complains
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
