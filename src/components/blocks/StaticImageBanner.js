import Image from "next/image";
import Container from "@/components/layout/Container";

/**
 * SimpleImageSection — static image banner with CLS-safe layout.
 *
 * CLS Fix: Instead of a fixed pixel height (which causes layout shift on mobile
 * before CSS loads), we use a padding-based aspect-ratio wrapper. This reserves
 * the correct space at paint time, guaranteeing zero layout shift.
 *
 * The `aspectRatio` prop (e.g. "16/9", "4/3") controls the reserved space.
 * Legacy `height` prop is kept for backward compat but only used as a max-height.
 */
export default function SimpleImageSection({
  bg = "transparent",
  sectionClassName = "",
  containerClassName = "",

  // image
  image = { src: "", alt: "" },
  height = 720,           // max-height cap in px (fallback)
  aspectRatio = "16/9",   // CLS-safe intrinsic aspect ratio
  objectFit = "cover",    // "cover" | "contain"

  // if true: image is full-bleed (edge-to-edge) without causing horizontal scroll
  fullBleed = false,

  // text (optional)
  title,
  subtitle,

  // overlay (optional)
  overlayText = false,
  overlay = { show: false, color: "#000000", opacity: 0.25 },
  textAlign = "center", // "left" | "center" | "right"
}) {
  const align =
    textAlign === "left"
      ? "items-start text-left"
      : textAlign === "right"
      ? "items-end text-right"
      : "items-center text-center";

  // CLS-safe wrapper: padding-top reserves intrinsic space before image loads
  const [w, h] = aspectRatio.split("/").map(Number);
  const paddingPct = h && w ? `${((h / w) * 100).toFixed(4)}%` : "56.25%";

  const ImageBlock = (
    <div
      className="relative overflow-hidden w-full"
      style={{ paddingTop: paddingPct, maxHeight: `${height}px` }}
    >
      <div className="absolute inset-0">
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt || ""}
            fill
            className={objectFit === "contain" ? "object-contain" : "object-cover"}
            sizes="100vw"
            loading="lazy"
          />
        ) : null}

        {overlay?.show ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlay.color || "#000",
              opacity: typeof overlay.opacity === "number" ? overlay.opacity : 0.25,
            }}
          />
        ) : null}

        {overlayText && (title || subtitle) ? (
          <div className={`absolute inset-0 flex ${align} justify-center p-6`}>
            <div className="max-w-3xl">
              {title ? (
                <h2 className="text-2xl sm:text-4xl font-medium text-white">
                  {title}
                </h2>
              ) : null}
              {subtitle ? (
                <p className="mt-3 text-sm sm:text-base text-white/85">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <section className={sectionClassName} style={{ backgroundColor: bg }}>
      {fullBleed ? (
        <>
          {ImageBlock}
          {!overlayText && (title || subtitle) ? (
            <Container className={containerClassName}>
              <div className={`max-w-3xl mx-auto ${align}`}>
                {title ? (
                  <h2 className="text-2xl sm:text-4xl font-medium text-[#131313]">
                    {title}
                  </h2>
                ) : null}
                {subtitle ? (
                  <p className="mt-3 text-sm sm:text-base text-slate-600">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </Container>
          ) : null}
        </>
      ) : (
        <Container className={containerClassName}>
          {ImageBlock}
          {!overlayText && (title || subtitle) ? (
            <div className={`mt-8 max-w-3xl mx-auto ${align}`}>
              {title ? (
                <h2 className="text-2xl sm:text-4xl font-medium text-[#131313]">
                  {title}
                </h2>
              ) : null}
              {subtitle ? (
                <p className="mt-3 text-sm sm:text-base text-slate-600">
                  {subtitle}
                </p>
              ) : null}
            </div>
          ) : null}
        </Container>
      )}
    </section>
  );
}
