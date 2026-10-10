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
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/announcement-centre/",
    languages: {
      "en-in": "https://blueblocks.in/announcement-centre/",
      "x-default": "https://blueblocks.in/announcement-centre/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/announcement-centre/",
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
    url: "https://blueblocks.in/announcement-centre/",
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
        item: "https://blueblocks.in/announcement-centre/",
      },
    ],
  },
];

const ANCHORED_EVENTS = [
  {
    slug: "ami-orientation-parents",
    badge: "Orientation",
    date: "This month",
    title: "AMI Orientation for Parents",
    messages: ["10:00 AM – 12:30 PM. An introduction to AMI practice for families."],
  },
  {
    slug: "cubesat-payload-testing",
    badge: "Space Lab",
    date: "This month",
    title: "Student CubeSat Mission Payload Testing",
    messages: ["02:00 PM – 04:00 PM. Payload checks with the adolescent space cohort."],
  },
  {
    slug: "admissions-open-day",
    badge: "Admissions",
    date: "This month",
    title: "Admissions Open Day & Campus Walkthrough",
    messages: ["10:30 AM – 01:00 PM. Walk the prepared environments and meet the guides."],
  },
];

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AnnouncementCentrePage() {
  const homeSections = siteData?.pages?.home?.sections || [];
  const announcementSection = homeSections.find(
    (section) => section?.type === "announcementSection"
  );
  const fromSite = (announcementSection?.props?.announcements || []).map((item) => ({
    ...item,
    slug: item.slug || slugify(item.title),
  }));
  const seen = new Set(fromSite.map((item) => item.slug));
  const announcements = [
    ...ANCHORED_EVENTS.filter((item) => !seen.has(item.slug)),
    ...fromSite,
  ];

  const schema = [
    ...pageSchema,
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://blueblocks.in/announcement-centre/#events",
      name: "School announcements",
      numberOfItems: announcements.length,
      itemListElement: announcements.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.title,
        url: `https://blueblocks.in/announcement-centre/#${event.slug}`,
        description: Array.isArray(event.messages) ? event.messages[0] : undefined,
      })),
    },
  ];

  return (
    <>
      <PageJsonLd baseId="announcement-centre" schema={schema} />

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
