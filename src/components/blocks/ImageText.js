import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";

export default function ImageText({
  // ✅ standard new prop names (but we support old ones too)
  sectionBg = "white",       // token ("sand") OR class ("bg-sand") OR hex ("#F3E3CF")
  wrapBg = "",               // same formats as above (for inner wrapper)

  // ✅ backward compatibility (old props)
  bgClass = "",              // if someone still passes bgClass="bg-white"
  SecBg = "",                // if someone still passes SecBg="bg-[#F3E3CF]"

  title,
  subtitle,
  text = [],
  imageUrl = "",

  variant = "default", // "default" | "card"
  cardBg = "#EEF7FD",  // kept for backward compatibility
  cardRadius = "rounded-2xl",
  cardPadding = "p-8 sm:p-10",

  imageSide = "left",
  imageClassName = "",
  imageFit = "contain",
  imageAspect = "aspect-[16/10]",

  titleClassName = "",
  subtitleClassName = "",
  textClassName = "",
  contentCenter = false,
}) {
  const hasImage = Boolean(imageUrl);
  const isCard = variant === "card";

  // ✅ Background resolution (safe for old + new)
  // precedence: old props override new ones to avoid breaking existing pages
  const resolvedSection = resolveBg(bgClass || sectionBg);
  const resolvedWrap = resolveBg(SecBg || wrapBg);

  const gridColsClass = hasImage ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
  const contentAlignClass = contentCenter ? "text-center" : "";

  const imageOrderClass = hasImage && imageSide === "right" ? "md:order-2" : "";
  const contentOrderClass = hasImage && imageSide === "right" ? "md:order-1" : "";

  const imgOuterClass = isCard
    ? `overflow-hidden ${imageClassName || "rounded-2xl"}`
    : `rounded-2xl overflow-hidden bg-slate-100 border ${imageClassName || ""}`;

  const imgInnerClass = isCard
    ? `${imageAspect} relative`
    : "aspect-[16/10] flex items-center justify-center text-sm text-slate-500";

  const imgFitClass = imageFit === "cover" ? "object-cover" : "object-contain";

  // ✅ Typography is now controlled by LESS via bb-* classes
  const finalTitleClass = titleClassName || "bb-section-title whitespace-pre-line";
  const finalSubtitleClass = subtitleClassName || "bb-subtitle whitespace-pre-line mt-3";
  const finalTextWrapClass = textClassName || "bb-text mt-4 space-y-3";

  // ✅ inner wrapper classes
  const innerClass = isCard
    ? [cardRadius, cardPadding].join(" ")
    : resolvedWrap.className; // token/class background on wrapper when default

  // ✅ inner wrapper inline background when default
  const innerStyle = isCard
    ? { backgroundColor: cardBg } // old behavior preserved
    : resolvedWrap.style;

  return (
    <section
      className={["bb-ui", "bb-section", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <Container className="bb-section__inner">
        <div
          className={[
            "grid",
            gridColsClass,
            "gap-8 items-center",
            contentAlignClass,
            innerClass,
          ].filter(Boolean).join(" ")}
          style={innerStyle}
        >
          {hasImage ? (
            <div className={`${imgOuterClass} ${imageOrderClass}`.trim()}>
              <div className={imgInnerClass}>
                {isCard ? (
                  <Image
                    src={imageUrl}
                    alt={title || ""}
                    fill
                    className={imgFitClass}
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt={title || ""}
                    width={815}
                    height={555}
                    className={imgFitClass}
                  />
                )}
              </div>
            </div>
          ) : null}

          <div className={contentOrderClass}>
            {title ? <h2 className={finalTitleClass}>{title}</h2> : null}
            {subtitle ? <h3 className={finalSubtitleClass}>{subtitle}</h3> : null}

            {Array.isArray(text) && text.length ? (
              <div className={finalTextWrapClass}>
                {text.map((p, idx) =>
                  typeof p === "string" ? (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                  ) : null
                )}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}