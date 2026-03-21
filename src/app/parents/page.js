import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function ParentsPage() {
  const page = siteData?.pages?.parents || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="parents" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
