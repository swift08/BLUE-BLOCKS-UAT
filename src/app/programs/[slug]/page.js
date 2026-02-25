import siteData from "@/data/site.json";
import { notFound } from "next/navigation";
import SectionRendererClient from "@/components/SectionRendererClient";

export const dynamic = "force-static";
export const dynamicParams = false;

function getProgramsMap() {
  return siteData?.pages?.programDetails || {};
}

export function generateStaticParams() {
  const map = getProgramsMap();
  return Object.keys(map).map((slug) => ({ slug }));
}

export default function ProgramPage({ params }) {
  const slug = params?.slug;
  const map = getProgramsMap();

  const page = map?.[slug];
  if (!page) notFound();

  const sections = Array.isArray(page?.sections) ? page.sections : [];
  return <SectionRendererClient sections={sections} />;
}