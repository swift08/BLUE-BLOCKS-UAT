import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function TheArchitectureOfTheUniverse() {
  const sections = siteData?.pages?.theArchitectureOfTheUniverse?.sections || [];
  return <SectionRenderer sections={sections} />;
}
