import Link from "next/link";
import Container from "@/components/layout/Container";

const DIPLOMAS_DATA = [
  {
    diploma: "AMI Assistants to Infancy",
    ageGroup: "0–3 years",
    plane: "First Plane of Development",
    environment: "Infant and Toddler Community",
    href: "/programs/playgroup/",
    color: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-200 hover:border-amber-400",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-200",
    accent: "#B74F2A",
    planeTag: "0–3 Years",
  },
  {
    diploma: "AMI Primary Diploma",
    ageGroup: "3–6 years",
    plane: "First Plane of Development",
    environment: "Pre-Primary — Nursery, PP1, PP2",
    href: "/programs/nursery-school/",
    color: "from-[#2C2F8F]/10 to-indigo-500/5",
    border: "border-[#2C2F8F]/30 hover:border-[#2C2F8F]",
    badgeBg: "bg-indigo-100 text-[#2C2F8F] border-indigo-200",
    accent: "#2C2F8F",
    planeTag: "3–6 Years",
    featured: "Foundation Qualification",
  },
  {
    diploma: "AMI Elementary Diploma",
    ageGroup: "6–12 years",
    plane: "Second Plane of Development",
    environment: "Primary School",
    href: "/programs/primary-school-elementary/",
    color: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-200 hover:border-emerald-400",
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-200",
    accent: "#059669",
    planeTag: "6–12 Years",
  },
  {
    diploma: "AMI Adolescent Orientation",
    ageGroup: "12–18 years",
    plane: "Third Plane of Development",
    environment: "Secondary School",
    href: "/programs/secondary-school/",
    color: "from-slate-500/10 to-zinc-500/5",
    border: "border-slate-200 hover:border-slate-400",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
    accent: "#334155",
    planeTag: "12–18 Years",
  },
];

export default function AmiDiplomasTable() {
  return (
    <section id="diplomas" className="py-16 sm:py-20 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2C2F8F] block mb-2">
              QUALIFICATION PATHWAYS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Which AMI Diploma Do You Need?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              AMI diplomas are structured around the four planes of human development. Each diploma qualifies a guide to work with one specific age group.
            </p>
          </div>

          {/* 4 Diplomas Feature Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIPLOMAS_DATA.map((item) => (
              <div
                key={item.diploma}
                className={`relative rounded-2xl border ${item.border} p-6 sm:p-7 bg-gradient-to-br ${item.color} bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
              >
                {item.featured && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#2C2F8F] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {item.featured}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.plane}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${item.badgeBg}`}
                    >
                      {item.planeTag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {item.diploma}
                  </h3>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                      Target Environment
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {item.environment}
                    </span>
                  </div>

                  <Link
                    href={item.href}
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#2C2F8F] hover:bg-[#2C2F8F] hover:text-white transition-all shadow-sm group"
                  >
                    <span>View Programme</span>
                    <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Structured comparison table */}
          <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-[#2C2F8F] text-white text-xs uppercase tracking-wider font-semibold">
                  <th className="py-4 px-6 border-b border-[#2C2F8F]">Diploma</th>
                  <th className="py-4 px-6 border-b border-[#2C2F8F]">Age Group</th>
                  <th className="py-4 px-6 border-b border-[#2C2F8F]">Environment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
                {DIPLOMAS_DATA.map((row, idx) => (
                  <tr
                    key={row.diploma}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-slate-50/80 transition-colors"
                        : "bg-slate-50/40 hover:bg-slate-50 transition-colors"
                    }
                  >
                    <td className="py-4 px-6 font-bold text-slate-900">{row.diploma}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-slate-700 font-medium">
                      {row.ageGroup}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        href={row.href}
                        className="text-[#2C2F8F] hover:text-[#1e2060] font-semibold underline underline-offset-2 transition-colors"
                      >
                        {row.environment}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section Outro */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70">
            <p className="text-base text-slate-800 leading-relaxed">
              Most aspiring Montessori teachers in India begin with the AMI Primary Diploma (3–6). It covers the most widely available age group and the broadest range of schools. The AMI Elementary Diploma (6–12) is the natural second qualification for those wanting to follow children through the continuum.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
