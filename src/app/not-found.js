// src/app/not-found.js — Custom 404 page
// Returns HTTP 404 status automatically in Next.js App Router.

import Link from "next/link";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Page Not Found | Blue Blocks",
  description:
    "The page you are looking for could not be found. Explore Blue Blocks programs, innovation labs, research institute, or contact us for help.",
  robots: {
    index: false,
    follow: true,
  },
};

const POPULAR_PAGES = [
  { label: "Programs", href: "/programs", desc: "Toddler to Secondary (Ages 1–18)" },
  { label: "Admissions", href: "/admissions", desc: "Admission process & entry windows" },
  { label: "Innovation Labs", href: "/innovation", desc: "Drone, Space, Biomimicry & more" },
  { label: "About Us", href: "/about-us", desc: "Our founders, story & mission" },
  { label: "Research Institute", href: "/research-institute", desc: "17-year longitudinal study" },
  { label: "Contact Us", href: "/contact-us", desc: "Both campuses — Gachibowli & Tellapur" },
  { label: "Campus", href: "/campus", desc: "Octagonal classrooms & biophilic design" },
  { label: "FAQ", href: "/faq", desc: "Common questions answered" },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center py-24 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 visual */}
          <div
            aria-hidden="true"
            className="text-[7rem] font-bold leading-none tracking-tight text-slate-100 select-none"
          >
            404
          </div>

          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Page not found
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-500 max-w-lg mx-auto">
            The page you are looking for may have been moved, renamed, or temporarily unavailable.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              ← Back to Home
            </Link>
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Popular pages grid */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-center text-lg font-semibold text-slate-700 mb-6">
            Popular Pages
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-400 hover:shadow-md"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                  {page.label}
                </span>
                <span className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {page.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sitemap link */}
        <p className="mt-10 text-center text-sm text-slate-400">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/sitemap/" className="underline hover:text-slate-600 transition">
            Browse the full sitemap
          </Link>
          {" "}or{" "}
          <Link href="/contact-us/" className="underline hover:text-slate-600 transition">
            get in touch with us
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
