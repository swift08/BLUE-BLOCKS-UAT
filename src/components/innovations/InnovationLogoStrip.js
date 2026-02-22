import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

/**
 * InnovationLogoStrip
 * - Purpose: Logo strip with a single consistent section title + consistent spacing
 * - Backward compatible:
 *   - still accepts sectionTitleClass / sectionClass / logoWrapClass from JSON
 * - Standardized:
 *   - the "text" is rendered as a real section title (bb-section-title)
 *   - remove reliance on Tailwind font sizing in JSON (we ignore sizing intent)
 */
function stripTypographySizing(className = "") {
  // remove common Tailwind typography sizing that breaks global consistency
  return className
    .split(/\s+/)
    .filter(
      (c) =>
        !/^text-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?text-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?font-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?leading-/.test(c)
    )
    .join(" ");
}

export default function InnovationLogoStrip({
  // ✅ Standard prop (token | class | hex)
  sectionBg = "bg-[#F8E5C7]",

  // kept (non-breaking)
  sectionClass = "",
  sectionTitleClass = "",
  logoWrapClass = "flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-10",

  text,
  logos = [],
}) {
  const resolvedSection = resolveBg(sectionBg);

  // allow color/alignment/padding from legacy prop, but strip typography sizing
  const safeTitleExtras = stripTypographySizing(sectionTitleClass);

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          <Container>
            <div className={["flex flex-col", sectionClass].filter(Boolean).join(" ")}>
              {text ? (
                <h2 className={["bb-section-title", safeTitleExtras].filter(Boolean).join(" ")}>
                  {text}
                </h2>
              ) : null}

              {Array.isArray(logos) && logos.length ? (
                <div className={logoWrapClass}>
                  {logos.map((logo, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        src={logo.src}
                        alt={logo.alt || ""}
                        width={Number(logo.width) || 160}
                        height={Number(logo.height) || 60}
                        className="h-auto w-auto max-h-16 object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}