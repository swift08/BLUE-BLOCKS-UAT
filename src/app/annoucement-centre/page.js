import siteData from "@/data/site";
import PageHero from "@/components/blocks/PageHero";
import PageJsonLd from "@/components/seo/PageJsonLd";
import AnnouncementCentreClient from "./AnnouncementCentreClient";

export const dynamic = "force-static";

export const metadata = {
  title: "Announcement Centre | Latest School Events & Workshops | Blue Blocks",
  description:
    "Explore the latest events, workshops, student achievements, and academic announcements from Blue Blocks Montessori School in Hyderabad.",
  keywords: [
    "Blue Blocks announcements",
    "Montessori events Hyderabad",
    "parenting workshops",
    "AMI teacher training course",
    "Blue Blocks Complete School updates",
  ],
  alternates: {
    canonical: "https://blueblocks.in/annoucement-centre/",
    languages: {
      "en-in": "https://blueblocks.in/annoucement-centre/",
      "x-default": "https://blueblocks.in/annoucement-centre/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/annoucement-centre/",
    title: "Announcement Centre | Latest School Events & Workshops | Blue Blocks",
    description:
      "Explore the latest events, workshops, student achievements, and academic announcements from Blue Blocks Montessori School in Hyderabad.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori School updates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Announcement Centre | Blue Blocks Montessori School",
    description:
      "Latest announcements, events, and workshops from Blue Blocks Montessori School in Hyderabad.",
  },
};

const pageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Announcement Centre",
    url: "https://blueblocks.in/annoucement-centre/",
    description:
      "Explore the latest events, workshops, student achievements, and academic announcements from Blue Blocks Montessori School in Hyderabad.",
    isPartOf: {
      "@id": "https://blueblocks.in/#website",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://blueblocks.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Announcement Centre",
        item: "https://blueblocks.in/annoucement-centre/",
      },
    ],
  },
];

export default function AnnouncementCentrePage() {
  // Extract announcements from home page sections configuration in site.json
  const homeSections = siteData?.pages?.home?.sections || [];
  const announcementSection = homeSections.find(
    (section) => section?.type === "announcementSection"
  );
  const announcements = announcementSection?.props?.announcements || [];

  return (
    <>
      <PageJsonLd baseId="annoucement-centre" schema={pageSchema} />

      <PageHero
        title="Announcement Centre"
        subtitle="Stay up to date with our events, workshops, and milestones"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Announcement Centre" },
        ]}
        bg={{
          base: "#F3E3CF",
          leftArc: "/ui/arc-left.webp",
          rightArc: "/ui/arc-right.webp",
        }}
      />

      <AnnouncementCentreClient announcements={announcements} />
    </>
  );
}
