import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

export default function CtaBanner({
  title,
  text,
  cta,
  image,

  // OLD prop kept (but normalized to global classes)
  titlefont = "text-2xl sm:text-3xl font-semibold",

  align = "left", // "left" | "center"
  theme = "dark", // "dark" | "light"
  imageAlt,
  imageHeight,
  imageWidth,
  imagePositionTopRight = "sm:-right-6 sm:-top-98",
  customTopSpacing,
  imagePosition = "right",

  // NEW
  sectionBg = "bg-white",
}) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  const resolved = resolveBg(sectionBg);

  const normalizedTitleClass = normalizeTitleFont(titlefont);

  return (
    <section
      className={[
        "bb-ui",
        "bb-section",
        resolved.className,
        customTopSpacing,
        "relative",
      ].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner" paddingClassName="px-0 sm:px-4">
        <div className={["bb-cta", isDark ? "bb-cta--dark" : "bb-cta--light"].join(" ")}>
          <div
            className={[
              "bb-cta__inner",
              isCenter
                ? "flex flex-col items-center text-center"
                : "flex flex-col md:flex-row md:items-center md:justify-between gap-8",
            ].join(" ")}
          >
            {/* TEXT */}
            <div className={isCenter ? "max-w-2xl" : "max-w-xl"}>
              {title ? (
                <h3 className={[normalizedTitleClass, "whitespace-pre-line"].join(" ")}>
                  {title}
                </h3>
              ) : null}

              {text ? <p className="bb-cta__text mt-2">{text}</p> : null}

              {cta ? (
                <Link
                  href={cta.href}
                  className={["bb-btn", isDark ? "bb-btn--inverse" : "bb-btn--primary", "mt-6"].join(" ")}
                >
                  {cta.label} <span className="ml-2" aria-hidden>→</span>
                </Link>
              ) : null}
            </div>

            {/* PLACEHOLDER FOR IMAGE (to reserve space in flex layout) */}
            {image && !isCenter ? (
              <div className="hidden md:block w-[30%] shrink-0" aria-hidden="true" />
            ) : null}
          </div>

          {/* ACTUAL IMAGE (absolutely positioned relative to .bb-cta, bottom-aligned and clipped) */}
          {image && !isCenter ? (
            <div
              className="absolute bottom-0 right-0 overflow-hidden pointer-events-none hidden md:block rounded-br-[1.5rem]"
              style={{
                top: "-300px", // Allow top to overflow
                width: "340px", // Reduced from 420px
                maxWidth: "30%", // Reduced from 35%
              }}
            >
              <Image
                src={image}
                alt={imageAlt || ""}
                width={Number(imageWidth) || 566}
                height={Number(imageHeight) || 506}
                style={{ width: "100%", height: "auto" }}
                className="absolute bottom-0 right-0 object-contain object-bottom"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/**
 * Converts legacy Tailwind titlefont strings into bb-ui title classes,
 * so we don't ship inline font sizing all over the codebase.
 */
function normalizeTitleFont(value) {
  if (!value) return "bb-cta-title";
  if (String(value).startsWith("bb-")) return value;

  const v = String(value);

  // simple mapping for common legacy patterns
  if (v.includes("text-3xl") || v.includes("sm:text-3xl")) return "bb-cta-title bb-cta-title--lg";
  if (v.includes("text-2xl") || v.includes("sm:text-2xl")) return "bb-cta-title";

  return "bb-cta-title";
}
