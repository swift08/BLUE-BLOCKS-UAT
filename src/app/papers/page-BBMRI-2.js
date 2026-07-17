import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { PAPER_SERIES, PAPER_AUTHOR_BYLINE } from "@/data/publishing";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori Research Papers & Publications | Blue Blocks School",
  description:
    "Explore developmental architecture papers by the Blue Blocks Micro Research Institute. Read about toddler neuropsychiatry, conscious intelligence, moral reasoning, and adolescent social newborn planes.",
  keywords: [
    "Montessori research papers",
    "child development studies Hyderabad",
    "Montessori neuropsychiatry",
    "executive function development research",
    "Blue Blocks publications",
    "Pavan Goyal research",
  ],
  alternates: {
    canonical: "https://blueblocks.in/papers/",
    languages: {
      "en-in": "https://blueblocks.in/papers/",
      "x-default": "https://blueblocks.in/papers/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/papers/",
    title: "Montessori Research Papers & Publications | Blue Blocks School",
    description:
      "Explore developmental architecture papers by the Blue Blocks Micro Research Institute. Read about toddler neuropsychiatry, conscious intelligence, moral reasoning, and adolescent social newborn planes.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Micro Research Institute Publications",
      },
    ],
  },
};

const papersSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Montessori Research Papers",
    url: "https://blueblocks.in/papers/",
    description:
      "Blue Blocks developmental paper series exploring child psychology, neuropsychiatry, and educational architectures across the Planes of Development.",
    isPartOf: { "@id": "https://blueblocks.in/#website" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blueblocks.in/" },
      { "@type": "ListItem", position: 2, name: "Papers", item: "https://blueblocks.in/papers/" },
    ],
  },
];

export default function PapersHubPage() {
  return (
    <>
      <PageJsonLd baseId="papers" schema={papersSchema} />

      <PageHero
        title="Research Papers"
        subtitle="Exploring the science of child development and the prepared environment."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Papers" },
        ]}
        bg={{
          base: "#F3E3CF",
          leftArc: "/ui/arc-left.webp",
          rightArc: "/ui/arc-right.webp",
        }}
      />

      {/* Intro section about Micro Research Institute */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50/60 rounded-3xl border border-amber-200/60 p-8 sm:p-10 shadow-sm">
              <span className="inline-block bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-3 py-1 text-xs font-bold mb-4">
                Blue Blocks Micro Research Institute (MRI)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                Bridging Montessori Practice with Modern Science
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                Under the direction of Principal Investigator <Link href="/about-us/founders/pavan-goyal/" className="text-amber-700 hover:text-amber-800 font-semibold underline">Pavan Goyal</Link>, the Blue Blocks Micro Research Institute conducts longitudinal, consent-based observations in our classrooms. Our work links authentic Montessori pedagogy with contemporary neurodevelopmental science, providing empirical evidence on how child-centered learning structures support executive function, spatial orientation, and creative reasoning.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                <a
                  href="https://mri2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Visit Micro Research Institute Portal
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link
                  href="/montessori-system"
                  className="inline-flex items-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl transition-colors"
                >
                  Our Pedagogical System
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Papers Grid */}
      <section className="pb-24 bg-slate-50/50">
        <Container>
          <div className="max-w-4xl mx-auto pt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
              Developmental Architecture Paper Series
            </h3>

            <div className="grid gap-8 md:grid-cols-2">
              {PAPER_SERIES.map((paper) => (
                <article
                  key={paper.slug}
                  className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm flex flex-col hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1">
                      {paper.id}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Published: {paper.publishedDate}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors duration-200 mb-3">
                    {paper.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed flex-grow mb-6">
                    {paper.summary}
                  </p>

                  <div className="text-xs text-slate-400 italic mb-6 border-t border-slate-100 pt-4">
                    {PAPER_AUTHOR_BYLINE}
                  </div>

                  <Link
                    href={`/${paper.slug}/`}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-800 transition-colors"
                  >
                    Read Full Paper
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-16 bg-white rounded-3xl border border-slate-200/80 p-8 text-center shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-3">Interested in School Admissions?</h4>
              <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
                Discover how our research-backed developmental architecture guides student learning from toddler stages through high school.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
                <Link
                  href="/admissions"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-colors"
                >
                  Admissions Process
                </Link>
                <Link
                  href="/contact-us"
                  className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl transition-colors"
                >
                  Contact Enquiry
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
