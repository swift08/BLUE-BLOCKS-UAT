import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Terms & Conditions | Blue Blocks Montessori School",
  description: "Review terms of service, enrollments, campus expectations, and legal policies for Blue Blocks Montessori School.",
  alternates: {
    canonical: "https://blueblocks.in/terms/",
  },
};

export default function TermsPage() {
  const page = siteData?.pages?.terms || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="terms" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

