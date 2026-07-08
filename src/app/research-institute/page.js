import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Blue Blocks Micro Research Institute | Child Development Study",
  description: "BBMRI conducts a 17-year longitudinal study mapping child development using passive observation. Read our peer-reviewed research papers and study methodologies.",
  alternates: {
    canonical: "https://blueblocks.in/research-institute/",
  },
};

export default function ResearchInstitutePage() {
  const page = siteData?.pages?.researchInstitute || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="research-institute" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

