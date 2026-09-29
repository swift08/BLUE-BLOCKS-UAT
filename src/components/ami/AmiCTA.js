import Container from "@/components/layout/Container";

export default function AmiCTA() {
  return (
    <section id="contact" className="py-6 sm:py-8 bg-[#FBF7F2] scroll-mt-36 sm:scroll-mt-44 relative">
      <Container>
        {/* Compact, Small & Sleek CTA Card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#171A4D] via-[#1E2265] to-[#141740] text-white p-4 sm:p-5 md:p-6 shadow-lg shadow-indigo-950/10 border border-white/10 max-w-4xl mx-auto">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            {/* Left: Content */}
            <div className="md:max-w-[60%]">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-amber-200 text-[10px] font-bold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Direct Enquiries & Observation
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-snug">
                Train in an Environment Where the Method Is Lived
              </h2>

              <p className="mt-1.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                Blue Blocks is one of the few schools in India where AMI Montessori is practised continuously from 15 months to 16 years. If you are considering AMI training or completing observation hours, we welcome enquiries from serious candidates.
              </p>
            </div>

            {/* Right: Compact Contact Action Box */}
            <div className="md:w-[36%] w-full bg-white/[0.07] border border-white/15 rounded-xl p-3 sm:p-3.5 flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-300/30 flex items-center justify-center font-bold text-amber-300 text-xs shrink-0">
                  RD
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    Training Coordinator: Ramya Devi
                  </p>
                  <a
                    href="tel:+919154160971"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    <svg className="w-3 h-3 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+91 9154160971</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://wa.me/919154160971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm shadow-[#25D366]/20"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:+919154160971"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors shrink-0"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

