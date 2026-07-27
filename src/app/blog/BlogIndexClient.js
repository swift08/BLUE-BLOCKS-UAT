"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_PER_PAGE = 8;
const PER_PAGE_OPTIONS = [4, 6, 8, 12];
const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "modified_desc", label: "Recently updated" },
  { value: "modified_asc", label: "Least recently updated" },
];

function getPrimaryCategory(post) {
  return post.categories?.[0]?.name || "News";
}

function sortByCount(items) {
  return [...items].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );
}

function getTime(value) {
  const time = Date.parse(value || "");
  return Number.isNaN(time) ? 0 : time;
}

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

function formatRelativeTime(iso, now) {
  if (!iso || !now) return "";
  const then = getTime(iso);
  if (!then) return "";

  const diffMs = Math.max(0, now.getTime() - then);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < hour) return "just now";
  if (diffMs < day) {
    const value = Math.floor(diffMs / hour);
    return `${value} hour${value === 1 ? "" : "s"} ago`;
  }
  if (diffMs < month) {
    const value = Math.floor(diffMs / day);
    return `${value} day${value === 1 ? "" : "s"} ago`;
  }
  if (diffMs < year) {
    const value = Math.floor(diffMs / month);
    return `${value} month${value === 1 ? "" : "s"} ago`;
  }

  const value = Math.floor(diffMs / year);
  return `${value} year${value === 1 ? "" : "s"} ago`;
}

function stripHtml(input = "") {
  return String(input).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getReadingTime(post) {
  const text = stripHtml(post.contentHtml || post.excerpt || "");
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function getAuthorInitial(author) {
  return (author || "Blue Blocks").trim().charAt(0).toUpperCase() || "B";
}

function sortPosts(posts, sortKey) {
  return [...posts].sort((a, b) => {
    if (sortKey === "date_asc") return getTime(a.date) - getTime(b.date);
    if (sortKey === "modified_desc") return getTime(b.modified) - getTime(a.modified);
    if (sortKey === "modified_asc") return getTime(a.modified) - getTime(b.modified);
    return getTime(b.date) - getTime(a.date);
  });
}

function derivePopularTags(posts) {
  const counts = new Map();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!tag?.name) return;
      const current = counts.get(tag.name);
      counts.set(tag.name, {
        ...tag,
        count: (current?.count || 0) + 1,
      });
    });
  });
  return sortByCount(Array.from(counts.values())).slice(0, 10);
}

