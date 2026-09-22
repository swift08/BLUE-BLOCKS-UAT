"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { normalizePost } from "@/lib/wordpress";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function stripHtml(input = "") {
  return String(input).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadingTime(post) {
  const text = stripHtml(post?.contentHtml || post?.excerpt || "");
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function getPrimaryCategory(post) {
  return post?.categories?.[0]?.name || "Article";
}

export default function RecentBlogs({
  initialPosts = [],
  title = "Recent Articles & Insights",
  eyebrow = "FROM OUR JOURNAL",
  subtitle = "Thoughtful reflections on child development, Montessori education, and self-directed learning from our educators.",
  ctaText = "Explore All Articles",
  ctaHref = "/blog/",
}) {
  const [posts, setPosts] = useState(initialPosts);

  // Live client-side refresh: keeps the 3 blogs updated even if newly published in WordPress
  useEffect(() => {
    let active = true;

    async function checkLatestPosts() {
      try {
        const cacheBust = `_bb_live=${Date.now()}`;
        const res = await fetch(
          `https://blueblocks.in/blog/wp-json/wp/v2/posts?per_page=3&_embed=1&orderby=date&order=desc&${cacheBust}`,
          { headers: { Accept: "application/json" }, cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!active || !Array.isArray(data) || data.length === 0) return;

        const normalized = data.map(normalizePost).filter(Boolean);
        if (normalized.length > 0) {
          setPosts(normalized);
        }
      } catch {
        // Soft fail: keep initialPosts on network/WP error
      }
    }

    checkLatestPosts();

    return () => {
      active = false;
    };
  }, []);

  const displayPosts = posts.slice(0, 3);
  if (displayPosts.length === 0) return null;

  return (
    <section className="bb-ui bb-section bg-[#f5efe6] py-16 sm:py-20 border-t border-black/5">
      <Container className="bb-section__inner">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#d9532f] mb-2 block">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="bb-section-title text-[#1f2a44]">{title}</h2>
          )}
          {subtitle && (
            <p className="bb-subtitle mt-3 text-[#4a5568]">{subtitle}</p>
          )}
        </div>

        {/* 3 Recent Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayPosts.map((post) => {
            const featuredImg = post.featured?.cardUrl || post.featured?.url;
            const category = getPrimaryCategory(post);
            const readTime = getReadingTime(post);

            return (
              <article
                key={post.id || post.slug}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link
                  href={`/blog/${post.slug}/`}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-100 block"
                >
                  {featuredImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredImg}
                      alt={post.featured?.alt || post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#053f77]/10 to-[#12a9a4]/10 text-slate-400 font-medium text-sm">
                      Blue Blocks Journal
                    </div>
                  )}

                  {category && (
                    <span className="absolute top-3 left-3 bg-[#12a9a4] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {category}
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#657894] mb-3">
                    {post.date && (
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    )}
                    {post.date && <span aria-hidden>&bull;</span>}
                    <span className="inline-flex items-center gap-1">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      {readTime} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold leading-snug text-[#1f2a44] group-hover:text-[#053f77] transition-colors line-clamp-2 mb-3">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#64748b] leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#053f77] group-hover:text-[#d9532f] transition-colors"
                    >
                      Read Article
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All CTA */}
        {ctaHref && (
          <div className="mt-12 text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1f2a44] text-white font-semibold text-sm hover:bg-[#053f77] hover:shadow-md transition-all duration-200"
            >
              <span>{ctaText}</span>
              <span>&rarr;</span>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
