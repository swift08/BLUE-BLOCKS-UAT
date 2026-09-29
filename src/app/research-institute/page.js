import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Blue Blocks Micro Research Institute | Child Development Study",
  description:
    "BBMRI conducts a 17-year longitudinal study mapping child development using passive observation. Read our peer-reviewed research papers and study methodologies.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/research-institute/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/research-institute/",
    title: "Blue Blocks Micro Research Institute | Child Development Study",
    description:
      "17-year longitudinal study of child development. Peer-reviewed papers and methodologies from BBMRI.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Micro Research Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Blocks Micro Research Institute",
    description:
      "17-year longitudinal child development research from Blue Blocks Montessori.",
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

