import Container from "@/components/layout/Container";

export default function WhyBlueBlocksCareers({ eyebrow, title, text = [], readyCta }) {
  return (
    <>
      {/* Why section */}
      <section
        className="bb-ui bb-section"
        style={{
          background: "linear-gradient(135deg, #0f1f3d 0%, #1B3A6B 100%)",
        }}
      >
        <Container className="bb-section__inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              {eyebrow ? (
                <div
                  className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                  style={{ backgroundColor: "rgba(243,227,207,0.12)", color: "#F3E3CF", border: "1px solid rgba(243,227,207,0.2)" }}
                >
                  {eyebrow}
                </div>
              ) : null}
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.2]">{title}</h2>
            </div>

            {/* Right */}
            <div className="space-y-5">
              {text.map((p, i) => (
                <p key={i} className="text-white/75 leading-relaxed text-[15px] text-justify">{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Ready CTA */}
      {readyCta ? (
        <section className="bb-ui bb-section" style={{ backgroundColor: "#F3E3CF" }}>
          <Container className="bb-section__inner text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1f3d] mb-3">
              {readyCta.title}
            </h2>
            {readyCta.subtitle ? (
              <p className="text-slate-700 mb-8 text-[15px]">{readyCta.subtitle}</p>
            ) : null}
            <a
              href={readyCta.href || `mailto:${readyCta.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0f1f3d 0%, #2C2F8F 100%)" }}
            >
              {readyCta.label} <span aria-hidden>→</span>
            </a>
          </Container>
        </section>
      ) : null}
    </>
  );
}
