import { getAllPosts, getBlogCategories, getPopularTags } from "@/lib/wordpress";
import BlogIndexClient from "./BlogIndexClient";

export const dynamic = "force-static";

export const metadata = {
  title: "Blog | Blue Blocks Montessori School",
  description:
    "Montessori insights on parenting, child development, and how children really learn, from Blue Blocks Montessori School, Hyderabad.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://blueblocks.in/blog/" },
};

export default async function BlogPage() {
  const [posts, popularTags, categories] = await Promise.all([
    getAllPosts(),
    getPopularTags(),
    getBlogCategories(),
  ]);

  return (
    <main className="pt-24 sm:pt-28">
      <BlogIndexClient
        posts={posts}
        popularTags={popularTags}
        categories={categories}
      />
    </main>
  );
}
