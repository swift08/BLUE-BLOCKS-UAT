import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function AboutUsPage() {
  const page = siteData?.pages?.aboutUs || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="about-us" schema={page?.schema} />
      <SectionRendererClient sections={sections} />
    </>
  );
}
