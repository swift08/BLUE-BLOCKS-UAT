import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Explore Montessori | Blue Blocks",
  description: "A year-by-year hub for how Blue Blocks practises AMI Montessori in Hyderabad.",
  alternates: { canonical: "https://blueblocks.in/explore-montessori/" },
};

const LINKS = [
  { href: "/explore-montessori/2026/", title: "2026", text: "The first year of this series: planes, programmes, and what families can visit." },
  { href: "/montessori-system/", title: "Montessori system", text: "The four planes, the prepared environment, and the words we actually use." },
  { href: "/programs/", title: "Programmes", text: "Playgroup through secondary, on one continuum." },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://blueblocks.in/explore-montessori/#webpage",
    url: "https://blueblocks.in/explore-montessori/",
    name: "Explore Montessori",
    description: "A year-by-year hub for how Blue Blocks practises AMI Montessori in Hyderabad.",
    inLanguage: "en-IN",
    isPartOf: { "@id": "https://blueblocks.in/#website" },
    about: { "@id": "https://blueblocks.in/#organization" },
    mainEntity: { "@id": "https://blueblocks.in/explore-montessori/#years" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blueblocks.in/" },
      { "@type": "ListItem", position: 2, name: "Explore Montessori", item: "https://blueblocks.in/explore-montessori/" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://blueblocks.in/explore-montessori/#years",
    name: "Explore Montessori series",
    itemListElement: LINKS.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `https://blueblocks.in${item.href}`,
    })),
  },
];

export default function ExploreMontessoriPage() {
  return (
    <>
      <PageJsonLd baseId="explore-montessori" schema={schema} />
      <PageHero
        title="Explore Montessori"
        subtitle="Start with a year, then the method, then the programme that matches your child."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Explore Montessori" }]}
        bg={{ base: "#F3E3CF", leftArc: "/ui/arc-left.webp", rightArc: "/ui/arc-right.webp" }}
      />
      <section className="bg-white py-14">
        <Container>
          <ul className="grid gap-4 md:grid-cols-3">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block h-full rounded-2xl border border-neutral-200 p-5 hover:border-[#0F52BA]">
                  <h2 className="text-lg font-semibold text-neutral-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
