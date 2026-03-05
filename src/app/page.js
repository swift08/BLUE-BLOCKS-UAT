import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";
import PageJsonLd from "@/components/seo/PageJsonLd";

export default function HomePage() {
  const page = siteData?.pages?.home || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="home" schema={page?.schema} />
      <SectionRendererClient sections={sections} />
    </>
  );
}
