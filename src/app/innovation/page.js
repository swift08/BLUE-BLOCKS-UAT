import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Student Innovation Ecosystem | Blue Blocks Montessori",
  description:
    "Discover Blue Blocks student innovation labs, including Space Lab, Drone Lab, and Biomimicry Hive where children design patentable systems.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://blueblocks.in/innovation/" },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/innovation/",
    title: "Student Innovation Ecosystem | Blue Blocks Montessori",
    description:
      "Space Lab, Drone Lab, and Biomimicry Hive — where Blue Blocks students design patentable systems.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks student innovation labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Innovation Ecosystem | Blue Blocks",
    description:
      "Space, drone, and biomimicry labs where students invent and patent.",
  },
};

export default function InnovationIndexPage() {
  const page = siteData?.pages?.innovation || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="innovation" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

