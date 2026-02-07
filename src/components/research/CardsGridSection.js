import Image from "next/image";
import Container from "@/components/layout/Container";

function splitTitleToTwoLines(title = "") {
  const t = String(title || "").trim();
  const lastSpace = t.lastIndexOf(" ");
  if (lastSpace === -1) return { first: t, second: "" };
  return { first: t.slice(0, lastSpace), second: t.slice(lastSpace + 1) };
}

function toColsClass(cols) {
  switch (cols) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    case 5: return "grid-cols-5";
    case 6: return "grid-cols-6";
    default: return "grid-cols-1";
  }
}

function maxWidthClassToPx(maxWidthClass = "") {
  const token = String(maxWidthClass).split(" ").find((x) => x.startsWith("max-w-"));
  switch (token) {
    case "max-w-2xl": return 672;
    case "max-w-3xl": return 768;
    case "max-w-4xl": return 896;
    case "max-w-5xl": return 1024;
    case "max-w-6xl": return 1152;
    case "max-w-7xl": return 1280;
    default: return null;
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function numOrFallback(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function stripMtClass(className = "") {
  // removes any "mt-*" tokens (keeps everything else)
  return String(className)
    .split(" ")
    .filter((t) => !/^mt-\[.*\]$/.test(t) && !/^mt-\d+$/.test(t))
    .join(" ")
    .trim();
}

export default function CardsGridSection({
  // Section
  bg = "#FBF7F1",
  containerClassName = "",
  sectionClassName = "",
  py = "py-16 sm:py-20",

  // Header
  eyebrow,
  title,
  description,
  subdescription,
  subtitle,
  headerAlign = "center",
  eyebrowBg = "#E7E8FF",
  eyebrowText = "#2C2F8F",

  titleClassName = "text-center text-4xl sm:text-5xl font-semibold text-[#131313] main-title",
  descriptionClassName = "mt-4 max-w-2xl leading-6 text-slate-500",

  // Grid behavior
  maxWidth = "max-w-6xl",
  gap = "gap-6",
  cols = { base: 1, sm: 2, lg: 3 },
  gridClassName = "",

  referenceColsDesktop = 4,
  desktopSpan,
  centerWhenShrunk = true,

  // Card styling
  cardBg = "#273C75",
  cardRadius = "rounded-[18px]",
  cardPadding = "px-6 py-7",
  cardMinHeight,
  cardClassName = "",

  // Card content styling
  iconSize = 40,
  iconWrapClassName = "h-10 w-10",
  imageWrapClassName = "h-45 w-full relative",
  titleSplit = true,
  cardTitleClassName = "mt-5 font-medium leading-[1.18] text-white whitespace-pre-line",
  cardTextClassName = "mt-4 leading-6 text-white/75",

  showNum = true,
  numClassName = "text-[3rem] sm:text-[3.2rem] font-semibold leading-none text-white/20",
  cardRightTabs,
  cardBehindTabs,
  cardDivider,
  equalHeight = false,
  tightTitleWhenNoIcon = false,
  items = [],
}) {
  const headerAlignClass = headerAlign === "left" ? "text-left" : "text-center";

  const baseColsClass = toColsClass(cols?.base ?? 1);
  const smColsClass = toColsClass(cols?.sm ?? 1);
  const lgColsClass = toColsClass(cols?.lg ?? 1);

  const desktopSlots = typeof desktopSpan === "number" ? desktopSpan : (cols?.lg ?? 1);

  const refCols = clamp(Number(referenceColsDesktop) || 4, 1, 6);
  const span = clamp(Number(desktopSlots) || 1, 1, refCols);

  const maxPx = maxWidthClassToPx(maxWidth);
  const shouldShrink = Boolean(maxPx && refCols > 0 && span < refCols);
  const shrinkPx = shouldShrink ? Math.round(maxPx * (span / refCols)) : null;

  const gridWrapStyle =
    shrinkPx && centerWhenShrunk
      ? { maxWidth: `${shrinkPx}px` }
      : undefined;

  // ----- In-card strip (old feature) -----
  const tabsEnabled = Boolean(cardRightTabs?.enabled);
  const tabsWidth = numOrFallback(cardRightTabs?.width, 10);
  const tabsRadius = numOrFallback(cardRightTabs?.radius, 14);
  const tabsInset = numOrFallback(cardRightTabs?.inset, 8);
  const defaultTabColors = Array.isArray(cardRightTabs?.colors) ? cardRightTabs.colors : [];

  // ----- Behind-card strip (new feature) -----
  const behindEnabled = Boolean(cardBehindTabs?.enabled);
  const behindWidth = numOrFallback(cardBehindTabs?.width, 14);
  const behindOffsetX = numOrFallback(cardBehindTabs?.offsetX, 10);
  const behindOffsetY = numOrFallback(cardBehindTabs?.offsetY, 0);
  const behindRadius = numOrFallback(cardBehindTabs?.radius, 18);
  const behindInsetTop = numOrFallback(cardBehindTabs?.insetTop, 0);
  const behindInsetBottom = numOrFallback(cardBehindTabs?.insetBottom, 0);
  const behindColorsDefault = Array.isArray(cardBehindTabs?.colors) ? cardBehindTabs.colors : [];
  const behindBorderColor = String(cardBehindTabs?.borderColor || "#131313");
  const behindBorderWidth = numOrFallback(cardBehindTabs?.borderWidth, 2);

  // ----- Divider -----
  const dividerEnabled = Boolean(cardDivider?.enabled);
  const dividerStyle = String(cardDivider?.style || "dotted");
  const dividerColor = String(cardDivider?.color || "rgba(255,255,255,0.35)");
  const dividerMt = numOrFallback(cardDivider?.marginTop, 16);
  const dividerMb = numOrFallback(cardDivider?.marginBottom, 0);

  return (
    <section className={sectionClassName} style={{ backgroundColor: bg }}>
      <Container className={`${py} ${containerClassName}`}>
        {(eyebrow || title || description || subdescription || subtitle) ? (
          <div className={headerAlignClass}>
            {eyebrow ? (
              <div
                className="inline-flex rounded-full px-4 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase"
                style={{ backgroundColor: eyebrowBg, color: eyebrowText }}
              >
                {eyebrow}
              </div>
            ) : null}

            {title ? <h2 className={`mt-4 ${titleClassName}`}>{title}</h2> : null}

            {description ? (
              <p className={`mx-auto ${descriptionClassName}`}>{description}</p>
            ) : null}

            {subdescription ? (
              <p className={`mx-auto ${descriptionClassName}`}>{subdescription}</p>
            ) : null}

            {subtitle ? (
              <p className={`mx-auto font-semibold ${descriptionClassName}`}>{subtitle}</p>
            ) : null}
          </div>
        ) : null}

        <div className={`mt-10 sm:mt-12 mx-auto ${centerWhenShrunk ? "flex justify-center" : ""}`}>
          <div
            className={[
              "grid w-full",
              maxWidth,
              gap,
              baseColsClass,
              `sm:${smColsClass}`,
              `lg:${lgColsClass}`,
              equalHeight ? "items-stretch" : "",
              gridClassName,
            ].join(" ")}
            style={gridWrapStyle}
          >
            {items.map((it, idx) => {
              const rawTitle = it?.title ?? "";
              const t = titleSplit ? splitTitleToTwoLines(rawTitle) : null;
              const num = it?.num ? String(it.num) : "";
              const hasIcon = Boolean(it?.icon);
              const hasImage = Boolean(it?.image);
              const perCardColors =
                Array.isArray(it?.tabColors) && it.tabColors.length ? it.tabColors : null;
              const inCardColors = perCardColors || defaultTabColors;
              const behindColors = perCardColors || behindColorsDefault;
              const showBehind = behindEnabled && behindColors.length > 0;
              const showInCard = tabsEnabled && inCardColors.length > 0 && !showBehind;
              const needsPadForInCard = showInCard && tabsInset > 0;
              const wrapClass = equalHeight ? "relative h-full" : "relative";
              const cardOuterClass = equalHeight ? "h-full" : "";
              const titleCls =
                tightTitleWhenNoIcon && !hasIcon
                  ? stripMtClass(cardTitleClassName)
                  : cardTitleClassName;

              return (
                <div key={`${rawTitle || "item"}-${idx}`} className={wrapClass}>
                  {showBehind ? (
                    <div
                      className="absolute overflow-hidden"
                      style={{
                        zIndex: 0,
                        top: `${behindInsetTop + behindOffsetY}px`,
                        bottom: `${behindInsetBottom - behindOffsetY}px`,
                        right: `${-behindOffsetX}px`,
                        width: `${behindWidth}px`,
                        borderTopRightRadius: `${behindRadius}px`,
                        borderBottomRightRadius: `${behindRadius}px`,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      aria-hidden="true"
                    >
                      <div className="h-full w-full flex flex-col">
                        {behindColors.slice(0, 3).map((c, i) => (
                          <div
                            key={i}
                            className="flex-1"
                            style={{
                              backgroundColor: c,
                              borderTop:
                                i === 0 ? "none" : `${behindBorderWidth}px solid ${behindBorderColor}`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div
                    className={[
                      "relative overflow-hidden flex flex-col", // flex-col helps with consistent internal spacing
                      cardOuterClass,
                      cardRadius,
                      cardPadding,
                      needsPadForInCard ? "pr-10" : "",
                      cardClassName,
                    ].join(" ")}
                    style={{
                      zIndex: 1,
                      backgroundColor: cardBg,
                      minHeight: cardMinHeight ? `${cardMinHeight}px` : undefined,
                    }}
                  >
                    {/* Optional: in-card strip (legacy) */}
                    {showInCard ? (
                      <div
                        className="absolute overflow-hidden"
                        style={{
                          top: `${tabsInset}px`,
                          bottom: `${tabsInset}px`,
                          right: `${tabsInset}px`,
                          width: `${tabsWidth}px`,
                          borderRadius: `${tabsRadius}px`,
                        }}
                        aria-hidden="true"
                      >
                        <div className="h-full w-full flex flex-col">
                          {inCardColors.slice(0, 3).map((c, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* BIG NUMBER */}
                    {showNum && num ? (
                      <div className="absolute left-6 top-6 pointer-events-none select-none">
                        <div className={numClassName}>{num}</div>
                      </div>
                    ) : null}

                    {/* Icon */}
                    {hasIcon ? (
                      <div className={iconWrapClassName}>
                        <Image
                          src={it.icon}
                          alt=""
                          width={iconSize}
                          height={iconSize}
                          className="object-contain opacity-95"
                        />
                      </div>
                    ) : null}

                    {/* Image */}
                    {hasImage ? (
                      <div className={imageWrapClassName}>
                        <Image
                          src={it.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null}

                    {/* Title */}
                    {rawTitle ? (
                      <h3 className={titleCls}>
                        {titleSplit ? (
                          <>
                            <span className="block">{t.first}</span>
                            {t.second ? <span className="block">{t.second}</span> : null}
                          </>
                        ) : (
                          rawTitle
                        )}
                      </h3>
                    ) : null}

                    {/* Divider */}
                    {dividerEnabled ? (
                      <div
                        style={{
                          marginTop: `${dividerMt}px`,
                          marginBottom: `${dividerMb}px`,
                          borderTop: `1px ${dividerStyle} ${dividerColor}`,
                        }}
                      />
                    ) : null}

                    {/* Text */}
                    {Array.isArray(it?.text) && it?.text.length ? (
                      <div>
                        {/* {text.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))} */}
                        {it?.text.map((p, idx) =>
                          typeof p === "string" ? (
                            <p
                              className={cardTextClassName}
                              key={idx}
                              dangerouslySetInnerHTML={{ __html: p }}
                            />
                          ) : null
                        )}
                      </div>
                    ) : typeof it?.text === "string" ? (
                    <p
                      className={cardTextClassName}
                      dangerouslySetInnerHTML={{ __html: it.text }}
                    />) : null}

                    {/* (optional) Spacer to keep footer-alignment if you ever add CTA */}
                    {equalHeight ? <div className="mt-auto" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
