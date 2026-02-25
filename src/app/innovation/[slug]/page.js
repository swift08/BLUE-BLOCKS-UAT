import siteData from "@/data/site.json";
import { notFound } from "next/navigation";
import SectionRendererClient from "@/components/SectionRendererClient";

export const dynamic = "force-static";

// ✅ Adjust this path to your real JSON structure
function getInnovationMap() {
  return siteData?.pages?.innovationDetail || {};
}

export function generateStaticParams() {
  const map = getInnovationMap();
  return Object.keys(map).map((slug) => ({ slug }));
}

export default function InnovationDetailPage({ params }) {
  const slug = params?.slug;
  const map = getInnovationMap();

  const page = map?.[slug];
  if (!page) notFound();

  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return <SectionRendererClient sections={sections} />;
}