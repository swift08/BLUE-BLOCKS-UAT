import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function AdolescentSocialNewbornPaper() {
  const sections = siteData?.pages?.adolescentSocialNewbornPaper?.sections || [];
  return <SectionRenderer sections={sections} />;
}
