import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function TheConsciousConstructionOfIntelligence() {
  const sections = siteData?.pages?.theConsciousConstructionOfIntelligence?.sections || [];
  return <SectionRenderer sections={sections} />;
}
