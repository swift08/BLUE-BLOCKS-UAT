import VideoCatalogExperience from "@/components/video-catalog/VideoCatalogExperience";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import siteData from "@/data/site";
import { CATALOG_SCHEMA } from "@/data/video-catalog";

export const dynamic = "force-static";

export const metadata = buildPageMetadata({
  path: "/video-catalog/",
  title: "Watch Blue Blocks Montessori | Video Catalogue Hyderabad",
  description:
    "Watch Blue Blocks Montessori School in Hyderabad. A scroll through the full 0 to 18 Montessori journey, programs, labs, farm, teachers, and a day in the life of a child.",
  keywords: [
    "Montessori school videos Hyderabad",
    "Blue Blocks videos",
    "Montessori school Hyderabad videos",
    "AMI Montessori classroom",
    "Erdkinder school Hyderabad",
    "Drone lab school",
    "Blue Blocks video catalog",
  ],
  ogImage: "https://blueblocks.in/images/og-homepage.webp",
});

export default function VideoCatalogPage() {
  const phone = "+91 9000955053";

  return (
    <>
      <PageJsonLd baseId="video-catalog" schema={CATALOG_SCHEMA} />
      <VideoCatalogExperience phone={phone} />
    </>
  );
}
