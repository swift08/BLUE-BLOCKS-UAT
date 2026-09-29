import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori Programs (Ages 1-18) | Blue Blocks School Hyderabad",
  description:
    "Explore our continuous AMI Montessori curriculum. Continuous developmental paths from Toddler playgroups (1-3) through Nursery (3-6), Primary (6-12), and Secondary Erdkinder (12-18).",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://blueblocks.in/programs/" },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/programs/",
    title: "Montessori Programs (Ages 1-18) | Blue Blocks School Hyderabad",
    description:
      "AMI Montessori from Toddler through Erdkinder, with Cambridge IGCSE in secondary. Explore programs at Blue Blocks Hyderabad.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori programs ages 1 to 18",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montessori Programs (Ages 1-18) | Blue Blocks Hyderabad",
    description:
      "Toddler to Erdkinder AMI continuum with Cambridge IGCSE in secondary.",
  },
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

