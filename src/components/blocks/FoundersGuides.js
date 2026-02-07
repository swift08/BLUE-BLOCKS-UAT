"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
const BLANK_USER_SVG = (
  <svg viewBox="0 0 96 96" role="img" aria-label="Profile photo">
    <rect width="96" height="96" rx="18" fill="#F1F5E9" />
    <circle cx="48" cy="38" r="16" fill="#CBD5E1" />
    <path d="M20 78c4-14 18-22 28-22s24 8 28 22" fill="#CBD5E1" />
  </svg>
);
export default function FoundersGuides({
  pill,
  title,
  description,
  items = [],
  bg = "bg-[#F3E3CF]",

  layout = {
    type: "grid", // "grid" | "carousel"
    gap: 32,
    cardWidth: 520, // px
    carousel: {
      loop: false,
      align: "start",
      sizingMode: "perView",
      perView: { desktop: 2, tablet: 2, mobile: 1 },
    },
  },
}) {
  const isCarousel = layout?.type === "carousel";
  const gapPx = Number.isFinite(layout?.gap) ? layout.gap : 32;
  return (
    <section className={bg}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="max-w-3xl">
          {pill ? (
            <div className="inline-flex rounded-full bg-[#D9D2F1] px-5 py-2 text-[11px] font-semibold tracking-wide text-[#2C2C6B]">
              {pill}
            </div>
          ) : null}

          <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {description}
            </p>
          ) : null}
        </div>

        {/* Cards */}
        <div className="mt-10">
          {isCarousel ? (
            <FoundersCarousel items={items} layout={layout} gapPx={gapPx} />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {items.map((person, idx) => (
                <FounderCard
                  key={person?.slug || person?.name || idx}
                  {...person}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FoundersCarousel({ items, layout, gapPx }) {
  const carouselCfg = layout?.carousel || {};
  const loop = Boolean(carouselCfg?.loop);
  const align = carouselCfg?.align === "center" ? "center" : "start";
  const sizingMode = carouselCfg?.sizingMode === "auto" ? "auto" : "perView";

  const perView = carouselCfg?.perView || { desktop: 2, tablet: 2, mobile: 1 };
  const perViewNow = useResponsivePerView(perView);

  const cardWidthPx =
    Number.isFinite(layout?.cardWidth) && layout.cardWidth > 0
      ? layout.cardWidth
      : 520;

  // Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  // Slide sizing:
  // - perView: each slide takes fraction of viewport (1 row, N visible)
  // - auto: each slide uses cardWidth from JSON
  const slideStyle =
    sizingMode === "auto"
      ? { flex: `0 0 ${cardWidthPx}px` }
      : { flex: `0 0 ${calcSlideBasis(perViewNow, gapPx)}` };

  return (
    <div className="relative">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        {/* Container */}
        <div
          className="flex"
          style={{
            gap: `${gapPx}px`,
            paddingBottom: "4px",
            willChange: "transform",
          }}
        >
          {items.map((person, idx) => (
            <div
              key={person?.slug || person?.name || idx}
              className="min-w-0"
              style={slideStyle}
            >
              <FounderCard {...person} />
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        {scrollSnaps.length > 1 ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            {scrollSnaps.map((_, i) => {
              const active = i === selectedIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  className="h-2.5 w-2.5 rounded-full border border-slate-400 transition"
                  style={{
                    backgroundColor: active ? "#0f172a" : "transparent",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={active ? "true" : undefined}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function calcSlideBasis(perView, gapPx) {
  const n = Math.max(1, Number(perView) || 1);
  const gapTotal = gapPx * (n - 1);
  // basis = (100% - totalGaps)/n
  return `calc((100% - ${gapTotal}px) / ${n})`;
}

function useResponsivePerView(perView) {
  const get = useCallback(() => {
    if (typeof window === "undefined") return perView?.desktop || 2;
    const w = window.innerWidth;

    if (w >= 1024) return perView?.desktop ?? 2;
    if (w >= 640) return perView?.tablet ?? 2;
    return perView?.mobile ?? 1;
  }, [perView]);

  const [value, setValue] = useState(get);

  useEffect(() => {
    const onResize = () => setValue(get());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [get]);

  return value;
}

function FounderCard({
  name,
  roleLabel,
  roleColor = "#E08B64",
  roleTextColor = "#ffffff",
  image,
  imageAlt,
  bio,
  tagline, // ✅ NEW
  readMoreHref = "/",
  modal,
}) {
  const hasModal = Boolean(modal);
  return (
    <div className="rounded-[26px] border-2 border-slate-900 bg-white p-6 sm:p-7">
      {/* Image frame */}
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        {image ? (
        <img
          src={image}
          alt={imageAlt || name || "Profile photo"}
          className="h-[280px] w-full object-contain sm:h-[320px]"
          style={{ backgroundColor: "#fff" }}
        />
        ) : (
  <div className="flex h-[280px] w-full items-center justify-center p-6 sm:h-[320px]">
    <div className="h-28 w-28">{BLANK_USER_SVG}</div>
  </div>
)}

        {roleLabel ? (
          <div className="absolute bottom-5 left-5 right-5 flex justify-center">
            <span
              className="inline-flex w-full max-w-[280px] justify-center rounded-lg px-4 py-2 text-xs sm:text-sm font-medium shadow-sm"
              style={{ backgroundColor: roleColor, color: roleTextColor }}
            >
              {roleLabel}
            </span>
          </div>
        ) : null}
      </div>

      {name ? (
        <h3 className="mt-6 text-xl sm:text-2xl font-medium text-blue-600">
          {name}
        </h3>
      ) : null}

      {/* ✅ Tagline (optional) */}
      {tagline ? (
        <p className="mt-1 text-sm sm:text-base font-medium text-slate-900">
          {tagline}
        </p>
      ) : null}

      {bio ? (
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
          {bio}
        </p>
      ) : null}

      <div className="mt-5 flex justify-end">
        {hasModal ? (
          <FounderModalTrigger
            person={{ name, roleLabel, image, imageAlt, bio, tagline }}
            modal={modal}
          />
        ) : (
          <a
            href={readMoreHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Read More <span aria-hidden="true">⌄</span>
          </a>
        )}
      </div>
    </div>
  );
}

function FounderModalTrigger({ person, modal }) {
  const title = modal?.title || person?.name || "Details";
  const content = Array.isArray(modal?.content) ? modal.content : [];
  const social = Array.isArray(modal?.social) ? modal.social : [];

  const safeLinks = useMemo(() => {
    return social
      .filter((l) => l?.href)
      .map((l) => ({
        label: l.label || l.href,
        href: l.href,
        external: /^https?:\/\//.test(l.href),
      }));
  }, [social]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Read More <span aria-hidden="true">⌄</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />

        {/* Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-xl focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-7">
            <div>
              <Dialog.Title className="text-3xl sm:text-4xl font-semibold text-slate-900 main-title">
                {title}
              </Dialog.Title>
              {person?.roleLabel ? (
                <div className="mt-1 text-sm text-slate-600">
                  {person.roleLabel}
                </div>
              ) : null}
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="grid gap-6 px-5 py-5 sm:px-7 sm:py-7 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left */}
            <div className="md:col-span-5">
              {person?.image ? (
                <div className="overflow-hidden rounded-2xl bg-slate-50 border">
                  <img
                    src={person.image}
                    alt={person.imageAlt || person.name || ""}
                    className="h-[320px] w-full object-contain"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
              ) : (
    <div className="flex h-[320px] w-full items-center justify-center p-6">
      <div className="h-28 w-28">{BLANK_USER_SVG}</div>
    </div>
  )}

              {safeLinks.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {safeLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer" : undefined}
                      className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right */}
            <div className="md:col-span-7">
              {person?.name ? (
                <div className="text-xl sm:text-2xl font-semibold text-blue-600">
                  {person.name}
                </div>
              ) : null}

              {person?.tagline ? (
                <div className="mt-1 text-sm sm:text-base font-medium text-slate-900">
                  {person.tagline}
                </div>
              ) : null}

              {person?.bio ? (
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
                  {person.bio}
                </p>
              ) : null}
              {content.length ? (
                <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                  {content.map((item, i) => {
                    if (
                      item &&
                      typeof item === "object" &&
                      (item.label || item.text)
                    ) {
                      return (
                        <p key={i}>
                          {item.label ? <strong>{item.label}:</strong> : null}{" "}
                          {item.text || ""}
                        </p>
                      );
                    }

                    if (typeof item === "string") {
                      return <p key={i}>{item}</p>;
                    }

                    return null;
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-5 py-4 sm:px-7">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
