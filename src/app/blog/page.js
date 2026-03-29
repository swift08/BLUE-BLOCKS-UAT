import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Blog Redirect | Blue Blocks",
  description:
    "Redirecting to the live Blue Blocks blog.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://blueblocks.in/blog/",
  },
};

const BLOG_URL = "https://blueblocks.in/blog/";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Blue Blocks Blog</h1>
      <p className="mt-3 text-sm text-slate-700">
        The blog has moved to the live endpoint.
      </p>
      <p className="mt-6">
        <Link
          href={BLOG_URL}
          className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Open Live Blog
        </Link>
      </p>
      <p className="mt-4 text-xs text-slate-500">
        This local route is retained only as a fallback.
      </p>
    </main>
  );
}
