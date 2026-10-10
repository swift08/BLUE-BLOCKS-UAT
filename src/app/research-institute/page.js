import siteData from "@/data/site";
import { PAPER_SERIES, RESEARCH_OUTPUTS } from "@/data/publishing";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Blue Blocks Micro Research Institute | Child Development Study",
  description:
    "BBMRI conducts a 17-year longitudinal study mapping child development using passive observation. Read our peer-reviewed research papers and study methodologies.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/research-institute/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/research-institute/",
    title: "Blue Blocks Micro Research Institute | Child Development Study",
    description:
      "17-year longitudinal study of child development. Peer-reviewed papers and methodologies from BBMRI.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Micro Research Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Blocks Micro Research Institute",
    description:
      "17-year longitudinal child development research from Blue Blocks Montessori.",
  },
};

const publications = [
  ...PAPER_SERIES.map((item) => ({
    name: item.title,
    url: `https://blueblocks.in/${item.slug}/`,
  })),
  ...RESEARCH_OUTPUTS.map((item) => ({
    name: item.title,
    url: `https://blueblocks.in${item.pageUrl || `/publications/${item.slug}/`}`,
  })),
];

export default function ResearchInstitutePage() {
  const page = siteData?.pages?.researchInstitute || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];
  const schema = [
    ...(Array.isArray(page.schema) ? page.schema : []),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://blueblocks.in/research-institute/#publications",
      name: "Blue Blocks Micro Research Institute publications",
      itemListElement: publications.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          name: item.name,
          url: item.url,
          publisher: { "@id": "https://blueblocks.in/#microresearch" },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Blue Blocks Research",
      url: "https://research.blueblocks.in/",
      publisher: { "@id": "https://blueblocks.in/#organization" },
    },
  ];

  return (
    <>
      <PageJsonLd baseId="research-institute" schema={schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

