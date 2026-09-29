import Container from "@/components/layout/Container";

const ELIGIBILITY_DATA = [
  {
    requirement: "Minimum age",
    detail: "20 years",
  },
  {
    requirement: "Education",
    detail:
      "Bachelor's degree in any discipline — preferred; exceptions considered for motivated candidates",
  },
  {
    requirement: "Language",
    detail:
      "Proficient spoken and written English — all coursework, albums, and examinations are in English",
  },
  {
    requirement: "Admission",
    detail: "Application form and personal interview required at all centres",
  },
];

export default function AmiEligibilityTable() {
  return (
    <section id="eligibility" className="py-14 sm:py-18 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AMI Diploma Eligibility
          </h2>

          {/* Mobile view (< md): Clean stacked requirement cards */}
          <div className="md:hidden mt-6 space-y-3">
            {ELIGIBILITY_DATA.map((row) => (
              <div key={row.requirement} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2F8F] block mb-1">
                  {row.requirement}
                </span>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet view (md+): Structured Table */}
          <div className="hidden md:block mt-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[#2C2F8F] text-white text-xs sm:text-sm uppercase tracking-wider font-semibold">
                  <th className="py-4 px-6 border-b border-[#2C2F8F] w-1/3">Requirement</th>
                  <th className="py-4 px-6 border-b border-[#2C2F8F] w-2/3">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
                {ELIGIBILITY_DATA.map((row, idx) => (
                  <tr
                    key={row.requirement}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-slate-50/80 transition-colors"
                        : "bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    }
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900 whitespace-nowrap align-top">
                      {row.requirement}
                    </td>
                    <td className="py-4 px-6 text-slate-700 leading-relaxed align-top">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-base text-slate-700 leading-relaxed">
            Candidates without a Bachelor&apos;s degree are not automatically excluded. Most AMI centres in India consider applications from candidates with significant relevant experience. Contact the centre directly before assuming ineligibility.
          </p>
        </div>
      </Container>
    </section>
  );
}
