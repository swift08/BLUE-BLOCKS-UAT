import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import ReadMoreBlock from "@/components/ui/ReadMoreBlock";

const pillClass = {
  sky: "bg-[#95D6ED]",
  peach: "bg-[#F9A78F]",
  yellow: "bg-[#F9E48F]",
};

export default function Insights({
  title,
  subtitle,
  eyebrow,
  hasCTA,

  // NEW (preferred)
  sectionBg = "",

  bgClassName = "bg-[#f5efe6]",
  bg,

  items = [],

  containerClassName = "py-14",
  cols = { base: 1, sm: 3, md: 3 },
  gapClassName = "gap-5",
}) {
  const resolved = resolveBg(sectionBg || bg || bgClassName);

  // keep dynamic grid-cols behavior (as in original)
  const gridColsClass = `grid grid-cols-${cols.base} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md}`;

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className={["bb-section__inner", containerClassName].filter(Boolean).join(" ")}>
        <div className="text-center">
          {eyebrow ? <div className="bb-eyebrow">{eyebrow}</div> : null}
          {title ? <h2 className="bb-section-title mt-2">{title}</h2> : null}
          {subtitle ? <p className="bb-subtitle mt-3">{subtitle}</p> : null}
        </div>

        <div className={`mt-8 ${gridColsClass} ${gapClassName}`}>
          {items.map((it) => {
            const cardBgStyle = it.cardBg ? { backgroundColor: it.cardBg } : undefined;
            const cardBgClass = it.cardBg ? "" : (pillClass[it.tone] || "bg-slate-200");

            return (
              <div
                key={it.title}
                className={`rounded-2xl p-6 border border-black/5 ${cardBgClass}`}
                style={cardBgStyle}
              >
                <div className="flex items-start justify-between gap-3">
                  {it.pillSec ? (
                    <span
                      className="bb-pill"
                      style={{
                        "--bb-pill-bg": "rgba(255,255,255,0.30)",
                        "--bb-pill-border": "transparent",
                      }}
                    >
                      <span className="bb-pill__text">{it.pillSec}</span>
                    </span>
                  ) : (
                    <span />
                  )}

                  {it.pill ? (
                    <span
                      className="bb-pill"
                      style={{
                        "--bb-pill-bg": "rgba(255,255,255,0.30)",
                        "--bb-pill-border": "transparent",
                      }}
                    >
                      <span className="bb-pill__text">{it.pill}</span>
                    </span>
                  ) : null}
                </div>

                <div className="bb-text font-semibold mt-3">{it.title}</div>

                {it.meta ? <div className="bb-text mt-2">{it.meta}</div> : null}

                <ReadMoreBlock
                  readMore={it.readMore}
                  className=""
                  contentClassName="bb-text"
                  buttonClassName="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:opacity-80"
                />

                {it.bullets ? (
                  <ul className="mt-4 space-y-2 bb-text">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-900/60 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {hasCTA ? (
                  <div className="mt-5 underline underline-offset-4">
                    {it.cta?.label || "Read this guide →"}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}