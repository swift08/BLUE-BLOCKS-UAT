"use client";

import Hero from "@/components/video-catalog/Hero";
import Chapter from "@/components/video-catalog/Chapter";
import CTASection from "@/components/video-catalog/CTASection";
import ScrollProgress from "@/components/video-catalog/ScrollProgress";
import MemoryTrail from "@/components/video-catalog/MemoryTrail";
import GrowthBlocks from "@/components/video-catalog/GrowthBlocks";
import {
  CATALOG_CHAPTERS,
  CATALOG_SECTIONS,
  CATALOG_HERO_YOUTUBE_ID,
  CATALOG_CTA_YOUTUBE_ID,
} from "@/data/video-catalog";

export default function VideoCatalogExperience({ phone }) {
  return (
    <div className="video-catalog relative">
      <ScrollProgress chapters={CATALOG_CHAPTERS} />
      <MemoryTrail />
      <GrowthBlocks />
      <Hero youtubeId={CATALOG_HERO_YOUTUBE_ID} />

      <section id="journey" className="relative pt-24 pb-8 text-center">
        <div className="container relative mx-auto max-w-4xl px-6">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-sky-blue/40" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-sky-blue/80">
              Videos Begin
            </span>
            <div className="h-px w-8 bg-sky-blue/40" />
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight text-white md:text-6xl">
            The Journey
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-vc-foreground/70 md:text-xl">
            Every step of a child&apos;s time at Blue Blocks, from the first day in a Toddler room to
            the last year of the Erdkinder program.
          </p>
        </div>
      </section>

      {CATALOG_SECTIONS.map((section) => (
        <Chapter key={section.id} {...section} />
      ))}

      <CTASection youtubeId={CATALOG_CTA_YOUTUBE_ID} phone={phone} />
    </div>
  );
}
