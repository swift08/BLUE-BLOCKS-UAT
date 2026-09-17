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

      <section id="journey" className="relative px-1 pt-14 pb-6 text-center sm:pt-20 sm:pb-8 md:pt-24">
        <div className="container relative mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl md:text-6xl">
            The Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-vc-foreground/70 sm:mt-6 sm:text-lg md:text-xl">
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
