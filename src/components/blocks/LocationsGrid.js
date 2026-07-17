import Container from "@/components/layout/Container";

export default function LocationsGrid({ bg = "#F8F7F4", locations = [] }) {
  return (
    <section className="w-full" style={{ backgroundColor: bg }}>
      <Container className="py-14 sm:py-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#2C2F8F" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-slate-400">Our Campuses</div>
            <div className="text-lg font-semibold text-slate-900">Find Us in Hyderabad</div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "#fff" }}
            >
              {/* Campus header card */}
              <div
                className="px-6 py-5 flex items-start gap-4"
                style={{
                  background: idx === 0
                    ? "linear-gradient(135deg, #F3E3CF 0%, #f0d9ba 100%)"
                    : "linear-gradient(135deg, #E7E8FF 0%, #d6d8ff 100%)",
                }}
              >
                {/* Number badge */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    backgroundColor: idx === 0 ? "#2C2F8F" : "#0f1f3d",
                    color: "#fff",
                  }}
                >
                  {idx + 1}
                </div>

                <div>
                  <div className="font-bold text-slate-900 text-[15px] leading-snug">
                    {loc?.title}
                  </div>
                  <div className="flex items-start gap-1.5 mt-1.5">
                    <svg
                      className="shrink-0 mt-0.5"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-xs text-slate-500 leading-snug">{loc?.address}</span>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="relative overflow-hidden" style={{ height: 280 }}>
                {loc?.mapEmbedUrl ? (
                  <iframe
                    src={getMapIframeSrc(loc?.mapEmbedUrl)}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={loc?.title || "Campus map"}
                    style={{ border: 0 }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-50 text-sm text-slate-400">
                    Map unavailable
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function getMapIframeSrc(url) {
  const value = String(url || "").trim();
  const lowered = value.toLowerCase();
  if (!value) return "";

  if (lowered.includes("<iframe")) {
    const srcMatch = value.match(/src=["']([^"']+)["']/i);
    if (srcMatch?.[1]) return srcMatch[1];
  }

  if (
    lowered.includes("output=embed") ||
    lowered.includes("/maps/embed") ||
    lowered.includes("google.com/maps?q=")
  ) {
    return value;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
}
