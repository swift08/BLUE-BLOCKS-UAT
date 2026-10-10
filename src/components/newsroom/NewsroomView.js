"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { PRESS_MENTIONS } from "@/data/newsroom";

function getHeaderHeight() {
  if (typeof document === "undefined") return 80;
  const el = document.getElementById("site-header") || document.querySelector("header");
  return el ? Math.ceil(el.getBoundingClientRect().height) : 80;
}

const CATEGORIES = [
  "All",
  "Space Tech & ISRO",
  "Patents & Innovation",
  "National News",
  "Global Recognition",
];

export default function NewsroomView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedOutlet, setSelectedOutlet] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState("");
  const [headerH, setHeaderH] = useState(80);
  const stickyNavRef = useRef(null);

  // Monitor site-header height dynamically so the sticky bar is flush below it
  useEffect(() => {
    const updateHeaderHeight = () => {
      const h = getHeaderHeight();
      if (h > 0) setHeaderH(h);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight, { passive: true });
    window.addEventListener("scroll", updateHeaderHeight, { passive: true });

    const headerEl = document.getElementById("site-header");
    let resizeObserver;
    if (headerEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerEl);
    }

    const timer = setTimeout(updateHeaderHeight, 350);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", updateHeaderHeight);
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Handle hash on initial load or change (e.g., when arriving from /newsroom/#the-hindu)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setHighlightedId(hash);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
        }
      }
    }
  }, []);

  const filteredArticles = useMemo(() => {
    return PRESS_MENTIONS.filter((article) => {
      // Category filter
      if (activeCategory !== "All") {
        if (activeCategory === "Space Tech & ISRO" && !article.category.includes("Space")) {
          return false;
        }
        if (activeCategory === "Patents & Innovation" && !article.category.includes("Patent") && !article.category.includes("Innovation")) {
          return false;
        }
        if (activeCategory === "National News" && !article.category.includes("National") && !article.category.includes("Broadcast") && !article.category.includes("Education")) {
          return false;
        }
        if (activeCategory === "Global Recognition" && !article.category.includes("Global") && !article.category.includes("International") && !article.category.includes("Wire")) {
          return false;
        }
      }

      // Outlet filter
      if (selectedOutlet !== "all" && article.id !== selectedOutlet) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = article.headline.toLowerCase().includes(query);
        const matchOutlet = article.outlet.toLowerCase().includes(query);
        const matchSummary = article.summary.toLowerCase().includes(query);
        const matchCategory = article.category.toLowerCase().includes(query);
        if (!matchTitle && !matchOutlet && !matchSummary && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedOutlet, searchQuery]);

  return (
    <div className="bg-[#FAF9F6] text-neutral-900">
      {/* ── Breadcrumb Bar ────────────────────────────────────────────── */}
      <div className="border-b border-neutral-200 bg-white">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-3.5 text-xs font-medium text-neutral-500">
            <Link href="/" className="transition hover:text-neutral-900">
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900">Newsroom</span>
          </nav>
        </Container>
      </div>

      {/* ── Editorial Header ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-14 sm:py-20 lg:py-24">
        {/* Subtle decorative background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,196,229,0.15),rgba(255,255,255,0))]" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-800">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600 animate-pulse" />
              Press &amp; Media Mentions
            </div>

            <h1 className="mt-5 font-serif text-3xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Blue Blocks in the News
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Official press reports documenting student inventions, patent filings, ISRO CubeSat
              payloads, and authentic Montessori education in Hyderabad.
            </p>

            {/* Credibility Stats Bar */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-8 sm:grid-cols-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold tracking-tight text-sky-900 sm:text-3xl">14</div>
                <div className="mt-1 text-xs text-neutral-500">Official Press Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold tracking-tight text-amber-700 sm:text-3xl">30th</div>
                <div className="mt-1 text-xs text-neutral-500">AMI World Congress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold tracking-tight text-indigo-900 sm:text-3xl">ISRO</div>
                <div className="mt-1 text-xs text-neutral-500">CubeSat Mission SBB-1</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold tracking-tight text-emerald-800 sm:text-3xl">9 Yrs</div>
                <div className="mt-1 text-xs text-neutral-500">#1 Pre-School (TOI)</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .bb-sticky-outlet-bar {
          top: 72px;
        }
        @media (min-width: 640px) {
          .bb-sticky-outlet-bar {
            top: 88px;
          }
        }
      `}</style>

      {/* ── Sticky Outlet Quick Switcher Strip ───────────────────────── */}
      <section
        ref={stickyNavRef}
        aria-label="Filter by media outlet"
        className="bb-sticky-outlet-bar sticky left-0 right-0 w-full z-[70] bg-white/95 backdrop-blur-md border-b border-neutral-200/90 py-3 sm:py-3.5 shadow-sm transition-all duration-150"
        style={{ top: `${headerH}px` }}
      >
        <Container>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 whitespace-nowrap">
                Select Outlet:
              </span>
              {selectedOutlet !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedOutlet("all")}
                  className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 hover:bg-neutral-200"
                >
                  Clear ×
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setSelectedOutlet("all")}
                className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-medium transition ${
                  selectedOutlet === "all"
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                All Outlets ({PRESS_MENTIONS.length})
              </button>
              {PRESS_MENTIONS.map((m) => {
                const isSelected = selectedOutlet === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      const next = isSelected ? "all" : m.id;
                      setSelectedOutlet(next);
                      if (next !== "all") {
                        const el = document.getElementById(m.id);
                        if (el) {
                          const navH = stickyNavRef.current?.offsetHeight || 52;
                          const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + navH + 20);
                          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                        }
                      }
                    }}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                      isSelected
                        ? "bg-neutral-900 text-white shadow-sm ring-2 ring-neutral-900 ring-offset-1"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {m.outlet}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Filters & Search ─────────────────────────────────────────── */}
      <section className="py-8">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 pl-9 text-xs sm:text-sm placeholder-neutral-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <svg
                className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>

          {/* Results feedback */}
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
            <span>
              Showing {filteredArticles.length} of {PRESS_MENTIONS.length} press articles
            </span>
            {(activeCategory !== "All" || selectedOutlet !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSelectedOutlet("all");
                  setSearchQuery("");
                }}
                className="font-medium text-sky-700 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </Container>
      </section>

      {/* ── Articles Grid ────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-24">
        <Container>
          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
              <p className="text-base font-medium text-neutral-700">No press coverage found matching your filter.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSelectedOutlet("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => {
                const isTarget = highlightedId === article.id;

                return (
                  <article
                    key={article.id}
                    id={article.id}
                    className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isTarget
                        ? "border-sky-500 ring-2 ring-sky-400 ring-offset-2"
                        : "border-neutral-200/90 hover:border-neutral-300"
                    }`}
                  >
                    <div>
                      {/* Top Row: Outlet Logo & Badge */}
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                        <div className="flex h-10 items-center max-w-[170px]">
                          <Image
                            src={article.logo}
                            alt={article.outlet}
                            width={article.width || 160}
                            height={article.height || 36}
                            className="max-h-8 w-auto object-contain transition group-hover:scale-105"
                          />
                        </div>
                        {article.badge ? (
                          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-700">
                            {article.badge}
                          </span>
                        ) : null}
                      </div>

                      {/* Meta: Category & Date */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                        <span className="font-semibold text-sky-800 uppercase tracking-wider text-[11px]">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      {/* Headline */}
                      <h2 className="mt-2.5 font-serif text-lg font-semibold leading-snug text-neutral-900 group-hover:text-sky-900">
                        <a
                          href={article.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus:outline-none"
                        >
                          {article.headline}
                        </a>
                      </h2>

                      {/* Excerpt / Summary */}
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-600">
                        {article.summary}
                      </p>
                    </div>

                    {/* Bottom CTA Button — Leads to official article URL */}
                    <div className="mt-6 border-t border-neutral-100 pt-4">
                      <a
                        href={article.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs font-semibold text-neutral-800 transition-all hover:border-sky-600 hover:bg-sky-600 hover:text-white"
                        aria-label={`Read full article on ${article.outlet}: ${article.headline}`}
                      >
                        <span>Read on {article.outlet}</span>
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* ── Media Inquiries / Press Relations Footer Box ─────────────── */}
      <section className="border-t border-neutral-200 bg-white py-14 sm:py-16">
        <Container>
          <div className="rounded-2xl border border-neutral-200 bg-[#F4F8FA] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
                Media &amp; Press Relations
              </span>
              <h3 className="mt-2 font-serif text-2xl font-medium text-neutral-900 sm:text-3xl">
                Journalist &amp; Research Inquiries
              </h3>
              <p className="mt-3 text-sm text-neutral-600">
                For interview requests with Co-Founders Pavan Goyal and Munira Hussain, high-resolution
                campus imagery, student invention documentation, or research papers, please contact our
                communications desk.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <a
                href="mailto:info@blueblocks.in"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
              >
                Contact Press Office
              </a>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
              >
                About Blue Blocks
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
