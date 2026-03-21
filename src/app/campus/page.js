import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function CampusPage() {
  const page = siteData?.pages?.campus || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="campus" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
