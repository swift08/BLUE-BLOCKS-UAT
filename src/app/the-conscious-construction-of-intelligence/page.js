import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function TheConsciousConstructionOfIntelligence() {
  const page = siteData?.pages?.theConsciousConstructionOfIntelligence || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd
        baseId="the-conscious-construction-of-intelligence"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}
