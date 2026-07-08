import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori Programs (Ages 1-18) | Blue Blocks School Hyderabad",
  description: "Explore our continuous AMI Montessori curriculum. Continuous developmental paths from Toddler playgroups (1-3) through Nursery (3-6), Primary (6-12), and Secondary Erdkinder (12-18).",
  alternates: { canonical: "https://blueblocks.in/programs/" },
};

export default function ProgramPage() {
  const page = siteData?.pages?.programs || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="programs" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

