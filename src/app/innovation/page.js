import siteData from "@/data/site.json";
import InnovationSectionsClient from "./InnovationSectionsClient";

export const dynamic = "force-static";

export default function InnovationPage() {
  const sections = Array.isArray(siteData?.pages?.innovation?.sections)
    ? siteData.pages.innovation.sections
    : [];

  return <InnovationSectionsClient sections={sections} />;
}