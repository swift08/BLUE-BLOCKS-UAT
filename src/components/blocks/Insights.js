import Container from "@/components/layout/Container";

const pillClass = {
  "sky": "bg-[#95D6ED]",
  "peach": "bg-[#F9A78F]",
  "yellow": "bg-[#F9E48F]",
};

function isHexColor(v) {
  return typeof v === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v);
}

export default function Insights({
  title,
  subtitle,
  eyebrow,
  hasCTA,

  bgClassName = "bg-[#f5efe6]",
  bg,

  items = [],

  containerClassName = "py-14",
  cols = { base: 1, sm: 3, md: 3 },
  gapClassName = "gap-5",
}) {
  const sectionStyle = bg && isHexColor(bg) ? { backgroundColor: bg } : undefined;
  const sectionClassName = sectionStyle ? "" : bgClassName;

  const gridColsClass = `grid grid-cols-${cols.base} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md}`;

  return (
    <section className={sectionClassName} style={sectionStyle}>
      <Container className={containerClassName}>
        {/* Header */}
        <div className="text-center">
          {eyebrow ? (
            <div className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-slate-500">
              {eyebrow}
            </div>
          ) : null}

          {title ? (
            <h2 className="mt-2 text-4xl sm:text-5xl font-semibold main-title">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Cards */}
        <div className={`mt-8 ${gridColsClass} ${gapClassName}`}>
          {items.map((it, idx) => {
            const key = it?.id || it?.title || idx;
            const hasBullets = Array.isArray(it?.bullets) && it.bullets.length > 0;
            const cardInlineStyle = it?.cardBg && isHexColor(it.cardBg) ? { backgroundColor: it.cardBg } : undefined;
            const cardBgClass = cardInlineStyle ? "" : pillClass[it?.tone] || "bg-slate-200";
            const pillInlineStyle = it?.pillBg ? { backgroundColor: it.pillBg } : undefined;
            const ctaLabel = it?.cta?.label ?? "Read this guide →";

            return (
              <div
                key={key}
                className={`rounded-2xl p-6 border border-black/5 ${cardBgClass}`}
                style={cardInlineStyle}
              >
                
                <div className="flex justify-space-between">
                  {/* pill top-right */}
                  <div className="w-full flex justify-start">
                    {it?.pillSec ? (
                      <div
                        className="inline-flex rounded-lg px-3 py-1 text-xs font-medium bg-white/30 whitespace-nowrap"
                        style={pillInlineStyle}
                      >
                        {it.pillSec}
                      </div>
                    ) : null}
                  </div>{/* pill top-right */}
                  <div className="flex justify-end">
                    {it?.pill ? (
                      <div
                        className="inline-flex rounded-lg px-3 py-1 text-xs font-medium bg-white/30 whitespace-nowrap"
                        style={pillInlineStyle}
                      >
                        {it.pill}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* title */}
                <div className="mt-3 text-lg font-semibold text-slate-900">
                  {it?.title}
                </div>

                {/* meta */}
                {it?.meta ? (
                  <div className="mt-2 text-sm text-slate-700">
                    {it.meta}
                  </div>
                ) : null}

                {/* bullets (only if provided) */}
                {hasBullets ? (
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {it.bullets.map((b, bi) => (
                      <li key={`${key}-b-${bi}`} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-900/60 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* CTA behavior (only if provided) */}
                {hasCTA && (
                  <div className="mt-5 text-sm underline underline-offset-4 text-slate-900">
                    {ctaLabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
