import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function ResearchInstitutePage() {
  const page = siteData?.pages?.researchInstitute || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="research-institute" schema={page?.schema} />
      <SectionRendererClient sections={sections} />
    </>
  );
}
