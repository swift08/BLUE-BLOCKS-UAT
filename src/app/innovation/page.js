import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function InnovationIndexPage() {
  const page = siteData?.pages?.innovation || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="innovation" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
