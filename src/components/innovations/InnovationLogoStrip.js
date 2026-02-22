import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
/**
 * Background resolver:
 * Accepts:
 * - "bg-sand" / "bg-white" / "bg-[#F8E5C7]" (class)
 * - "sand" / "iceSoft" (token -> bg-sand)
 * - "#F8E5C7" (hex -> inline style)
 */

export default function InnovationLogoStrip({
  // ✅ Standard prop
  sectionBg = "bg-[#F8E5C7]",

  // Keep customization props you already use (non-breaking)
  sectionClass = "flex flex-col sm:flex-row items-center gap-6 sm:gap-8",
  sectionTitleClass = "", // if empty, we use bb-text default
  logoWrapClass = "flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16",

  text,
  logos = [],
}) {
  const resolvedSection = resolveBg(sectionBg);

  const finalTextClass =
    sectionTitleClass ||
    "bb-text max-w-3xl text-[#4F4F4F]"; // keep your intended color, but typography from bb-text

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          {/* Container kept for your layout system; remove extra vertical padding */}
          <Container className={`py-0 ${sectionClass}`}>
            {/* Text section */}
            {text ? (
              <div className={finalTextClass}>
                <p>{text}</p>
              </div>
            ) : null}

            {/* Logos */}
            <div className={logoWrapClass}>
              {logos.map((l, idx) => (
                <div
                  key={idx}
                  className="relative w-[100px] sm:w-[120px] opacity-90 flex justify-center items-center"
                >
                  <Image
                    src={l.src}
                    alt={l.alt || l.name || ""}
                    width={Number(l.width) || 120}
                    height={Number(l.height) || 80}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}