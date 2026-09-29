import Container from "@/components/layout/Container";
import Link from "next/link";

const CAMPUSES = [
  {
    campus: "Column-1",
    name: "Gachibowli Campus",
    title: "Gachibowli Campus — Nursery & Pre-Primary Admissions",
    badge: "Nursery & Pre-Primary",
    badgeColor: "bg-blue-50 text-[#2C2F8F] border-blue-100",
    headerGradient: "linear-gradient(135deg, #1B3A6B 0%, #2C2F8F 100%)",
    mapUrl: "https://maps.google.com/?cid=2096929938310545200",
    locationLabel: "View Gachibowli Campus on Google Maps",
    address: "MIG 3, Lane opposite to DLF, Gachibowli, Hyderabad, Telangana",
    rows: [
      {
        programme: "Nursery",
        age: "15 months to 2.5 years",
        link: "/programs/playgroup/",
      },
      {
        programme: "Pre-Primary",
        age: "2.5 to 6 years",
        link: "/programs/nursery-school/",
      },
    ],
  },
  {
    campus: "Column-2",
    name: "Tellapur Campus",
    title: "Tellapur Campus — Pre-Primary, Primary & Secondary Admissions",
    badge: "Pre-Primary, Primary & Secondary",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
    headerGradient: "linear-gradient(135deg, #2C2F8F 0%, #0f1f3d 100%)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Blue+Blocks+Complete+School+Tellapur+Hyderabad",
    locationLabel: "View Tellapur Campus on Google Maps",
    address: "Tellapur, Hyderabad, Telangana",
    rows: [
      {
        programme: "Pre-Primary",
        age: "2.5 to 6 years",
        link: "/programs/nursery-school/",
      },
      {
        programme: "Primary",
        age: "6 to 12 years",
        link: "/programs/primary-school-elementary/",
      },
      {
        programme: "Secondary",
        age: "Class 7 to 10 (12 to 16 years, Cambridge, IGCSE)",
        link: "/programs/secondary-school/",
      },
    ],
  },
];

export default function ProgramsAndCampuses() {
  return (
    <section
      id="campus"
      className="scroll-mt-32 py-16 sm:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden"
    >
      {/* Target for #guidelines anchor so sticky nav works cleanly */}
      <span id="guidelines" className="scroll-mt-32 block -mt-32 pt-32 invisible" aria-hidden="true" />
      <span id="campuses" className="scroll-mt-32 block -mt-32 pt-32 invisible" aria-hidden="true" />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div
            className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              backgroundColor: "rgba(44,47,143,0.08)",
              color: "#2C2F8F",
              border: "1px solid rgba(44,47,143,0.15)",
            }}
          >
            ADMISSION ENTRY WINDOWS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Programs & Campuses
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Choose the right campus and age-aligned programme for your child across our two state-of-the-art Hyderabad environments.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {CAMPUSES.map((c, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Card Header with brand gradient */}
              <div
                className="px-6 py-6 sm:px-8 sm:py-7 text-white"
                style={{ background: c.headerGradient }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F3E3CF]">
                    {c.name}
                  </span>
                  <a
                    href={c.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all"
                    title={c.locationLabel}
                  >
                    {/* Location Pin Icon */}
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
                    <span>View Location</span>
                  </a>
                </div>
                <h3 className="text-lg sm:text-xl font-bold leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-2">
                  {c.address}
                </p>
              </div>

              {/* Programmes Table */}
              <div className="flex-1 p-4 sm:p-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#FAF9F5] rounded-xl overflow-hidden">
                      <th className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider rounded-l-xl">
                        Programme
                      </th>
                      <th className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider rounded-r-xl">
                        Age Group / Class
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {c.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-50/60 transition-colors duration-150"
                      >
                        <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-slate-900">
                          {row.link ? (
                            <Link
                              href={row.link}
                              className="text-[#2C2F8F] hover:underline"
                            >
                              {row.programme}
                            </Link>
                          ) : (
                            row.programme
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-600">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#2C2F8F]/5 text-[#2C2F8F]">
                            {row.age}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Footer Pin Button */}
              <div className="px-6 py-4 bg-[#FAF9F5] border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Open for Admissions
                </span>
                <a
                  href={c.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C2F8F] hover:text-[#1B3A6B] transition-colors"
                >
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
                  <span>Google Maps Directions →</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
