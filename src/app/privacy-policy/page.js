import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy | Blue Blocks Montessori School",
  description: "Read the privacy guidelines, data security terms, and usage parameters for visitors and parents of Blue Blocks.",
  alternates: {
    canonical: "https://blueblocks.in/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  const page = siteData?.pages?.privacyPolicy || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="privacy-policy" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

