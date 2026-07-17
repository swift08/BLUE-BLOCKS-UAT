import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori School Admissions Hyderabad | Blue Blocks",
  description:
    "Montessori school admissions in Hyderabad at Blue Blocks. AMI-standard pedagogy, ages 15 months to 18 years, Cambridge IGCSE integration.",
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
