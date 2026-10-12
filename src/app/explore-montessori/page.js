import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Explore Montessori | Blue Blocks",
  description: "A Year of Learning. Open to Everyone.",
  alternates: { canonical: "https://blueblocks.in/explore-montessori/" },
};

const EDITIONS = [
  {
    href: "/explore-montessori/2026/",
    title: "2026 — Biomimicry Park",
    theme: "Theme: Biophilia & Biomimicry",
  },
  {
    href: "/explore-montessori/2025/",
    title: "2025 — Innovision 2050",
    theme: "Theme: Innovative Vision for 2050",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://blueblocks.in/explore-montessori/#webpage",
    url: "https://blueblocks.in/explore-montessori/",
    name: "Explore Montessori",
    description: "A Year of Learning. Open to Everyone.",
    inLanguage: "en-IN",
    isPartOf: { "@id": "https://blueblocks.in/#website" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blueblocks.in/" },
      { "@type": "ListItem", position: 2, name: "Explore Montessori", item: "https://blueblocks.in/explore-montessori/" },
    ],
  },
];

export default function ExploreMontessoriPage() {
  return (
    <>
      <PageJsonLd baseId="explore-montessori" schema={schema} />
      <PageHero
        title="Explore Montessori"
        subtitle="A Year of Learning. Open to Everyone."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Explore Montessori" }]}
        bg={{ base: "#F3E3CF", leftArc: "/ui/arc-left.webp", rightArc: "/ui/arc-right.webp" }}
      />
      <section className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-slate-700 sm:text-base">
            <div className="space-y-4">
              <p>
                Explore Montessori is Blue Blocks&apos; annual event, a moment when the learning and exploration of an entire academic year becomes something everyone can experience.
              </p>
              <p>
                Each year, students and Montessori Guides follow a central theme through observation, questions, research, and hands-on work. Explore Montessori brings these investigations together, opening them to parents, educators, researchers, students, and anyone curious enough to walk in.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-slate-900">What to Expect</h2>
              <p>
                This is not a school exhibition. It is a year&apos;s worth of genuine inquiry made visible and accessible.
              </p>
              <p>
                The work on display was not made for the event. It was made through the year, observed, questioned, researched, built. The event is simply where it meets the world.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-slate-900">Who Should Attend</h2>
              <p>Explore Montessori is open to everyone.</p>
              <p>
                Scientists, researchers, educators, designers, parents, students, and the wider community will each find different ways to engage. Whether you are drawn to nature, education, research, or are simply curious about how Blue Blocks works, there is something here for you.
              </p>
              <p>Entry is free. External visitors are requested to register in advance.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-slate-900">Editions</h2>
              <p>(One card per year, newest first)</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {EDITIONS.map((edition) => (
                  <li key={edition.href}>
                    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 p-5">
                      <h3 className="text-lg font-semibold text-slate-900">{edition.title}</h3>
                      <p className="mt-2 text-slate-600">{edition.theme}</p>
                      <Link href={edition.href} className="mt-4 text-sm font-semibold text-[#0F52BA]">
                        Explore →
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#273C75] py-14 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg sm:text-xl">Every child here started with a question.</p>
            <p className="mt-2 text-lg sm:text-xl">Come in and see where it led.</p>
            <Link
              href="/explore-montessori/2026/"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0F52BA]"
            >
              See This Year&apos;s Edition →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
