import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Campuses & Infrastructure | Gachibowli & Tellapur | Blue Blocks Montessori",
  description:
    "Explore our biophilic campuses in Gachibowli (toddler and pre-primary Montessori environments) and Tellapur (complete school featuring Cambridge IGCSE, Space Lab, and Micro Research Institute integration).",
  keywords: [
    "Montessori school Gachibowli",
    "best preschool Gachibowli",
    "Montessori Tellapur",
    "international school Tellapur Hyderabad",
    "biophilic school campus Hyderabad",
    "Blue Blocks campuses",
  ],
  alternates: {
    canonical: "https://blueblocks.in/campus/",
    languages: {
      "en-in": "https://blueblocks.in/campus/",
      "x-default": "https://blueblocks.in/campus/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/campus/",
    title: "Campuses & Infrastructure | Gachibowli & Tellapur | Blue Blocks Montessori",
    description:
      "Tour our Gachibowli and Tellapur campuses. Discover custom learning environments, biophilic architecture, octagonal rooms, and student innovation labs.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori School Campuses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campuses & Infrastructure | Gachibowli & Tellapur | Blue Blocks",
    description:
      "Tour Gachibowli and Tellapur campuses — biophilic design, octagonal rooms, and innovation labs.",
  },
};

export default function CampusPage() {
  const page = siteData?.pages?.campus || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  const infraSection = sections.find((section) => section?.type === "hexaInfrastructure");
  const infraItems = Array.isArray(infraSection?.props?.items) ? infraSection.props.items : [];

  const infraFaqEntities = infraItems
    .filter((item) => item?.modal?.title && Array.isArray(item?.modal?.paragraphs))
    .slice(0, 6)
    .map((item) => ({
      "@type": "Question",
      name: item.modal.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.modal.paragraphs.join(" "),
      },
    }));

  const schema = [
    ...(Array.isArray(page?.schema) ? page.schema : []),
    ...(infraFaqEntities.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: infraFaqEntities,
          },
        ]
      : []),
  ];

  return (
    <>
      <PageJsonLd baseId="campus" schema={schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
