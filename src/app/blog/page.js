import BlogEmbedFrame from "@/components/blog/BlogEmbedFrame";

export const dynamic = "force-static";

export const metadata = {
  title: "Blog | Blue Blocks",
  description:
    "Embedded Blue Blocks blog view.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://blueblocks.in/blog/",
  },
};

const BLOG_URL = "https://blueblocks.in/blog/";
const EMBED_URL = "/blog/embed/";

export default function BlogPage() {
  return (
    <main className="pt-28 sm:pt-32">
      <BlogEmbedFrame src={EMBED_URL} fallbackHref={BLOG_URL} title="Blue Blocks Blog" />
    </main>
  );
}
