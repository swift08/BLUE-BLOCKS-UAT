import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Authentic Montessori Education System | Blue Blocks",
  description:
    "Learn about AMI-aligned Montessori pedagogy, child-centered classrooms, planes of development, and the child's psychological development.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/montessori-system/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/montessori-system/",
    title: "Authentic Montessori Education System | Blue Blocks",
    description:
      "AMI-aligned Montessori pedagogy, planes of development, and child-centered classrooms at Blue Blocks.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks authentic Montessori education system",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authentic Montessori Education System | Blue Blocks",
    description:
      "AMI pedagogy, planes of development, and prepared environments explained.",
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

