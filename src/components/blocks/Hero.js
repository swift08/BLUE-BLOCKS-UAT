"use client";

import Container from "@/components/layout/Container";
import Link from "next/link";

export default function Hero({
  title,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  bgImageUrl,

  /**
   * ✅ NEW (optional) props for reuse across pages
   * Keeps old behavior as default
   */
  align = "left", // "left" | "center"
  height = "default", // "default" | "innovation"
  overlay = "default", // "default" | "dark"
  showArcs = false, // only for Innovation-like hero
  topSpacing = "default", // "default" | "home"
  className = "",
}) {
  const bgStyle = bgImageUrl
    ? { backgroundImage: `url(${bgImageUrl})` }
    : {
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), radial-gradient(circle at 30% 30%, rgba(255,255,255,.12), transparent 55%)",
      };

  const minH =
    height === "innovation"
      ? "min-h-[20rem] sm:min-h-[20rem] lg:min-h-[25rem]" // ~801px on lg (matches figma)
      : "min-h-[20rem] md:min-h-[25rem]"; // your current feel

  const overlayClass = overlay === "dark" ? "before:bg-black/45" : "before:bg-black/55";

  const contentAlign =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  const wrapWidth = align === "center" ? "max-w-[60rem]" : "max-w-2xl";

  const paddingTop =  topSpacing === "home"
    ? "pt-[8.75rem] sm:pt-[9.5rem]" // ≈ pt-35, header overlay safe
    : "pt-44 sm:pt-48";

  return (
    <section
      style={bgStyle}
      className={[
        "relative bg-cover bg-center text-white",
        minH,
        "z-[1]",
        // overlay (no layout shift)
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
        overlayClass,
        paddingTop,
        className,
      ].join(" ")}
    >
      {/* Optional arcs for Innovation (pure tailwind, no extra assets) */}
      {showArcs ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 bottom-0 h-[72%] w-[46%] rounded-tl-[999px] bg-sky-300/60" />
          <div className="absolute right-0 bottom-0 h-[64%] w-[40%] rounded-tl-[999px] bg-rose-300/55" />
          <div className="absolute right-0 bottom-0 h-[56%] w-[34%] rounded-tl-[999px] bg-amber-200/55" />
        </div>
      ) : null}

      <Container
        // keep container behavior; hero is full-bleed anyway
        className={["relative", minH, "flex items-center", align === "center" ? "justify-center" : ""].join(
          " "
        )}
      >
        <div className={[wrapWidth, "flex flex-col", contentAlign].join(" ")}>
          <h1
            className={[
              // typography: keep your old sizes but allow centered large hero
              align === "center"
                ? "font-light tracking-tight text-[2.125rem] leading-[1.15] sm:text-[3rem] sm:leading-[1.1] lg:text-[4rem]"
                : "text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide",
            ].join(" ")}
          >
            {renderMultiline(title)}
          </h1>

          {subtitle ? (
            <p
              className={[
                "mt-4 text-white/85",
                align === "center"
                  ? "max-w-[46rem] text-[0.95rem] leading-6 sm:text-[1.0625rem] sm:leading-7"
                  : "text-sm sm:text-base",
              ].join(" ")}
            >
              {subtitle}
            </p>
          ) : null}

          {note ? <p className="mt-1 text-xs sm:text-sm text-white/70">{note}</p> : null}

          <div
            className={[
              "mt-7 flex gap-3",
              align === "center" ? "flex-col sm:flex-row justify-center" : "flex-col sm:flex-row",
            ].join(" ")}
          >
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className={[
                  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm transition",
                  // keep your existing style for primary
                  "bg-white/10 border border-white/30 hover:bg-white/15",
                ].join(" ")}
              >
                {primaryCta.label}
              </Link>
            ) : null}

            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={[
                  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition",
                  "bg-blue-600 hover:bg-blue-700",
                ].join(" ")}
              >
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
