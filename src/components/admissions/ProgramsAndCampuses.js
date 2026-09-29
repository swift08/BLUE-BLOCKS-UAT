import Container from "@/components/layout/Container";

const CAMPUSES = [
  {
    title: "Gachibowli Campus — Nursery & Pre-Primary Admissions",
    mapUrl: "https://maps.google.com/?cid=2096929938310545200",
    locationLabel: "View Gachibowli Campus on Google Maps",
    rows: [
      { programme: "Nursery", age: "15 months to 2.5 years" },
      { programme: "Pre-Primary", age: "2.5 to 6 years" },
    ],
  },
  {
    title: "Tellapur Campus — Pre-Primary, Primary & Secondary Admissions",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Blue+Blocks+Complete+School+Tellapur+Hyderabad",
    locationLabel: "View Tellapur Campus on Google Maps",
    rows: [
      { programme: "Pre-Primary", age: "2.5 to 6 years" },
      { programme: "Primary", age: "6 to 12 years" },
      {
        programme: "Secondary",
        age: "Class 7 to 10 (12 to 16 years, Cambridge, IGCSE)",
      },
    ],
  },
];

function LocationPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ProgramsAndCampuses() {
  return (
    <section
      id="campus"
      className="scroll-mt-32 py-16 sm:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden"
    >
      <span id="guidelines" className="scroll-mt-32 block -mt-32 pt-32 invisible" aria-hidden="true" />
      <span id="campuses" className="scroll-mt-32 block -mt-32 pt-32 invisible" aria-hidden="true" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Programs & Campuses
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {CAMPUSES.map((c, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm flex flex-col"
            >
              <div
                className="px-6 py-6 sm:px-8 sm:py-7 text-white"
                style={{
                  background:
                    idx === 0
                      ? "linear-gradient(135deg, #1B3A6B 0%, #2C2F8F 100%)"
                      : "linear-gradient(135deg, #2C2F8F 0%, #0f1f3d 100%)",
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold leading-snug flex-1">
                    {c.title}
                  </h3>
                  <a
                    href={c.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all shrink-0"
                    title={c.locationLabel}
                    aria-label={c.locationLabel}
                  >
                    <LocationPinIcon />
                    <span>Location</span>
                  </a>
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#FAF9F5]">
                      <th className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Programme
                      </th>
                      <th className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Age Group
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {c.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-slate-900">
                          {row.programme}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-600">
                          {row.age}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
