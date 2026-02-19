import Container from "@/components/layout/Container";

export default function PageHero({ title, breadcrumb = [], bg }) {
  const base = bg?.base || "#F3E3CF";

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: base }}>
      {/* fixed header space (manual) */}
      <div className="pt-32 sm:pt-36" />

      {/* arcs */}
      {bg?.leftArc ? (
        <img
          src={bg.leftArc}
          alt=""
          className="pointer-events-none absolute left-0 top-0 h-full w-auto opacity-100"
        />
      ) : null}
      {bg?.rightArc ? (
        <img
          src={bg.rightArc}
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-auto opacity-100"
        />
      ) : null}

      <Container className="relative py-14 sm:py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900">{title}</h1>
        {breadcrumb?.length ? (
          <div className="mt-3 text-xs text-slate-700/70">
            {breadcrumb.map((b, i) => (
              <span key={`${b.label}-${i}`}>
                {b.href ? (
                  <a
                    href={b.href}
                    className="hover:text-slate-900 transition"
                  >
                    {b.label}
                  </a>
                ) : (
                  <span className="text-slate-900">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 ? "  ›  " : ""}
              </span>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
