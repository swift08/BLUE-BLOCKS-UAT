import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "School Videos & Classroom Observations | Blue Blocks",
  description:
    "Watch observational classroom footage, student patent demonstrations, and CubeSat mission launches from Blue Blocks.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/videos/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/videos/",
    title: "School Videos & Classroom Observations | Blue Blocks",
    description:
      "Classroom footage, patent demos, and CubeSat launches from Blue Blocks Montessori.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori school videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Videos | Blue Blocks Montessori",
    description:
      "Classroom observations, patents, and CubeSat mission footage.",
  },
};

export default function VideosPage() {
  const page = siteData?.pages?.videos || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="videos" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

