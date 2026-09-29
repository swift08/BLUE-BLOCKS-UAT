import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Careers at Blue Blocks Montessori | Jobs in Hyderabad",
  description:
    "Careers at Blue Blocks Montessori School Hyderabad. Open roles for AMI Montessori guides, Cambridge IGCSE Facilitators, and mission-aligned professionals across our Gachibowli and Tellapur campuses.",
  alternates: { canonical: "https://blueblocks.in/careers/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/careers/",
    title: "Careers at Blue Blocks Montessori | Jobs in Hyderabad",
    description:
      "Open roles for AMI Montessori guides, Cambridge IGCSE Facilitators, and mission-aligned professionals across Gachibowli and Tellapur.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Careers at Blue Blocks Montessori School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Blue Blocks Montessori | Jobs in Hyderabad",
    description:
      "Open roles for AMI guides, Cambridge facilitators, and mission-aligned professionals.",
  },
};

export default function CareersPage() {
  const page = siteData?.pages?.careers || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="careers" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
