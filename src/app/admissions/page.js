import siteData from "@/data/site";
import PageJsonLd from "@/components/seo/PageJsonLd";
import PageHero from "@/components/blocks/PageHero";
import StickyPillsNav from "@/components/ui/StickyPillsNav";
import AdmissionsProcess from "@/components/admissions/AdmissionsProcess";
import AdmissionsFAQ from "@/components/admissions/AdmissionsFAQ";
import faqData from "@/data/admissions-faq.json";
import ProgramsAndCampuses from "@/components/admissions/ProgramsAndCampuses";
import AdmissionsContact from "@/components/admissions/AdmissionsContact";

const ADMISSIONS_NAV = [
  { label: "Our Process", href: "#process", id: "process" },
  { label: "Admission Guidelines", href: "#guidelines", id: "guidelines" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Campus", href: "#campus", id: "campus" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori School Admissions Hyderabad | Blue Blocks",
  description:
    "Montessori school admissions in Hyderabad. Two structured pathways for Toddler/Pre-Primary and Elementary/Adolescent. Saturday workshops. Book your place.",
  keywords: [
    "montessori school admissions hyderabad",
    "Blue Blocks school admission process",
    "best school admissions Gachibowli",
    "Montessori school entry requirements",
    "Tellapur school admission guidelines",
  ],
  alternates: {
    canonical: "https://blueblocks.in/admissions/",
    languages: {
      "en-in": "https://blueblocks.in/admissions/",
      "x-default": "https://blueblocks.in/admissions/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/admissions/",
    title: "Montessori School Admissions Hyderabad | Blue Blocks",
    description:
      "Montessori school admissions in Hyderabad. Two structured pathways for Toddler/Pre-Primary and Elementary/Adolescent. Saturday workshops. Book your place.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori Admissions Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montessori School Admissions Hyderabad | Blue Blocks",
    description:
      "Two structured pathways for Toddler/Pre-Primary and Elementary/Adolescent. Saturday workshops. Book your place.",
  },
};

export default function AdmissionsPage() {
  const page = siteData?.pages?.admissions || {};
  const baseSchema = Array.isArray(page?.schema)
    ? page.schema
    : page?.schema
    ? [page.schema]
    : [];
  const fullSchema = [...baseSchema, faqData.schema];

  return (
    <>
      <PageJsonLd baseId="admissions" schema={fullSchema} />

      {/* Page Hero */}
      <PageHero
        title="Admissions"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Admissions" },
        ]}
        bg={{
          base: "#F3E3CF",
          leftArc: "/ui/arc-left.webp",
          rightArc: "/ui/arc-right.webp",
        }}
      />

      {/* Sticky Navigation Bar — 5 buttons */}
      <StickyPillsNav
        items={ADMISSIONS_NAV}
        ariaLabel="Admissions page section navigation"
        defaultActive="process"
      />

      {/* #process — Admission Process (Desktop 2 side-by-side columns, Mobile 2 tabs) */}
      <AdmissionsProcess />

      {/* #faq — Frequently Asked Questions (Two Categories, Q as h3, A as p, FAQ Schema) */}
      <AdmissionsFAQ />

      {/* #campus / #guidelines — Programs & Campuses */}
      <ProgramsAndCampuses />

      {/* #contact — Ready to start & Get in touch form */}
      <AdmissionsContact />
    </>
  );
}
