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
    <main className="pt-24 sm:pt-28">
      <article>
        <header className="relative bg-[#0b2f57]">
          {post.featured ? (
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featured.url}
                alt=""
                width={post.featured.width || undefined}
                height={post.featured.height || undefined}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#05233f]/70" />
            </div>
          ) : null}

          <div className="relative mx-auto flex min-h-[420px] max-w-5xl flex-col justify-end px-4 pb-12 pt-20 sm:px-6 sm:pb-16">
            <Link
              href="/blog/"
              className="mb-8 inline-flex w-fit items-center gap-1 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25 transition hover:bg-white/18"
            >
              <span aria-hidden>&larr;</span> All articles
            </Link>

            {post.categories[0] ? (
              <span className="w-fit rounded-sm bg-[#12a9a4] px-3 py-1.5 text-xs font-bold uppercase leading-none text-white">
                {post.categories[0].name}
              </span>
            ) : null}

            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
              {post.author ? <span>By {post.author}</span> : null}
              {post.author && post.date ? <span aria-hidden>|</span> : null}
              {post.date ? (
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              ) : null}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-12 border-t border-slate-200 pt-6">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0f52ba] hover:underline"
            >
              <span aria-hidden>&larr;</span> Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
