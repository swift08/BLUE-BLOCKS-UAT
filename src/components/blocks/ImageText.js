import Container from "@/components/layout/Container";
import Image from "next/image";

export default function ImageText({
  // existing
  bgClass = "bg-white",
  SecBg = "",
  title,
  subtitle,
  text = [],
  imageUrl = "",

  variant = "default", // "default" | "card"
  cardBg = "#EEF7FD",
  cardRadius = "rounded-2xl",
  cardPadding = "p-8 sm:p-10",
  imageSide = "left", // "left" | "right"
  imageClassName = "",
  imageFit = "contain", // "contain" | "cover"
  imageAspect = "aspect-[16/10]",
  titleClassName = "",
  textClassName = "",
  contentCenter = false
}) {
  const hasImage = Boolean(imageUrl);
  const contentClass = contentCenter ? "text-center" : ""
  const gridColsClass = hasImage ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-1";

  const isCard = variant === "card";

  const wrapClass = isCard
    ? `${cardRadius} ${cardPadding}`
    : SecBg; // keep old behavior: SecBg stays on grid wrapper

  const wrapStyle = isCard ? { backgroundColor: cardBg } : undefined;

  const imageOrderClass =
    hasImage && imageSide === "right"
      ? "md:order-2"
      : "";

  const contentOrderClass =
    hasImage && imageSide === "right"
      ? "md:order-1"
      : "";

  const imgOuterClass = isCard
    ? `overflow-hidden ${imageClassName || "rounded-2xl"}`
    : "rounded-2xl overflow-hidden bg-slate-100 border";

  const imgInnerClass = isCard
    ? `${imageAspect} relative`
    : "aspect-[16/10] flex items-center justify-center text-sm text-slate-500";

  const imgFitClass = imageFit === "cover" ? "object-cover" : "object-contain";

  const finalTitleClass = titleClassName
    ? titleClassName
    : isCard
      ? "text-4xl sm:text-5xl font-medium text-[#131313] whitespace-pre-line"
      : "text-4xl sm:text-5xl font-semibold whitespace-pre-line";

  const finalTextWrapClass = textClassName
    ? textClassName
    : isCard
      ? "mt-4 space-y-3 text-slate-600 leading-relaxed text-[0.95rem]"
      : `${title ? "mt-4" : "p-5"} space-y-3 text-slate-700 leading-relaxed`;

  return (
    <section className={bgClass}>
      <Container className="py-12">
        <div
          className={[
            "grid",
            contentClass,
            gridColsClass,
            "gap-8 items-center",
            wrapClass,
          ].join(" ")}
          style={wrapStyle}
        >
          {hasImage ? (
            <div className={`${imgOuterClass} ${imageOrderClass}`}>
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
            {subtitle ? <h3 className="text-[1.2rem] sm:text-3xl whitespace-pre-line mt-3">{subtitle}</h3> : null}

            {Array.isArray(text) && text.length ? (
              <div className={finalTextWrapClass}>
                {text.map((p, idx) =>
                  typeof p === "string" ? (
                    <p
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
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
