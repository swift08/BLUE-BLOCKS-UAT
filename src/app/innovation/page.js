import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";

export const dynamic = "force-static";

export default function InnovationPage() {
  const sections = Array.isArray(siteData?.pages?.innovation?.sections)
    ? siteData.pages.innovation.sections
    : [];

  return <SectionRendererClient sections={sections} />;
}