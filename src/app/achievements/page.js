import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Achievements | Blue Blocks Montessori",
  description:
    "Student patents, the IN-SPACe CubeSat mission, and the Dream Teachers agentic AI project at Blue Blocks.",
  alternates: { canonical: "https://blueblocks.in/achievements/" },
};

const STORIES = [
  {
    title: "Five utility patents",
    image: "/achievements/patents.webp",
    text: "Elementary students filed five utility patents for their own inventions. The work came out of the drone lab, not a competition brief.",
    href: "/innovation/drone-lab/",
  },
  {
    title: "CubeSat, authorised by IN-SPACe",
    image: "/achievements/sbb1.webp",
    text: "Adolescents designed the SBB-1 payload. IN-SPACe authorised it for an ISRO launch, and the same cohort now mentors SBB-2.",
    href: "/innovation/space-lab/",
  },
  {
    title: "Dream Teachers, agentic AI",
    image: "/achievements/world-stage.webp",
    text: "Twelve adolescents built personalised AI tutors. A preprint followed in May 2026, with the dataset on Harvard Dataverse.",
    href: "https://research.blueblocks.in/publications/dream-teachers/",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://blueblocks.in/achievements/#webpage",
    url: "https://blueblocks.in/achievements/",
    name: "Achievements",
    description:
      "Student patents, the IN-SPACe CubeSat mission, and the Dream Teachers agentic AI project at Blue Blocks.",
    inLanguage: "en-IN",
    isPartOf: { "@id": "https://blueblocks.in/#website" },
    about: { "@id": "https://blueblocks.in/#organization" },
    breadcrumb: { "@id": "https://blueblocks.in/achievements/#breadcrumb" },
    mainEntity: { "@id": "https://blueblocks.in/achievements/#stories" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://blueblocks.in/achievements/#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blueblocks.in/" },
      { "@type": "ListItem", position: 2, name: "Achievements", item: "https://blueblocks.in/achievements/" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://blueblocks.in/achievements/#stories",
    name: "Student achievement stories",
    itemListElement: STORIES.map((story, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: story.title,
        description: story.text,
        url: story.href.startsWith("http") ? story.href : `https://blueblocks.in${story.href}`,
        about: { "@id": "https://blueblocks.in/#organization" },
      },
    })),
  },
];

export default function AchievementsPage() {
  return (
    <>
      <PageJsonLd baseId="achievements" schema={schema} />
      <PageHero
        title="Achievements"
        subtitle="Patents, a CubeSat, and agentic AI — work students finished, not posters of work they might do."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Achievements" }]}
        bg={{ base: "#F3E3CF", leftArc: "/ui/arc-left.webp", rightArc: "/ui/arc-right.webp" }}
      />
      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {STORIES.map((story) => (
              <article key={story.title} className="overflow-hidden rounded-2xl border border-neutral-200">
                <img src={story.image} alt="" className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-neutral-900">{story.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{story.text}</p>
                  <Link href={story.href} className="mt-4 inline-block text-sm font-semibold text-[#0F52BA]">
                    Read the story
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
