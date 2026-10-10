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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://blueblocks.in/newsroom/#webpage",
      url: "https://blueblocks.in/newsroom/",
      name: "Blue Blocks Newsroom & Media Mentions",
      description:
        "Official press coverage of Blue Blocks Montessori School across national and global news outlets.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://blueblocks.in/#website",
        name: "Blue Blocks Montessori School",
        url: "https://blueblocks.in/",
      },
    },
    {
      "@type": "ItemList",
      name: "Press Mentions and Media Coverage",
      itemListElement: PRESS_MENTIONS.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "NewsArticle",
          headline: item.headline,
          url: item.articleUrl,
          publisher: {
            "@type": "Organization",
            name: item.outlet,
          },
          description: item.summary,
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
