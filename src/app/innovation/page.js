import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Student Innovation Ecosystem | Blue Blocks Montessori",
  description: "Discover Blue Blocks student innovation labs, including Space Lab, Drone Lab, and Biomimicry Hive where children design patentable systems.",
  alternates: { canonical: "https://blueblocks.in/innovation/" },
};

export default function InnovationIndexPage() {
  const page = siteData?.pages?.innovation || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="innovation" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

