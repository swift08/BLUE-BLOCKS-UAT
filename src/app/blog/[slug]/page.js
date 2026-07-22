import { BLOG_POSTS } from "@/data/publishing";
import BlogEmbedFrame from "@/components/blog/BlogEmbedFrame";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const liveUrl = `https://blueblocks.in/blog/${slug}/`;

  return {
    title: "Blog Article | Blue Blocks",
    description: "Embedded Blue Blocks blog article view.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: liveUrl,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const canonicalUrl = `https://blueblocks.in/blog/${slug}/`;
  const wpBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://wp.blueblocks.in/blog/";
  const embedUrl = `${wpBaseUrl.replace(/\/$/, "")}/${slug}/`;

  return (
    <main className="pt-28 sm:pt-32">
      <BlogEmbedFrame
        src={embedUrl}
        fallbackHref={canonicalUrl}
        title={`Blue Blocks Blog Article: ${slug}`}
      />
    </main>
  );
}
