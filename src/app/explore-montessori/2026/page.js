import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Explore Montessori 2026 | Blue Blocks",
  description: "The 2026 entry in the Explore Montessori series at Blue Blocks, Hyderabad.",
  alternates: { canonical: "https://blueblocks.in/explore-montessori/2026/" },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://blueblocks.in/explore-montessori/2026/#webpage",
    url: "https://blueblocks.in/explore-montessori/2026/",
    name: "Explore Montessori 2026",
    description: "The 2026 entry in the Explore Montessori series at Blue Blocks, Hyderabad.",
    inLanguage: "en-IN",
    datePublished: "2026",
    isPartOf: { "@id": "https://blueblocks.in/explore-montessori/#webpage" },
    about: { "@id": "https://blueblocks.in/#organization" },
    publisher: { "@id": "https://blueblocks.in/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blueblocks.in/" },
      { "@type": "ListItem", position: 2, name: "Explore Montessori", item: "https://blueblocks.in/explore-montessori/" },
      { "@type": "ListItem", position: 3, name: "2026", item: "https://blueblocks.in/explore-montessori/2026/" },
    ],
  },
];

export default function ExploreMontessori2026Page() {
  return (
    <>
      <PageJsonLd baseId="explore-montessori-2026" schema={schema} />
      <PageHero
        title="Explore Montessori 2026"
        subtitle="The first year page in this series. Same school, written for the year you are visiting."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Explore Montessori", href: "/explore-montessori/" },
          { label: "2026" },
        ]}
        bg={{ base: "#F3E3CF", leftArc: "/ui/arc-left.webp", rightArc: "/ui/arc-right.webp" }}
      />
      <section className="bg-white py-14">
        <Container>
          <div className="max-w-2xl space-y-4 text-sm leading-7 text-neutral-700">
            <p>
              In 2026 Blue Blocks is an AMI continuum from 15 months to 18 years, with Cambridge IGCSE in the secondary years, on campuses in Gachibowli and Tellapur.
            </p>
            <p>
              Families usually start with a programme visit, then an admissions conversation. The method itself is on the Montessori system page.
            </p>
            <p className="flex flex-wrap gap-4 font-semibold">
              <Link href="/programs/" className="text-[#0F52BA]">Programmes</Link>
              <Link href="/montessori-system/" className="text-[#0F52BA]">Montessori system</Link>
              <Link href="/admissions/" className="text-[#0F52BA]">Admissions</Link>
              <Link href="/explore-montessori/" className="text-[#0F52BA]">All years</Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
