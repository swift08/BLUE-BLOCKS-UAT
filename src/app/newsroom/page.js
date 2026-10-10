import NewsroomView from "@/components/newsroom/NewsroomView";
import JsonLd from "@/components/seo/JsonLd";
import { PRESS_MENTIONS } from "@/data/newsroom";

export const dynamic = "force-static";

export const metadata = {
  title: "Newsroom & Press Coverage | Blue Blocks Montessori School Hyderabad",
  description:
    "Explore national and international media coverage of Blue Blocks Montessori School, student CubeSat payload on ISRO PSLV, 5 drone patents, and authentic Montessori education.",
  keywords: [
    "Blue Blocks in the news",
    "Blue Blocks media coverage",
    "Blue Blocks press mentions",
    "Times of India Blue Blocks",
    "The Hindu Blue Blocks CubeSat",
    "ISRO student CubeSat",
    "Blue Blocks drone patents",
    "Hyderabad Montessori school news",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/newsroom/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/newsroom/",
    title: "Newsroom & Media Coverage | Blue Blocks Montessori School",
    description:
      "National and global media coverage documenting Blue Blocks students' ISRO CubeSat mission, drone patents, and authentic Montessori education.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Newsroom and Press Mentions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsroom & Media Coverage | Blue Blocks",
    description:
      "Press coverage of student inventions, ISRO collaboration, and Montessori education at Blue Blocks.",
  },
};

const MONTH = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function datePublished(date) {
  const [month, year] = String(date || "").toLowerCase().split(/\s+/);
  return MONTH[month] && /^\d{4}$/.test(year) ? `${year}-${MONTH[month]}` : undefined;
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://blueblocks.in/newsroom/#webpage",
      url: "https://blueblocks.in/newsroom/",
      name: "Blue Blocks Newsroom & Media Mentions",
      description:
        "Official press coverage of Blue Blocks Montessori School across national and global news outlets.",
      inLanguage: "en-IN",
      isPartOf: { "@id": "https://blueblocks.in/#website" },
      about: { "@id": "https://blueblocks.in/#organization" },
      publisher: { "@id": "https://blueblocks.in/#organization" },
      mainEntity: { "@id": "https://blueblocks.in/newsroom/#mentions" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blueblocks.in/newsroom/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://blueblocks.in/" },
        { "@type": "ListItem", position: 2, name: "Newsroom", item: "https://blueblocks.in/newsroom/" },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://blueblocks.in/newsroom/#mentions",
      name: "Press Mentions and Media Coverage",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: PRESS_MENTIONS.length,
      itemListElement: PRESS_MENTIONS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "NewsArticle",
          headline: item.headline,
          url: item.articleUrl,
          datePublished: datePublished(item.date),
          articleSection: item.category,
          description: item.summary,
          about: { "@id": "https://blueblocks.in/#organization" },
          publisher: {
            "@type": "Organization",
            name: item.outlet,
          },
        },
      })),
    },
  ],
};

export default function NewsroomPage() {
  return (
    <>
      <JsonLd id="newsroom-jsonld" data={structuredData} />
      <NewsroomView />
    </>
  );
}
