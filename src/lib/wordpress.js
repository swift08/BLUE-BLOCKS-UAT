// Headless WordPress data layer (single source of truth for the blog).
//
// The site is a fully static export (`output: "export"`), so every function
// here runs at BUILD TIME — in Next server components and in the prebuild
// scripts (generate-sitemap / generate-llms). All calls fail soft (return an
// empty list / null) so a transient WP outage degrades gracefully instead of
// crashing the whole-site build.

const RAW_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://wp.blueblocks.in";

export const WP_BASE = RAW_BASE.replace(/\/+$/, "");
const API = `${WP_BASE}/wp-json/wp/v2`;
const FETCH_TIMEOUT_MS = 20000;

async function wpFetch(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "force-cache",
    });
    if (!res.ok) {
      console.warn(`[wordpress] HTTP ${res.status} for ${url}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[wordpress] fetch failed for ${url}: ${err?.message || err}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
};

export function decodeEntities(input = "") {
  return String(input)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name)
        ? NAMED_ENTITIES[name]
        : match
    );
}

export function stripHtml(input = "") {
  return decodeEntities(String(input).replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function pickFeatured(post) {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media || media.code || !media.source_url) return null;
  const details = media.media_details || {};
  const sizes = details.sizes || {};
  const card = sizes.medium_large || sizes.large || sizes.medium || null;
  return {
    url: media.source_url,
    cardUrl: card?.source_url || media.source_url,
    alt: decodeEntities(media.alt_text || ""),
    width: details.width || null,
    height: details.height || null,
  };
}

function pickCategories(post) {
  const groups = post?._embedded?.["wp:term"] || [];
  return groups
    .flat()
    .filter((term) => term && term.taxonomy === "category")
    .map((term) => ({ name: decodeEntities(term.name), slug: term.slug }));
}

function pickAuthor(post) {
  const author = post?._embedded?.author?.[0];
  return author?.name ? decodeEntities(author.name) : null;
}

function normalizePost(post) {
  if (!post || !post.slug) return null;
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title?.rendered || ""),
    excerpt: stripHtml(post.excerpt?.rendered || ""),
    contentHtml: post.content?.rendered || "",
    date: post.date || null,
    modified: post.modified || post.date || null,
    featured: pickFeatured(post),
    categories: pickCategories(post),
    author: pickAuthor(post),
  };
}

/** Full post objects (with embedded media/terms/author) for listing + cards. */
export async function getAllPosts() {
  const data = await wpFetch(
    `${API}/posts?per_page=100&_embed=1&orderby=date&order=desc`
  );
  if (!Array.isArray(data)) return [];
  return data.map(normalizePost).filter(Boolean);
}

/** Single post by slug, or null if not found. */
export async function getPostBySlug(slug) {
  if (!slug) return null;
  const data = await wpFetch(
    `${API}/posts?slug=${encodeURIComponent(slug)}&_embed=1`
  );
  if (!Array.isArray(data) || data.length === 0) return null;
  return normalizePost(data[0]);
}

/**
 * Lightweight slug + lastmod list (no embeds) for build scripts
 * (sitemap / llms) so they stay in sync with the live posts.
 */
export async function getPostSlugs() {
  const data = await wpFetch(
    `${API}/posts?per_page=100&orderby=date&order=desc&_fields=slug,modified,date`
  );
  if (!Array.isArray(data)) return [];
  return data
    .map((post) => ({
      slug: post.slug,
      modified: post.modified || post.date || null,
    }))
    .filter((post) => post.slug);
}
