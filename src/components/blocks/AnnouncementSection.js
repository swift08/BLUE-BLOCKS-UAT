"use client";

import Container from "@/components/layout/Container";

export default function AnnouncementSection({
  title = "Elementary Farm Visit",
  badge = "Upcoming Event",
  date = "July 18, 2026",
  details = [],
  messages = [],
}) {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0c2340 100%)",
      }}
    >
      {/* ── Background decorative blobs ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Radial glow — top-left */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)",
            borderRadius: "9999px",
          }}
        />
        {/* Radial glow — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "340px",
            height: "340px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
            borderRadius: "9999px",
          }}
        />
        {/* Grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto">

          {/* ── Top badge row ── */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              {/* Pulsing dot */}
              <span className="relative flex h-3 w-3">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#FBBF24" }}
                />
                <span
                  className="relative inline-flex rounded-full h-3 w-3"
                  style={{ background: "#F59E0B" }}
                />
              </span>
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: "#FCD34D",
                  borderColor: "rgba(251,191,36,0.35)",
                  background: "rgba(251,191,36,0.08)",
                }}
              >
                {badge}
              </span>
            </div>

            {/* Date chip */}
            <div
              className="flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border"
              style={{
                color: "#94A3B8",
                borderColor: "rgba(148,163,184,0.2)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span>📅</span>
              <span>{date}</span>
            </div>
          </div>

          {/* ── Main card ── */}
          <div
            className="rounded-3xl border overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              borderColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset",
            }}
          >
            {/* Top golden accent bar */}
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(90deg, #F59E0B 0%, #FBBF24 40%, #60A5FA 100%)",
              }}
            />

            <div className="p-8 sm:p-12">
              {/* Title */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3"
                style={{
                  color: "#F8FAFC",
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </h2>

              {/* Sub-label */}
              <p
                className="text-sm font-medium mb-8"
                style={{ color: "#64748B" }}
              >
                An invitation for guides, parents & staff
              </p>

              {/* ── Detail chips ── */}
              {details.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-10">
                  {details.map((d, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <span className="text-lg">{d.icon}</span>
                      <div>
                        <div
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: "#475569" }}
                        >
                          {d.label}
                        </div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#E2E8F0" }}
                        >
                          {d.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div
                className="mb-8"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                }}
              />

              {/* ── Message paragraphs ── */}
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <p
                    key={idx}
                    className="text-base leading-relaxed"
                    style={{ color: "#94A3B8" }}
                  >
                    {msg}
                  </p>
                ))}
              </div>

              {/* ── CTA Row ── */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                    color: "#1C1917",
                    boxShadow: "0 4px 18px rgba(245,158,11,0.4)",
                  }}
                >
                  ✋ Confirm My Attendance
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full border transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "#94A3B8",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  📋 View Schedule
                </a>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
