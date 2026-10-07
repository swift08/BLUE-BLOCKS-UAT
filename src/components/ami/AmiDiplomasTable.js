import Link from "next/link";
import Container from "@/components/layout/Container";

const DIPLOMAS_DATA = [
  {
    diploma: "AMI Assistants to Infancy",
    ageGroup: "0–3 years",
    environment: "Infant and Toddler Community",
    href: "/programs/playgroup/",
  },
  {
    diploma: "AMI Primary Diploma",
    ageGroup: "3–6 years",
    environment: "Pre-Primary — Nursery, PP1, PP2",
    href: "/programs/nursery-school/",
  },
  {
    diploma: "AMI Elementary Diploma",
    ageGroup: "6–12 years",
    environment: "Primary (Grade 1–6)",
    href: "/programs/primary-school-elementary/",
  },
  {
    diploma: "AMI Adolescent Orientation",
    ageGroup: "12–18 years",
    environment: "Secondary (High School)",
    href: "/programs/secondary-school/",
  },
];

export default function AmiDiplomasTable() {
  return (
    <section id="diplomas" className="py-16 sm:py-20 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100">
      <Container>
        <div className="max-w-5xl mx-auto">
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

          {/* Mobile: stacked rows — no horizontal table scroll */}
          <div className="md:hidden mt-8 space-y-3">
            {DIPLOMAS_DATA.map((row) => (
              <div
                key={row.diploma}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-sm"
              >
                <p className="font-bold text-slate-900 text-sm">{row.diploma}</p>
                <p className="mt-1 text-xs font-semibold text-[#2C2F8F]">{row.ageGroup}</p>
                <Link
                  href={row.href}
                  className="mt-2 inline-block text-sm text-[#2C2F8F] font-semibold underline underline-offset-2"
                >
                  {row.environment}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop/tablet: table unchanged */}
          <div className="hidden md:block mt-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
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
