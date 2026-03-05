import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function FaqPage() {
  const page = siteData?.pages?.faq || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="faq" schema={page?.schema} />
      <SectionRendererClient sections={sections} />
    </>
  );
}
