"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";
import { normalizePost } from "@/lib/wordpress";

// Curated static blog configurations per page pathname
const PAGE_STATIC_BLOGS = {
  "/admissions": [
    {
      id: "static-admissions-1",
      title: "Is Montessori Right for Your Family?",
      category: "Montessori Philosophy",
      date: "Sep 2026",
      featured: {
        url: "/programs/thumb-nursery.webp",
        cardUrl: "/programs/thumb-nursery.webp",
        alt: "Is Montessori Right for Your Family?",
      },
      url: "https://blueblocks.in/blog/is-montessori-right-for-your-family/",
      excerpt:
        "Montessori isn’t a teaching method bolted onto a regular school. Discover how child-directed learning and the prepared environment fit your family.",
    },
    {
      id: "static-admissions-2",
      title: "Montessori vs Traditional Education: What the Research Shows",
      category: "Research & Pedagogy",
      date: "Aug 2026",
      featured: {
        url: "/programs/thumb-primary.webp",
        cardUrl: "/programs/thumb-primary.webp",
        alt: "Montessori vs Traditional research",
      },
      url: "https://blueblocks.in/blog/montessori-vs-traditional-education-research/",
      excerpt:
        "An evidence-based comparison between AMI Montessori environments and conventional school models, focusing on executive function and autonomy.",
    },
  ],
  default: [
    {
      id: "static-default-1",
      title: "Is Montessori Right for Your Family?",
      category: "Montessori Philosophy",
      date: "Sep 2026",
      featured: {
        url: "/programs/thumb-nursery.webp",
        cardUrl: "/programs/thumb-nursery.webp",
        alt: "Is Montessori Right for Your Family?",
      },
      url: "https://blueblocks.in/blog/is-montessori-right-for-your-family/",
      excerpt:
        "A practical guide for parents evaluating Montessori education, developmental independence, and home-school alignment.",
    },
    {
      id: "static-default-2",
      title: "Montessori vs Traditional Education: What the Research Shows",
      category: "Research & Pedagogy",
      date: "Aug 2026",
      featured: {
        url: "/programs/thumb-primary.webp",
        cardUrl: "/programs/thumb-primary.webp",
        alt: "Montessori vs Traditional research",
      },
      url: "https://blueblocks.in/blog/montessori-vs-traditional-education-research/",
      excerpt:
        "Understanding how self-directed work and multi-age classrooms build lifelong focus, critical thinking, and intrinsic motivation.",
    },
  ],
};

// Fallback dynamic posts in case WordPress API is slow or offline
const INITIAL_DYNAMIC_FALLBACK = [
  {
    id: 924,
    title: "How to Keep Children Connected to Nature: Six Small Habits at Home",
    slug: "how-to-keep-children-connected-to-nature",
    date: "2026-09-17T09:11:33",
    url: "https://blueblocks.in/blog/how-to-keep-children-connected-to-nature/",
    categories: [{ name: "Parenting", slug: "parenting" }],
    featured: {
      url: "/programs/thumb-playgroup.webp",
      cardUrl: "/programs/thumb-playgroup.webp",
      alt: "How to Keep Children Connected to Nature",
    },
    excerpt:
      "Simple, daily habits parents can introduce at home to foster a deep connection to nature and sensorial learning.",
  },
  {
    id: 913,
    title: "What Do Children Draw When Asked About Life? Trees and the Sun",
    slug: "what-do-children-draw-when-asked-about-life",
    date: "2026-09-09T10:42:39",
    url: "https://blueblocks.in/blog/what-do-children-draw-when-asked-about-life/",
    categories: [{ name: "Child Development", slug: "child-development" }],
    featured: {
      url: "/programs/thumb-secondary.webp",
      cardUrl: "/programs/thumb-secondary.webp",
      alt: "What Do Children Draw When Asked About Life",
    },
    excerpt:
      "Observations from our art and cosmic education environments on how children perceive the living world.",
  },
];

function formatDate(iso) {
  if (!iso) return "";
  if (typeof iso === "string" && !iso.includes("-")) return iso;
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function SitewideBlogSection({ customStaticPosts }) {
  const pathname = usePathname() || "";
  const [dynamicPosts, setDynamicPosts] = useState(INITIAL_DYNAMIC_FALLBACK);

  // Normalize pathname to find matching static blogs
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const hideJournal = cleanPath === "/montessori-system";
  const staticPair =
    customStaticPosts ||
    PAGE_STATIC_BLOGS[cleanPath] ||
    PAGE_STATIC_BLOGS[cleanPath.startsWith("/admissions") ? "/admissions" : "default"] ||
    PAGE_STATIC_BLOGS.default;

  // Auto-populate Cards 3 and 4 from the two most recent posts published on blueblocks.in/blog/
  useEffect(() => {
    if (hideJournal) return;
    let active = true;

    async function fetchRecentPosts() {
      try {
        const cacheBust = `_bb_ts=${Date.now()}`;
        const res = await fetch(
          `https://blueblocks.in/blog/wp-json/wp/v2/posts?per_page=2&_embed=1&orderby=date&order=desc&${cacheBust}`,
          { headers: { Accept: "application/json" } }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!active || !Array.isArray(data) || data.length === 0) return;

        const normalized = data.map(normalizePost).filter(Boolean);
        if (normalized.length > 0) {
          const formatted = normalized.slice(0, 2).map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            date: post.date,
            url: `https://blueblocks.in/blog/${post.slug}/`,
            categories: post.categories,
            featured: post.featured || {
              url: "/programs/thumb-secondary.webp",
              cardUrl: "/programs/thumb-secondary.webp",
              alt: post.title,
            },
            excerpt: post.excerpt || "",
          }));
          setDynamicPosts(formatted);
        }
      } catch {
        // Soft fail: keep fallback
      }
    }

    fetchRecentPosts();
    return () => {
      active = false;
    };
  }, [hideJournal]);

  if (hideJournal) return null;

  // Recent posts lead. Static cards stay after them.
  const cards = [
    { ...dynamicPosts[0], isDynamic: true, cardType: "Latest" },
    { ...dynamicPosts[1], isDynamic: true, cardType: "Latest" },
    { ...staticPair[0], isDynamic: false, cardType: "Static" },
    { ...staticPair[1], isDynamic: false, cardType: "Static" },
  ].filter((post) => post?.title);

  return (
    <section className="bg-[#FAF9F5] border-t border-slate-200/60 py-16 pb-28 sm:py-20 md:pb-20">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-slate-200/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B74F2A] mb-2 block">
              FROM OUR JOURNAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Read
            </h2>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C2F8F] hover:text-[#1B3A6B] transition-colors"
          >
            <span>View All Articles</span>
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((post, idx) => {
            const category =
              post?.category ||
              post?.categories?.[0]?.name ||
              "Montessori";
            const imageUrl =
              post?.featured?.cardUrl ||
              post?.featured?.url ||
              "/programs/thumb-secondary.webp";
            const postHref = post?.url || (post?.slug ? `/blog/${post.slug}/` : "/blog/");

            return (
              <a
                key={post.id || idx}
                href={postHref}
                target={post.url?.startsWith("http") ? "_blank" : undefined}
                rel={post.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Featured Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={post.title || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Category pill */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-[#2C2F8F] shadow-sm">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-slate-400 font-medium mb-2">
                    {formatDate(post.date)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#2C2F8F] transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed flex-1 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2C2F8F]">
                    <span>Read Article</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
