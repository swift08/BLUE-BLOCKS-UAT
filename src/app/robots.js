export const dynamic = "force-static";

const SITE_URL = "https://blueblocks.in";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
