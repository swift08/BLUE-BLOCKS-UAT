import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import PageHero from "@/components/blocks/PageHero";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { RESEARCH_OUTPUTS } from "@/data/publishing";

export const dynamic = "force-static";
export const dynamicParams = false;

function getOutput(slug = "") {
  return RESEARCH_OUTPUTS.find((item) => item.slug === slug) || null;
}

export function generateStaticParams() {
  return RESEARCH_OUTPUTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getOutput(slug);
  if (!item) return {};

  return {
    title: `${item.title} | Blue Blocks`,
    description: item.summary,
    alternates: {
      canonical: `/publications/${item.slug}/`,
    },
  };
}

export default async function PublicationDetailPage({ params }) {
  const { slug } = await params;
  const item = getOutput(slug);
  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": item.kind === "patent" ? "CreativeWork" : "ScholarlyArticle",
    headline: item.title,
    description: item.summary,
    url: `#/publications/${item.slug}/`,
    publisher: { "@id": "##organization" },
  };

  return (
    <>
      <PageJsonLd baseId={`publication-${item.slug}`} schema={schema} />

      <PageHero
        title={item.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Publications", href: "/research-institute/" },
          { label: item.title },
        ]}
        bg={{
          base: "#F3E3CF",
          leftArc: "/ui/arc-left.webp",
          rightArc: "/ui/arc-right.webp",
        }}
      />

      <section className="bb-ui bg-white">
        <div className="bb-section">
          <div className="bb-section__inner">
            <Container>
              <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200 p-6 sm:p-8">
                <div className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                  {item.kind}
                </div>
                <div className="mt-3 text-sm leading-7 text-slate-700">{item.summary}</div>
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  TODO: Add full publication/patent narrative content and source citations.
                </div>
                <a
                  href={`/publications/${item.slug}/${item.slug}.md/`}
                  className="mt-6 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  Open AI-Crawler View
                </a>
              </article>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}
