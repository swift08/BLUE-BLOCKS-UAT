import Container from "@/components/layout/Container";

export default function OpenPositions({ eyebrow, title, jobs = [], openApplicationNote }) {
  return (
    <section id="open-roles" className="bb-ui bb-section" style={{ backgroundColor: "#fff" }}>
      <Container className="bb-section__inner">
        {/* Header */}
        <div className="mb-10">
          {eyebrow ? (
            <div
              className="bb-pill"
              style={{
                "--bb-pill-bg": "#E7E8FF",
                "--bb-pill-border": "transparent",
                "--bb-pill-text": "#2C2F8F",
              }}
            >
              <span className="bb-pill__text">{eyebrow}</span>
            </div>
          ) : null}
          {title ? (
            <h2 className="bb-section-title mt-4">{title}</h2>
          ) : null}
        </div>

        {/* Job cards */}
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <JobCard key={idx} job={job} />
          ))}
        </div>

        {/* Open application nudge */}
        {openApplicationNote ? (
          <div
            className="mt-10 rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-5"
            style={{ backgroundColor: "#F8F7F4", border: "1px dashed #cbd5e1" }}
          >
            <div className="flex-1">
              <p className="text-slate-700 text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: openApplicationNote }}
              />
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function JobCard({ job }) {
  return (
    <div
      className="group rounded-3xl overflow-hidden border border-slate-100 hover:border-[#2C2F8F]/30 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Coloured top strip */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(to right, #2C2F8F, #F3E3CF)" }}
        aria-hidden
      />

      <div className="p-7 sm:p-9">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left — main info */}
          <div className="flex-1">
            {/* School + Location badge */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.org ? (
                <span
                  className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#E7E8FF", color: "#2C2F8F" }}
                >
                  {job.org}
                </span>
              ) : null}
              {job.location ? (
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: "#F3E3CF", color: "#7B4F2A" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {job.location}
                </span>
              ) : null}
              {job.type ? (
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#e6faf2", color: "#065f46" }}
                >
                  {job.type}
                </span>
              ) : null}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
              {job.title}
            </h3>

            <p className="text-slate-600 leading-relaxed text-[15px] text-justify">{job.description}</p>
          </div>

          {/* Right — contact + apply */}
          <div
            className="lg:w-72 rounded-2xl p-5 flex flex-col gap-4 shrink-0"
            style={{ backgroundColor: "#F8F7F4" }}
          >
            <div className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-1">
              Apply via
            </div>

            {job.email ? (
              <a
                href={`mailto:${job.email}`}
                className="flex items-center gap-3 group/link"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#E7E8FF" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C2F8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="text-sm text-[#2C2F8F] font-medium group-hover/link:underline break-all">
                  {job.email}
                </span>
              </a>
            ) : null}

            {job.phone ? (
              <a
                href={`tel:${job.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 group/link"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#F3E3CF" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B4F2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.29 6.29l1-1.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-sm text-slate-700 font-medium group-hover/link:underline">
                  {job.phone}
                </span>
              </a>
            ) : null}

            {job.applyLabel ? (
              <a
                href={job.email ? `mailto:${job.email}` : "#"}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "linear-gradient(135deg, #2C2F8F, #1B3A6B)" }}
              >
                {job.applyLabel} <span aria-hidden>→</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
