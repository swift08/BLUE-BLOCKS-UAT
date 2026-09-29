import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Campuses & Infrastructure | Gachibowli & Tellapur | Blue Blocks Montessori",
  description:
    "Explore our biophilic campuses in Gachibowli (toddler and pre-primary Montessori environments) and Tellapur (complete school featuring Cambridge IGCSE, Space Lab, and Micro Research Institute integration).",
  keywords: [
    "Montessori school Gachibowli",
    "best preschool Gachibowli",
    "Montessori Tellapur",
    "international school Tellapur Hyderabad",
    "biophilic school campus Hyderabad",
    "Blue Blocks campuses",
  ],
  alternates: {
    canonical: "https://blueblocks.in/campus/",
    languages: {
      "en-in": "https://blueblocks.in/campus/",
      "x-default": "https://blueblocks.in/campus/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/campus/",
    title: "Campuses & Infrastructure | Gachibowli & Tellapur | Blue Blocks Montessori",
    description:
      "Tour our Gachibowli and Tellapur campuses. Discover custom learning environments, biophilic architecture, octagonal rooms, and student innovation labs.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori School Campuses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campuses & Infrastructure | Gachibowli & Tellapur | Blue Blocks",
    description:
      "Tour Gachibowli and Tellapur campuses — biophilic design, octagonal rooms, and innovation labs.",
  },
};

export default function CampusPage() {
  const page = siteData?.pages?.campus || {};
  const baseSections = Array.isArray(page?.sections) ? page.sections : [];

  const gachibowliSection = {
    type: "imageText",
    props: {
      sectionBg: "bg-[#EEF7FD]",
      title: "Gachibowli Campus — Nurturing Early Childhood Development",
      text: [
        "Our Gachibowli campus is a dedicated sanctuary for infants and early childhood education. Located conveniently for families in the IT corridor (opposite DLF Gachibowli), this campus provides a secure, biophilic environment tailored for children from <strong>15 months to 6 years</strong>.",
        "The campus houses our specialized <a href='/programs/playgroup/montessori-toddler/' class='text-amber-600 hover:text-amber-700 underline font-semibold transition-colors'>Toddler Community</a> (1.5 to 3 years) and the <a href='/programs/nursery-school/' class='text-amber-600 hover:text-amber-700 underline font-semibold transition-colors'>Pre-Primary Montessori Program</a> (3 to 6 years). Here, AMI-certified guides use imported wooden materials to foster concentration, independent coordination, and language acquisition.",
        "As a foundational phase of the Blue Blocks learning continuum, graduates from the Gachibowli preschool transition smoothly to our Tellapur complete school campus to continue their elementary and secondary journeys."
      ],
      imageUrl: "/campus/campus1-min.webp",
      variant: "card",
      cardBg: "#EEF7FD",
      cardRadius: "rounded-2xl",
      cardPadding: "p-8 sm:p-10",
    },
  };

  const gachibowliFaq = {
    type: "faq",
    props: {
      bg: "#FFFFFF",
      title: "Gachibowli Campus FAQ",
      subtitle: "Answers to common questions about our preschool campus.",
      defaultOpenIndex: 0,
      items: [
        {
          q: "What age groups are served at the Gachibowli campus?",
          a: "The Gachibowli campus is designed exclusively for early childhood, accommodating children in our Toddler Community (1.5 to 3 years) and Pre-Primary environment (3 to 6 years)."
        },
        {
          q: "How does the Gachibowli campus prepare children for higher grades?",
          a: "By cultivating deep focus, self-regulation, and order during the first plane of development. Graduates of Gachibowli have direct admission and a seamless academic transition to our primary and secondary school at Tellapur."
        },
        {
          q: "Are the teachers certified?",
          a: "Yes, all environments are directed by guides certified by the Association Montessori Internationale (AMI), ensuring authentic adherence to Montessori principles."
        },
      ],
    },
  };

  const tellapurSection = {
    type: "imageText",
    props: {
      sectionBg: "bg-[#F3E3CF]",
      title: "Tellapur Complete School Campus — The Adolescent Continuum & Innovation Labs",
      text: [
        "Spanning a large, biophilic area in Tellapur, this campus hosts the complete Montessori continuum. It supports children from primary age up through our <a href='/programs/primary-school-elementary/class-1-to-6/' class='text-amber-600 hover:text-amber-700 underline font-semibold transition-colors'>Elementary Class 1 to 6</a> and <a href='/programs/secondary-school/cambridge-igcse-erdkinder/' class='text-amber-600 hover:text-amber-700 underline font-semibold transition-colors'>Secondary Erdkinder Program</a> (Class 7 to 10), culminating in the Cambridge IGCSE examinations.",
        "The Tellapur campus is renowned for its interdisciplinary innovation spaces. It hosts the student-run <strong>Space Program Lab</strong> (which built an ISRO-manifested CubeSat payload), a <strong>Drone Lab</strong> with 5 student patents, and the <strong>Biomimicry Hive</strong>.",
        "All learning environments are closely connected to the <a href='https://mri2.vercel.app/' target='_blank' rel='noopener noreferrer' class='text-amber-600 hover:text-amber-700 underline font-semibold transition-colors'>Blue Blocks Micro Research Institute (MRI)</a>, which coordinates real-world scientific observations and ensures that classroom environments remain psychological sanctuaries for students."
      ],
      imageUrl: "/campus/campus4-min.webp",
      variant: "card",
      cardBg: "#F3E3CF",
      cardRadius: "rounded-2xl",
      cardPadding: "p-8 sm:p-10",
    },
  };

  const tellapurFaq = {
    type: "faq",
    props: {
      bg: "#FFFFFF",
      title: "Tellapur Campus FAQ",
      subtitle: "Answers to common questions about our Tellapur campus.",
      defaultOpenIndex: 0,
      items: [
        {
          q: "What academic pathways are offered at the Tellapur campus?",
          a: "Tellapur offers the complete Montessori continuum from Primary through Elementary (Grades 1 to 6) and Secondary (Grades 7 to 10), integrated with the internationally recognized Cambridge IGCSE syllabus."
        },
        {
          q: "What makes the Tellapur campus layout unique?",
          a: "It features a biophilic design with octagonal classrooms, outdoor erdkinder farm areas, and specialized innovation labs for space sciences, drone technology, and biomimicry."
        },
        {
          q: "How do students participate in the research institute?",
          a: "Through passive, consent-based observations led by the Micro Research Institute (MRI). Students collaborate on real-world projects, research publications, and patent drafting."
        },
      ],
    },
  };

  const hasCampusSupport = baseSections.some(
    (section) => section?.props?.title?.includes("Gachibowli Campus")
  );

  const sections = hasCampusSupport
    ? baseSections
    : [...baseSections, gachibowliSection, gachibowliFaq, tellapurSection, tellapurFaq];

  const infraSection = baseSections.find((section) => section?.type === "hexaInfrastructure");
  const infraItems = Array.isArray(infraSection?.props?.items) ? infraSection.props.items : [];

  const infraFaqEntities = infraItems
    .filter((item) => item?.modal?.title && Array.isArray(item?.modal?.paragraphs))
    .slice(0, 6)
    .map((item) => ({
      "@type": "Question",
      name: item.modal.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.modal.paragraphs.join(" "),
      },
    }));

  const schema = [
    ...(Array.isArray(page?.schema) ? page.schema : []),
    ...(infraFaqEntities.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: infraFaqEntities,
          },
        ]
      : []),
  ];

  return (
    <>
      <PageJsonLd baseId="campus" schema={schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}
