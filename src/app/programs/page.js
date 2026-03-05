import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function ProgramsIndexPage() {
  const page = siteData?.pages?.programs || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="programs" schema={page?.schema} />
      <SectionRendererClient sections={sections} />
    </>
  );
}
