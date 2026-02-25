import siteData from "@/data/site.json";
import SectionRendererClient from "@/components/SectionRendererClient";

export default function HomePage() {
  const sections = siteData?.pages?.home?.sections || [];
  return <SectionRendererClient sections={sections} />;
}
