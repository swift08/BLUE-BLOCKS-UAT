import siteData from "@/data/site";
import { notFound } from "next/navigation";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";
export const dynamicParams = false;

function getProgramsMap() {
  return siteData?.pages?.programDetails || {};
}

export function generateStaticParams() {
  const map = getProgramsMap();
  return Object.keys(map).map((slug) => ({ slug }));
}

export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const map = getProgramsMap();

  const page = map?.[slug];
  if (!page) notFound();

  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId={`programs-${slug}`} schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

