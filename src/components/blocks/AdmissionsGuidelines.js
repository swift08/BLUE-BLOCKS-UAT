import Container from "@/components/layout/Container";

export default function AdmissionsGuidelines({ eyebrow, title, campuses = [], notes = [] }) {
  return (
    <section className="relative overflow-hidden py-20 bg-white">
      {/* Decorative background shapes */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #2C2F8F 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {eyebrow ? (
            <div
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{
                backgroundColor: "rgba(44,47,143,0.06)",
                color: "#2C2F8F",
                border: "1px solid rgba(44,47,143,0.1)",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
          ) : null}
        </div>

        {/* Campus tables / cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {campuses.map((campus, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 flex flex-col"
            >
              {/* Campus header with premium brand-colored gradient */}
              <div
                className="px-8 py-7 text-white"
                style={{
                  background: idx === 0
                    ? "linear-gradient(135deg, #1B3A6B 0%, #2C2F8F 100%)"
                    : "linear-gradient(135deg, #2C2F8F 0%, #0f1f3d 100%)",
                }}
              >
                <div className="text-xs font-bold tracking-widest uppercase text-[#F3E3CF] mb-1.5">
                  {campus.campus}
                </div>
                <h3 className="text-xl font-bold leading-snug">{campus.title}</h3>
                <p className="text-sm text-white/80 mt-2 text-justify leading-relaxed">
                  {campus.subtitle}
                </p>
              </div>

              {/* Programs Table */}
              <div className="flex-1">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: "#FDFBF7" }}>
                      <th className="text-left px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                        PROGRAMME
                      </th>
                      <th className="text-left px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                        AGE GROUP / ELIGIBILITY
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(campus.rows || []).map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-50/50 transition-colors duration-200"
                      >
                        <td className="px-8 py-5 text-sm font-semibold text-slate-800">
                          {row.programme}
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: "rgba(44,47,143,0.06)",
                              color: "#2C2F8F",
                            }}
                          >
                            {row.age}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes - beautifully redesigned note grids */}
        {notes.length > 0 ? (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center sm:text-left">
              Important Enrolment Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl p-8 bg-[#FAF9F5] border border-slate-100 hover:border-[#2C2F8F]/20 hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 shadow-md transition-transform duration-300 hover:scale-105"
                    style={{ backgroundColor: "#2C2F8F" }}
                  >
                    <NoteIcon type={note.icon} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-3">{note.label}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed text-justify">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function NoteIcon({ type }) {
  switch (type) {
    case "ami":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "parent":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "training":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}
