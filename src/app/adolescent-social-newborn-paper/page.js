import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function AdolescentSocialNewbornPaper() {
  const page = siteData?.pages?.adolescentSocialNewbornPaper || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd
        baseId="adolescent-social-newborn-paper"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}
