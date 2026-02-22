"use client";

import Container from "@/components/layout/Container";
import Link from "next/link";
import { resolveBg } from "@/lib/ui";

export default function Hero({
  title,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  bgImageUrl,

  // new standardized background support (optional)
  sectionBg = "",

  align = "left", // "left" | "center"
  height = "default", // "default" | "innovation"
  overlay = "default", // "default" | "dark"
  showArcs = false,
  topSpacing = "default", // "default" | "home"
  className = "",
}) {
  const resolvedBg = resolveBg(sectionBg);

  const bgStyle = bgImageUrl
    ? { backgroundImage: `url(${bgImageUrl})` }
    : undefined;

  const minH =
    height === "innovation"
      ? "min-h-[20rem] sm:min-h-[20rem] lg:min-h-[25rem]"
      : "min-h-[20rem] md:min-h-[25rem]";

  const overlayClass = overlay === "dark" ? "before:bg-black/45" : "before:bg-black/55";

  const contentAlign =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  const wrapWidth = align === "center" ? "max-w-[60rem]" : "max-w-2xl";

  const paddingTop =
    topSpacing === "home" ? "pt-[8.75rem] sm:pt-[9.5rem]" : "pt-44 sm:pt-48";

  return (
    <section
      style={{ ...(resolvedBg.style || {}), ...(bgStyle || {}) }}
      className={[
        "bb-ui",
        "relative bg-cover bg-center text-white",
        resolvedBg.className,
        minH,
        "z-[1]",
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
        overlayClass,
        paddingTop,
        className,
      ].filter(Boolean).join(" ")}
    >
      {showArcs ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 bottom-0 h-[72%] w-[46%] rounded-tl-[999px] bg-sky-300/60" />
          <div className="absolute right-0 bottom-0 h-[64%] w-[40%] rounded-tl-[999px] bg-rose-300/55" />
          <div className="absolute right-0 bottom-0 h-[56%] w-[34%] rounded-tl-[999px] bg-amber-200/55" />
        </div>
      ) : null}

      <Container
        className={[
          "relative",
          minH,
          "flex items-center",
          align === "center" ? "justify-center" : "",
        ].join(" ")}
      >
        <div className={[wrapWidth, "flex flex-col", contentAlign].join(" ")}>
          <h1 className={align === "center" ? "bb-hero-title bb-hero-title--center" : "bb-hero-title"}>
            {renderMultiline(title)}
          </h1>

          {subtitle ? (
            <p className={align === "center" ? "bb-hero-subtitle bb-hero-subtitle--center" : "bb-hero-subtitle"}>
              {subtitle}
            </p>
          ) : null}

          {note ? <p className="bb-hero-note">{note}</p> : null}

          <div
            className={[
              "mt-7 flex gap-3",
              align === "center" ? "flex-col sm:flex-row justify-center" : "flex-col sm:flex-row",
            ].join(" ")}
          >
            {primaryCta ? (
              <Link href={primaryCta.href} className="bb-hero-cta bb-hero-cta--primary">
                {primaryCta.label}
              </Link>
            ) : null}

            {secondaryCta ? (
              <Link href={secondaryCta.href} className="bb-hero-cta bb-hero-cta--secondary">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function renderMultiline(text) {
  if (!text) return null;
  return String(text)
    .split("\n")
    .map((line, idx) => (
      <span key={idx} className="block">
        {line}
      </span>
    ));
}