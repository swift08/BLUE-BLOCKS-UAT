import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Contact Us | Blue Blocks Tellapur & Gachibowli Campuses",
  description:
    "Contact Blue Blocks Montessori School. Find phone numbers, WhatsApp links, and physical addresses for our Tellapur and Gachibowli school campuses in Hyderabad.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://blueblocks.in/contact-us/" },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/contact-us/",
    title: "Contact Us | Blue Blocks Tellapur & Gachibowli Campuses",
    description:
      "Contact Blue Blocks Montessori School. Find phone numbers, WhatsApp links, and physical addresses for our Tellapur and Gachibowli school campuses in Hyderabad.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Contact Blue Blocks Montessori School Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Blue Blocks Tellapur & Gachibowli",
    description:
      "Phone, WhatsApp, and campus addresses for Blue Blocks Montessori in Hyderabad.",
  },
};

export default function ContactPage() {
  const page = siteData?.pages?.contact || {};
  const baseSections = Array.isArray(page?.sections) ? page.sections : [];

  const hasCareersCta = baseSections.some(
    (section) => section?.type === "ctaBanner" && section?.props?.cta?.href === "/careers/"
  );

  const careersCtaSection = {
    type: "ctaBanner",
    props: {
      title: "Looking to Join Blue Blocks?",
      text:
        "Open roles and role descriptions are now available on the dedicated Careers page.",
      cta: {
        label: "View Careers",
        href: "/careers/",
      },
      image: "/careers/building.webp",
      imageAlt: "Blue Blocks Careers",
      imageWidth: "566",
      imageHeight: "506",
      customTopSpacing: "sm:pt-70",
      align: "left",
      theme: "dark",
    },
  };

  const sections = hasCareersCta ? baseSections : [...baseSections, careersCtaSection];

  return (
    <>
      <PageJsonLd baseId="contact" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