export default function BlogIndexClient({ posts, popularTags = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTopic, setActiveTopic] = useState(null);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [sortKey, setSortKey] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const categories = useMemo(() => {
    const counts = new Map();
    posts.forEach((post) => {
      post.categories?.forEach((category) => {
        if (category?.name) counts.set(category.name, (counts.get(category.name) || 0) + 1);
      });
    });
    return [
      { name: "All", count: posts.length },
      ...sortByCount(Array.from(counts, ([name, count]) => ({ name, count }))),
    ];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const categoryPosts =
      activeCategory === "All"
        ? posts
        : posts.filter((post) =>
            post.categories?.some((category) => category.name === activeCategory)
          );
    const topicPosts = activeTopic
      ? categoryPosts.filter((post) =>
          post.tags?.some((tag) => tag.name === activeTopic)
        )
      : categoryPosts;
    return sortPosts(topicPosts, sortKey);
  }, [activeCategory, activeTopic, posts, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const firstIndex = (currentPage - 1) * perPage;
  const visiblePosts = filteredPosts.slice(firstIndex, firstIndex + perPage);
  const topicTags = popularTags.length ? popularTags : derivePopularTags(posts);
  const latestPosts = sortPosts(posts, "date_desc").slice(0, 4);

  function selectCategory(category) {
    setActiveCategory(category);
    setActiveTopic(null);
    setPage(1);
  }

  function selectTopic(topic) {
    setActiveCategory("All");
    setActiveTopic(topic);
    setPage(1);
  }

  function changePerPage(event) {
    setPerPage(Number(event.target.value));
    setPage(1);
  }

  function changeSort(event) {
    setSortKey(event.target.value);
    setPage(1);
  }

  return (
    <section className="bg-[#f6f9fd] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="-mx-4 overflow-x-auto px-4 pb-3">
          <div className="flex min-w-max gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => selectCategory(category.name)}
                  className={`h-10 rounded-full px-4 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#053f77] text-white"
                      : "bg-[#eef3f8] text-slate-800 hover:bg-[#e2eaf3]"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#657894]">
                Showing {visiblePosts.length} of {filteredPosts.length} articles
                {activeTopic ? ` tagged ${activeTopic}` : ""}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  Sort
                  <select
                    value={sortKey}
                    onChange={changeSort}
                    className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#053f77] focus:ring-2 focus:ring-[#053f77]/15"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  Posts per page
                  <select
                    value={perPage}
                    onChange={changePerPage}
                    className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#053f77] focus:ring-2 focus:ring-[#053f77]/15"
                  >
                    {PER_PAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {visiblePosts.length === 0 ? (
              <p className="mt-10 text-slate-500">
                Posts are being updated. Please check back soon.
              </p>
            ) : (
              <ul className="mt-5 grid gap-7 md:grid-cols-2">
                {visiblePosts.map((post) => (
                  <li
                    key={post.id}
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Link href={`/blog/${post.slug}/`} className="flex h-full flex-col">
                      <div className="relative aspect-[2.05/1] overflow-hidden bg-slate-100">
                        {post.featured ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.featured.cardUrl}
                            alt={post.featured.alt || post.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : null}
                        <span className="absolute left-3 top-3 rounded-sm bg-[#12a9a4] px-2.5 py-1 text-[11px] font-bold uppercase leading-none text-white">
                          {getPrimaryCategory(post)}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                        <h2 className="text-xl font-semibold leading-tight text-[#053f77] transition group-hover:text-[#0f52ba]">
                          {post.title}
                        </h2>
                        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-[#64748b]">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-10 text-xs font-medium text-[#657894]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-white">
                            {getAuthorInitial(post.author)}
                          </span>
                          <span>{post.author || "Blue Blocks"}</span>
                          {post.date ? (
                            <>
                              <span aria-hidden>&bull;</span>
                              <time dateTime={post.date}>{formatDate(post.date)}</time>
                            </>
                          ) : null}
                          {post.date && now ? (
                            <>
                              <span aria-hidden>&bull;</span>
                              <span>{formatRelativeTime(post.date, now)}</span>
                            </>
                          ) : null}
                          <span aria-hidden>&bull;</span>
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
                            {getReadingTime(post)} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 ? (
              <nav
                className="mt-8 flex flex-wrap items-center justify-center gap-2"
                aria-label="Blog pagination"
              >
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                  className="h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`h-10 min-w-10 rounded-md px-3 text-sm font-semibold ${
                        currentPage === pageNumber
                          ? "bg-[#053f77] text-white"
                          : "border border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={currentPage === totalPages}
                  className="h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Next
                </button>
              </nav>
            ) : null}
          </div>

          <aside className="space-y-8">
            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-[#053f77]">
                Latest Research
              </h2>
              <div className="mt-5 space-y-4">
                {latestPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}/`}
                    className="block text-sm font-medium leading-5 text-slate-700 hover:text-[#053f77]"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-[#053f77]">
                Popular Topics
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {topicTags.map((tag) => {
                  const isActiveTopic = activeTopic === tag.name;
                  return (
                    <button
                      key={tag.slug || tag.name}
                      type="button"
                      onClick={() => selectTopic(tag.name)}
                      className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                        isActiveTopic
                          ? "bg-[#053f77] text-white"
                          : "bg-[#eef2f6] text-slate-700 hover:bg-[#dfe8f1] hover:text-[#053f77]"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-base font-semibold text-[#053f77]">
                Research Data
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#64748b]">
                Access our open research datasets and publications.
              </p>
              <a
                href="https://zenodo.org/communities/blueblocksmicroresearchinstitute/records?l=list&p=1&q=&s=10&sort=newest"
                className="mt-4 inline-flex text-sm font-semibold text-[#053f77] hover:underline"
              >
                Browse Zenodo Repository &rarr;
              </a>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
