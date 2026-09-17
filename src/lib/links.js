const SITE_HOSTS = new Set([
  "blueblocks.in",
  "www.blueblocks.in",
  "dev65.blueblocks.in",
  "localhost",
  "127.0.0.1",
]);

const PATH_REDIRECTS = new Map([
  ["/about-us.shtml", "/about-us/"],
  ["/montessori.shtml", "/montessori-system/"],
  ["/careers.shtml", "/careers/"],
  ["/campus.shtml", "/campus/"],
  ["/faq.shtml", "/faq/"],
  ["/admission.shtml", "/admissions/"],
  ["/programs.shtml", "/programs/"],
  ["/innovation.shtml", "/innovation/"],
  ["/privacy-policy.shtml", "/privacy-policy/"],
  ["/toddler.shtml", "/programs/playgroup/"],
  ["/self.shtml", "/programs/nursery-school/"],
  ["/elementary.shtml", "/programs/primary-school-elementary/"],
  ["/high.shtml", "/programs/secondary-school/"],
  ["/drone-patent.shtml", "/innovation/drone-lab/"],
  ["/space-program.shtml", "/innovation/space-lab/"],
  ["/biomimicryhive.shtml", "/innovation/biomimicry-hive/"],
  ["/positive-parenting.shtml", "/parents/"],
  ["/virtual-learning.shtml", "/programs/"],
  ["/videos.shtml", "/videos/"],
  ["/schedule-meeting-with-parent-coordinator.shtml", "/contact-us/"],
  ["/schedule-meeting-with-director-elementory.shtml", "/admissions/"],
  ["/index.shtml", "/"],
  ["/index.html", "/"],
  ["/research/about", "/research-institute/"],
  ["/research/patents", "/research-institute/"],
  ["/research/sbb-1", "/research-institute/"],
  ["/founders/pavan-goyal", "/about-us/founders/pavan-goyal/"],
  ["/founders/munira-hussain", "/about-us/founders/munira-hussain/"],
  ["/toddler-developmental-architecture", "/neuropsychiatry-of-toddler-plane/"],
  ["/toddler-developmental-architecture/", "/neuropsychiatry-of-toddler-plane/"],
]);

function normalizePath(pathname = "") {
  const clean = String(pathname || "").trim();
  if (!clean) return "/";

  const withLead = clean.startsWith("/") ? clean : `/${clean}`;
  const lower = withLead.toLowerCase();

  return PATH_REDIRECTS.get(lower) || withLead;
}

function isFilePath(pathname = "") {
  const last = String(pathname).split("/").filter(Boolean).pop() || "";
  return /\.[a-z0-9]+$/i.test(last);
}

function withTrailingSlash(pathname = "") {
  if (!pathname || pathname === "/") return "/";
  if (pathname.startsWith("/wp-json") || pathname.startsWith("/api/")) {
    return pathname;
  }
  if (isFilePath(pathname)) return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function normalizeInternalPathname(pathname = "") {
  return withTrailingSlash(normalizePath(pathname));
}

function splitRelativeHref(raw = "") {
  const hashIdx = raw.indexOf("#");
  const hash = hashIdx >= 0 ? raw.slice(hashIdx) : "";
  const withoutHash = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
  const queryIdx = withoutHash.indexOf("?");
  const search = queryIdx >= 0 ? withoutHash.slice(queryIdx) : "";
  const pathname = queryIdx >= 0 ? withoutHash.slice(0, queryIdx) : withoutHash;
  return { pathname, search, hash };
}

export function normalizeSiteHref(href = "") {
  const raw = String(href || "").trim();
  if (!raw) return "";

  if (raw.startsWith("#") || raw.startsWith("//")) {
    return raw;
  }

  // mailto:, tel:, javascript:, sms:, etc.
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // External URL (potentially our own domain)
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      const host = String(url.hostname || "").toLowerCase();
      if (!SITE_HOSTS.has(host)) return raw;

      url.pathname = normalizeInternalPathname(url.pathname);
      return url.toString();
    } catch {
      return raw;
    }
  }

  const { pathname, search, hash } = splitRelativeHref(raw);
  return `${normalizeInternalPathname(pathname)}${search}${hash}`;
}
