import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function ToddlerDevelopmentalArchitecture() {
  const page = siteData?.pages?.toddlerDevelopmentalArchitecture || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd
        baseId="toddler-developmental-architecture"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}
