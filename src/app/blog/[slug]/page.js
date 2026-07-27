import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/wordpress";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const canonical = `https://blueblocks.in/blog/${slug}/`;

  if (!post) {
    return {
      title: "Blog Article | Blue Blocks Montessori School",
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  const description = post.excerpt ? post.excerpt.slice(0, 300) : undefined;

  return {
    title: `${post.title} | Blue Blocks Montessori School`,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: canonical,
      images: post.featured ? [{ url: post.featured.url }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="pt-28 sm:pt-32">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#0f52ba] hover:underline"
        >
          <span aria-hidden>←</span> All articles
        </Link>

        <header className="mt-6">
          {post.categories[0] ? (
            <span className="inline-block rounded-full bg-[#0f52ba]/10 px-3 py-1 text-xs font-medium text-[#0f52ba]">
              {post.categories[0].name}
            </span>
          ) : null}
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight text-slate-900">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            {post.author ? <span>By {post.author}</span> : null}
            {post.author && post.date ? <span aria-hidden>•</span> : null}
            {post.date ? (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            ) : null}
          </div>
        </header>

        {post.featured ? (
          <figure className="mt-8 overflow-hidden rounded-2xl bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featured.url}
              alt={post.featured.alt}
              width={post.featured.width || undefined}
              height={post.featured.height || undefined}
              className="h-auto w-full object-cover"
            />
          </figure>
        ) : null}

        <div
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-12 border-t border-slate-200 pt-6">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#0f52ba] hover:underline"
          >
            <span aria-hidden>←</span> Back to all articles
          </Link>
        </div>
      </article>
    </main>
  );
}
