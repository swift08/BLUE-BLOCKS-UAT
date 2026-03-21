import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function CareersPage() {
  const page = siteData?.pages?.careers || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="careers" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
