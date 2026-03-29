import Link from "next/link";
import { BLOG_POSTS } from "@/data/publishing";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const liveUrl = `https://blueblocks.in/blog/${slug}/`;

  return {
    title: "Blog Redirect | Blue Blocks",
    description: "Redirecting to the live Blue Blocks blog article.",
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: liveUrl,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const liveUrl = `https://blueblocks.in/blog/${slug}/`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Blog Article</h1>
      <p className="mt-3 text-sm text-slate-700">
        This article is available on the live Blue Blocks blog.
      </p>
      <p className="mt-6">
        <Link
          href={liveUrl}
          className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Open Live Article
        </Link>
      </p>
    </main>
  );
}
