"use client";

import dynamic from "next/dynamic";

const SectionRenderer = dynamic(() => import("@/lib/sectionRenderer"), {
  ssr: false,
});

export default function InnovationSectionsClient({ sections }) {
  const safeSections = Array.isArray(sections) ? sections : [];
  return <SectionRenderer sections={safeSections} />;
}