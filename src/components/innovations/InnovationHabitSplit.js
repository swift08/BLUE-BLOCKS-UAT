"use client";

import Image from "next/image";
import { useMemo } from "react";
import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";
import Link from "next/link";

/**
 * Background resolver:
 * Accepts:
 * - "bg-sand" / "bg-white" / "bg-[#EEF7FD]" (class)
 * - "sand" / "iceSoft" (token -> bg-sand)
 * - "#FFFFFF" (hex -> inline style)
 */
function resolveSectionBg(value) {
  if (!value) return { className: "", style: undefined };

  if (typeof value === "string" && value.includes("bg-")) {
    return { className: value, style: undefined };
  }

  if (typeof value === "string" && value.trim().startsWith("#")) {
    return { className: "", style: { backgroundColor: value.trim() } };
  }

  if (typeof value === "string") {
    return { className: `bg-${value}`, style: undefined };
  }

  return { className: "", style: undefined };
}

export default function InnovationHabitSplit({
  image,
  eyebrow,
  title,
  description,

  // ✅ Standard (NEW)
  sectionBg = "bg-white",

  // ✅ Backward compatibility (OLD)
  bg = "",

  subdescription = [],
  className,

  bullets = [],
  images = [],

  details = [],
  detailsClassName = "",
  detailsLabelClassName = "text-[1.3rem] tracking-[0.12em] uppercase text-[#9A9A9A]",
  detailsValueClassName = "text-[1.3rem] sm:text-[1.3rem] font-semibold text-[#1B1B1B]",
  detailsDividerClassName = "border-black/10",

  // keep existing but default to bb-text color
  descriptionClassName = "",
}) {
  const safeItems = useMemo(() => (images || []).filter(Boolean), [images]);
  const total = safeItems.length;
  const hasDetails = Array.isArray(details) && details.length > 0;

  // Prefer standardized prop, fallback to old
  const resolvedSection = resolveSectionBg(sectionBg || bg);

  // Typography defaults (centralized)
  const finalDescriptionClassName =
    descriptionClassName || "bb-text";

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          {/* Keep Container, but do not add extra vertical padding (bb-section handles it) */}
          <Container className="py-0">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left Side: Carousel */}
              <div className="lg:col-span-6 relative">
                <div
                  aria-hidden
                  className="absolute top-0 left-0 -translate-x-[1%] translate-y-[1%] w-[100%] h-full rotate-[-0deg] rounded-[28px] bg-[#FFDBAE] border border-black/20"
                />

                <div className="relative">
                  <CarouselTrack
                    total={total}
                    initialIndex={0}
                    swipeThreshold={60}
                    rubberBand={true}
                    perView={{ base: 1, md: 1, lg: 1 }}
                    gap={0}
                    paddingX={0}
                    arrows={{ show: false }}
                    dots={{
                      show: total > 1,
                      showOn: "both",
                      count: total,
                      className:
                        "mb-4 flex items-center justify-center gap-2 absolute w-full bottom-0",
                      dotClassName: "h-2 w-2",
                      activeClassName: "bg-[#FFFFFF]/100 w-[20]",
                      inactiveClassName: "bg-[#FFFFFF]/30",
                      focusRingClassName: "focus:ring-[#1f3b82]/30",
                    }}
                    className="overflow-hidden"
                  >
                    {safeItems.map((card, idx) => (
                      <div key={`slide-${idx}`} className="w-full shrink-0 px-2 flex">
                        <ImageCard {...card} />
                      </div>
                    ))}
                  </CarouselTrack>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="lg:col-span-6">
                {eyebrow ? (
                  <div className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                    {eyebrow}
                  </div>
                ) : null}

                {title ? (
                  <h2 className="bb-section-title mt-2">
                    {title}
                  </h2>
                ) : null}

                {description ? (
                  <div className={finalDescriptionClassName}>
                    <p>{description}</p>
                  </div>
                ) : null}

                {Array.isArray(subdescription) && subdescription.length ? (
                  <div className={finalDescriptionClassName}>
                    {subdescription.map((p, idx) =>
                      typeof p === "string" ? (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                      ) : null
                    )}
                  </div>
                ) : null}

                {/* Details rows */}
                {hasDetails ? (
                  <div className={`mt-8 ${detailsClassName}`}>
                    <div className="divide-y" style={{ borderColor: "transparent" }}>
                      {details.map((row, idx) => (
                        <div
                          key={`${row?.label || "row"}-${idx}`}
                          className={[
                            "grid items-center gap-6 py-4 border-b",
                            "grid-cols-1 sm:grid-cols-[300px_1fr]",
                            detailsDividerClassName,
                          ].join(" ")}
                        >
                          <div className={detailsLabelClassName}>{row?.label}</div>
                          <div className={detailsValueClassName}>
                            {row?.href ? <Link href={row.href}>{row.value}</Link> : row?.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Bullets */}
                {bullets?.length ? (
                  <div className="mt-5 space-y-6">
                    {bullets.map((b, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        {b.icon ? (
                          <span className="mt-1 inline-flex flex-shrink-0 items-center justify-center">
                            <Image
                              src={b.icon}
                              alt={b.title || ""}
                              width={52}
                              height={52}
                              className="object-contain"
                            />
                          </span>
                        ) : null}

                        <div className={`${className || ""}`}>
                          <div className="text-[1.2rem] text-[#1B1B1B]">
                            {b.title}
                          </div>
                          {b.text ? (
                            <div className="mt-1 text-[1.2rem] text-[#1B1B1B]/50 leading-relaxed">
                              {b.text}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function ImageCard({ icon }) {
  return (
    <div className="relative h-[420px] sm:h-[680px] w-full rounded-[28px] overflow-hidden border border-black/20 bg-white">
      {icon ? (
        <Image
          src={icon}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 680px"
          priority={false}
        />
      ) : null}
    </div>
  );
}