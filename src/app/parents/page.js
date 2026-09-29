import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori Resources for Parents | Parenting Guides",
  description:
    "Educational parenting guides, workshop archives, and resources for extending Montessori learning principles into the home environment.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/parents/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/parents/",
    title: "Montessori Resources for Parents | Parenting Guides",
    description:
      "Parenting guides, workshop archives, and Montessori-at-home resources from Blue Blocks.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori parent resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montessori Resources for Parents | Blue Blocks",
    description:
      "Guides and workshops for extending Montessori learning at home.",
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

