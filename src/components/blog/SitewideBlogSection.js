"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";
import { normalizePost } from "@/lib/wordpress";

// Fallback if WordPress is slow/offline — keep in sync with latest posts
const INITIAL_POSTS = [
  {
    id: 961,
    title: "How to Tell Authentic Montessori School from a Montessori Sign",
    slug: "how-to-tell-authentic-montessori-school",
    date: "2026-10-16T09:21:50",
    url: "https://blueblocks.in/blog/how-to-tell-authentic-montessori-school/",
    categories: [{ name: "Education", slug: "education" }],
    featured: {
      url: "https://blueblocks.in/blog/wp-content/uploads/2026/10/DSC09806-scaled.jpg",
      cardUrl: "https://blueblocks.in/blog/wp-content/uploads/2026/10/DSC09806-scaled.jpg",
      alt: "How to Tell Authentic Montessori School from a Montessori Sign",
    },
    excerpt:
      "Maria Montessori built her method to be given away. In 1929, she founded the Association Montessori Internationale (AMI) to protect its integrity through training.",
  },
  {
    id: 955,
    title: "Is Montessori Right for Your Family? What the Research Actually Says",
    slug: "is-montessori-right-for-your-family",
    date: "2026-10-15T10:41:37",
    url: "https://blueblocks.in/blog/is-montessori-right-for-your-family/",
    categories: [{ name: "Education", slug: "education" }],
    featured: {
      url: "https://blueblocks.in/blog/wp-content/uploads/2026/10/DSC01500-scaled.jpg",
      cardUrl: "https://blueblocks.in/blog/wp-content/uploads/2026/10/DSC01500-scaled.jpg",
      alt: "Is Montessori Right for Your Family?",
    },
    excerpt:
      "Most parents who ask whether Montessori is right for their family want an honest answer grounded in evidence, not marketing.",
  },
  {
    id: 943,
    title: "Biomimicry for Children: Inside the Park Where Families Became Researchers",
    slug: "biomimicry-for-children",
    date: "2026-10-07T11:09:05",
    url: "https://blueblocks.in/blog/biomimicry-for-children/",
    categories: [{ name: "Education", slug: "education" }],
    featured: {
      url: "https://blueblocks.in/blog/wp-content/uploads/2026/10/pexels-sarah-richardson-3190527-4811700-scaled.jpg",
      cardUrl: "https://blueblocks.in/blog/wp-content/uploads/2026/10/pexels-sarah-richardson-3190527-4811700-scaled.jpg",
      alt: "Biomimicry for Children",
    },
    excerpt:
      "Biomimicry for children starts with a sentence most people get wrong. Drawing a leaf on a building is not biomimicry.",
  },
  {
    id: 931,
    title: "How to Find North with the Saptarishi: A Night-Sky Activity for Families",
    slug: "how-to-find-north-with-the-saptarishi",
    date: "2026-10-01T10:13:15",
    url: "https://blueblocks.in/blog/how-to-find-north-with-the-saptarishi/",
    categories: [{ name: "Montessori", slug: "montessori" }],
    featured: {
      url: "https://blueblocks.in/blog/wp-content/uploads/2026/10/Gemini_Generated_Image_un7vpvun7vpvun7v-e1790838302485.png",
      cardUrl: "https://blueblocks.in/blog/wp-content/uploads/2026/10/Gemini_Generated_Image_un7vpvun7vpvun7v-e1790838302485.png",
      alt: "How to Find North with the Saptarishi",
    },
    excerpt:
      "On any clear night in India, seven bright stars in the shape of a ladle sit high in the northern sky — a night-sky activity for families.",
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

export default function SitewideBlogSection() {
  const pathname = usePathname() || "";
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const hideJournal =
    cleanPath === "/montessori-system" || cleanPath === "/Biomimicry-Park/register";

  useEffect(() => {
    if (hideJournal) return;
    let active = true;

    async function fetchRecentPosts() {
      try {
        const res = await fetch(
          `https://blueblocks.in/blog/wp-json/wp/v2/posts?per_page=4&_embed=1&orderby=date&order=desc&_bb_ts=${Date.now()}`,
          { headers: { Accept: "application/json" } }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!active || !Array.isArray(data) || data.length === 0) return;

        const formatted = data
          .map(normalizePost)
          .filter(Boolean)
          .slice(0, 4)
          .map((post) => ({
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

        if (formatted.length > 0) setPosts(formatted);
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

  return (
    <section className="bg-[#FAF9F5] border-t border-slate-200/60 py-16 pb-28 sm:py-20 md:pb-20">
      <Container>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => {
            const category = post?.categories?.[0]?.name || "Montessori";
            const imageUrl =
              post?.featured?.cardUrl ||
              post?.featured?.url ||
              "/programs/thumb-secondary.webp";
            const postHref =
              post?.url || (post?.slug ? `/blog/${post.slug}/` : "/blog/");

            return (
              <a
                key={post.id || idx}
                href={postHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={post.title || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-[#2C2F8F] shadow-sm">
                      {category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-slate-400 font-medium mb-2">
                    {formatDate(post.date)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#2C2F8F] transition-colors line-clamp-3 mb-2">
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
