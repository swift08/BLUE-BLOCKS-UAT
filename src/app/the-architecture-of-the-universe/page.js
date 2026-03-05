import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function TheArchitectureOfTheUniverse() {
  const page = siteData?.pages?.theArchitectureOfTheUniverse || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="the-architecture-of-the-universe" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
