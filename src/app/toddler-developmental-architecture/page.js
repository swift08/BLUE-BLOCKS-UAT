import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function ToddlerDevelopmentalArchitecture() {
  const sections = siteData?.pages?.toddlerDevelopmentalArchitecture?.sections || [];
  return <SectionRenderer sections={sections} />;
}
