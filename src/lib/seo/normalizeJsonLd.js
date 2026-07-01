function getBaseUrl() {
  // Always use the production domain — never localhost or Vercel preview URLs.
  // In a static export there is no server context, so localhost would be
  // baked into every JSON-LD @id and published to search engines.
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.blueblocks.in";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function isPlainObject(v) {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function normalizeString(str, baseUrl) {
  if (typeof str !== "string") return str;

  // Common placeholders used in JSON
  if (str === "#" || str === "#/") return baseUrl;

  // Internal ID shorthand: ##website => https://domain.com/#website
  if (str.startsWith("##")) return `${baseUrl}/#${str.slice(2)}`;

  // Hash + path shorthand: #/about-us/ => https://domain.com/about-us/
  if (str.startsWith("#/")) return `${baseUrl}/${str.slice(2)}`;

  // Hash anchor: #organization => https://domain.com/#organization
  if (str.startsWith("#")) return `${baseUrl}/${str}`;

  // Site-relative path: /icon/logo.svg => https://domain.com/icon/logo.svg
  if (str.startsWith("/")) return `${baseUrl}${str}`;

  return str;
}

export default function normalizeJsonLd(input, baseUrlParam) {
  const baseUrl = (baseUrlParam || getBaseUrl()).replace(/\/$/, "");

  if (Array.isArray(input)) {
    return input.map((v) => normalizeJsonLd(v, baseUrl));
  }

  if (isPlainObject(input)) {
    const out = {};
    for (const [k, v] of Object.entries(input)) {
      out[k] = normalizeJsonLd(v, baseUrl);
    }
    return out;
  }

  return normalizeString(input, baseUrl);
}
