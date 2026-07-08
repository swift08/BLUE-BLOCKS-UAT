import siteData from "@/data/site";
import { notFound } from "next/navigation";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

function getInnovationMap() {
  return siteData?.pages?.innovationDetail || {};
}

export function generateStaticParams() {
  const map = getInnovationMap();
  return Object.keys(map).map((slug) => ({ slug }));
}

const INNOVATION_META = {
  "innovation-lab": {
    title: "Design & Innovation Lab | Blue Blocks Montessori Hyderabad",
    description: "Our 1,000+ sq ft Maker Space designed for ages 1-18. Practical design thinking, hand tools, digital fabrication, and prototyping with wood, metals, and electronics.",
  },
  "drone-lab": {
    title: "Student Drone Research & Patent Lab | Blue Blocks School",
    description: "The Blue Blocks Drone Lab enables elementary students to prototype, build, and test aerial systems, resulting in five student-filed patent applications.",
  },
  "biomimicry-hive": {
    title: "Biomimicry Hive Research Lab | Blue Blocks Montessori",
    description: "Designed in collaboration with IIT Hyderabad, the Biomimicry Hive is a learning environment where children study nature-inspired engineering and design protocols.",
  },
  "space-lab": {
    title: "Student Space Lab & Satellite Aerospace Payload | Blue Blocks",
    description: "A specialized aerospace lab where students research satellite communication, telemetry, orbital mechanics, and design payloads for active ISRO launches.",
  },
  "cubesat-mission": {
    title: "Project SBB-1 CubeSat Satellite Mission | Blue Blocks School",
    description: "Learn about the IN-SPACe authorized Project SBB-1 CubeSat payload designed by Blue Blocks students, set to fly on ISRO's PSLV-C62 mission.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = INNOVATION_META[slug] || {};
  return {
    title: meta.title || "Innovation Programs | Blue Blocks",
    description: meta.description || "Student-led innovation lab ecosystems at Blue Blocks.",
    alternates: {
      canonical: `https://blueblocks.in/innovation/${slug}/`,
    },
  };
}

export default async function InnovationDetailPage({ params }) {
  const { slug } = await params;
  const map = getInnovationMap();

  const page = map?.[slug];
  if (!page) notFound();

  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId={`innovation-${slug}`} schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

