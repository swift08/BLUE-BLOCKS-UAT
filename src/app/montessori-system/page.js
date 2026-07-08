import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Authentic Montessori Education System | Blue Blocks",
  description: "Learn about AMI-aligned Montessori pedagogy, child-centered classrooms, planes of development, and the child's psychological development.",
  alternates: {
    canonical: "https://blueblocks.in/montessori-system/",
  },
};

export default function MontessoriSystemPage() {
  const page = siteData?.pages?.montessoriSystem || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="montessori-system" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

