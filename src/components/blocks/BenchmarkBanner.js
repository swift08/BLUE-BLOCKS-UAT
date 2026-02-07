export default function BenchmarkBanner({
  bg = "#233B77",
  title = "THE GLOBAL BENCHMARK FOR 2050",
  text = "",
  cta = { label: "Read More", href: "/about" },

  logos = [],
  logoAltFallback = "Partner logo",

  maxWidth = "max-w-6xl",
}) {
  return (
    <section className="bg-white">
      <div className={`mx-auto w-full ${maxWidth} px-4 sm:px-6 py-10 sm:py-14`}>
        {/* Blue banner */}
        {text ? (<div
          className="rounded-xl px-6 sm:px-8 py-6 sm:py-7 text-white"
          style={{ backgroundColor: bg }}
        >
          <h3 className="text-xl font-medium tracking-wide">
            {title}
          </h3>

          {text ? (
            <p className="mt-3 leading-relaxed text-white/85 max-w-5xl">
              {text}
            </p>
          ) : null}

          {cta?.href ? (
            <div className="mt-4 flex justify-end">
              <a
                href={cta.href}
                className="inline-flex items-center gap-2 font-medium text-white/90 hover:text-white"
              >
                {cta.label || "Read More"}
                <span aria-hidden="true">⌄</span>
              </a>
            </div>
          ) : null}
        </div>) : null}

        {/* Logo strip */}
        {logos?.length ? (
          <div className="mt-8">
            {/* Desktop: wrap/center */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-10 opacity-60">
              {logos.map((l, idx) => (
                <Logo key={`${l.src || "logo"}-${idx}`} {...l} altFallback={logoAltFallback} />
              ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="sm:hidden -mx-4 px-4 overflow-x-auto">
              <div className="flex items-center gap-10 min-w-max opacity-60">
                {logos.map((l, idx) => (
                  <Logo key={`${l.src || "logo"}-${idx}`} {...l} altFallback={logoAltFallback} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Logo({ src, alt, width = 160, height = 100, href, altFallback }) {
  const img = (
    <img
      src={src}
      alt={alt || altFallback}
      width={width}
      height={height}
      className="h-18 w-auto object-contain grayscale contrast-125 opacity-70 transition hover:opacity-100"
    />
  );

  if (href) {
    return (
      <a href={href} className="block" aria-label={alt || altFallback}>
        {img}
      </a>
    );
  }

  return <div className="block">{img}</div>;
}
