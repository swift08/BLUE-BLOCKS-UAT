import Link from "next/link";
import { getAllPosts } from "@/lib/wordpress";

export const dynamic = "force-static";

export const metadata = {
  title: "Blog | Blue Blocks Montessori School",
  description:
    "Montessori insights on parenting, child development, and how children really learn, from Blue Blocks Montessori School, Hyderabad.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://blueblocks.in/blog/" },
};

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="pt-28 sm:pt-32">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0f52ba]">
            Blog
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-slate-900">
            Insights &amp; Ideas
          </h1>
          <p className="mt-3 text-slate-600">
            Montessori perspectives on parenting, child development, and how
            children really learn.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-12 text-slate-500">
            Posts are being updated. Please check back soon.
          </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <Link href={`/blog/${post.slug}/`} className="block h-full">
                  {post.featured ? (
                    <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.featured.cardUrl}
                        alt={post.featured.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    {post.categories[0] ? (
                      <span className="inline-block rounded-full bg-[#0f52ba]/10 px-3 py-1 text-xs font-medium text-[#0f52ba]">
                        {post.categories[0].name}
                      </span>
                    ) : null}
                    <h2 className="mt-3 text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-[#0f52ba]">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-slate-400">
                      {formatDate(post.date)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
