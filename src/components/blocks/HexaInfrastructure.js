import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

export default function HexaInfrastructure({
  title = "Infrastructure for Innovation (0–18): Designed for the Developing Mind.",
  text = "At Blue Blocks, we believe architecture is not just a container for learning; it is an active participant in it...",
  items = [],
  bgClass = "bg-white",
  sectionBg = "",
  maxWidth = "max-w-6xl",
}) {
  const resolved = resolveBg(sectionBg || bgClass);
  return (
    <section className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")} style={resolved.style}>
      <Container className={["bb-section__inner", maxWidth].filter(Boolean).join(" ")}>
        {/* Heading */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-4xl font-medium text-slate-900">
            {title}
          </h2>
          {text ? (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {text}
            </p>
          ) : null}
        </div>

        {/* Desktop honeycomb */}
        <div className="mt-10 hidden sm:block">
          <HexHoneycomb items={items} />
        </div>

        {/* Mobile stacked */}
        <div className="mt-8 sm:hidden space-y-5">
          {items.map((it, idx) => (
            <HexCard key={it?.href || it?.title || idx} {...it} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function HexHoneycomb({ items = [] }) {
  // layout similar to screenshot: 3 on top row, 2 on bottom row centered
  const top = items.slice(0, 3);
  const bottom = items.slice(3, 5);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-center gap-6">
        {top.map((it, idx) => (
          <HexCard key={it?.href || it?.title || idx} {...it} />
        ))}
      </div>

      {bottom.length ? (
        <div className="mt-[-22px] flex items-start justify-center gap-6">
          {bottom.map((it, idx) => (
            <HexCard key={it?.href || it?.title || `b-${idx}`} {...it} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HexCard({
  title = "",
  image = "",
  href = "#",
  readMoreLabel = "Read More",
  overlay = "bg-black/20",
}) {
  return (
    <a
      href={href}
      className="group relative block h-[170px] w-[190px] sm:h-[190px] sm:w-[210px]"
      aria-label={title}
    >
      {/* Hex */}
      <div
        className="relative h-full w-full overflow-hidden shadow-sm"
        style={{
          clipPath:
            "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Overlay */}
        <div className={`absolute inset-0 ${overlay} transition-opacity group-hover:opacity-80`} />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="text-sm sm:text-base font-medium text-white drop-shadow">
            {title}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium text-white/90">
            {readMoreLabel}
            <span className="transition-transform group-hover:translate-y-[1px]" aria-hidden="true">
              ⌄
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
