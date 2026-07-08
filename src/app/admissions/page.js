import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Admissions Workflow & Entry Windows | Blue Blocks Montessori",
  description: "Apply to Blue Blocks Montessori School. Explore our parents onboarding journey, developmental orientation, admission interview processes, and entry guidelines.",
  alternates: { canonical: "https://blueblocks.in/admissions/" },
};

export default function AdmissionsPage() {
  const page = siteData?.pages?.admissions || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="admissions" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

