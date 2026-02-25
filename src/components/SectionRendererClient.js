"use client";

import dynamic from "next/dynamic";

const SectionRenderer = dynamic(() => import("@/lib/sectionRenderer"), {
  ssr: false,
});

export default function SectionRendererClient({ sections }) {
  return <SectionRenderer sections={Array.isArray(sections) ? sections : []} />;
}