import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";

export const dynamic = "force-static";

export default function AboutUsPage() {
  const sections = Array.isArray(siteData?.pages?.aboutUs?.sections)
    ? siteData.pages.aboutUs.sections
    : [];

  return <SectionRendererClient sections={sections} />;
}