import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori Resources for Parents | Parenting Guides",
  description: "Educational parenting guides, workshop archives, and resources for extending Montessori learning principles into the home environment.",
  alternates: {
    canonical: "https://blueblocks.in/parents/",
  },
};

export default function ParentsPage() {
  const page = siteData?.pages?.parents || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="parents" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

