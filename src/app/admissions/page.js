import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function AdmissionsPage() {
  const page = siteData?.pages?.admissions || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="admissions" schema={page?.schema} />
      <SectionRendererClient sections={sections} />
    </>
  );
}
