import Container from "@/components/layout/Container";
import Image from "next/image";

export default function CareersHero({ eyebrow, title, subtitle, text = [], ctaLabel, ctaHref }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#F3E3CF",
        paddingTop: "clamp(120px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
      }}
    >
      {/* Decorative Arcs from PageHero to match the site-wide light UI theme */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-0 h-full w-[400px] opacity-25">
          <Image
            src="/ui/arc-left.webp"
            alt=""
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <div className="absolute right-0 top-0 h-full w-[400px] opacity-25">
          <Image
            src="/ui/arc-right.webp"
            alt=""
            fill
            className="object-contain object-right"
            priority
          />
        </div>
      </div>

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          {eyebrow ? (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{
                backgroundColor: "rgba(44, 47, 143, 0.08)",
                color: "#2C2F8F",
                border: "1px solid rgba(44, 47, 143, 0.15)",
              }}
            >
              {eyebrow}
            </div>
          ) : null}

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-slate-900"
          >
            {title || "Education Is Not a Job,"}
            <br />
            <span style={{ color: "#2C2F8F" }}>{subtitle || "It’s a Responsibility."}</span>
          </h1>

          <div className="mt-8 space-y-5 max-w-3xl mx-auto">
            {text.map((p, i) => (
              <p key={i} className="text-slate-800 text-[15px] leading-relaxed text-justify">
                {p}
              </p>
            ))}
          </div>

          {ctaHref ? (
            <div className="mt-10">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#2C2F8F]/15 hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: "#2C2F8F" }}
              >
                {ctaLabel || "See Open Roles"} <span aria-hidden>↓</span>
              </a>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
